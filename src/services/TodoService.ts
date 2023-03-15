import axios from "axios";
import { reactive ,computed} from "vue";
//import { storeToRefs } from 'pinia';
import type { TodoItems } from "../models/TodoItems";
import type { UsersModel } from "../models/TodoItems";
//import { Task } from "../models/Task";
//import { useTodo } from '../store/TodoList';
//import { useStoreTodo } from '../store/TodoList';


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
  //private TodoList = inject('todoProvide');
  //private tasks: Task[] =            reactive([]);
  private TodoList: TodoItems[] =    reactive([]); 
 // private TodoList  = storeToRefs(useStoreTodo());
  private UsersList: UsersModel[] =  reactive([]);

  //削除フラグのあるものをこの世から消し去る
  private getFilter = () => this.TodoList.filter( (item) => { return item.is_deleted === 0 });
 
  public  GetSearch (param : any) : void { this.TodoList.filter(item => { return   this.TodoList.includes(param) }
   ); console.log('slice' + this.TodoList);};
  
  public  GetSearch2 = computed (  (param : any) => {this.TodoList.filter( item => { return   this.TodoList.includes(param)}
  );  console.log('slice' + this.TodoList);});

  // タスクをこの地球上から取得する。// サーチでも使えるようにサーチメソッドを導入し、ストアでグローバル管理か？
  get todoItmes(): TodoItems[] {  return this.getFilter() };
  // ユーザーをこの地球上から取得する/// サーチでも使えるようにサーチメソッドを導入し、ストアでグローバル管理か？
  get users(): UsersModel[] { console.log('getMoreUser' ); return this.UsersList     };
  
  // 検索する。
  public Search(param?: String): void  { const query = param;
    console.log('Fi');
    if (query !== undefined) {
      axios
      .post(this.RESTAPI_URL + '/search/' + param ,{ withCredentials:true} )
      .then((res) => { console.log(res)  ;  console.log('ok!!' + query);  })
      .catch( (error) => console.log(error) );console.log('error' + query);
    }
  } 
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
  // public deleteTask(id?: number): void {
  //   const index = this.tasks.findIndex((t) => t.id === id);
  //   if (index !== undefined) {
  //     this.tasks.splice(index, 1);
  //     axios.delete(this.RESTAPI_URL  + id);
  //   }
  // }

  // 投稿する。
  public postEntry(formData?: any): void  { const toEntry = formData;
    console.log('Comon');
    if (toEntry !== undefined) {
      axios
      .post<TodoItems[]>(this.RESTAPI_URL + 'entry' , formData,{ withCredentials:true} )
      .then((res) => { console.log(res)  ;  console.log('ok!!' + formData);  })
      .catch( (error) => console.log(error) );console.log('error' + formData);
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
  if (toEdit !== undefined && toItems !== undefined) { 
    ////JSでのDateがNullの場合invailddate表示を防ぐ
   //  if(){    }
    axios
    .post<TodoItems[]>(this.RESTAPI_URL + 'edit/' +  id, formData,{ withCredentials:true})
    .then((res) => {  console.log(res.statusText); console.log('ok!!' + formData);   })
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