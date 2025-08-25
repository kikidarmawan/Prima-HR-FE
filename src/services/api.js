import axios from "axios";

const api = axios.create({
  baseURL: "https://sunbeam-proper-pipefish.ngrok-free.app",
  timeout: 20000,
  withCredentials: true, 
  timeout: 15000,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;
