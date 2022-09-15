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

const correctUpdateResponse = {
  type: null,
  message: {
    saleId: 1,
    itemsUpdated: [
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

const INVALID_QUANTITY_ERROR_MESSAGE = {
  type: "INVALID_FIELD",
  message: '"quantity" must be greater than or equal to 1',
};

const INVALID_PRODUCT_ID_ERROR_MESSAGE = {
  type: "PRODUCT_NOT_FOUND",
  message: "Product not found",
};

const allSales = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

const saleById = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

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
  INVALID_QUANTITY_ERROR_MESSAGE,
  INVALID_PRODUCT_ID_ERROR_MESSAGE,
  allSales,
  saleById,
  correctUpdateResponse,
};
