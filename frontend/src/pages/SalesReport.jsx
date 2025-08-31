import React, { useState, useEffect } from "react";
import { getSalesReport } from "../api/api";

const SalesReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const response = await getSalesReport();
        setReport(response.data);
      } catch (error) {
        console.error("Failed to fetch sales report:", error);
      } finally {
        setLoading(false);
      }
    };
    loadReport();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading report...</div>;
  }

  if (!report) {
    return <div className="text-center p-10">Could not load sales report.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Sales Report</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-800">Total Revenue</h2>
          <p className="text-3xl font-bold text-blue-900">
            ${report.totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-green-800">Total Sales</h2>
          <p className="text-3xl font-bold text-green-900">
            {report.totalSalesCount}
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Best-Selling Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Units Sold
                </th>
              </tr>
            </thead>
            <tbody>
              {report.bestSellers.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.productDetails.name}
                  </td>
                  <td className="px-6 py-4">{item.totalQuantitySold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
