/**
 * Main entry point for the Vue.js application.
 */

// Vue
import { createApp } from "vue";

// Pinia
import { createPinia } from "pinia";

// Animation
// import { MotionPlugin } from "@vueuse/motion";

// Vue Final Modal
import { createVfm } from "vue-final-modal";

// App
import App from "./App.vue";

// Router
import router from "./router";

// Styles
import "./style.css";

// Modal styles
import "vue-final-modal/style.css";


// BaseData
window.BaseData = {};


const vfm = createVfm();

const pinia = createPinia();

const app = createApp(App);

app.use(vfm);
app.use(router);
app.use(pinia);
// app.use(MotionPlugin);
app.mount("#app");
