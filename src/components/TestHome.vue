<script setup lang="ts">
import { reactive, ref,computed,PropType } from 'vue';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import tra from '../services/TrantisonService';
import todoService from "../services/TodoService";
import type {TodoItems} from "../models/TodoItems";
import type {UsersModel} from "../models/TodoItems";
import type{ Task } from "../models/Task";
import { number } from '@intlify/core-base';
//import { shuffle as _shuffle } from 'lodash-es'

const props = defineProps<{ UserList: UsersModel[]  }>();
//テスト----------------------------------------------------------------------------------------
//console.log(props.UserList + 'うおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおお');
//const UserList = ref(props.UserList);
const index  = { type: Number};
const year = {type: Number }
const fullName =  computed(() =>`${props.UserList} ${props.UserList}`); 
const inputIndex = ref(index);
const inputYear = ref(year)
//const usersid = ref(users);
const useris = reactive([     ]);
const selected3 = ref( 'initial');
//const nn = ref(n)
//const n = {type: number };
//const username = ref( );
//テスト----------------------------------------------------------------------------------------

</script>

<template>  
 <h1>This is My Test </h1>
<!--      <select class="form-select form-select-sm mb-3" v-model.number="usersid">
      <optio class="btn-lg btn-outline-dark" v-for="(user) in UserList"  ><h5>ID:{{ user.id }}</h5></optio>
	</select> 
   -->
  <div class="bg-primary">
   <p>専用の初期値を設定する</p>
    <select v-model="selected3">
      <option disabled value="initial">Please Select</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </select>
    <p>プロパティの値: {{selected3}}</p>
  </div>
    <li class="animated fadeInUp"> <h1>{{ useris }}</h1></li>
  <select class="form-select form-select-sm mb-3"  name="index" v-model="useris">
      <option class="btn-lg btn-outline-dark" v-for="user in UserList"  v-bind:value="fullName" >
        <h5>{{ user.family_name }}{{ user.first_name}}</h5></option>
	</select>  
        <select  name="index" v-model.number="inputIndex">
            <option v-for="n in 25" v-bind:value="n">{{ n }}番目</option>
        </select> 
        <div>
        <select  name="year" v-model.number="inputYear">
            <option v-for="n in 19" v-bind:value="n + 1999">{{ n + 1999 }}年</option>
        </select>
    </div>  

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