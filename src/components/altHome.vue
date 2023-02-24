<script setup lang="ts">
import { reactive, ref,computed,PropType } from 'vue';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import tra from '../services/TrantisonService';
import todoService from "../services/TodoService";
import type {TodoItems} from "../models/TodoItems";
import type {UsersModel} from "../models/TodoItems";
import type{ Task } from "../models/Task";
//import { shuffle as _shuffle } from 'lodash-es'

const props = defineProps<{ UserList: UsersModel[]  }>();
//console.log(props.UserList + 'うおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおお');
//const UserList = ref(props.UserList);

</script>

<template>  

<TransitionGroup name="list" tag="ul">
    <li class="list-group-item list-group-item-primary McShadow" v-for="(user) in UserList" :key="user.id">
      <div class="btn-lg btn-outline-dark"><h5>ID:{{ user.id }}</h5></div>
      <div class="btn-lg btn-outline-dark"><h5>名前：{{ user.authority }}</h5></div>
       <div class="btn-lg btn-outline-dark"><h5>権限：{{ user.username }}</h5></div>
       <div class="btn-lg btn-outline-dark"><h5>苗字:{{ user.family_name }}</h5></div>
       <div class="btn-lg btn-outline-dark"><h5>名：{{ user.first_name }}</h5></div>
       <div class="btn-lg btn-outline-dark"><h5>フラグ：{{ user.is_deleted }}</h5></div>
    </li>
  </TransitionGroup>
   <!--  <select v-model="UserList">
      <option v-for="(user) in UserList" :key="user.id">
        {{ user.username }}
      </option>
    </select>  -->

</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 2.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translate3d(0,5,5);
  transform: scaleX(20px);
}
</style>