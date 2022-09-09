const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const { productsList } = require('./mocks/products.service.mock');

describe('Verificando service Products', function () {
  describe('Listando todos os produtos', function () {
    beforeEach(function () {
      sinon.stub(productsModel, 'findAll').resolves(productsList);
    });

    afterEach(function () {
      sinon.restore();
    });

    it('A lista de produtos é um array', async function () {
      const result = await productsService.listAll();
      
      expect(result instanceof Array).to.equal(true);
    });

    it('Retorna a lista de produtos com sucesso', async function () {
      const result = await productsService.listAll();

      expect(result).to.deep.equal(productsList);
    });
  });
});