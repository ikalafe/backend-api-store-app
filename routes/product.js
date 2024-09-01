const express = require("express");
const Product = require("../models/product");
const productRouter = express.Router();

productRouter.post("/api/add-product", async (req, res) => {
  try {
    const {
      productName,
      productPrice,
      quantity,
      description,
      category,
      subCategory,
      images
    } = req.body;
    const product = new Product({
      productName,
      productPrice,
      quantity,
      description,
      category,
      subCategory,
      images
    });
    await product.save();
    return res.status(201).send(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

productRouter.get("/api/popular-product", async (req, res) => {
  try {
    const product = await Product.find({ popular: true });
    if (!product || product.length == 0) {
      return res.status(400).json({ msg: "Products Not Found" });
    } else {
      return res.status(200).json({ product });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = productRouter;
