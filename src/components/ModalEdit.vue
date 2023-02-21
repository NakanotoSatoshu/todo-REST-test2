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
dayjs.locale(ja);

const props = defineProps<{ modalEdit: boolean ,  item: TodoItems , TodoList: TodoItems[]}>();

const emit = defineEmits<{
  (eventName: "edit",id?:number, item?:any):any;
}>();

//const fullName2 =(props.item.family_name);
//console.log(props.item.user.family_name);
const fullName = computed(() =>`${props.item.user.family_name} ${props.item.user.first_name}`); 

const formData = reactive({
  massage:" " ,
  name: "",
  age: "",
  email: "",
  id:"",
  user_id:"",
  item_name:"",
  fullName:"",
  expire_date:"",
  finished_date:"",
   
    user:  {
    family_name:"",
    first_name:""
  }
});

const rules = {
  name: { required },
  age: { required, integer },
  email: { required, email },
  item_name: { required },
  expire_date: { required },
  finished_date: { required },
  fullName: { required },
};

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  const result = await v$.value.$validate();
  console.log('result', result); // true or false
};

//DATEフォーマット
const format =  (date: string | number | Date | dayjs.Dayjs | null | undefined) => { let created_at = dayjs(date).format('YYYY-MM-DD') ;return created_at      };
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


//テスト--------------------DevOps-------------------------------------
const modalEdit3 = ref(props.modalEdit);
const fadeAway = ref(false);
const readOnlyMode = ( ) => { document.getElementById('item_name').setAttribute('type','text') };
const readOnlyMode2 = ( ) => { document.getElementById('fullName').setAttribute('type','select') };
const readOnlyMode3 = ( ) => { document.getElementById('expire_date').setAttribute('type','date') };
const readOnlyMode4 = ( ) => { document.getElementById('finished_date').setAttribute('type','date') };
//テスト--------------------DevOps-------------------------------------

//メソッドエクスポート
isInvalidDate();
defineExpose({
  modalEditToggleChild
});

</script>

<template>
  <Transition
  	enter-active-class="transition duration-100"
  	enter-from-class="transform opacity-0 -translate-y-20 "
  	leave-active-class="transition duration-10"
 		leave-to-class="transform opacity-0 -translate-y-20">	
     <div class="bg-info  modalEdit animated  fadeInLeft" v-show="modalEdit">
      <div class="mt-1 flex justify-center">
    <div class="w-full max-w-sm text-gray-700">
      <h5 class="text-2xl font-bold mb-2">EDIT</h5>
<form class=" shadow-md rounded p-2" method=""  @submit.prevent="submitForm">
						<!-------------- TODO項目----------------IPHONEでみたとき項目多くする---->
					 <!--  <th class=""> 
 					  </th> 親で必要な場合ブロックコメントは消してください   
            下は全てオンクリックでhiddenを表示させます インプット要素がバインディングされていて送信されるない-->
        <ul>
          <li>
						<td 
            class="btn-s btn-outline-warning" 
            @click="readOnlyMode" >
              {{ item.item_name }}
            </td>  
              <input 
               class="border rounded w-full p-2"
               style="background-color:transparent;"
               id="item_name"
               type="hidden"
               placeholder="項目名"
               :value="item.item_name"
                />
                <div v-for="error of v$.item_name.$errors" :key="error.$uid">
                  <div class="text-red-700 font-bold">{{ error.$message }}</div>
                </div>
            </li>
            <li>
	             <!--セレクトにする------------ 名前-------------------->
	                   <td 
                       class="btn-s btn-outline-warning"
                       @click="readOnlyMode2" >
                        {{item.user.family_name}}{{item.user.first_name}}
                    </td>
                        <select 
                        class="border rounded w-full p-2"
                        style="background-color:transparent;"
                        id="fullName"
                        type="hidden"
                        placeholder="担当者"
                        :value="fullName"
                         />
                <div v-for="error of v$.fullName.$errors" :key="error.$uid">
                  <div class="text-red-700 font-bold">{{ error.$message }}</div>
                </div>  
                </li>
                <li>       
	                    <!-- ------------ 登録日-------------フォーマットデイト必須------->
	                    <td class="btn-s btn-outline-warning" ></td>
                </li>
                <li>
	                    <!-- ------------ 期限日-------------------->
	                    <td 
                      class="btn-s btn-outline-warning"
                      @click="readOnlyMode3"
                      >
                        {{format(item.expire_date)}}
                      </td>
                        <input 
                          class="border rounded w-full p-2"
                          style="background-color:transparent;"
                          id="expire_date"
                          type="hidden"
                          placeholder="期限日"
                          :value="format(item.expire_date)"
                          />
                        <div v-for="error of v$.expire_date.$errors" :key="error.$uid">
                          <div class="text-red-700 font-bold">{{ error.$message }}</div>
                        </div>
                    </li>
                    <li>  
	                    <!-- ------------完了日-------------------->
	                    <td 
                      class="btn-s btn-outline-warning"  
                      v-show="hasNull(item.finished_date)"
                      @click="readOnlyMode4"
                      >
                      {{(item.finished_date)}}
                      </td>
                        <input 
                          class="border rounded w-full p-2"
                          style="background-color:transparent;"
                          id="finished_date"
                          type="hidden"
                          placeholder="完了日"
                          :value="format(item.finished_date)"
                          />
                        <div v-for="error of v$.finished_date.$errors" :key="error.$uid">
                          <div class="text-red-700 font-bold">{{ error.$message }}</div>
                        </div>
                    </li>
                    <li>
                      <td 
                      class=" animated fadeIn infinite" 
                      v-show="isNull(item.finished_date)"
                      @click="readOnlyMode4"
                      >未
                    </td>
                      <input 
                          class="border rounded w-full p-2"
                          style="background-color:transparent;"
                          id="finished_date"
                          type="hidden"
                          placeholder="完了日"
                          :value="item.finished_date"
                          />
                        <div v-for="error of v$.finished_date.$errors" :key="error.$uid">
                          <div class="text-red-700 font-bold">{{ error.$message }}</div>
                        </div>
                      </li>
                      <li>
						           <!-- ------------操作ボタン-------------------->
					         	<td class=" animated  fadeIn">  
                       <div class="flex items-center justify-between">
                    <button 
                    class="shadow-lg p-1 mb-1 rounded btn-sm btn-dark"
                    type="submit"
					          v-bind:href="'/edit/' + item.id"
					          @click="emit('edit', item.id , item)">送信</button>
                   </div>
                  </td>
             </li>
           </ul>
      </form>
    </div>
  </div>
  </div>

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
  </Transition>
           <!--   <div class="animated  fadeInLeft"	v-show="fadeAway" >
                          <h5>おいしいよ！</h5>
                           <template v-for="(item)  in  TodoList " :key="item.user_id"  >
                    </template>
									          <img src="src\assets\tk213-2.jpg" />
                  </div> -->  
</template>