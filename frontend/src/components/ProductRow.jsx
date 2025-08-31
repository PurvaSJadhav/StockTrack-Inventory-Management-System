import React from "react";
import { Link } from "react-router-dom";
import LowStockBadge from "./LowStockBadge";

const ProductRow = ({ product, onDelete }) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
      <td className="px-6 py-4">${product.price.toFixed(2)}</td>
      <td className="px-6 py-4">{product.stock}</td>
      <td className="px-6 py-4">{product.category}</td>
      <td className="px-6 py-4">{product.stock < 5 && <LowStockBadge />}</td>
      <td className="px-6 py-4 flex space-x-2">
        <Link
          to={`/edit-product/${product._id}`}
          className="font-medium text-blue-600 hover:underline"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(product._id)}
          className="font-medium text-red-600 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
