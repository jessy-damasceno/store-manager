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

  describe("Cadastra um novo produto", function () {
    before(async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
    });

    after(async function () {
      connection.execute.restore();
    });

    const expected = 1;

    const payload = "Álbum de figurinhas da Copa";

    it("com sucesso", async function () {
      const response = await productsModel.insert(payload);

      expect(response).to.equal(expected);
    });
  });

  describe("Atualiza um produto", function () {
    const payload = {
      id: 5,
      name: "Álbum de figurinhas da Copa",
    };

    before(async function () {
      sinon
        .stub(connection, "execute")
        .onCall(0)
        .resolves([{ affectedRows: 1 }])
        .onCall(1)
        .resolves([[payload]]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it("com sucesso", async function () {
      const response = await productsModel.update(payload);

      expect(response.affectedRows).to.equal(1);
      expect(response.result).to.deep.equal(payload);
    });
  });

  describe("Remove um produto", function () {
    before(async function () {
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it("com sucesso", async function () {
      const response = await productsModel.deleteProduct(2);

      expect(response.affectedRows).to.equal(1);
    });
  });

  describe("Busca produtos por searchTerm", function () {
    before(async function () {
      sinon.stub(connection, "execute").resolves([products]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it("com sucesso", async function () {
      const response = await productsModel.getByQuery();
      expect(response).to.equal(products);
    });
  });
});
