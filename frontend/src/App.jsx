import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import RecordSale from "./pages/RecordSale";
import SalesReport from "./pages/SalesReport";
import PrivacyPolicy from "./pages/Privacy";
import TermsOfService from "./pages/Terms";

const AppLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow container mx-auto p-4">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/inventory" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<AddProduct />} />
          <Route path="/record-sale" element={<RecordSale />} />
          <Route path="/sales-report" element={<SalesReport />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
