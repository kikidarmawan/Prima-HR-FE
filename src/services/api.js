import axios from "axios";

const api = axios.create({
  baseURL: "https://sv-varied-means-vacuum.trycloudflare.com/",
  timeout: 60000,
  // headers: {
  //   "ngrok-skip-browser-warning": "true",
  // },
});

export default api;
