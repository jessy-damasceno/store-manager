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

const getOneSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);

  if (type) {
    return res.status(mapError(type)).json({ message });
  }
  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id);

  if (type) {
    return res.status(mapError(type)).json({ message });
  }

  return res.sendStatus(204);
};

module.exports = {
  createNewSale,
  listAllSales,
  getOneSale,
  deleteSale,
};
