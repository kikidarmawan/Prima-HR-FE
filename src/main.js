import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Alpine from "alpinejs";

window.Alpine = Alpine
Alpine.start()

createApp(App).use(router).use(store).mount("#app");
