<script setup lang="ts">
import { ref } from "vue";
import todoService from "../services/TodoService";
import tra from "../services/trantisonService";
import TaskList from "../components/TaskList.vue";
import Head from "../components/Header.vue";
import Edit from "../components/ModalEdit.vue";
import Delete from "../components/ModalDelete.vue";
import { isTemplateNode } from "@vue/compiler-core";

const open = ref(true);
// taskをすべて取得する。
todoService.getAllTasks();
</script>

<template>
      <Delete
      :open="open"
      :TodoList="todoService.todoItmes"
      ></Delete>
      <Edit 
      :open="open"
      :TodoList="todoService.todoItmes"  
            ></Edit>
      <TaskList 
      :open="open" 
      :TodoList="todoService.todoItmes" 
      @delete="(id) => todoService.deleteTask(id)" 
      @complete="(id,item) => todoService.postComplete(id,item) " 
      @incomplete="(id,item) => todoService.postInComplete(id,item)"></TaskList>
      <Head :open="open"  ></Head>
</template>

<style >
</style>
