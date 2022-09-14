const { Router } = require('express');
const {
  createNewSale,
  listAllSales,
  getOneSale,
  deleteSale,
  updateSale,
} = require('../controllers/sales.controller');

const salesRouter = Router();

salesRouter.route('/:id')
  .get(getOneSale)
  .put(updateSale)
  .delete(deleteSale);

salesRouter.route('/')
  .get(listAllSales)
  .post(createNewSale);

module.exports = salesRouter;
