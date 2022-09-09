const connection = require('./connection');

async function findAll() {
  const [result] = await connection.execute('SELECT * FROM products');

  return result;
}

module.exports = {
  findAll,
};
