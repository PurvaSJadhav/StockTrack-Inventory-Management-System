import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, recordSale } from "../api/api";

const RecordSale = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        setAllProducts(response.data);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const productToAdd = allProducts.find((p) => p._id === selectedProduct);
    if (!productToAdd) return;

    const existingCartItem = cart.find(
      (item) => item.productId === selectedProduct
    );
    if (existingCartItem) {
      setCart(
        cart.map((item) =>
          item.productId === selectedProduct
            ? { ...item, quantity: item.quantity + parseInt(quantity, 10) }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          productId: productToAdd._id,
          name: productToAdd.name,
          quantity: parseInt(quantity, 10),
          price: productToAdd.price,
        },
      ]);
    }

    setSelectedProduct("");
    setQuantity(1);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const handleRecordSale = async () => {
    setError("");
    setSuccess("");

    if (cart.length === 0) {
      setError("Please add at least one product to the sale.");
      return;
    }

    const saleData = {
      productsSold: cart.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
    };

    try {
      await recordSale(saleData);
      setSuccess("Sale recorded successfully! Redirecting...");
      setTimeout(() => navigate("/inventory"), 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to record sale.";
      setError(errorMessage);
    }
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Add Product to Sale</h2>
        <form onSubmit={handleAddToCart}>
                 {" "}
          <div className="mb-4">
                      <label className="block text-gray-700">Product</label>   
                 {" "}
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
                          <option value="">Select a product</option>           {" "}
              {allProducts.map((product) => (
                <option
                  key={product._id}
                  value={product._id}
                  disabled={product.stock === 0}
                >
                  {product.name} (In Stock: {product.stock})
                </option>
              ))}
                       {" "}
            </select>
                   {" "}
          </div>
                 {" "}
          <div className="mb-4">
                      <label className="block text-gray-700">Quantity</label>
                     {" "}
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border rounded"
              required
              min="1"
            />
                   {" "}
          </div>
                 {" "}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
                      Add to Cart        {" "}
          </button>
        </form>
      </div>
      {/* Right side: Cart and finalization */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Current Sale</h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {success}
          </div>
        )}

        <div className="mb-4 space-y-2">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.productId)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <button
            onClick={handleRecordSale}
            className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={cart.length === 0}
          >
                      Record Sale        {" "}
          </button>
        </div>
      </div>
         {" "}
    </div>
  );
};

export default RecordSale;
