// routes/seller.js
const express = require("express");
const router = express.Router();
const { createCatalog, getOrders } = require("../controllers/sellerController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create-catalog", authMiddleware, createCatalog);
router.get("/orders", authMiddleware, getOrders);

module.exports = router;
