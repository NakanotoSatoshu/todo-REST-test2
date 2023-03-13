<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStoreCart } from '../store/cart';

const { items } = storeToRefs(useStoreCart());
</script>
<template>
  <h2>カートの中身</h2>
  <p v-show="!items.length"><i>カートに商品は入っていません。</i></p>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.title }} - ¥{{ item.price.toLocaleString() }}
      {{ item.quantity }}
    </li>
  </ul>
</template>