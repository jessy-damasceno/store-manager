const { addProductSchema } = require('./schemas');

const validateNewProduct = (name) => {
  const { error } = addProductSchema.validate({ name });

  if (error) {
    return {
      type: error.details[0].message,
      message: error.details[0].message,
    }; 
  }
  return { type: null };
};

module.exports = {
  validateNewProduct,
};
