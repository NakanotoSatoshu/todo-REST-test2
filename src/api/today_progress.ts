    
const GlobalMessages = [
    { date:'',today_progress: '' },

  ];
  
  export default {
    getProducts(cb : any) {
      setTimeout(() => cb(GlobalMessages), 100);
    },
  };