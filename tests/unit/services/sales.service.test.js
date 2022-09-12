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
  });
});
