<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{showS: boolean }>();
//console.log(props);
const show = ref(props.showS)

const toggle = () => {  show.value = !show.value; };
const showNow = (show.value ) === true; 
</script>

<template>
  <div class="accordion accordion-flush" id="accordionFlushExample" >
 <transition
            enter-active-class="transition duration-2100"
              enter-from-class="transform opacity-0 -translate-y-2 "
                 leave-active-class="transition duration-4900"
              leave-to-class="transform opacity-1 -translate-y-15">
            <div class="relative">
                      <button class="rounded-full w-10 h-10 cursor-pointer btn-sm btn-light" @click="toggle" >
                           <i class="fas fa-bars " ></i>
                     </button>
            <div  class="absolute top-16 right-0 z-10 w-100 py-2 animated fadeIn" v-show="show" >
              <ul class="flex items-center justify-between">
                  <li class="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2">
                    <a href="/#" class="flex items-center space-x-2"> 
                      <button class="shadow-lg p-1 mb-1 rounded btn-complete btn-lg btn-light" >
                        <i class="fa-solid fa-power-off"></i>
                      </button></a>
                    <a href="/#" class="flex items-center space-x-2"> 
                      <button class="shadow-lg p-1 mb-1 rounded btn-complete btn-lg btn-light" >
                        <i class="fa-solid fa-calendar-days"></i>
                      </button></a>
                    <a href="/#" class="flex items-center space-x-2"> 
                      <button class="shadow-lg p-1 mb-1 rounded btn-complete btn-lg btn-light" >
                        <i class="fa-solid fa-trash"></i>
                      </button></a>  
                  </li>
                  <!-- <li class="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2">
                      <a href="/#" class="flex items-center space-x-2">
                       <span class="text-sm font-bold"></span></a>
                      <span class="text-sm font-bold">  </span>  
        </li>-->
      </ul>
    </div>
  </div>
</transition>
</div>
        
</template>