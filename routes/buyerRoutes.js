// routes/buyer.js
const express = require("express");
const router = express.Router();
const {
  getListOfSellers,
  getSellerCatalog,
  createOrder,
} = require("../controllers/buyerController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/list-of-sellers", authMiddleware, getListOfSellers);
router.get("/seller-catalog/:seller_id", authMiddleware, getSellerCatalog);
router.post("/create-order/:seller_id", authMiddleware, createOrder);

module.exports = router;
