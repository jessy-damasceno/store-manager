const { Router } = require('express');
const {
  createNewSale,
  listAllSales,
} = require('../controllers/sales.controller');

const salesRouter = Router();

salesRouter.post('/', createNewSale);

salesRouter.get('/', listAllSales);

module.exports = salesRouter;