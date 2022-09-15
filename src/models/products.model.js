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
  const [{ affectedRows }] = await connection.execute('UPDATE products SET name = ? WHERE id = ?',
    [name, id]);

  const result = await findById(id);

  return { affectedRows, result };
}

async function deleteProduct(productId) {
  const [result] = await connection.execute('DELETE FROM products WHERE id = ?', [productId]);
  return result;
}

async function getByQuery(searchTerm = '') {
  const query = `%${searchTerm}%`;
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE products.name LIKE ?',
    [query],
  );
  return result;
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteProduct,
  getByQuery,
};
