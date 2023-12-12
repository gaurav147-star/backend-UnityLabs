// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  // other fields if needed
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
