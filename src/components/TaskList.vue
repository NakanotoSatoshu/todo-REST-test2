<script setup lang="ts">
import type {TodoItems} from "../models/TodoItems";

defineProps<{  TodoList: TodoItems[] }>();

const emit = defineEmits<{
  (eventName: "done", id?: number): void;
  (eventName: "delete", id?: number): void;
}>();

</script>

<template>
  <table class="table table-hover table-sm my-1 iPhoneSE  opaS shadow-lg p-3 mb-3 rounded">
    <thead>
      <tr>
        <th class="col-sm-2">項目名</th>
        <th class="col-sm-2">担当者</th>
        <th class="col-sm-2 iPhoneSE2">登録日</th>
        <th class="col-sm-2 iPhoneSE2">期限日</th>
        <th class="col-sm-2">完了日</th>
        <th class="col-sm-2" colspan="3">操作</th>
      </tr>
    </thead>
    <tbody>
      <tbody class="animated"> 
	               <tr 
				    v-for="(item,index)  in  TodoList"
				   :key="item.user_id"   
				   class="testToggle"
				   :class="{
					
					}">
						<!-- ------------ TODO項目-------------------->
						<!-- ------------ 未完了----------->
						<td class="shadow-lg p-1 mb-1 rounded  align-middle btn-outline-warning modalDel"  >
						{{item.item_name}}		</td>       <!-- v-show="isNotComp" -->
						<!-- ------------ 完了----------->
						<td class="shadow-lg p-1 mb-1 rounded align-middle btn-lg modalDel"  >{{item.item_name}}</td>
	                   <!-- ------------ 名前-------------------->
	                    <td class="shadow-lg p-1 mb-1 rounded  align-middle modalName" >
	                    </td>
	                    <!-- ------------ 登録日-------------フォーマットデイト必須------->
	                  <td class="shadow-lg p-1 mb-1 rounded  align-middle iPhoneSE2 modalRegist" >{{(item.registration_date)}}</td>
	                    <!-- ------------ 期限日-------------------->
	                    <td class="shadow-lg p-1 mb-1 rounded  align-middle iPhoneSE2 modalExpire" >{{(item.expire_date)}} </td>
	                    <!-- ------------完了日-------------------->
	                    <td class="shadow-lg p-1 mb-1 rounded  align-middle modalFinish"  v-show="(item.finished_date)">{{(item.finished_date)}}</td>
	                    <td class="shadow-lg p-3 mb-3 rounded  align-middle medachi2 modalFinish animated fadeIn infinite" v-show="(item.finished_date)">未</td>
						<!-- ------------操作ボタン-------------------->
						<td class="shadow-lg p-1 mb-1 rounded  animated  swing">
							<ul>
							<!-- ------------ 完了系ボタン----------->
							<li class="button animated  swing	">
							
								<button class="shadow-lg p-1 mb-1 rounded btn-complete btn-sm btn-dark"   
								
								v-bind:href="'/complete/' + item.id" 
								
								>完了</button>
								<button class="shadow-lg p-1 mb-1 rounded btn-incomplete btn-sm btn-outline-dark" 
								
								v-bind:href="'/incomplete/' + item.id" 
								
								>未完了</button>
								
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
      
    </tbody>
  </table>
</template>