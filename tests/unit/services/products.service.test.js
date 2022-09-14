const { expect } = require("chai");
const sinon = require("sinon");

const productsModel = require("../../../src/models/products.model");
const productsService = require("../../../src/services/products.service");
const { productsList } = require("./mocks/products.service.mock");

const VALID_NAME = "Álbum de figurinhas da Copa";

const INVALID_MIN_CHARS_EXPECTED = {
  type: "INVALID_FIELD",
  message: '"name" length must be at least 5 characters long',
};

const NAME_REQUIRED_EXPECTED = {
  type: "FIELD_REQUIRED",
  message: '"name" is required',
};

const INSERTED_PRODUCT = {
  type: null,
  message: { id: 1, name: VALID_NAME },
};

describe("Verificando service Products", function () {
  describe("Listando todos os produtos", function () {
    beforeEach(function () {
      sinon.stub(productsModel, "findAll").resolves(productsList);
    });

    afterEach(function () {
      sinon.restore();
    });

    it("A lista de produtos é um array", async function () {
      const result = await productsService.listAll();

      expect(result instanceof Array).to.equal(true);
    });

    it("Retorna a lista de produtos com sucesso", async function () {
      const result = await productsService.listAll();

      expect(result).to.deep.equal(productsList);
    });
  });

  describe("Listando um único produto", function () {
    afterEach(function () {
      sinon.restore();
    });

    it("O produto é um objeto", async function () {
      sinon.stub(productsModel, "findById").resolves(productsList[0]);

      const result = await productsService.getProductById(1);

      expect(result instanceof Object).to.equal(true);
    });

    it("Retorna um produto com sucesso", async function () {
      sinon.stub(productsModel, "findById").resolves(productsList[0]);

      const result = await productsService.getProductById(1);

      expect(result.message).to.deep.equal(productsList[0]);
    });

    it("Retorna uma mensagem de erro caso não existir produto com ID especificado", async function () {
      const INVALID_ID = 9999;
      sinon.stub(productsModel, "findById").resolves(productsList[INVALID_ID]);

      const result = await productsService.getProductById(INVALID_ID);

      expect(result.message).to.deep.equal("Product not found");
    });
  });

  describe("Cadastrando um produto", function () {
    beforeEach(function () {
      sinon.stub(productsModel, "insert").resolves(1);
    });

    afterEach(function () {
      sinon.restore();
    });

    it("Retorna um erro ao receber um produto menor do que 5 caracteres", async function () {
      const result = await productsService.createProduct("suco");

      expect(result instanceof Object).to.equal(true);
      expect(result).to.deep.equal(INVALID_MIN_CHARS_EXPECTED);
    });

    it("Retorna um erro ao não receber o nome de um produto", async function () {
      const result = await productsService.createProduct();

      expect(result instanceof Object).to.equal(true);
      expect(result).to.deep.equal(NAME_REQUIRED_EXPECTED);
    });

    it("Cadastrando um novo produto com sucesso", async function () {
      const result = await productsService.createProduct(VALID_NAME);

      expect(result instanceof Object).to.equal(true);
      expect(result).to.deep.equal(INSERTED_PRODUCT);
    });
  });

  describe("Atualizando um produto", function () {
    const payload = {
      id: 5,
      name: "Álbum de figurinhas da Copa",
    };

    afterEach(function () {
      sinon.restore();
    });

    it("com sucesso", async function () {
      sinon.stub(productsModel, "findById").resolves({ type: null });
      sinon.stub(productsModel, "update").resolves({ result: payload });

      const result = await productsService.updateProduct(payload);

      expect(result instanceof Object).to.equal(true);
      expect(result).to.deep.equal({ type: null, message: payload });
    });

    it("retorna erro se produto não existir", async function () {
      sinon.stub(productsModel, "findById").resolves(null);
      sinon.stub(productsModel, "update").resolves({ result: payload });

      const result = await productsService.updateProduct(payload);

      expect(result).to.deep.equal({
        type: "PRODUCT_NOT_FOUND",
        message: "Product not found",
      });
    });

    it("retorna erro se não for enviado nome do produto no corpo da requisição", async function () {
      sinon.stub(productsModel, "findById").resolves({ type: null });
      sinon.stub(productsModel, "update").resolves({ result: payload });

      const result = await productsService.updateProduct({ id: 5 });

      expect(result).to.deep.equal(NAME_REQUIRED_EXPECTED);
    });
  });

  describe("Removendo um produto do bando de dados", function () {

    afterEach(function () {
      sinon.restore();
    });

    it("com sucesso", async function () {
      sinon.stub(productsModel, "findById").resolves(productsList[0]);
      sinon.stub(productsModel, "deleteProduct").resolves([{ affectedRows: 1 }]);

      const result = await productsService.deleteProduct(1);

      expect(result).to.equal();
    });

    it("retorna erro se produto não existir", async function () {
      sinon.stub(productsModel, "findById").resolves(null);

      const result = await productsService.deleteProduct(1);

      expect(result).to.deep.equal({
        type: "PRODUCT_NOT_FOUND",
        message: "Product not found",
      });
    });
  });
});
