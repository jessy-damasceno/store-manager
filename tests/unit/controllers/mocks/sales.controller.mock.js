const saleCreateResponse = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};

const saleUpdated = {
  saleId: 3,
  itemsUpdated: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};

const saleUpdatedResponse = {
  type: null,
  message: saleUpdated,
};

const validBodyRequest = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const salesList = [
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
  saleCreateResponse,
  validBodyRequest,
  salesList,
  saleById,
  saleUpdatedResponse,
  saleUpdated,
};