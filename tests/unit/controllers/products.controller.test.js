const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;

const productsController = require("../../../src/controllers/products.controller");
const productsService = require("../../../src/services/products.service");

const {
  productsList,
  newProduct,
} = require("./mocks/products.controller.mock");

describe("Verificando controller Products", function () {
  describe("Listando produtos", function () {
    beforeEach(function () {
      sinon.stub(productsService, "listAll").resolves(productsList);
    });

    afterEach(function () {
      sinon.restore();
    });

    it("é chamado o status com o código 200", async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.listAllProducts(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it("é chamado o json com a lista de produtos", async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.listAllProducts(req, res);

      expect(res.json.calledWith(productsList)).to.be.true;
    });
  });

  describe("Listando um produto", function () {
    afterEach(function () {
      sinon.restore();
    });

    it("é chamado o status com o código 200", async function () {
      sinon
        .stub(productsService, "getProductById")
        .resolves({ type: null, message: productsList[0] });

      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getOneProduct(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it("é chamado o json com um único produto", async function () {
      sinon
        .stub(productsService, "getProductById")
        .resolves({ type: null, message: productsList[0] });

      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getOneProduct(req, res);

      expect(res.json.calledWith(productsList[0])).to.be.true;
    });

    it("é chamado o status com o código 404", async function () {
      sinon
        .stub(productsService, "getProductById")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      const req = { params: { id: 99999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getOneProduct(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Product not found" })).to.be.true;
    });
  });

  describe("Cadastrando um produto", function () {
    afterEach(function () {
      sinon.restore();
    });

    it("é chamado o status com o código 201 e retorna o objeto cadastrado", async function () {
      sinon
        .stub(productsService, "createProduct")
        .resolves({ type: null, message: newProduct });

      const req = { body: { name: "Álbum de figurinhas da Copa" } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.createProduct(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(newProduct)).to.be.true;
    });

    it("é chamado o status com o código 400 e retorna a mensagem de erro se nome do produto não especificado", async function () {
      sinon
        .stub(productsService, "createProduct")
        .resolves({ type: "FIELD_REQUIRED", message: '"name" is required' });

      const req = { body: { name: "" } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.createProduct(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: '"name" is required' })).to.be.true;
    });
  });

  describe("Atualizando um produto", function () {
    afterEach(function () {
      sinon.restore();
    });

    it("é chamado o status com o código 200 e retorna o objeto atualizado", async function () {
      sinon
        .stub(productsService, "updateProduct")
        .resolves({ type: null, message: newProduct });

      const req = {
        body: { name: "Álbum de figurinhas da Copa" },
        params: { id: 4 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.updateProduct(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(newProduct)).to.be.true;
    });

    it("é chamado o status com o código 400 e retorna a mensagem de erro se nome do produto não especificado", async function () {
      sinon
        .stub(productsService, "updateProduct")
        .resolves({ type: "FIELD_REQUIRED", message: '"name" is required' });

      const req = { body: { name: "" }, params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.updateProduct(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: '"name" is required' })).to.be.true;
    });

    it("é chamado o status com o código 400 e retorna a mensagem de erro se nome do produto não especificado", async function () {
      sinon
        .stub(productsService, "updateProduct")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      const req = {
        body: { name: "Piscina de bolinhas do Aquaman" },
        params: { id: 999 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.updateProduct(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Product not found" })).to.be.true;
    });
  });

  describe("Deletando um produto", function () {
    afterEach(function () {
      sinon.restore();
    });

    it("é chamado o status com o código 204", async function () {
      sinon
        .stub(productsService, "deleteProduct")
        .resolves({ type: null, message: null });

      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.deleteProduct(req, res);

      expect(res.status.calledWith(204)).to.be.true;
    });

    it("é chamado o status com o código 404", async function () {
      sinon
        .stub(productsService, "deleteProduct")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      const req = { params: { id: 99999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.deleteProduct(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Product not found" })).to.be.true;
    });
  });
});
