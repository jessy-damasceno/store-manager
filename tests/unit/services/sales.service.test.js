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
      console.log(result);
      expect(result instanceof Object).to.equal(true);
      expect(result).to.deep.equal(newSaleResponse);
    });
  });
});
