import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../api/api";
import ProductRow from "../components/ProductRow";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const loadProducts = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (categoryFilter) params.append("category", categoryFilter);

      const response = await fetchProducts(params.toString());
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, [searchTerm, categoryFilter]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      products.map((p) => p.category).filter(Boolean)
    );
    return [...uniqueCategories];
  }, [products]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
           {" "}
      <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Inventory</h1>       {" "}
        <Link
          to="/add-product"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
                    Add Product        {" "}
        </Link>
             {" "}
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full md:w-1/3 p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
           {" "}
      <div className="overflow-x-auto">
               {" "}
        <table className="w-full text-sm text-left text-gray-500">
                   {" "}
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                       {" "}
            <tr>
                           {" "}
              <th scope="col" className="px-6 py-3">
                Name
              </th>
                           {" "}
              <th scope="col" className="px-6 py-3">
                Price
              </th>
                           {" "}
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
                           {" "}
              <th scope="col" className="px-6 py-3">
                Category
              </th>
                           {" "}
              <th scope="col" className="px-6 py-3">
                Status
              </th>
                           {" "}
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
                         {" "}
            </tr>
                     {" "}
          </thead>
                   {" "}
          <tbody>
                       {" "}
            {products.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
                onDelete={handleDelete}
              />
            ))}
                     {" "}
          </tbody>
                 {" "}
        </table>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default ProductList;
