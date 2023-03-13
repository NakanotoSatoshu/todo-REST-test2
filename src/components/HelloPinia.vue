<script setup lang="ts">
import { useStoreCounter } from '../store/counter';
const counter = useStoreCounter();
</script>

<template>
  <h2>Hello Pinia</h2>
  <p>カウント:{{ counter.count }}</p>
</template>