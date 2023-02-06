import axios from "axios";
import { reactive ,ref,computed} from "vue";
import type { TodoItems } from "../models/TodoItems";
import { Task } from "../models/Task";

class trantisonService {

//完了日があるつまり完了してるやつ
public isNull = (d: Date | undefined ) => { if(null === d){ return true  }else{  return false }};

//完了日がないつまり未完了してるやつ
public hasNull = (d: Date | undefined ) => {if(null === d){ return false }else{ return true   }};

    public testEnter = (element: any) => {
       // element.textContent = "王将"; 
       // console.log("うひょおおおおおおおおおおおおおおおおおおおおおおおお");
        // const height = getComputedStyle(element).height;
        // element.style.height = 0;
        // getComputedStyle(element);
        // setTimeout(() => {
        //     element.style.height = height;
        // });
    };
    public testLeave = (element:any) => {
        //element.textContent = "王将"; 
    };

   //完了アニメ
//    public async transComp   (el: Element, done: () => void) { 
//     el.classList.add("overflow-hidden"); 
//     el.textContent = "未完了";
//     await el.animate(  
//     [{ height: 0, }, 
//      { height: `${(el as HTMLElement).offsetHeight}px`,},
//     ],
//     { duration: 500, easing: "ease-out",}
//     )
//     .finished;
//     el.classList.remove("overflow-hidden");
//     done()};
//   // 未完了アニメ
//   public async  transInComp  (el: Element, done: () => void) { el.classList.add("overflow-hidden"); el.textContent = "完了";
//     await el.animate([{ height: `${(el as HTMLElement).offsetHeight}px`,},{height: 0,},],
//       {duration: 500,easing: "ease-out",}).finished;
//     el.classList.remove("overflow-hidden");
//     done();}

}

export default new trantisonService();