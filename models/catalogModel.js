// models/Catalog.js
const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  // other fields if needed
});

const Catalog = mongoose.model("Catalog", catalogSchema);

module.exports = Catalog;
