    
const GlobalMessages = [
    { date:'9999',today_progress: 'なんだ馬鹿野郎' },

  ];
  
  export default {
    getProgeress(callbackIsMuzui : any) {
      setTimeout(
        function(){
        callbackIsMuzui(GlobalMessages), 100
      }
      );
    },
  };