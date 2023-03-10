<script setup lang="ts">
import { reactive, ref,computed,PropType } from 'vue';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import tra from '../services/TrantisonService';
import todoService from "../services/TodoService";
import type {TodoItems} from "../models/TodoItems";
import type {UsersModel} from "../models/TodoItems";
import SMenu from '../components/SlideMenu.vue';
import type{ Task } from "../models/Task";
import TestHome from '../components/TestHome.vue';
import Game from '../components/Game.vue';

const open = ref(true);
//const UserList : UsersModel[] = reactive([]);
const tasks: Task[] = reactive([
  {
    id: 1,
    title: "起きる",
    done: false,
  },
  {
    id: 2,
    title: "着替える",
    done: false,
  },]);

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
</script>

<template>
   <div class="container-fluid px-4 McShadow">
      <h1 class="mt-4">User List</h1>
      <div class="mt-1 flex justify-center">
    <!--   <TaskAdd @add="(newTaskTitle: string) => addTask(newTaskTitle)"></TaskAdd>
      <TaskTest :tasks="tasks" @delete="(id: number) => deleteTask(id)" @done="(id: number) => doneTask(id)"></TaskTest>  -->
       <TestHome :UserList="todoService.users" ></TestHome>  
      </div>
     </div>
</template>