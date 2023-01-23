import axios from "axios";
import { reactive } from "vue";
import type { TodoItems } from "../models/TodoItems";

class TodoService {
  // RESTAPI URL
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private RESTAPI_URL = "/api/todo/";
  // タスクリスト
  
  private TodoList: TodoItems[] = reactive([]); 


  // タスクを取得する。
  get todoItmes(): TodoItems[] {
    return this.TodoList;
  }
  // 全タスクを取得する。
  public getAllTasks(): void {
    axios.get<TodoItems[]>(this.RESTAPI_URL).then((res) => {
      Array.prototype.push.apply(this.TodoList, res.data);
      console.log(res.data);
    });
  }
  
}
export default new TodoService();