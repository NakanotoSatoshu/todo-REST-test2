import axios from "axios";
import { reactive } from "vue";
import type { TodoItems } from "../models/TodoItems";
import type { UsersModel } from "../models/TodoItems";
import { Task } from "../models/Task";

class TodoService {
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
  private tasks: Task[] =            reactive([]);
  private TodoList: TodoItems[] =    reactive([]); 
  private UsersList: UsersModel[] =  reactive([]);

  //削除フラグのあるものをこの世から消し去る
  private getFilter = () => this.TodoList.filter( (item) => { return item.is_deleted === 0 } );
  
  // タスクをこの地球上から取得する。
  get todoItmes(): TodoItems[] {  return this.getFilter() };
  // ユーザーをこの地球上から取得する
  get users(): UsersModel[] { console.log('getMoreUser' ); return this.UsersList     };

  // 全ユーザーを地球上から取得する。
  public getAllUsers() : void { axios
    .get<UsersModel[]>(this.RESTAPI_URL + 'home')
    .then((res) => { Array.prototype
    .push.apply(this.UsersList, res.data);
     console.log('getUser');
  });}

  // 全タスクを地球上から取得する。
  public getAllTasks() : void {axios
      .get<TodoItems[]>(this.RESTAPI_URL)
      .then((res) => { Array.prototype
      .push.apply(this.TodoList, res.data);
    // console.log(res.data);
  });}
  
  // お手本のタスクを削除する。
  public deleteTask(id?: number): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index !== undefined) {
      this.tasks.splice(index, 1);
      axios.delete(this.RESTAPI_URL  + id);
    }
  }
  // 投稿する。
  public postEntry(formData?: any): void  { const toEntry = formData;
    console.log('Comon');
    if (toEntry !== undefined) {
      axios
      .post(this.RESTAPI_URL + 'entry' , { withCredentials:true},{ headers:{ 'Content-Type': 'application/json;charset=UTF-8',}})
      .then((res) => { console.log(res)  ;  console.log(formData);  })
      .catch( (error) => console.log(error) );console.log(formData);
    }
  } 
 // 削除する。
 public postDelete(id?: number): void  { const toDelete = id;
  if (toDelete !== undefined) {
    axios
    .post(this.RESTAPI_URL + '/delete/' +  id,{ withCredentials:true},{ headers:{ 'Content-Type': 'application/json;charset=UTF-8',}})
    .then((res) => { console.log(res)      })
    .catch( (error) => console.log(error)  );
  }
}
// 編集する。
public postEdit(id?: number , formData?: any ): void  { const toEdit = id; const toItems = formData ;
 // console.log(toEdit + 'きちゃあああああああああ' + item )
  if (toEdit !== undefined && toItems !== undefined) { axios
    .post<TodoItems[]>(this.RESTAPI_URL + 'edit/' +  id, formData,{ withCredentials:true})
    .then((res) => {  console.log(res.statusText);    })
    .catch( (error) => console.log(error + 'false')                          );
  }
}
// 完了する。
public postComplete(id?: number,item?: any): void  { const toComplete = id;
  if (toComplete !== undefined) { axios
    .post( this.RESTAPI_URL + id, { withCredentials:true},{ headers:{ 'Content-Type': 'application/json;charset=UTF-8',}})
    .then((res) => { item.finished_date = true; console.log(res.data);  })
    .catch( (error) => console.log(error)                               );
  }
}
// 完了しない。
public postInComplete(id?: number , item?:any): void  { const toInComplete = id;
  if (toInComplete !== undefined) { axios
    .post(     this.RESTAPI_URL + 'in' + id,{ withCredentials:true},{headers:{ 'Content-Type': 'application/json;charset=UTF-8',}})
    .then((res) =>      {     item.finished_date = null;  })
    .catch( (error) =>            console.log(error)       );
  }
}



}
export default new TodoService();