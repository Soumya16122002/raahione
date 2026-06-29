import axios from "axios";

const api = axios.create({
  baseURL: "https://raahione-backend-production-321b.up.railway.app",
});

export default api;