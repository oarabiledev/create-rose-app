// Main App File
import { HashRouter } from "roseview";
import { createApp } from "roseview";

import homePage from "./pages/main.js";
import aboutPage from "./pages/about.js";

const routes = [
    { path: "index", component: homePage },
    { path: "about", component: aboutPage },
];
const router = HashRouter(routes);

window.app = createApp(main).use(router).mount("#app");
