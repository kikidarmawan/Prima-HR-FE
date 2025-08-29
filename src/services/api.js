import axios from "axios";

const api = axios.create({
  baseURL: "https://sterling-gst-strengths-almost.trycloudflare.com/",
  timeout: 60000,
  // headers: {
  //   "ngrok-skip-browser-warning": "true",
  // },
});

export default api;
