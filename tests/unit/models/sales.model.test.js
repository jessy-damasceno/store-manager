const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const salesModel = require("../../../src/models/sales.model");

const { products } = require("./mocks/products.model.mock");

describe.only("Verificando Model Sales", function () {
  describe("Cadastrando uma nova venda (tabela sales)", function () {
    before(async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it("Testando o retorno da função newSale", async function () {
      const result = await salesModel.newSale();

      expect(result).to.be.deep.equal(1);
    });
  });
});
