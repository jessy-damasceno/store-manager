const salesModel = require('../models/sales.model');
const validations = require('./validations/validations');

const createSale = async (payload) => {
  const error = validations.validateNewSale(payload);

  if (error.type) {
    return error;
  }

  const { saleId } = await salesModel.insertSaleProducts(payload);

  return {
    type: null,
    message: { id: saleId, itemsSold: payload },
  };
};

module.exports = {
  createSale,
};
