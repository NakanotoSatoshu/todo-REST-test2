import { defineStore } from 'pinia';

export const useStoreCart = defineStore('cart', {
    state: () => ({
      items: [],
    }),
    actions: {
      addCart(product:any) {
        const item = this.items.find((item) => item.id === product.id);
        if (item) {
          item.quantity++;
        } else {
          this.items.push({ ...product, quantity: 1 });
        }
      },
    },
  });