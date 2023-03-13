import axios from "axios";
import { reactive ,ref,computed, readonly,inject,provide} from "vue";
import type { TodoItems } from "../models/TodoItems";
import { defineStore } from 'pinia';

//pinia方式
export const useStoreTodo = defineStore('TodoPinia', {
    state: () => ({items: [],   }),
    actions: { SearchTodoPinia(product:any) { const param = this.items.find((todo) => todo.id === product.id);
       // if (todo) {
       //   todo.quantity++;
       // } else {
       //   this.todo.push({ ...product, quantity: 1 });
       //  }  
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
  
    function matches(q, todo) {
      // todoが検索クエリqにマッチするかどうかを返す関数
    }
  
    const matched = computed(() => todoStore.items.filter(
      item => matches(query.value, item)
    ));
  
    return { query, matched };
  }
const todoStore = useTodo();
provide('todoProvide', todoStore);