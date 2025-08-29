import axios from "axios";

const api = axios.create({
  baseURL: "https://app.putratek.my.id/",
  timeout: 60000,
  // headers: {
  //   "ngrok-skip-browser-warning": "true",
  // },
});

export default api;
