import axios from "axios";
import { reactive } from "vue";
import type { TodoItems } from "../models/TodoItems";

class TodoService {
  // RESTAPI URL
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private RESTAPI_URL = "/api/todo/";
  // タスクリスト
  
  private TodoList: TodoItems[] = reactive([]); 

  //削除フラグのあるものをこの世から消し去る
  private getFilter = () => this.TodoList.filter( (item) => { return item.is_deleted === 0 } );

  // タスクを取得する。
  get todoItmes(): TodoItems[] { 
    return this.getFilter()
  }
  // 全タスクを取得する。
  public getAllTasks(): void {
    axios.get<TodoItems[]>(this.RESTAPI_URL).then((res) => {
      Array.prototype.push.apply(this.TodoList, res.data);
      console.log(res.data);
    });
  }
  // タスクを完了する。
  public getInComplete(): void {
    fetch.get<TodoItems[]>(this.RESTAPI_URL).then((res) => {
      Array.prototype.push.apply(this.TodoList, res.data);
      console.log(res.data);
    });
  }


}
export default new TodoService();