<script setup lang="ts">
import { ref ,reactive} from "vue";
import { Task } from "../models/Task";
import todoService from "../services/TodoService";
import tra from "../services/trantisonService";
import TaskAdd from "../components/TaskAdd.vue";
import TaskList from "../components/TaskList.vue";
import TaskTest from "../components/TaskTest.vue";
import Head from "../components/Header.vue";
import Edit from "../components/ModalEdit.vue";
import Delete from "../components/ModalDelete.vue";
import { isTemplateNode } from "@vue/compiler-core";

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

const open = ref(true);
// taskをすべて取得する。
todoService.getAllTasks();
// ユーザーをすべて取得する。
todoService.getUsers();
</script>

<template>
   <!-- <div class="container-fluid px-4 McShadow">
      <h1 class="mt-4">Todo List</h1>
  <div class="row">
    <div class="col-xl-6 col-md-6">
      <TaskAdd @add="(newTaskTitle) => addTask(newTaskTitle)"></TaskAdd>
      <TaskTest :tasks="tasks" @delete="(id) => deleteTask(id)" @done="(id) => doneTask(id)"></TaskTest>
     </div>
  </div>
</div> -->
  <div class="container-fluid p-1 m-1 ">
           <Delete
            :open="open"
            :TodoList="todoService.todoItmes"
            ></Delete>
            <TaskList 
            :open="open" 
            :UserList="todoService.users"
            :TodoList="todoService.todoItmes" 
              @delete2="(id) => todoService.deleteTask(id)" 
              @delete="(id) => todoService.postDelete(id)" 
              @edit="(id,item) => todoService.postEdit(id)" 
              @complete="(id,item) => todoService.postComplete(id,item) " 
              @incomplete="(id,item) => todoService.postInComplete(id,item)"></TaskList>
            <!--  <Head :open="open"  ></Head> -->
   </div> 
</template>

<style >
</style>
