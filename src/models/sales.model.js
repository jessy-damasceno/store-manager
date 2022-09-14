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

async function getSaleById(saleId) {
  const [result] = await connection.execute(
    `SELECT date, product_id AS productId, quantity FROM sales_products
    JOIN sales ON id = sales_products.sale_id
    WHERE id = ?
    ORDER BY productId`, [saleId],
  );
  return result;
}

async function deleteSale(saleId) {
    const [result] = await connection.execute('DELETE FROM sales WHERE id = ?', [saleId]);
  return result;
}

async function update({ saleId, productId, quantity }) {
  const [response] = await connection.execute(
    `UPDATE sales_products SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`, [quantity, saleId, productId],
);
  return response;
}

module.exports = {
  newSale,
  insertSaleProducts,
  getSales,
  getSaleById,
  deleteSale,
  update,
};
