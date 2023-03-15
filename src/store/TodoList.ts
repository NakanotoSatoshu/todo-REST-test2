import axios from "axios";
import { reactive ,ref,computed, readonly,provide} from "vue";
import type { TodoItems } from "../models/TodoItems";
import { defineStore } from 'pinia';

//pinia方式
export const useStoreTodo = defineStore('TodoPinia', {
    state: () => ({Ttems: [],   }),
    actions: { SearchTodoPinia(product:any) { const param = this.items.find((todo) => todo.id === product.id);
    }, }, });

//inject.privide方式
export function useTodo() {
  const TodoList: TodoItems[] = reactive([]);
  const firstItem = computed(() => TodoList[0] ?? null);
  function add(todo:any) {TodoList.push(todo);}
  return { TodoList: readonly(TodoList), firstItem, add };
};

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
"username": "Bret",
email:string,
"address": {
  "street": "Kulas Light",
  "suite": "Apt. 556",
  "city": "Gwenborough",
  "zipcode": "92998-3874",
  "geo": {
    "lat": "-37.3159",
    "lng": "81.1496"
  }
}}