const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const errorMiddleware = require("./middleware/errorMiddleware.js");
const app = express();

app.use(express.json());

// Product Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Inventory Management API is running!");
});

app.use(errorMiddleware);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => console.log(err));