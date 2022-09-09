const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const productsModel = require("../../../src/models/products.model");

const { products } = require("./mocks/products.model.mock");

describe("Testes de unidade do model de Produtos", function () {
  describe("Listando todos os produtos", function () {
    before(async function () {
      sinon.stub(connection, "execute").resolves([products]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it("Testando o retorno da função findAll", async function () {
      const result = await productsModel.findAll();

      expect(result).to.be.deep.equal([
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },
        { id: 3, name: "Escudo do Capitão América" },
      ]);
    });
  });

  describe("Listando um produto", function () {
    before(async function () {
      sinon.stub(connection, "execute").resolves([[products[0]]]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it("Testando o retorno da função findById", async function () {
      const result = await productsModel.findById(1);

      expect(result).to.be.deep.equal({ id: 1, name: "Martelo de Thor" });
    });
  });
});
