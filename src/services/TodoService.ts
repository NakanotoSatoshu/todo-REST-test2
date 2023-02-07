import axios from "axios";
import { reactive } from "vue";
import type { TodoItems } from "../models/TodoItems";
import { Task } from "../models/Task";


//CRUD単体テストのAPI津kる

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
  
  // タスクを削除する。
  public deleteTask(id?: number): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index !== undefined) {
      this.tasks.splice(index, 1);
      axios.delete(this.RESTAPI_URL  + id);
    }
  }

 // 完了する。
 public postComplete(id?: number,item?: any): void  {
  const toComplete = id;
  if (toComplete !== undefined) {
   // Complete.finished_date = !Id.id;
    axios
    .post(this.RESTAPI_URL + id, 
      { withCredentials:         true} ,  
      { headers:         { 'Content-Type': 'application/json;charset=UTF-8',}})
    //.then((res) => { console.log(res.data) })
    .then((res) => {
      item.finished_date = true;
      /* 　　セレクタもVue化できたら　　*/
      /* obj.textContent = "未完了";
      obj.setAttribute('href','/incomplete/' + global );
      obj.classList.remove('btn-complete','btn-dark');
      obj.classList.add('btn-incomplete','btn-outline-dark');
      obj.closest("tr");
      obj.parentNode.parentElement.parentElement.parentElement.classList.add('inComp');
      obj.parentNode.parentNode.parentNode.parentNode.firstElementChild.classList.remove('btn-outline-warning');
      obj.parentNode.parentNode.parentNode.parentNode.firstElementChild.classList.add('btn-lg'); */
       /* 　　　アニメーション処理　　　Vueトランジション使いたい 
      obj.classList.toggle('swing');
      //obj.parentNode.parentElement.parentElement.parentElement.classList.add('animated' );
      obj.parentNode.parentElement.parentElement.parentElement.classList.toggle('bounce');　　　*/
    })
    .catch( (error) => console.log(error)
    );
  }
}
// 完了しない。
public postInComplete(id?: number , item?:any): void  {
  const toInComplete = id;
  if (toInComplete !== undefined) {
   // Complete.finished_date = !Id.id;
    axios
    .post(this.RESTAPI_URL + 'in' + id, 
      { withCredentials:true} ,  
      { headers:{ 'Content-Type': 'application/json;charset=UTF-8',}})
    .then((res) => { 
      item.finished_date = null;
    })
    .catch( (error) => console.log(error)
    );
  }
}
}

export default new TodoService();