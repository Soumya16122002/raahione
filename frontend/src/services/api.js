import axios from "axios";

const api = axios.create({
  baseURL: "raahione-backend-production-321b.up.railway.app",
});

export default api;