import axios from "axios";
import { reactive } from "vue";
import type { TodoItems } from "../models/TodoItems";
import { Task } from "../models/Task";

class TodoService {
  // RESTAPI URL
  // eslint-disable-next-line @typescript-eslint/naming-convention
  
  private service = axios.create({
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    withCredentials: true,
  })

  private RESTAPI_URL = '/api/todo/';
  
  // タスクリスト
  private tasks: Task[] = reactive([]);
  private TodoList: TodoItems[] = reactive([]); 

  //削除フラグのあるものをこの世から消し去る
  private getFilter = () => this.TodoList.filter( (item) => { return item.is_deleted === 0 } );
  
  // タスクをこの地球上から取得する。
  get todoItmes(): TodoItems[] {  return this.getFilter() };

  // 全タスクを地球上から取得する。
  public getAllTasks() : void {
    axios.get<TodoItems[]>(this.RESTAPI_URL)
      .then((res) => { Array.prototype.push.apply(this.TodoList, res.data);
    // console.log(res.data);
    });
  }
  
  // お手本のタスクを削除する。
  public deleteTask(id?: number): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index !== undefined) {
      this.tasks.splice(index, 1);
      axios.delete(this.RESTAPI_URL  + id);
    }
  }
 // 削除する。
 public postDelete(id?: number): void  { const toDelete = id;
  if (toDelete !== undefined) {
    axios
    .post(this.RESTAPI_URL + '/delete/' +  id, 
      { withCredentials:         true} ,  
      { headers:         { 'Content-Type': 'application/json;charset=UTF-8',}})
    .then((res) => { console.log(res)      })
    .catch( (error) => console.log(error)  );
  }
}
// 編集する。
public postEdit(id?: number , item?:any ): void  {
  const toEdit = id;
  if (toEdit !== undefined) {
   // Complete.finished_date = !Id.id;
    axios
    .post(this.RESTAPI_URL + '/edit/' +  id, 
      { withCredentials:         true} ,  
      { headers:         { 'Content-Type': 'application/json;charset=UTF-8',}})
    //.then((res) => { console.log(res.data) })
    .then((res) => {
    
    })
    .catch( (error) => console.log(error)
    );
  }
}
// 完了する。
public postComplete(id?: number,item?: any): void  { const toComplete = id;
  if (toComplete !== undefined) { axios
    .post( this.RESTAPI_URL + id, 
      { withCredentials:         true} ,  
      { headers:         { 'Content-Type': 'application/json;charset=UTF-8',}})
    .then((res) => {     item.finished_date = true; console.log(res.data);  })
    .catch( (error) => console.log(error)           );
  }
}
// 完了しない。
public postInComplete(id?: number , item?:any): void  { const toInComplete = id;
  if (toInComplete !== undefined) { axios
    .post(     this.RESTAPI_URL + 'in' + id, 
      { withCredentials:true} ,  
      { headers:{ 'Content-Type': 'application/json;charset=UTF-8',}})
    .then((res) =>      {     item.finished_date = null;  })
    .catch( (error) =>            console.log(error)       );
  }
}



}
export default new TodoService();