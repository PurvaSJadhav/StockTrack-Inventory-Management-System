import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addProduct, fetchProductById, updateProduct } from "../api/api";

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing) {
      const loadProduct = async () => {
        try {
          const response = await fetchProductById(id);
          setFormData(response.data);
        } catch (err) {
          console.error("Failed to fetch product:", err);
          setError("Could not load product data.");
        }
      };
      loadProduct();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || formData.price <= 0 || formData.stock < 0) {
      setError("Please fill in all required fields with valid values.");
      return;
    }

    try {
      if (isEditing) {
        await updateProduct(id, formData);
      } else {
        await addProduct(formData);
      }
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "An unexpected error occurred.";
      setError(errorMessage);
      console.error("Failed to save product:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Product" : "Add New Product"}
      </h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            min="0.01"
            step="0.01"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            min="0"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
