const { addProductSchema, newSaleSchema } = require('./schemas');

const validateNewProduct = (name) => {
  const { error } = addProductSchema.validate({ name });

  if (error) {
    return {
      type: error.details[0].type === 'string.min' ? 'INVALID_FIELD' : 'FIELD_REQUIRED',
      message: error.details[0].message,
    }; 
  }
  return { type: null };
};

const validateNewSale = (payload) => {
  const { error } = newSaleSchema.validate(payload);

  if (error) {
    return {
      type: error.details[0].type === 'number.greater' ? 'INVALID_FIELD' : 'FIELD_REQUIRED',
      message: error.details[0].message.replace(/\[\d\]./, ''),
    };
  }
  return { type: null };
};

module.exports = {
  validateNewProduct,
  validateNewSale,
};
