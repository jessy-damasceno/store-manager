const connection = require('./connection');

async function newSale() {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales(date) VALUE(NOW())',
  );

  return insertId;
}

async function insertSaleProducts(payload) {
  const saleId = await newSale();
  const placeholders = payload.map(() => '(?, ?, ?)').join(',');
  const values = [];

  payload.forEach((e) => values.push(saleId, ...Object.values(e)));

  const query = `INSERT INTO sales_products(sale_id, product_id, quantity) VALUES ${placeholders}`;

  const [{ affectedRows }] = await connection.execute(query, values);

  return { saleId, affectedRows };
}

module.exports = {
  newSale,
  insertSaleProducts,
};
