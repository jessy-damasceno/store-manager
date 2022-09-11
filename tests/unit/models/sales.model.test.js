const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const salesModel = require("../../../src/models/sales.model");

const { salesProducts } = require("./mocks/sales.model.mock");

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
      sinon.stub(connection, "execute").resolves([{ affectedRows: 2 }]);
      const result = await salesModel.insertSaleProducts(salesProducts);

      expect(result).to.equal(2);
    });
  });
});
