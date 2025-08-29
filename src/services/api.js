import axios from "axios";

const api = axios.create({
  baseURL: "https://sterling-gst-strengths-almost.trycloudflare.com/",
  timeout: 60000,
  baseURL: "http://192.168.0.155:8000/",
  timeout: 20000,
  withCredentials: true, 
  timeout: 15000,
  // headers: {
  //   "ngrok-skip-browser-warning": "true",
  // },
});

export default api;
