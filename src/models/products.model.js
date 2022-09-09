const connection = require('./connection');

async function findAll() {
  const [result] = await connection.execute('SELECT * FROM products');

  return result;
}

async function findById(productId) {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?',
    [productId]);
  
  return result;
}

module.exports = {
  findAll,
  findById,
};
