<script setup lang="ts">
import todoService from "../services/TodoService";
import TaskList from "../components/TaskList.vue";

// taskをすべて取得する。
todoService.getAllTasks();
</script>

<template>
      <TaskList :TodoList="todoService.todoItmes" ></TaskList>
</template>

<style >
</style>
