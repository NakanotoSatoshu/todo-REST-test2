import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import TodoList from "../views/MainApp.vue";
import Game from "../components/Game.vue";
import ModalE from "../components/ModalEdit.vue";
import Entry from "../components/Entry.vue";
import NotFound from "../components/NotFound.vue";


const routers: Array<RouteRecordRaw> = [
  {path: "/home",component: Home,},
 // {path: "/:todo",components: {default:TodoList,Entry: Entry},props:true },
  {path: "/todo", component: TodoList,},
 // {path: "/entry",component: Entry,
 // props: {EntryOpen: true,},
 //},
  {
    path: "/edit",
    component: ModalE,
  },
  {
    path: "/game",
    component: Game,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

export default router;