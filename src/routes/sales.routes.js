const { Router } = require('express');
const {
  createNewSale,
  listAllSales,
  getOneSale,
  deleteSale,
} = require('../controllers/sales.controller');

const salesRouter = Router();

salesRouter.route('/:id')
  .get(getOneSale)
  .delete(deleteSale);

salesRouter.route('/')
  .get(listAllSales)
  .post(createNewSale);

module.exports = salesRouter;
