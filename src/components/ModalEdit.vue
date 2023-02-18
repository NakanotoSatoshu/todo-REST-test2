<script setup lang="ts">
import { reactive, ref,computed,PropType } from 'vue';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import tra from '../services/TrantisonService';
import type {TodoItems} from "../models/TodoItems";
import type{ Task } from "../models/Task";
import { isTemplateNode } from '@vue/compiler-core';
import { useVuelidate } from '@vuelidate/core'
import { required, email, integer } from "../utlis/i18n-validators";

const formData = reactive({
  name: "",
  age: "",
  email: "",
});

const rules = {
  name: { required },
  age: { required, integer },
  email: { required, email },
};

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  const result = await v$.value.$validate();
  console.log('result', result); // true or false
};
dayjs.locale(ja);


const props = defineProps<{ modalEdit: boolean ,  item: TodoItems , TodoList: TodoItems[]}>();

//DATEフォーマット
const format =  (date: string | number | Date | dayjs.Dayjs | null | undefined) => { let created_at = dayjs(date).format('YYYY/M/DD') ;return created_at      };
//JSでのDateがNullの場合invailddate表示を防ぐ
const isInvalidDate = () => { return props.TodoList.filter( (item) => { if(item.finished_date === null){ Number(item.finished_date) }else{  return item.finished_date         }})};
//完了日があるつまり完了してるやつ
const isNull = (d: Date | undefined ) => {if(null === d){return true}else{return false      }};
//完了日がないつまり未完了してるやつ
const hasNull = (d: Date | undefined ) => {if(null === d){ return false}else{ return true   }};
//期限日を現在より過ぎている
const isExpire = (f: Date  , e:  Date  ) => { var d = new Date 	;if(f === null){ if(new Date(e)  < d) {	return true  }else{ return false }	}   };
//期限日以内である
const notExpire = (f: Date  , e:  Date  ) => { var d = new Date ; if(f === null){if(new Date(e) > d){return true}else{ 	return false  }}  };
//モーダルトグル
const modalEditToggleChild = () => { modalEdit.value = !modalEdit.value; };
const modalEdit = ref(false);
const modalEdit3 = ref(props.modalEdit);
const fadeAway = ref(false);
const massage = ref('message');
const message = String;
isInvalidDate();
defineExpose({
  modalEditToggleChild
});
</script>

<template>
  <transition
  	enter-active-class="transition duration-100"
  	enter-from-class="transform opacity-0 -translate-y-20 "
  	leave-active-class="transition duration-10"
 		leave-to-class="transform opacity-0 -translate-y-20">	
     <tr class="bg-info  modalEdit animated  fadeInLeft" v-show="modalEdit">
						<!-------------- TODO項目----------------IPHONEでみたとき項目多くする---->
					  <th class=""> 
 					  </th>
						<!-------------- 未完了----------->
						<td class="  align-middle btn-sm btn-outline-warning " v-show="item.finished_date !== null" >
              <p>Message is: {{ message}}</p> <input   v-model="message" placeholder="{{item.item_name}}" />
								</td>       <!-- v-show="isNotComp" -->
						<!-- ------------ 完了----------->
						<td class="shadow-lg p-1 mb-1 rounded align-middle btn-sm btn-outline-warning modalDel"  v-show="item.finished_date === null">
              <p>Message is: {{ message}}</p> <input   v-model="message" placeholder="{{item.item_name}}" /></td>
	                   <!-- ------------ 名前-------------------->
	                    <td class="shadow-lg p-1 mb-1 rounded  text-center align-middle iPhonseSE2 modalName" >{{item.user.family_name}}{{item.user.first_name}}
	                    </td>
	                    <!-- ------------ 登録日-------------フォーマットデイト必須------->
	                    <td class="shadow-lg p-1 mb-1 rounded  text-center align-middle iPhoneSE2 modalRegist" >{{format(item.registration_date)}}</td>
	                    <!-- ------------ 期限日-------------------->
	                    <td class="shadow-lg p-1 mb-1 rounded  text-center align-middle iPhoneSE2 modalExpire" >{{format(item.expire_date)}} </td>
	                    <!-- ------------完了日-------------------->
	                    <td class="shadow-lg p-1 mb-1 rounded  text-center align-middle modalFinish"  v-show="hasNull(item.finished_date)">{{format(item.finished_date)}}</td>
	                    <td class="shadow-lg p-1 mb-1 rounded  text-center align-middle medachi2 modalFinish animated fadeIn infinite" v-show="isNull(item.finished_date)">未</td>
						<!-- ------------操作ボタン-------------------->
						<td class="shadow-lg p-1 mb-1 rounded  text-center align-middle animated  fadeIn">
					  </td>
            <div class="mt-12 flex justify-center">
    <div class="w-full max-w-sm text-gray-700">
      <h1 class="text-2xl font-bold mb-2"></h1>
<form class="bg-white shadow-md rounded p-4" method="post" action="/edit/test" @submit.prevent="submitForm">
  <div class="mb-4">
    <label class="bloc text-sm font-bold mb-2" for="name"> 名前 </label>
    <input
      class="border rounded w-full p-2"
      id="name"
      type="text"
      placeholder="名前"
      v-model="formData.name"
    />
    <div v-for="error of v$.name.$errors" :key="error.$uid">
      <div class="text-red-700 font-bold">{{ error.$message }}</div>
    </div>
  </div>
  <div class="mb-4">
    <label class="bloc text-sm font-bold mb-2" for="age">年齢 </label>
    <input
      class="border rounded w-full p-2 text-gray-700"
      id="age"
      type="age"
      placeholder="年齢"
      v-model="formData.age"
    />
    <div v-for="error of v$.age.$errors" :key="error.$uid">
      <div class="text-red-700 font-bold">{{ error.$message }}</div>
    </div>
  </div>
  <div class="mb-4">
    <label class="block text-sm font-bold mb-2" for="email">
      メールアドレス
    </label>
    <input
      class="border rounded w-full p-2 text-gray-700"
      id="email"
      type="email"
      placeholder="メールアドレス"
      v-model="formData.email"
    />
    <div v-for="error of v$.email.$errors" :key="error.$uid">
      <div class="text-red-700 font-bold">{{ error.$message }}</div>
    </div>
  </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            送信
          </button>
        </div>
      </form>
    </div>
  </div>
	   </tr>
     <!--  <div class="container-fluid animated  fadeInLeft"	v-show="modalEdit" >
        <tr class="">
        <td class="shadow-lg p-1 mb-1 rounded  align-middle btn-sm btn-outline-warning modalDel"  > </td>        
        <h5>ID:{{item.id}}</h5>	
        <td class="shadow-lg p-1 mb-1 rounded  align-middle btn-sm btn-outline-warning modalDel"  ></td>
        <h5>項目名:{{item.item_name}}</h5>	
        <td class="shadow-lg p-1 mb-1 rounded  align-middle btn-sm btn-outline-warning modalDel"  ></td>
        <h5>担当者:{{item.user.family_name}}{{item.user.first_name}}</h5>	
        <td class="shadow-lg p-1 mb-1 rounded  align-middle btn-sm btn-outline-warning modalDel"  ></td>
        <h5>期限日:{{format(item.expire_date)}}</h5>	
        <td class="shadow-lg p-1 mb-1 rounded  align-middle btn-sm btn-outline-warning modalDel"  ></td>
        <h5><p v-show="hasNull(item.finished_date)">完了日:{{format(item.finished_date)}}</p></h5>	
        <h5><p v-show="isNull(item.finished_date)">完了日:未</p></h5>
        <td class="shadow-lg p-1 mb-1 rounded  align-middle btn-sm btn-outline-warning modalDel"  ></td>
        <td class="shadow-lg p-1 mb-1 rounded  align-middle btn-sm btn-outline-warning modalDel"  ></td>                  
    </tr>
   </div> -->
  </transition>
           <!--   <div class="animated  fadeInLeft"	v-show="fadeAway" >
                          <h5>おいしいよ！</h5>
                           <template v-for="(item)  in  TodoList " :key="item.user_id"  >
                    </template>
									          <img src="src\assets\tk213-2.jpg" />
                  </div> -->  
</template>