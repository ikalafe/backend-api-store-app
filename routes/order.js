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

// Delete route for deleting a specific order by _id
orderRouter.delete("/api/orders/:id", async (req, res) => {
  try {
    // Extract the id from the request parameter
    const { id } = req.params;
    // Find and delete the order the data base using the extracted _id
    const deletedOrder = await Order.findByIdAndDelete(id);
    // Check if an order was found and deleted
    if (!deletedOrder) {
      // If no order was found with the provided _id return 404
      return res.state(404).json({ msg: "سفارش پیدا نشد" });
    } else {
      // If the order was successfully deleted, return 200 status with a success message
      return res.status(200).json({ msg: "سفارش با موفقیت حذف شد" });
    }
  } catch (e) {
    // If an error occures during the process, return a 500 status with the error message
    res.status(500).json({ error: e.message });
  }
});

// Get route for fetching orders by vendor ID
orderRouter.get("/api/orders/vendors/:vendorId", async (req, res) => {
  try {
    // Extract the vendorId from request parameters
    const { vendorId } = req.params;
    // Find all orders in the database that match th vendorId
    const orders = await Order.find({ vendorId });
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

orderRouter.patch("/api/orders/:id/delivered", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { delivered: true },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ msg: "سفارش یافت نشد!" });
    } else {
      return res.status(200).json(updatedOrder);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

orderRouter.patch("/api/orders/:id/processing", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { processing: false },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ msg: "سفارش یافت نشد!" });
    } else {
      return res.status(200).json(updatedOrder);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = orderRouter;
