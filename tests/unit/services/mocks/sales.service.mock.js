const newSaleProducts = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const newSaleResponse = {
  type: null,
  message: {
    id: 1,
    itemsSold: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 },
    ],
  },
};

const missingProductId = [{ quantity: 1 }];

const missingProductId2 = [{ productId: 1, quantity: 1 }, { quantity: 5 }];

const invalidProductId = [
  { productId: 9999, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const invalidProductId2 = [
  { productId: 1, quantity: 1 },
  { productId: 9999, quantity: 5 },
];

const missingQuantity = [{ productId: 1 }];

const missingQuantity2 = [{ productId: 1, quantity: 1 }, { productId: 2 }];

const invalidQuantity1 = [
  { productId: 1, quantity: 0 },
  { productId: 2, quantity: 5 },
];

const invalidQuantity2 = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: -1 },
];

const PRODUCT_ID_REQUIRED_ERROR_MESSAGE = {
  type: "FIELD_REQUIRED",
  message: '"productId" is required',
};

const QUANTITY_REQUIRED_ERROR_MESSAGE = {
  type: "FIELD_REQUIRED",
  message: '"quantity" is required',
};

module.exports = {
  newSaleProducts,
  newSaleResponse,
  missingProductId,
  missingProductId2,
  invalidProductId,
  invalidProductId2,
  missingQuantity,
  missingQuantity2,
  invalidQuantity1,
  invalidQuantity2,
  PRODUCT_ID_REQUIRED_ERROR_MESSAGE,
  QUANTITY_REQUIRED_ERROR_MESSAGE,
};