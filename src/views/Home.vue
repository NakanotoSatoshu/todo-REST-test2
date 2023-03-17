<script setup lang="ts">
import { reactive ,ref,computed,toRef, onMounted} from 'vue';
import axios from "axios";
//import dayjs from 'dayjs';
//import ja from 'dayjs/locale/ja';
//import tra from '../services/TrantisonService';
//import todoService from "../services/TodoService";
//import type {TodoItems} from "../models/TodoItems";
//import type {UsersModel} from "../models/TodoItems";
//import SMenu from '../components/SlideMenu.vue';
import type{ Task } from "../models/Task";
import type{ user } from "../store/TodoList";
import TestHome from '../components/TestHome.vue';
//import Game from '../components/Game.vue';
import { useStoreCounter } from '../store/counter';
//import HelloPinia from '../components/HelloPinia.vue';
import { storeToRefs } from 'pinia';
import ProductList from '../components/ProductList.vue';
import ShoppingCart from '../components/ShoppingCart.vue';

const counter = useStoreCounter();
const { count, doubleCount } = storeToRefs(counter);
const { increment } = counter;


//const open = ref(true);
//const UserList : UsersModel[] = reactive([]);
const tasks: Task[] = reactive([
  { id: 1,title: "起きる",done: false, },
  { id: 2,title: "着替える",done: false,},]);
// taskを検索し、フラグを更新する。
const addTask = (newTaskTitle: string) => {
  let newTask: Task = {
    id: Date.now(),
    title: newTaskTitle,
    done: false,
  };
  tasks.push(newTask);
};
// taskを検索し、フラグを更新する。
const doneTask = (id: number) => {
  let task = tasks.find((t) => t.id === id);
  if (task !== undefined) {
    task.done = !task.done;
  }
};
// taskを削除する。
const deleteTask = (id: number) => {
  tasks.forEach((task, index) => {
    if (task.id == id) tasks.splice(index, 1);
  });
};
// taskをすべて取得する。
//todoService.getAllTasks();
//todoService.getAllUsers();
//const UserList : UsersModel[] = todoService.users;
console.log('USA!USA!');

//const user = reactive([]);

//インクリメンタルサーチ成功例
const getAX = ()=>{
axios.get('https://jsonplaceholder.typicode.com/users')
          .then(response => users = response.data);};
var search= ref('');
var users = reactive([]);
const taskss: Task[] = reactive([
  {id: 1,title: "起きる", done: false,},
  { id: 2, title: "着替える",done: false,},]);
console.log(users);
var search_users = computed ( () => {
  let searchWord = search.value.trim()
    if (searchWord === '') return users; 
   return taskss.filter(Task  => {return Task.title.includes(search.value) 
 })});

onMounted(() => {
  getAX();
});
</script>

<template>
   <div class="container-fluid px-4 McShadow">
      <h1 class="mt-4">TestHome</h1>
      <div class="mt-1 flex justify-center">   
        {{ search }}
        <div>検索：<input type="text" v-model="search"></div>
       
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="user in search_users" :key="user.id">
            <td>{{ user.title }}</td>
            <td>{{ user.id }}</td>
        </tr>
    </tbody>
</table>
 <!--        <h1>Pinia入門</h1>
        <p>Count:{{ count }}</p>
         <p>DoubleCount:{{ doubleCount }}</p>
         <div>
                  <button @click="increment">Up</button>
           </div>
  <HelloPinia /> -->
  <h1>Pinia入門（カート)</h1>
    <hr />
    <h2>商品一覧</h2>
    <ProductList />
    <hr />
    <ShoppingCart />
    <!--   <TaskAdd @add="(newTaskTitle: string) => addTask(newTaskTitle)"></TaskAdd>
      <TaskTest :tasks="tasks" @delete="(id: number) => deleteTask(id)" @done="(id: number) => doneTask(id)"></TaskTest>  -->
      <!--  <TestHome :UserList="todoService.users" ></TestHome>  --> 
      </div>
     </div>
</template>

<style>

</style>