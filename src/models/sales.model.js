const connection = require('./connection');

async function newSale() {
  const [{ insertId }] = await connection.execute('INSERT INTO sales(date) VALUE(NOW())');

  return insertId;
}

async function sd() {
  return null;
}

module.exports = {
  newSale,
  sd,
};
