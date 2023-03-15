    
const _products = [
    { id: 1, title: 'えびアボカド', price: 93800, inventory: 23 },
    { id: 2, title: 'サラダチキン', price: 94800, inventory: 50 },
    { id: 3, title: 'ツナ', price: 239800, inventory: 32 },
  ];
  
  export default {
    getProducts(cb : any) {
      setTimeout(() => cb(_products), 100);
    },
  };