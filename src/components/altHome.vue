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
import ModalE from '../components/ModalEdit.vue';

const props = defineProps<{ UserList: UsersModel[]  }>();
console.log(props.UserList + 'うおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおお');
const open = ref(true);
//const UserList = ref(props.UserList);

</script>

<template>  

   <ul>
    <li v-for="(user) in UserList" :key="user.id">
    {{ user.username }}
    </li>
  </ul>

 
   <!--  <select v-model="UserList">
      <option v-for="(user) in UserList" :key="user.id">
        {{ user.username }}
      </option>
    </select>  -->

</template>