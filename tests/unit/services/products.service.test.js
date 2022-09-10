const { expect } = require("chai");
const sinon = require("sinon");

const productsModel = require("../../../src/models/products.model");
const productsService = require("../../../src/services/products.service");
const { productsList } = require("./mocks/products.service.mock");

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
});
