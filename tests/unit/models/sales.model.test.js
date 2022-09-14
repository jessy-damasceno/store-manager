const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const salesModel = require("../../../src/models/sales.model");

const {
  salesProducts,
  allSales,
  saleById,
} = require("./mocks/sales.model.mock");

describe("Verificando Model Sales", function () {
  describe("Cadastrando uma nova venda (tabela sales)", function () {
    afterEach(async function () {
      sinon.restore();
    });

    it("Testando o retorno da função newSale", async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
      const result = await salesModel.newSale();

      expect(result).to.be.deep.equal(1);
    });

    it("Testando se a função insertSaleProducts funciona corretamente", async function () {
      sinon
        .stub(connection, "execute")
        .onFirstCall()
        .resolves([{ insertId: 1 }])
        .onSecondCall()
        .resolves([{ affectedRows: 2 }]);
      const result = await salesModel.insertSaleProducts(salesProducts);

      expect(result).to.deep.equal({ saleId: 1, affectedRows: 2 });
    });
  });

  describe("Listando vendas", function () {
    afterEach(async function () {
      sinon.restore();
    });

    it("Testando o retorno da função getSales", async function () {
      sinon.stub(connection, "execute").resolves([allSales]);
      const result = await salesModel.getSales();

      expect(result).to.be.deep.equal(allSales);
    });
  });

  describe("Listando uma venda", function () {
    afterEach(async function () {
      sinon.restore();
    });

    it("Testando o retorno da função getSaleById", async function () {
      sinon.stub(connection, "execute").resolves([saleById]);
      const result = await salesModel.getSaleById(1);

      expect(result).to.be.deep.equal(saleById);
    });
  });

  describe("Remove uma venda", function () {
    before(async function () {
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it("com sucesso", async function () {
      const response = await salesModel.deleteSale(2);

      expect(response.affectedRows).to.equal(1);
    });
  });
});
