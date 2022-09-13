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

async function insert(productName) {
  const [{ insertId }] = await connection.execute('INSERT INTO products(name) VALUE(?)',
    [productName]);
  
  return insertId;
}

async function update({ name, id }) {
  const [result] = await connection.execute('UPDATE products SET name = ? WHERE id = ?',
    [name, id]);

  return result;
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
};
