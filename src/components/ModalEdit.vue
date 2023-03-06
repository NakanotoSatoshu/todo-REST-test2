<script setup lang="ts">
import { reactive, ref, computed, PropType } from 'vue';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import tra from '../services/TrantisonService';
import todoService from "../services/TodoService";
import type { TodoItems } from "../models/TodoItems";
import type { UsersModel } from "../models/TodoItems";
import type { Task } from "../models/Task";
import { isTemplateNode } from '@vue/compiler-core';
import { useVuelidate } from '@vuelidate/core'
import { required, email, integer } from "../utlis/i18n-validators";
import { useRoute } from 'vue-router';
dayjs.locale(ja);

const props = defineProps<{ modalEdit: boolean, item: TodoItems, TodoList: TodoItems[], UserList: UsersModel[] }>();

const emit = defineEmits<{
  (eventName: "edit", id?: number, formData?: any): any;
}>();

//DATEフォーマット
const format = (date: string | number | Date | dayjs.Dayjs | null | undefined) => { let created_at = dayjs(date).format('YYYY-MM-DD'); return created_at };
//バリデーション用コンストラクタ--------------------------------------------------------------------------------Vuelidate-----------
const formData = reactive({
  id: props.item.id,
  user_id: props.item.user_id,
  userName: " " ,
  fullName: " " ,
  registration_date:"",
  item_name: props.item.item_name,
  first_name: props.item.first_name,
  family_name: props.item.family_name,
  expire_date: format(props.item.expire_date),
  finished_date: format (props.item.finished_date),
  is_deleted: "",
  create_date_time: "",
  update_date_time: "",
  priority: "",
  user: "",
});

const item = ref(props.item);

//バリデーションルール
const rules = {
   item_name: { required },
   user_id: { required },
   expire_date: { Date },
   finished_date: { Date },
   first_name: { required },
   family_name: { required },
};

const v$ = useVuelidate(rules, formData);
const submitForm = async () => {
  const result = await v$.value.$validate();
  console.log('result', result); // true or false
};
//バリデーション用コンストラクタ--------------------------------------------------------------------------------Vuelidate----------

//JSでのDateがNullの場合invailddate表示を防ぐ
const isInvalidDate = () => { return props.TodoList.filter((item) => { if (item.finished_date === null) { Number(item.finished_date) } else { return item.finished_date } }) };
//完了日があるつまり完了してるやつ
const isNull = (d: Date | undefined) => { if (null === d) { return true } else { return false } };
//完了日がないつまり未完了してるやつ
const hasNull = (d: Date | undefined) => { if (null === d) { return false } else { return true } };
//期限日を現在より過ぎている
const isExpire = (f: Date, e: Date) => { var d = new Date; if (f === null) { if (new Date(e) < d) { return true } else { return false } } };
//期限日以内である
const notExpire = (f: Date, e: Date) => { var d = new Date; if (f === null) { if (new Date(e) > d) { return true } else { return false } } };
//モーダルトグル
const modalEditToggleChild = () => { modalEdit.value = !modalEdit.value; };
const modalEdit = ref(false);

//テスト--------------------DevOps-------------------------------------DevOps-------------------------------------
const d = () => { new Date('yyyy-MM-dd') }
//console.log(d);
//console.log(formData.finished_date);
//date: new Date().toISOString().slice(0, 10);
//console.log();
//const day2 = dayjs(new Date(props.item.finished_date));
//console.log('day2' + typeof(day2));
//console.log('formatじゃ' + typeof(format(props.item.finished_date)));
//console.log(format(props.item.expire_date));
//console.log(new Date(props.item.expire_date));
//console.log('itemのやつ' + typeof(props.item.finished_date));
const modalEdit3 = ref(props.modalEdit);
const fadeAway = ref(false);
//const fullName2 =(props.item.family_name);
//console.log(props.item.user.family_name);
const fullName = computed(() => `${props.item.user.family_name} ${props.item.user.first_name}`);
//const userFull = reactive([  props.item.user.first_name,props.item.user.family_name ]);
//selectタグのバインドをtodoテーブルのuser_idにバインドすることでごまかしている。
const userFull = ref(props.item.user_id);
//console.log('user-_id' + formData.user_id)
const userFull2 = ref([props.item.user.first_name, props.item.user.family_name]);
const useris = reactive([]);
//TODOリスト内のユーザーとユーザーリストのユーザーの一致--porps.UserList内を展開して内部のuser.family_nameと一致させたい
//const nameIsEql = computed(() => fullName === useRoute.family_name + user.fairsname); 

const OpenModalItem = (e: any) => { e.currentTarget.nextElementSibling.setAttribute('type', 'text'); };
const OpenModalName = (e: any) => { e.currentTarget.nextElementSibling.setAttribute('style', ''); };
const OpenModalExipire = (e: any) => { e.currentTarget.nextElementSibling.setAttribute('type', 'date'); };
const OpenModalFinish = (e: any) => { e.currentTarget.nextElementSibling.setAttribute('type', 'date'); };

//const toStng = computed(() => format(props.item.expire_date)) ; 
//const toStng2 = computed(() => format(props.item.expire_date)) ; 

//console.log(toStng);
//console.log(toStng2);
//テスト--------------------DevOps-------------------------------------DevOps-------------------------------------

//メソッドエクスポート
isInvalidDate();
defineExpose({
  modalEditToggleChild
});

// ユーザーをすべて取得する。ここでこれを実行すると全てのtrで実行されるので重たくなり避ける
//todoService.getUsers();
</script>

<template>
  <Transition enter-active-class="transition duration-100" enter-from-class="transform opacity-0 -translate-y-20 "
    leave-active-class="transition duration-10" leave-to-class="transform opacity-0 -translate-y-20">
    <div class="bg-info mb-4  rounded-lg  modalEdit animated  fadeInLeft" v-show="modalEdit">
      <div class="mt-1 flex justify-center">
        <div class="w-full max-w-sm text-gray-700">
          <h5 class="text-2xl font-bold mb-2">EDIT</h5>
          <form class=" shadow-md rounded p-2" method="" @submit.prevent="submitForm">
            <!-------------- TODO項目----------------IPHONEでみたとき項目多くする---->
            <!--  <th class=""> 
   					  </th> 親で必要な場合ブロックコメントは消してください   
              下は全てオンクリックでhiddenを表示させます インプット要素がバインディングされていて送信されるない-->
          <ul>
            <li>
              <td class="btn-s btn-outline-warning" @click="OpenModalItem">
                {{ item.item_name }}
              </td>
              <input class="border rounded w-full p-2" style="background-color:transparent;" id="item_name "
                type="hidden" :placeholder="item.item_name" v-model.lazy="formData.item_name" />
               <div v-for="error of v$.item_name.$errors" :key="error.$uid">
                <div class="text-red-700 font-bold">{{ error.$message }}</div>
              </div> 
            </li>
            <li>
              <!--セレクトにする------------ 名前-------------------->
              <td class="btn-s btn-outline-warning" @click="OpenModalName">
                {{ props.item.user.family_name }} {{ props.item.user.first_name }}
                </td>
                <!-- selectタグにv-model="プロパティ名"を記述することで、選択した内容をプロパティに反映させることができます-->
              <select class="border rounded w-full p-2" style="background-color:transparent;" v-model.tirm="formData.user_id">
                <option class="border rounded w-full p-2" v-for="user in UserList" v-bind:value="item.user_id">
                  {{ user.family_name }}{{ user.first_name }}
                </option>
              </select>
                <!--optionタグの中身にitemをバインドでき、尚且つUserListとバインドできればよい-->
                      <div v-for="error of v$.user_id.$errors" :key="error.$uid">
                    <div class="text-red-700 font-bold">{{ error.$message }}</div>
                  </div>   
              </li>
              <li>
                <!-------------- 期限日-------------------->
                <td class="btn-s btn-outline-warning" @click="OpenModalExipire">
                  {{ format(item.expire_date) }}
                </td>
                <input class="border rounded w-full p-2" style="background-color:transparent;" id="expire_date"
                  type="hidden" placeholder="期限日" v-model.Date="formData.expire_date" />
                <div v-for="error of v$.expire_date.$errors" :key="error.$uid">
                  <div class="text-red-700 font-bold">{{ error.$message }}</div>
                </div> 
              </li>
              <li>
                <!-- ------------完了日-------------------->
                <td class="btn-s btn-outline-warning" v-show="hasNull(item.finished_date)" @click="OpenModalFinish">
                  {{ (item.finished_date) }}
                </td>
                <input class="border rounded w-full p-2" style="background-color:transparent;" id="finished_date"
                  type="hidden" placeholder="完了日" v-model="formData.finished_date" />
                <div v-for="error of v$.finished_date.$errors" :key="error.$uid">
                  <div class="text-red-700 font-bold">{{ error.$message }}</div>
                </div> 
              </li>
              <li>
                <td class=" animated fadeIn infinite" v-show="isNull(item.finished_date)" @click="OpenModalFinish">
                  未
                </td>   
              <input class="border rounded w-full p-2" style="background-color:transparent;" id="finished_date"
                type="hidden" placeholder="完了日"
                v-model.Date="formData.finished_date" />
                <!--  :value="format(item.finished_date)" -->
              <div v-for="error of v$.finished_date.$errors" :key="error.$uid">
                <div class="text-red-700 font-bold">{{ error.$message }}</div> 
              </div> 
              </li>
              <span></span>
              <li>
              </li>
              <li>
                <!-- ------------操作ボタン-------------------->
                <td class=" animated  fadeIn">
                  <div class="flex items-center justify-between">
                    <button class="shadow-lg p-1 mb-1 rounded btn-sm btn-dark" type="submit"
                      v-bind:href="'/edit/' + item.id" @click="emit('edit', item.id, formData)">送信</button>
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