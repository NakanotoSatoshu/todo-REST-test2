<script setup lang="ts">
import { ref ,reactive} from "vue";
import TaskList from "../components/TodoList.vue";
import todoService from "../services/TodoService";
//import { Task } from "../models/Task";
//import tra from "../services/TrantisonService";
//import TaskAdd from "../components/TaskAdd.vue";
//import Entry from "../components/Entry.vue";
//import TaskTest from "../components/TaskTest.vue";
//import Head from "../components/Header.vue";
//import Edit from "../components/ModalEdit.vue";
//import Delete from "../components/ModalDelete.vue";
import { isTemplateNode } from "@vue/compiler-core";
import { storeToRefs } from 'pinia';
import { useStoredAllTodos ,useStoreSearchTodo} from '../store/StoredTodoList';

//2023/03/27サービスロジックに普通のやつをまずストアして、検索は別のメソッドを用意したが無理だった。
const {TodoList}  = storeToRefs(useStoredAllTodos());
const {Search_TodoList ,search }  = storeToRefs(useStoreSearchTodo());
useStoredAllTodos();
console.log('@TodoListMain' + search.value);
//テスト----------------DevOps-----------------------------------------------------------------------------------------------------
//const props = defineProps<{ EntryOpen: boolean }>();

// const tasks: Task[] = reactive([
//   {id: 1,title: "起きる", done: false,},
//   { id: 2, title: "着替える",done: false,},]);
// // taskを検索し、フラグを更新する。
// const addTask = (newTaskTitle: string) => {
//   let newTask: Task = {id: Date.now(), title: newTaskTitle, done: false, }; tasks.push(newTask);};
// // taskを検索し、フラグを更新する。
// const doneTask = (id: number) => {let task = tasks.find((t) => t.id === id);if (task !== undefined) {
//  task.done = !task.done; }};
// // taskを削除する。
// const deleteTask = (id: number) => {tasks.forEach((task, index) => { if (task.id == id) tasks.splice(index, 1); });};
//const childRef = ref(Entry);
//const EntryOpen = ref(false);
//const childEntryToggle = () => {childRef.value.EntryToggle()}
//const open = ref(true);
//テスト----------------DevOps-----------------------------------------------------------------------------------------------------


// taskをすべて取得する。
//todoService.getAllTasks();
// ユーザーをすべて取得する。
const more = () => {todoService.getAllUsers();  console.log('MainApp'); }
more();
</script>

<template>
  <!-- MainApp -------------------------->
  <div class="container-fluid p-1 m-1 ">
  <!--#############TodoList部 #####################--------------->
    <TaskList 
               :UserList="todoService.users"
               :TodoList="todoService.todoItmes" 
                     @entry="(formData) => todoService.postEntry(formData)"
                     @delete="(id) => todoService.postDelete(id)" 
                     @edit="(id,formData) => todoService.postEdit(id,formData)" 
                     @complete="(id,item) => todoService.postComplete(id,item) " 
                     @incomplete="(id,item) => todoService.postInComplete(id,item)"
    >
    </TaskList>
   </div> 

</template>

<style >
</style>
