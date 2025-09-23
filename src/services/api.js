import axios from "axios";

const api = axios.create({
  baseURL: "https://hrisdev.theprime.id/", //https://hris.theprime.id,
  // withCredentials: true, 
  timeout: 15000,
});

// Interceptor untuk menambahkan token otomatis ke semua request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

// ini api js saya
// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://app.putratek.my.id/",  //https://hris.theprime.id
//   withCredentials: true, 
//   timeout: 15000,
//   // headers: {
//   //   "ngrok-skip-browser-warning": "true",
//   // },
// });

// export default api;

