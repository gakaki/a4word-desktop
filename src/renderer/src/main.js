import { createApp } from "vue";
import App from "./App.vue";
import "./assets/iconfont/iconfont.css";

import RecycleScroller from "vue-virtual-scroller";
import router from "./router";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css"; // 引入 CSS 文件

createApp(App).use(RecycleScroller).use(router).mount("#app");
router.push("/");
