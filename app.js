import express from "express";
import "dotenv/config";
import response from "./response.js";
import product from "./repository.js";
import gemini from "./gemini.js";
import pool from "./pool.js";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/products", async (req, res) => {
  const payload = await product.findAll();
  response(res, true, 200, payload, "Products retrieved successfully");
});

app.get("/products/search", async (req, res) => {
  const { prompt } = req.body;
  const AIresponse = await gemini(prompt);
  const { sql = null, message } = AIresponse;

  let products = null;
  if (sql) {
    const [rows] = await pool.execute(sql);
    products = rows;
  } else {
    const [rows] = await product.findAll();
    products = rows;
  }

  const payload = {
    data: products,
    generatedText: message,
  };

  response(res, true, 200, payload, "Product filterred successfully");
});

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
