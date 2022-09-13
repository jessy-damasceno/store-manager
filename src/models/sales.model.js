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

async function getSales() {
  const [result] = await connection.execute(
    `SELECT 
      sp.sale_id AS saleId,
      sa.date,
      sp.product_id AS productId,
      sp.quantity
    FROM sales_products AS sp
    JOIN sales AS sa ON sp.sale_id = sa.id
    ORDER BY saleId, productId`,
  );
  return result;
}

module.exports = {
  newSale,
  insertSaleProducts,
  getSales,
};
