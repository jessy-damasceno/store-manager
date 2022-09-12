const { Router } = require('express');
const { createNewSale } = require('../controllers/sales.controller');

const salesRouter = Router();

salesRouter.post('/', createNewSale);

module.exports = salesRouter;