import axios from "axios";
import { reactive ,ref,computed, readonly,provide, onMounted, inject} from "vue";
import type { TodoItems } from "../models/TodoItems";
import todoService from "../services/TodoService";
import { defineStore } from 'pinia';

/* 
　　　// 検索導入の際に、グローバルにストアするのを、検索ワードではリアクティブではないので、リストを変化させる　
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 */

//pinia方式
//2023/03/20一旦チートで完成。ここにフルスタックフレームワーク一旦完成する。!!!!!!!やっと全部終わった！！！\(^0^)/
export const useStoreTodo = defineStore('store', () => {
  let TodoList : TodoItems[] = reactive([]);
  //async function Async(): Promise<any>{  
    //return new Promise((resolve, reject) => {
    todoService.getAllTasks();
  setTimeout(function(){
    TodoList  =  todoService.todoItmes;
  },500);
    //resolve('resolve!!');
  //  const result = await Async();
  //  console.log(result);
    console.log('Stored This First' + TodoList);
  
    //const result =  todoService.getAllTasks();
    var search  = ref('');
    console.log('Input Word This ' + search.value);
     var Search_TodoList = computed ( () => {
      let searchWord = search.value.trim();
      if (searchWord === '' && searchWord === undefined) return TodoList; 
      return TodoList.filter( (item)  => {return item.item_name.includes(search.value) 
    })});console.log('computed this ' + Search_TodoList + 'This Word' + search.value);
    return { Search_TodoList ,search};
    //}
    //)
  }
  //}
  );

//インクリメンタルサーチ成功例
    // export  var Search_TodoList = computed ( () => {
    //   let searchWord = search.value.trim()
    //     if (searchWord === '') return users; 
    //    return TodoList.filter(item  => {return TodoList.item_name.includes(search.value) 
    //  })});

//inject.privide方式
export  function useTodo() {
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