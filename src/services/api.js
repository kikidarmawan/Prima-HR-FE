import axios from "axios";

const api = axios.create({
  baseURL: "https://app.putratek.my.id/",
  withCredentials: true, 
  timeout: 15000,
  // headers: {
  //   "ngrok-skip-browser-warning": "true",
  // },
});

export default api;
