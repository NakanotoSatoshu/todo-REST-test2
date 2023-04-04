<script setup lang="ts">
import { ref,reactive } from "vue";
import type { UsersModel } from "../models/TodoItems";
import type { TodoItems } from "../models/TodoItems";
//import todoService from "../services/TodoService";
import {  useRouter } from "vue-router";
import { useVuelidate } from '@vuelidate/core'
import { required } from "../utlis/i18n-validators";

const props = defineProps<{  UserList: UsersModel[] }>();

const emit = defineEmits<{
  (eventName: "entry",formData?:any):any;
}>();

const formData = reactive({
  id: "",
  user_id: "",
  userName: " " ,
  fullName: " " ,
  registration_date:"",
  item_name: "",
  first_name: "",
  family_name: "",
  expire_date: "",
  finished_date: "",
  is_deleted: "",
  create_date_time: "",
  update_date_time: "",
  priority: "",

});
//バリデーションルール
const rules = {
   item_name: { required },
   user_id: { required },

};

const v$ = useVuelidate(rules, formData);
const submitForm = async () => {
  const result = await v$.value.$validate();
  console.log('result', result); // true or false
};

const router = useRouter();
const EnOp = ref(false);
//console.log(EnOp);
const EisToggle = ref(false);
//console.log(props);
//const EntryToggle = () => { props.EntryOpen === !props.EntryOpen  }
const goToUrl = (url?: string) => {
  if (url != undefined) {
    router.push(url); }
};
const EnOptoggle = () => {  EnOp.value = !EnOp.value; };
defineExpose({ EnOptoggle });
</script>

<template>
   <!-- <button @click="EnOptoggle">タスク追加</button>  -->
  <Transition name="slide-up" mode="out-in">
  <div v-show="EnOp ">  
              <!-- 入力フォーム -->
              <div class="row my-2">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                 <form   @submit.prevent="submitForm">
<!--------------------------------------------------------------------------------- 項目名の入力エリア -->
                        <div class="form-group" >
                            <label for="item_name">項目名</label>
                            {{ formData.item_name }}
                            <input type="text" class="form-control" placeholder="やること" v-model="formData.item_name" />
                        
                        </div>
<!--------------------------------------------------------------------------------- 担当者の入力エリア -->
                         <div class="form-group" >
                            <label for="user_id">担当者</label>
                           {{ formData.user_id }}
                          <!-- selectタグにv-model="プロパティ名"を記述することで、選択した内容をプロパティに反映させることができます-->
                        <select class="form-control"  v-model="formData.user_id">
                          <option class="form-control" v-for="user in UserList" v-bind:value="user.id">
                            {{ user.family_name }}{{ user.first_name }}
                          </option>
                        </select>
                        </div>
                        <!--------------------------------------------------------------------------------- 期限日の入力エリア -->
                        <div class="form-group" >
                            <label for="expire_date">期限</label>
                            <input class="" id="expire_date"
                  type="date" placeholder="期限日" v-model="formData.expire_date" />
                        </div>
                        <button class="btn btn-primary" type="submit" v-bind:href="'entry'"
                         @click="emit('entry', formData)">登録</button>
                       <button type="button" class="btn btn-default pull-right"><a href="/home">キャンセル</a></button>
                    </form>
                </div>
                <div class="col-sm-3"></div>
            </div>
            <!-- 入力フォーム ここまで -->

        </div>
        <!-- コンテナ ここまで -->
      </Transition>
</template>

<style>
.v-enter-active, .v-leave-active {
  transition: opacity 1.3s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.btn-container {
  display: inline-block;
  position: relative;
  height: 1em;
}




.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.84s ease-in-out;
}

.slide-up-enter-from {
	opacity: 0;
  transform: translateY(10px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.flip-list-move {
  transition: transform 0.8s ease;
}
</style>