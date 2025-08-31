import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { fetchLowStockProducts } from "../api/api";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const [lowStockCount, setLowStockCount] = useState(0);
  const location = useLocation();

  const linkStyles =
    "text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium relative";
  const activeLinkStyles =
    "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium relative";

  useEffect(() => {
    if (token) {
      const getLowStock = async () => {
        try {
          const res = await fetchLowStockProducts();
          setLowStockCount(res.data.length || 0);
        } catch (error) {
          console.error("Failed to fetch low stock alerts", error);
        }
      };
      getLowStock();
    }
  }, [token, location]);

  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
           {" "}
      <div className="container mx-auto px-4">
               {" "}
        <div className="flex items-center justify-between h-16">
                   {" "}
          <div className="flex items-center">
                       {" "}
            <Link to="/" className="text-white font-bold text-xl">
              StockTrack
            </Link>
                     {" "}
          </div>
                   {" "}
          <div className="flex items-center space-x-4">
                       {" "}
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                isActive ? activeLinkStyles : linkStyles
              }
            >
              Inventory
              {lowStockCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {lowStockCount}
                </span>
              )}
            </NavLink>
                       {" "}
            <NavLink
              to="/record-sale"
              className={({ isActive }) =>
                isActive ? activeLinkStyles : linkStyles
              }
            >
              Record Sale
            </NavLink>
                       {" "}
            <NavLink
              to="/sales-report"
              className={({ isActive }) =>
                isActive ? activeLinkStyles : linkStyles
              }
            >
              Sales Report
            </NavLink>
                                   {" "}
            {token ? (
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                                Logout              {" "}
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                                Login              {" "}
              </Link>
            )}
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </nav>
  );
};

export default Navbar;