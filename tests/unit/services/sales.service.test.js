const { expect } = require("chai");
const sinon = require("sinon");

const salesModel = require("../../../src/models/sales.model");
const salesService = require("../../../src/services/sales.service");

const {
  newSaleProducts,
  newSaleResponse,
  missingProductId,
  missingProductId2,
  invalidProductId,
  invalidProductId2,
  missingQuantity,
  missingQuantity2,
  invalidQuantity1,
  invalidQuantity2,
  PRODUCT_ID_REQUIRED_ERROR_MESSAGE,
  QUANTITY_REQUIRED_ERROR_MESSAGE,
  INVALID_QUANTITY_ERROR_MESSAGE,
  INVALID_PRODUCT_ID_ERROR_MESSAGE,
  allSales,
  saleById,
} = require("./mocks/sales.service.mock");

describe("Verificando service Sales", function () {
  describe("Validando e cadastrando uma nova venda", function () {
    beforeEach(function () {
      sinon.stub(salesModel, "insertSaleProducts").resolves({ saleId: 1 });
    });

    afterEach(function () {
      sinon.restore();
    });

    it("Retorna corretamente ao inserir dados válidos", async function () {
      const result = await salesService.createSale(newSaleProducts);

      expect(result instanceof Object).to.equal(true);
      expect(result).to.deep.equal(newSaleResponse);
    });

    it("Retorna um erro se productId não for passado", async function () {
      const result = await salesService.createSale(missingProductId);

      expect(result instanceof Object).to.equal(true);
      expect(result).to.deep.equal(PRODUCT_ID_REQUIRED_ERROR_MESSAGE);
    });

    it("Retorna um erro se productId não for passado - case 2", async function () {
      const result = await salesService.createSale(missingProductId2);

      expect(result instanceof Object).to.equal(true);
      expect(result).to.deep.equal(PRODUCT_ID_REQUIRED_ERROR_MESSAGE);
    });

    it("Retorna um erro se quantity não for passado", async function () {
      const result = await salesService.createSale(missingQuantity);

      expect(result instanceof Object).to.equal(true);
      expect(result).to.deep.equal(QUANTITY_REQUIRED_ERROR_MESSAGE);
    });

    it("Retorna um erro se quantity não for passado - case 2", async function () {
      const result = await salesService.createSale(missingQuantity2);

      expect(result instanceof Object).to.equal(true);
      expect(result).to.deep.equal(QUANTITY_REQUIRED_ERROR_MESSAGE);
    });

    it("Retorna um erro se quantity tiver valores inválidos", async function () {
      const result = await salesService.createSale(invalidQuantity1);

      expect(result instanceof Object).to.equal(true);
      expect(result).to.deep.equal(INVALID_QUANTITY_ERROR_MESSAGE);
    });

    it("Retorna um erro se quantity tiver valores inválidos - case 2", async function () {
      const result = await salesService.createSale(invalidQuantity2);

      expect(result instanceof Object).to.equal(true);
      expect(result).to.deep.equal(INVALID_QUANTITY_ERROR_MESSAGE);
    });

    it("Retorna um erro se o produto não estiver cadastrado", async function () {
      const result = await salesService.createSale(invalidProductId);

      expect(result instanceof Object).to.equal(true);
      expect(result).to.deep.equal(INVALID_PRODUCT_ID_ERROR_MESSAGE);
    });

    it("Retorna um erro se o produto não estiver cadastrado - case 2", async function () {
      const result = await salesService.createSale(invalidProductId2);

      expect(result instanceof Object).to.equal(true);
      expect(result).to.deep.equal(INVALID_PRODUCT_ID_ERROR_MESSAGE);
    });
  });

  describe("Listando todas as vendas", function () {
    beforeEach(function () {
      sinon.stub(salesModel, "getSales").resolves(allSales);
    });

    afterEach(function () {
      sinon.restore();
    });

    it("A lista de vendas é um array", async function () {
      const result = await salesService.listAll();

      expect(result instanceof Array).to.equal(true);
    });

    it("Retorna a lista de vendas com sucesso", async function () {
      const result = await salesService.listAll();

      expect(result).to.deep.equal(allSales);
    });
  });

  describe("Listando uma única venda", function () {
    afterEach(function () {
      sinon.restore();
    });

    it("Retorna uma venda com sucesso", async function () {
      sinon.stub(salesModel, "getSaleById").resolves(saleById);

      const result = await salesService.getSaleById(1);

      expect(result.message).to.deep.equal(saleById);
    });

    it("Retorna uma mensagem de erro caso não existir venda com ID especificado", async function () {
      const INVALID_ID = 9999;
      sinon.stub(salesModel, "getSaleById").resolves([]);

      const result = await salesService.getSaleById(INVALID_ID);

      expect(result.message).to.deep.equal("Sale not found");
    });
  });

  describe.only("Removendo uma venda do bando de dados", function () {
    afterEach(function () {
      sinon.restore();
    });

    it("com sucesso", async function () {
      sinon.stub(salesModel, "getSaleById").resolves([allSales[0]]);
      sinon
        .stub(salesModel, "deleteSale")
        .resolves([{ affectedRows: 1 }]);

      const result = await salesService.deleteSale(1);

      expect(result).to.deep.equal({ type: null, message: null });
    });

    it("retorna erro se a venda não existir", async function () {
      sinon.stub(salesModel, "getSaleById").resolves([]);

      const result = await salesService.deleteSale(1);

      expect(result).to.deep.equal({
        type: "SALE_NOT_FOUND",
        message: "Sale not found",
      });
    });
  });
});
