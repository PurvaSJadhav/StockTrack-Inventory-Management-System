const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Sale = require("../models/Sale");
const router = express.Router();

/**
 * @route   POST /
 * @desc    Record a new sale and update product stock atomically
 * @access  Private
 *
 * @body
 * {
 * "productsSold": [
 * { "productId": "...", "quantity": 2 },
 * { "productId": "...", "quantity": 1 }
 * ],
 * "totalAmount": 150.00
 * }
 */

router.post("/", async (req, res) => {
  const { productsSold } = req.body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    let calculatedTotal = 0;
    const saleProductDetails = [];

    for (const item of productsSold) {
      const product = await Product.findById(item.productId).session(session);

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }
      if (product.stock < item.quantity) {
        throw new Error(
          `Insufficient stock for ${product.name}. Available: ${product.stock}, Required: ${item.quantity}.`
        );
      }

      product.stock -= item.quantity;
      await product.save({ session });

      calculatedTotal += product.price * item.quantity;

      saleProductDetails.push({
        productId: item.productId,
        quantity: item.quantity,
        priceAtSale: product.price,
      });
    }
    const newSale = new Sale({
      productsSold: saleProductDetails,
      totalAmount: calculatedTotal,
    });
    await newSale.save({ session });
    await session.commitTransaction();
    res.status(201).json({
      message: "Sale recorded and stock updated successfully!",
      sale: newSale,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
});

/**
 * @route   GET /report
 * @desc    Get a sales report with total revenue, sales count, and best sellers
 * @access  Private
 */

router.get("/report", async (req, res) => {
  try {
    const revenueResult = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
    const totalSalesCount = await Sale.countDocuments();
    const bestSellers = await Sale.aggregate([
      { $unwind: "$productsSold" },
      {
        $group: {
          _id: "$productsSold.productId",
          totalQuantitySold: { $sum: "$productsSold.quantity" },
        },
      },
      { $sort: { totalQuantitySold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
    ]);

    res.status(200).json({
      totalRevenue,
      totalSalesCount,
      bestSellers,
    });
  } catch (err) {
    console.error("Error generating sales report:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
