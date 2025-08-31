const mongoose = require("mongoose");
const Sale = require("../models/Sale");
const Product = require("../models/Product");

/**
 * @desc    Records a new sale and updates product stock atomically.
 * @route   POST /api/sales
 * @access  Private (assumed)
 *
 * @body
 * {
 * "productsSold": [
 * { "productId": "your_product_id_1", "quantity": 2 },
 * { "productId": "your_product_id_2", "quantity": 1 }
 * ]
 * }
 */

exports.recordSale = async (req, res) => {
  const { productsSold } = req.body;

  if (!productsSold || productsSold.length === 0) {
    return res
      .status(400)
      .json({ error: "Sale must include at least one product." });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    let calculatedTotalAmount = 0;
    const saleProductDetails = [];

    for (const item of productsSold) {
      const { productId, quantity } = item;
      const product = await Product.findById(productId).session(session);

      if (!product) {
        throw new Error(`Product with ID ${productId} not found.`);
      }

      if (product.stock < quantity) {
        throw new Error(
          `Insufficient stock for ${product.name}. Available: ${product.stock}, Required: ${quantity}.`
        );
      }

      product.stock -= quantity;
      await product.save({ session });
      calculatedTotalAmount += product.price * quantity;

      saleProductDetails.push({
        productId: product._id,
        quantity: quantity,
        priceAtSale: product.price,
      });
    }

    const newSale = new Sale({
      productsSold: saleProductDetails,
      totalAmount: calculatedTotalAmount,
    });

    await newSale.save({ session });
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "✅ Sale recorded and stock updated successfully!",
      data: newSale,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Transaction Error:", error.message);
    res.status(400).json({
      success: false,
      error: error.message || "Failed to record sale. Transaction aborted.",
    });
  } finally {
    session.endSession();
  }
};
