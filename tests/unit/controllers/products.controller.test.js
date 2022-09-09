const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;

const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');

const { productsList } = require('./mocks/products.controller.mock');

describe('Verificando controller Products', function () {

  describe('Listando produtos', function () {
    beforeEach(function () {
      sinon.stub(productsService, 'listAll').resolves(productsList);
    });

    afterEach(function () {
      sinon.restore();
    });

    it('é chamado o status com o código 200', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.listAllProducts(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('é chamado o json com a lista de produtos', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.listAllProducts(req, res);

      expect(res.json.calledWith(productsList)).to.be.true;
    });
  });
});