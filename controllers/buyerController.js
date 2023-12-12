// controllers/buyerController.js
const Catalog = require("../models/catalogModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

const getListOfSellers = async (req, res) => {
  try {
    // Logic to fetch a list of all sellers
    const sellers = await Catalog.find().populate("seller", "username"); // Assuming 'seller' field is a reference to User model
    res.status(200).json(sellers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSellerCatalog = async (req, res) => {
  try {
    const { seller_id } = req.params;

    // Logic to fetch the catalog of a specific seller
    const catalog = await Catalog.findOne({ seller: seller_id }).populate(
      "products"
    );
    if (!catalog) {
      return res
        .status(404)
        .json({ message: "Catalog not found for this seller" });
    }

    res.status(200).json(catalog.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { seller_id } = req.params;
    const { items } = req.body;

    // Find the seller's catalog to verify and retrieve products
    const sellerCatalog = await Catalog.findOne({ seller: seller_id });

    if (!sellerCatalog) {
      return res
        .status(404)
        .json({ message: "Catalog not found for this seller" });
    }

    // Collect product IDs for the order
    const orderProducts = [];

    for (const item of items) {
      // Search for the product in the catalog by name
      const product = await Product.findOne({ name: item.name });

      if (product && sellerCatalog.products.includes(product._id)) {
        orderProducts.push(product._id);
      } else {
        return res.status(400).json({
          message: `Product '${item.name}' not found in the seller's catalog`,
        });
      }
    }

    // Create the order
    const newOrder = new Order({
      seller: seller_id,
      products: orderProducts,
      // You can add other details to the order as needed
    });

    // Save the order to the database
    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { getListOfSellers, getSellerCatalog, createOrder };
