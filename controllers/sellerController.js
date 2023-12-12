// controllers/sellerController.js
const Catalog = require("../models/catalogModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const createCatalog = async (req, res) => {
  try {
    const { seller_id, products } = req.body;

    // Logic to create a catalog for a specific seller
    const existingCatalog = await Catalog.findOne({ seller: seller_id });
    if (!existingCatalog) {
      // If the catalog doesn't exist, create a new one
      const productIds = await Product.insertMany(products);
      const newCatalog = new Catalog({
        seller: seller_id,
        products: productIds.map((product) => product._id),
      });
      await newCatalog.save();
      return res.status(201).json({ message: "Catalog created successfully" });
    }

    // If the catalog exists, add new products to it
    const newProducts = await Product.insertMany(products);
    existingCatalog.products.push(...newProducts.map((product) => product._id));
    await existingCatalog.save();

    res.status(200).json({ message: "Products added to existing catalog" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const { seller_id } = req.query;

    // Logic to fetch orders received by a specific seller
    const orders = await Order.find({ seller: seller_id }).populate("products");
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createCatalog, getOrders };
