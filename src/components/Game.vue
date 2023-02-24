<script setup lang="ts">
    import { reactive, ref,computed,PropType,watch, type Ref  } from 'vue';
    import dayjs from 'dayjs';
    import ja from 'dayjs/locale/ja';
    import tra from '../services/TrantisonService';
    //import { shuffle as _shuffle } from 'lodash-es'
    
const list = ref([{ text: '' }])
const item = ref({ text: '' })
const count = ref(0)
watch(count, () => {
  list.value = [...Array(count.value)].map(() => JSON.parse(JSON.stringify(item.value)))
})
</script>

<template>
  <div class="container-fluid px-4 McShadow">
      <h1 class="mt-4">game</h1>
    <div class="mt-1 flex justify-center">
      <!--　　　　　アニメセレクター　　　　-->
      <div>
          <select class="form-select form-select-sm mb-3" aria-label=".form-select-lg example" v-model="count">
            <option v-for="index in 100" :key="index" :value="index">
              {{ index }}
            </option>
          </select>
        </div>
        <span></span>
  <TransitionGroup class="row" name="list" tag="div">
    <!--アニメ要素-->
        <div class="col-1 "  v-for="(item, index) in list" :key="index">
          <input class=" bg-primary mt-2 p-3" v-model="item.text" />
        </div>
      
     </TransitionGroup>
    </div>
  </div>
  </template>

  <style>
    .list-enter-active,
    .list-leave-active {
      transition: all 0.5s ease-in-out;
    }
    .list-enter-from,
    .list-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }
    </style>