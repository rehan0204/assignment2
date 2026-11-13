const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  lowStock,
  categorySummary
} = require("../controllers/productcontroller");

// Add Product
router.post("/", addProduct);

// Low Stock Report
router.get("/low-stock", lowStock);

// Category Summary
router.get("/summary", categorySummary);

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProduct);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

module.exports = router;