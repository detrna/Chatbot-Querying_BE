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

app.get("/product", async (req, res) => {
  const payload = await product.findAll();
  response(res, true, 200, payload, "Products retrieved successfully");
});

app.get("/product/search", async (req, res) => {
  const prompt = "I'm looking for foods around 1 to 3 dollars";
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
    payload: products,
    generatedText: message,
  };

  response(res, true, 200, payload, message);
});

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
