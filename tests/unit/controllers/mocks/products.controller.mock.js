const productsList = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

const newProduct = { id: 4, name: 'Álbum de figurinhas da Copa' };

const productsListWithNewProduct = [...productsList, newProduct];

module.exports = {
  productsList,
  newProduct,
  productsListWithNewProduct,
};
