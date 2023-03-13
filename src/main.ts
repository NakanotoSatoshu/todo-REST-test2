import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { dom } from "@fortawesome/fontawesome-svg-core";

// Bootstrap 5 + SB Admin
import "startbootstrap-sb-admin/src/scss/styles.scss";
import "./assets/nice.scss";
import "./assets/Chaos.css";
import 'animate.css';
import './style.css';

// dayjsのインポート
import dayjs from 'dayjs'
// ロケールのインポート
import 'dayjs/locale/ja'
// ロケール設定
dayjs.locale('ja')



// アイコンをライブラリに追加して、DOM経由(class)で参照できるようにする。
library.add(fas);
dom.watch();

// componentを追加
createApp(App).use(router).use(createPinia()).component("font-awesome-icon", FontAwesomeIcon).mount("#main");