const salesService = require('../services/sales.service');
const { mapError } = require('../utils/errorMap');

const createNewSale = async (req, res) => {
  const { type, message } = await salesService.createSale(req.body);

  if (type) {
    return res.status(mapError(type)).json({ message });
  }
  return res.status(201).json(message);
};

const listAllSales = async (_req, res) => {
  const products = await salesService.listAll();

  return res.status(200).json(products);
};

module.exports = {
  createNewSale,
  listAllSales,
};
