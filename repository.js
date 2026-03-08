import pool from "./pool.js";

const product = {
  findAll: async () => {
    const [rows] = await pool.execute("SELECT * FROM products");
    return rows;
  },
};

export default product;
