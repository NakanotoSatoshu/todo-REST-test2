import axios from "axios";
import { reactive ,ref,computed, readonly,provide, onMounted, inject} from "vue";
import type { TodoItems } from "../models/TodoItems";
import todoService from "../services/TodoService";
import { defineStore } from 'pinia';

/* 
　　　// 検索導入の際に、グローバルにストアするのを、検索ワードではリアクティブではないので、リストを変化させる　
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 */

//pinia方式
export const useStoreTodo = defineStore('store', () => {
    todoService.getAllTasks();
 // setTimeout(function(){
  async function Async(){ 
    let TodoList : TodoItems[] =  todoService.todoItmes;
    console.log('Stored This First' + TodoList);
    var search  = ref('');
    console.log('Input Word This ' + search.value);
    var Search_TodoList = computed ( () => {
      let searchWord = search.value.trim();
      if (searchWord === '' && searchWord === undefined) return TodoList; 
      return TodoList.filter( (item)  => {return item.item_name.includes(search.value) 
    })});console.log('computed this ' + Search_TodoList + 'This Word' + search.value);
    return { Search_TodoList ,search,TodoList};
   }
  }
  //,1000);
  );

//インクリメンタルサーチ成功例
    // export  var Search_TodoList = computed ( () => {
    //   let searchWord = search.value.trim()
    //     if (searchWord === '') return users; 
    //    return TodoList.filter(item  => {return TodoList.item_name.includes(search.value) 
    //  })});

//inject.privide方式
export function useTodo() {
  const TodoList: TodoItems[] = reactive([]);
  const firstItem = computed(() => TodoList[0] ?? null);
  function add(todo:any) {TodoList.push(todo);}
  return { TodoList: readonly(TodoList), firstItem, add };
};









//テスト以下ゴミ
export function useTodoSearch(todoStore) {
    const query = ref('');
    function matches(q, todo) {}
      // todoが検索クエリqにマッチするかどうかを返す関数 
    const matched = computed(() => todoStore.items.filter( item => matches(query.value, item) ));
    return { query, matched };
  }


export function  GetSearch (param : any) : void { this.TodoList.filter(item => { return   this.TodoList.includes(param) }
  ); console.log('slice' + this.TodoList);};
 
const  GetSearch2 = computed (  (param : any) => {this.TodoList.filter( item => { return   this.TodoList.includes(param)}
 );  console.log('slice' + this.TodoList);});

const todoStore = useTodo();
provide('todoProvide', todoStore);
export interface user {
id: number,
name: string,
username: string,
email:string,
// "address": {
//   "street": "Kulas Light",
//   "suite": "Apt. 556",
//   "city": "Gwenborough",
//   "zipcode": "92998-3874",
//   "geo": {
//     "lat": "-37.3159",
//     "lng": "81.1496"
//   }}
}

// onMounted(() => {
//   getAX();
// });