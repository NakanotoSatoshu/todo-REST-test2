<script setup lang="ts">
import { ref } from "vue";
import todoService from "../services/TodoService";
import tra from "../services/trantisonService";
import TaskList from "../components/TaskList.vue";
import Head from "../components/Header.vue";

const open = ref(true);
// taskをすべて取得する。
todoService.getAllTasks();
</script>

<template>
      <TaskList 
      :open="open" 
      :TodoList="todoService.todoItmes" 
      @delete="(id) => todoService.deleteTask(id)" 
      @complete="(id) => todoService.postComplete(id) " 
      @incomplete="(id) => todoService.postInComplete(id)"></TaskList>
      <Head :open="open"  ></Head>
</template>

<style >
</style>
