import axios from "axios";

const API = axios.create({
  baseURL: "https://notesweb-backend-9yi6.onrender.com/api",
});

// Attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;