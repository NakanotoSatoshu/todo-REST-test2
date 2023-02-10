<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{showS: boolean }>();
//console.log(props);
const show = ref(props.showS)

const toggle = () => {  show.value = !show.value; };

</script>

<template>
  <div class="accordion accordion-flush" id="accordionFlushExample" >
    <transition
  enter-active-class="transition duration-2100"
  enter-from-class="transform opacity-0 -translate-y-2 "
  leave-active-class="transition duration-4900"
  leave-to-class="transform opacity-1 -translate-y-20"
>
<div class="relative">
    <button class="rounded-full w-10 h-10 cursor-pointer btn-sm btn-outline-warning" @click="toggle" >
     <i class="fas fa-bars " ></i>
    </button>
    <div
      class="absolute top-16 right-0 z-10 w-40 py-2 bg-white rounded-sm shadow animated fadeIn" v-show="show" >
      <ul>
        <li class="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2">
          <a href="/#" class="flex items-center space-x-2">
            
            <span class="text-sm font-bold">
                <i class="fa-solid fa-truck-monster"></i>
                <i class="fa-solid fa-calendar-days"></i></span></a
          >
        </li>
        <li class="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2">
          <a href="/#" class="flex items-center space-x-2">
          
            <span class="text-sm font-bold">
                <i class="fa-solid fa-bowl-chopsticks-noodles"></i>
                <i class="fa-solid fa-trash"></i></span></a
          >
        </li>
      </ul>
    </div>
  </div>
</transition>
</div>
        
</template>