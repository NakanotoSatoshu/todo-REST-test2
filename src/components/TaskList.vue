<script setup lang="ts">
import { reactive, ref,computed,PropType } from 'vue';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import tra from '../services/TrantisonService';
import type {TodoItems} from "../models/TodoItems";
import SMenu from '../components/SlideMenu.vue';
import type{ Task } from "../models/Task";
import ME from '../components/ModalEdit.vue';

dayjs.locale(ja);

const props = defineProps<{TodoList: TodoItems[] ,open: boolean }>();

const emit = defineEmits<{
  (eventName: "complete", id?: number ,item?: any): any;
  (eventName: "incomplete", id?: number , item?:any): any;
  (eventName: "delete2", id?: number): void;
  (eventName: "delete",id?:number, item?:any):any;
  (transName: "comp",id?:number): any;
}>();

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

//テスト用
const CompleteaAnime  = () => { };
const getFilter = () => props.TodoList.filter( (item) => { return item.is_deleted === 0 } );		
const getComputed = computed (  () => props.TodoList.filter( (item) => { return item.is_deleted === 0 }));
const testClick = () => { console.log('ClickThis??'); };
const ttt = ():any => { console.log(emit);}
        //完了アニメ
async function transComp(el: Element, done: () => void) { el.classList.add("overflow-hidden"); el.textContent = "未完了";
  await el.animate(  [{ height: 0, }, { height: `${(el as HTMLElement).offsetHeight}px`,},],
    { duration: 500, easing: "ease-out",}).finished;
  el.classList.remove("overflow-hidden");
  done();}
		// 未完了アニメ
async function transInComp(el: Element, done: () => void) { el.classList.add("overflow-hidden"); el.textContent = "完了";
  await el.animate([{ height: `${(el as HTMLElement).offsetHeight}px`,},{height: 0,},],
    {duration: 500,easing: "ease-out",}).finished;
  el.classList.remove("overflow-hidden");
  done();}
const open = ref(props.open);
const testman = ref<(emit)
const testman2 = ref('');
const docState = ref('完了')
const toggle2 = () => { showS.value = !showS.value; };
const MEShow = ref(false);
const modalEditToggle = () => { MEShow.value = !MEShow.value }; //----これですると全部のTRで出てしまう
//テスト----------------DevOps-----------------------------------------------------------------------------------------------------
const modalEditToggle3 = () => { childRef.value.modalEditToggleChild();  };
const childRef = ref(ME);
const onChildMethodClick2 = (e:any) => { 
	// 何番目の要素かチェック
	//console.log(e.currentTarget.closest);
	let trs = document.getElementsByTagName( "tr" ) ;
	let trss: any[] = [].slice.call( trs ) ;
	//console.log(elm)
	let tr = e.currentTarget.closest( "tr" );
	let num = trss.indexOf( tr );
	childRef.value[num - 1 ].modalEditToggleChild(); 
	//console.log(number);
	//childRef.value[number-1].modalEditToggleChild();
}
//const onChildMethodClick = (id :any) => { childRef.value[num].modalEditToggleChild(); };
//テスト----------------DevOps-----------------------------------------------------------------------------------------------------
const showS = ref(false);
const modalEdit = ref(false);
const msg = ref('Hello TypeScript');
//const TodoList = ref(); 

isInvalidDate();
</script>

<template>

<div class="col-xl-12 col-md-10">
  <table class="table  table-hover table-sm my-1 p-1 iPhoneSE bg-body shadow-sm p-1 mb-0 rounded ">
    <thead class="table-Secondary opaS">
      <tr>
		<th scope="col align-middle"  class="text-center iPhonseSE2">#</th>
        <th scope="col align-middle" class="text-center col-3 iPhoneSE2">項目名</th>
        <th scope="col align-middle" class="text-center col-1 iPhoneSE2">担当者</th>
        <th scope="col align-middle" class="text-center col-2 iPhoneSE2">登録日</th>
        <th scope="col align-middle" class="text-center col-2 iPhoneSE2">期限日</th>
        <th scope="col align-middle" class="text-center col-2 iPhoneSE2">完了日</th>
        <th scope="col align-middle" class="text-center col-4 iPhoneSE2" colspan="">操作</th>
      </tr>
    </thead>
      <tbody class="animated fadeIn"> 
		<transition-group name="flip-list" tag="">
	        <template v-for="(item)  in  TodoList " :key="item.user_id"  >
				<tr class="testToggle"
				   :class="{
					'inComp':isExpire(item.finished_date,item.expire_date) ,
					'forwardComp':notExpire(item.finished_date,item.expire_date)
					}">
						<!-------------- TODO項目----------------IPHONEでみたとき項目多くする---->
					    <th class="">
						     <input type="checkbox" class="check text-center align-middle iPhonseSE2" id="btncheck1" autocomplete="off" 
							 @click="toggle2" >
 					    </th>
						<!-------------- 未完了----------->
						<td class="shadow-lg p-1 mb-1 rounded  align-middle btn-sm btn-outline-warning modalDel" v-show="item.finished_date !== null" >
						{{item.item_name}}		</td>       <!-- v-show="isNotComp" -->
						<!-- ------------ 完了----------->
						<td class="shadow-lg p-1 mb-1 rounded align-middle btn-sm btn-outline-warning modalDel"  v-show="item.finished_date === null">{{item.item_name}}</td>
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
						<!-- ------------ 完了系ボタン--------------------------------------------->
							<ul class="iPhoneSE2 iPhoneSE3 text-center align-middle">
							  <li class=" button animated fadeIn">
					 <!-------------- 完了-------------------------------------------------------->
		 			<Transition  name="slide-up" mode="out-in">
								<button 
								class="shadow-lg p-1 mb-1 rounded btn-complete btn-sm btn-dark"   
								v-bind:href="'/complete/' + item.id" 
								v-show="isNull(item.finished_date)"
								@click="emit('complete',  item.id, item)" 
							    >
								<i class="fa-solid fa-arrow-down-long"></i>
							    </button>
					</Transition>
					<!-------------- 戻す---------------------------------------------------------->
					<Transition name="slide-up" mode="out-in">
								<button 
								class="shadow-lg p-1 mb-1 rounded btn-incomplete btn-sm btn-outline-dark" 
								v-bind:href="'/incomplete/' + item.id" 
								v-show="hasNull(item.finished_date)"
								@click="emit('incomplete',  item.id, item) "
								>
								<i class="fa-solid fa-truck-monster"></i>
								</button>
					</Transition>	
					<Transition @enter="tra.testEnter" @leave="tra.testLeave"></Transition>		
							</li>
							<!-- ------------ 未完了だった箇所----------- v-if="testman2 === '完了'" v-else-if="testman2 === '未完了'"-->
							<li class="  animated  fadeIn" >
								
							</li>
							<li><!-------------- 更新画面----------------------------------------->
	                           <button 
							   class="shadow-lg p-1 mb-1 rounded btn-sm btn-dark modal-open2"   
							   v-bind:href="'/edit/' + item.id" 
							   @click="onChildMethodClick2">
							   <i class="fa-solid fa-calendar-days"></i>
								</button>
	                         </li>
							 		
	                         <li><!-- ------------ 削除画面--------------------------------------------------->
	                  		  <button id="js-open" 
							  class="shadow-lg p-1 mb-1 rounded btn-sm btn-dark  modal-open"  
							   type="button" 
							   v-bind:href="'/delete/' + item.id"
							   @click="emit('delete', item.id)"
							   >
							    <i class="fa-solid fa-trash"></i>
								</button>
							 </li>
							</ul>
						<div class="iPhoneSE3 ">
							<SMenu :showS="showS" ></SMenu>
						</div>
					  </td>
	                </tr>
					<ME ref="childRef" :modalEdit="modalEdit"  :item="item" :TodoList="TodoList"></ME>
				</template> 
			</transition-group>
	  </tbody>	
  </table>
</div>
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
  transition: all 0.14s ease-in-out;
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