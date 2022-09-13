const salesService = require('../services/sales.service');
const { mapError } = require('../utils/errorMap');

const createNewSale = async (req, res) => {
  const { type, message } = await salesService.createSale(req.body);

  if (type) {
    return res.status(mapError(type)).json({ message });
  }
  return res.status(201).json(message);
};

module.exports = {
  createNewSale,
};
