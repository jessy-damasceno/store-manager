const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;

const salesController = require("../../../src/controllers/sales.controller");
const salesService = require("../../../src/services/sales.service");

const {
  saleCreateResponse,
  validBodyRequest,
  salesList,
} = require("./mocks/sales.controller.mock");

describe("Verificando controller Sales", function () {
  describe("Cadastrando uma nova venda", function () {
    afterEach(function () {
      sinon.restore();
    });

    it("é chamado o status com o código 201 e json corretamente", async function () {
      sinon
        .stub(salesService, "createSale")
        .resolves({ type: null, message: saleCreateResponse });

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createNewSale(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(saleCreateResponse)).to.be.true;
    });

    it("testando a resposta em caso de erro", async function () {
      sinon
        .stub(salesService, "createSale")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createNewSale(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Product not found" })).to.be.true;
    });
  });

  describe("Listando todas as vendas", function () {
    beforeEach(function () {
      sinon.stub(salesService, "listAll").resolves(salesList);
    });

    afterEach(function () {
      sinon.restore();
    });

    it("é chamado o status com o código 200", async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.listAllSales(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it("é chamado o json com a lista de vendas", async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.listAllSales(req, res);

      expect(res.json.calledWith(salesList)).to.be.true;
    });
  });
});
