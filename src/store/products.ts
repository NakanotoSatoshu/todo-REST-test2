import { defineStore } from 'pinia';
import shop from '../api/shop.js';

export const useStoreProducts = defineStore('products', {
  state: () => ({ products: [], }),
  actions: { getProducts() { shop.getProducts((products:any) => (this.products = products)); },},
});