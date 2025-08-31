import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});

export const fetchProducts = (query = "") => API.get(`/products?${query}`);

export const fetchProductById = (id) => API.get(`/products/${id}`);

export const fetchLowStockProducts = () =>
  API.get("/products/alerts/low-stock");

export const addProduct = (newProduct) => API.post("/products", newProduct);

export const updateProduct = (id, updatedProduct) =>
  API.put(`/products/${id}`, updatedProduct);

export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const recordSale = (saleData) => API.post("/sales", saleData);

export const getSalesReport = () => API.get("/sales/report");

export const register = (userData) => API.post("/auth/register", userData);

export const login = (credentials) => API.post("/auth/login", credentials);
