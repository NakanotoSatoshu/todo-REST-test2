<script setup lang="ts">
import { provide} from "vue";
import AppNavi, { type MenuItem } from "./components/GlobalNavi.vue";
import Footer from "./components/Footer.vue";
import { useStoredAllTodos } from './store/StoredTodoList';
//import todoService from "./services/TodoService";
//import { useStoreCounter } from './store/counter';
//import { useTodo } from './store/StoredTodoList';
import todoService from "./services/TodoService";

useStoredAllTodos();
console.log('First App lunch the useStore');
// const todoStore = useTodo();
// provide('todoProvide', todoStore);
//const EntryOpen = ref(false);
// メニューを設定する。
const menuItems: MenuItem[] = [
  {
    type: "heading",
    title: "Main",
  },
  {
    type: "menu",
    title: "ToDo",
    icon: "fa-text",
    url: "/todo",
  },
  {
    type: "menu",
    title: "Game",
    icon: "fa-list",
    url: "/game",
  },
];
</script>

<template>
  <!--＃＃＃＃＃＃＃ナビバー 表示＃＃＃＃＃現在＃＃＃＃＃＃＃＃＃＃＃＃＃ -->
  <AppNavi  title="Todo" :menu-items="menuItems" 
  :UserList="todoService.users"></AppNavi>  
  <Footer></Footer>
</template>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
