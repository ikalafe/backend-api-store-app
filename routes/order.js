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

// Get route for fetching orders by buyer ID
orderRouter.get("/api/orders/:buyerId", async (req, res) => {
  try {
    // Extract the buyerId from request parameters
    const { buyerId } = req.params;
    // Find all orders in the database that match th buyerId
    const orders = await Order.find({ buyerId });
    // If no orders are found, return a 404 status with a message
    if (orders.length == 0) {
      return res.status(404).json({ msg: "No Orders Found For This Buyer" });
    }
    // If orders are found, return them with a 200 status code
    return res.status(200).json(orders);
  } catch (e) {
    // Handle any errors that occure during the order retrieval process
    res.status(500).json({ error: e.message });
  }
});

module.exports = orderRouter;
