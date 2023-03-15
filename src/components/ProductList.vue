<script setup lang="ts">
import { onMounted} from 'vue';
import {  storeToRefs } from 'pinia';
import { useStoreProducts } from '../store/products';
import { useStoreCart } from '../store/cart';


const { products } = storeToRefs(useStoreProducts());
const { getProducts } = useStoreProducts();
const { addCart } = useStoreCart();

onMounted(() => {
  getProducts();
});
</script>

<template>
   <ul>
    <li v-for="product in products" v-bind:key="product.id">
      {{ product.title }} - ¥{{ product.price.toLocaleString() }}
      <button @click="addCart(product)" :disabled="!product.inventory">
        カートへ
      </button>
    </li>
  </ul>
</template>

