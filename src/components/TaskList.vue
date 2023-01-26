<script setup lang="ts">
import { reactive, ref,computed,PropType } from 'vue';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

import type {TodoItems} from "../models/TodoItems";

dayjs.locale(ja);

const props = defineProps<{  TodoList: TodoItems[] }>();

const emit = defineEmits<{
  (eventName: "done", id?: number): void;
  (eventName: "delete", id?: number): void;
}>();

const msg = ref('Hello TypeScript');

//const TodoList = ref(); 

const format =  (date: string | number | Date | dayjs.Dayjs | null | undefined) => {
				   let created_at = dayjs(date).format('YYYY年M月DD日')
				  return created_at      };
//JSでのDateがNullの場合invailddate表示を防ぐ
const isInvalidDate = () => {
					return props.TodoList.filter( (item) => {
						 if(item.finished_date === null){
								Number(item.finished_date)
								//console.log(item.finished_date)
						 }else{
                                return item.finished_date
								//console.log(item.finished_date)
					}})};

const isNull = (d: Date | undefined ) => {
					if(null === d){
					//	console.log('未完了' + d)
						return true
					}else{
					//	console.log('ぬるぽでない' )
						return false
					}};
 //完了日があるつまり完了してるやつ
const hasNull = (d: Date | undefined ) => {
					if(null === d){
						return false
					}else{
						//console.log('完了' + d  + Number(d))
						return true
					}};
//期限日を現在より過ぎている
const isExpire = (f: Date  , e:  Date  ) => {
					var d = new Date 			
					if(f === null){
						 if(new Date(e)  < d) {
							return true 
						 }else{
							return false
						 }
					}//console.log("test" + "期限日：" + e + "本日の日：" + d + "完了した日：" + f)
					//return false    
				   };
//期限日以内である
const notExpire = (f: Date  , e:  Date  ) => {
					var d = new Date
					if(f === null){
						if(new Date(e) > d){
							return true
						 }else{
							return false
						 }
					} //return false     
				 };

const getFilter = () => props.TodoList.filter( (item) => { return item.is_deleted === 0 } );
					
const getComputed = computed (  () => props.TodoList.filter( (item) => { return item.is_deleted === 0 }));
const testClick = () => { console.log('ClickThis??'); };

//getFilter();
isInvalidDate();
</script>

<template>
  <table class="table table-hover table-sm my-1 iPhoneSE  opaS bg-body shadow-lg p-3 mb-3 rounded">
    <thead class="thead">
      <tr>
        <th class="col-sm-2">項目名</th>
        <th class="col-sm-2">担当者</th>
        <th class="col-sm-2 iPhoneSE2">登録日</th>
        <th class="col-sm-2 iPhoneSE2">期限日</th>
        <th class="col-sm-2">完了日</th>
        <th class="col-sm-2" colspan="3">操作</th>
      </tr>
    </thead>
      <tbody class="animated fadeIn"> 
	               <tr 
				    v-for="(item,index)  in  TodoList "
				   :key="item.user_id"   
				   class="testToggle"
				   :class="{
					'inComp':isExpire(item.finished_date,item.expire_date) ,
					'forwardComp':notExpire(item.finished_date,item.expire_date)
					}">
						<!-- ------------ TODO項目-------------------->
						<!-- ------------ 未完了----------->
						<td class="shadow-lg p-1 mb-1 rounded  align-middle btn-outline-warning modalDel" v-show="item.finished_date !== null" >
						{{item.item_name}}		</td>       <!-- v-show="isNotComp" -->
						<!-- ------------ 完了----------->
						<td class="shadow-lg p-1 mb-1 rounded align-middle btn-lg modalDel"  v-show="item.finished_date === null">{{item.item_name}}</td>
	                   <!-- ------------ 名前-------------------->
	                    <td class="shadow-lg p-1 mb-1 rounded  align-middle modalName" >{{item.user.family_name}}{{item.user.first_name}}
	                    </td>
	                    <!-- ------------ 登録日-------------フォーマットデイト必須------->
	                  <td class="shadow-lg p-1 mb-1 rounded  align-middle iPhoneSE2 modalRegist" >{{format(item.registration_date)}}</td>
	                    <!-- ------------ 期限日-------------------->
	                    <td class="shadow-lg p-1 mb-1 rounded  align-middle iPhoneSE2 modalExpire" >{{format(item.expire_date)}} </td>
	                    <!-- ------------完了日-------------------->
	                    <td class="shadow-lg p-1 mb-1 rounded  align-middle modalFinish"  v-show="hasNull(item.finished_date)">{{format(item.finished_date)}}</td>
	                    <td class="shadow-lg p-3 mb-3 rounded  align-middle medachi2 modalFinish animated fadeIn infinite" v-show="isNull(item.finished_date)">未</td>
						<!-- ------------操作ボタン-------------------->
						<td class="shadow-lg p-1 mb-1 rounded  animated  swing">
							<ul>
							<!-- ------------ 完了系ボタン----------->
							<li class="button animated  swing	">
							
								<button class="shadow-lg p-1 mb-1 rounded btn-complete btn-sm btn-dark"   
								v-on:click="isShow = !isShow" 
								v-bind:href="'/complete/' + item.id" 
								v-show="isNull(item.finished_date)
								">完了</button>
								<button class="shadow-lg p-1 mb-1 rounded btn-incomplete btn-sm btn-outline-dark" 
								v-on:click="isShow = !isShow" 
								v-bind:href="'/incomplete/' + item.id" 
								v-show="hasNull(item.finished_date)
								">未完了</button>
								
							</li>
							<!-- ------------ 未完了だった箇所----------->
							<li class="  animated  fadeIn" >
								
							</li>
							<li><!-- ------------ 更新画面----------->
	                           <button class="shadow-lg p-1 mb-1 rounded btn-sm btn-dark modal-open2"   v-bind:href="'/edit/' + item.id" >更新</button>
	                         </li>
	                         <li><!-- ------------ 削除画面----------->
	                  		  <button id="js-open" class="shadow-lg p-1 mb-1 rounded btn-sm btn-dark  modal-open"   type="button" v-bind:href="'/delete/' + item.id">削除</button>
	                  		</li>
	                  		</ul>
						</td>
	                </tr>
	            </tbody>
  </table>
</template>