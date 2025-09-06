import axios from "axios";

const api = axios.create({
  baseURL: "https://app.putratek.my.id/",  //https://hris.theprime.id
  withCredentials: true, 
  timeout: 15000,
  // headers: {
  //   "ngrok-skip-browser-warning": "true",
  // },
});

export default api;
