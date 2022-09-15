const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;

const salesController = require("../../../src/controllers/sales.controller");
const salesService = require("../../../src/services/sales.service");

const {
  saleCreateResponse,
  validBodyRequest,
  salesList,
  saleById,
  saleUpdatedResponse,
  saleUpdated,
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

  describe("Listando uma venda", function () {
    afterEach(function () {
      sinon.restore();
    });

    it("é chamado o status com o código 200 e uma única venda", async function () {
      sinon
        .stub(salesService, "getSaleById")
        .resolves({ type: null, message: saleById });

      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getOneSale(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(saleById)).to.be.true;
    });

    it("é chamado o status com o código 404", async function () {
      sinon
        .stub(salesService, "getSaleById")
        .resolves({ type: "SALE_NOT_FOUND", message: "Sale not found" });

      const req = { params: { id: 99999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getOneSale(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Sale not found" })).to.be.true;
    });
  });

  describe("Deletando uma venda", function () {
    afterEach(function () {
      sinon.restore();
    });

    it("é chamado o status com o código 204", async function () {
      sinon
        .stub(salesService, "deleteSale")
        .resolves({ type: null, message: null });

      const req = { params: { id: 1 } };
      const res = {};

      res.sendStatus = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.deleteSale(req, res);

      expect(res.sendStatus.calledWith(204)).to.be.true;
    });

    it("é chamado o status com o código 404", async function () {
      sinon
        .stub(salesService, "deleteSale")
        .resolves({ type: "SALE_NOT_FOUND", message: "Sale not found" });

      const req = { params: { id: 99999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.deleteSale(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Sale not found" })).to.be.true;
    });
  });

  describe("Atualizando uma venda", function () {
    afterEach(function () {
      sinon.restore();
    });

    it("é chamado o status com o código 200 e o retorno da venda modificada", async function () {
      sinon
        .stub(salesService, "updateSale")
        .resolves(saleUpdatedResponse);

      const req = { params: { id: 3 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.updateSale(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(saleUpdated)).to.be.true;
    });

    it("é chamado o status com o código 404", async function () {
      sinon
        .stub(salesService, "updateSale")
        .resolves({ type: "SALE_NOT_FOUND", message: "Sale not found" });

      const req = { params: { id: 99999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.updateSale(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Sale not found" })).to.be.true;
    });
  });
});
