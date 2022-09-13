const { Router } = require('express');
const {
  createNewSale,
  listAllSales,
  getOneSale,
} = require('../controllers/sales.controller');

const salesRouter = Router();

salesRouter.get('/:id', getOneSale);
salesRouter.get('/', listAllSales);

salesRouter.post('/', createNewSale);

module.exports = salesRouter;
