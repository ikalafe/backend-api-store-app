const express = require("express");
const orderRouter = express.Router();
const Order = require("../models/order");

// Post route for creating orders
orderRouter.post("/api/orders", async (req, res) => {
  try {
    const {
      fullName,
      email,
      state,
      city,
      locality,
      productName,
      productPrice,
      quantity,
      category,
      image,
      buyerId,
      vendorId
    } = req.body;
    const createdAt = new Date().getMilliseconds(); // Get the current date
    // Create new order instance with the extracted field
    const order = new Order({
      fullName,
      email,
      state,
      city,
      locality,
      productName,
      productPrice,
      quantity,
      category,
      image,
      buyerId,
      vendorId,
      createdAt
    });
    await order.save();
    return res.status(201).json();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = orderRouter;