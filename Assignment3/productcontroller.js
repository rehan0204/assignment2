const Product = require("../models/product");

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Products - Filter, Sort, Pagination
exports.getProducts = async (req, res) => {
  try {
    const { category, sort, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .sort(sort ? { price: sort === "desc" ? -1 : 1 } : {})
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Low Stock Report
exports.lowStock = async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $lte: 5 } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Category-wise Summary
exports.categorySummary = async (req, res) => {
  try {
    const summary = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalQuantity: { $sum: "$quantity" },
          totalProducts: { $sum: 1 }
        }
      }
    ]);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};