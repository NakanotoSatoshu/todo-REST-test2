<script setup lang="ts">
import { reactive, ref,computed,PropType } from 'vue';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import tra from '../services/TrantisonService';
import type {TodoItems} from "../models/TodoItems";
import type{ Task } from "../models/Task";

dayjs.locale(ja);

const props = defineProps<{ modalEdit: boolean }>();

const modalEditToggleChild = () => { modalEdit.value = !modalEdit.value; };
const showS = ref(false);
const modalEdit = ref(false);
defineExpose({
  modalEditToggleChild
});
//const modalEdit2 = ref(props.modalEdit);console.log(props.modalEdit);
const modalEdit3 = ref(props.modalEdit);console.log(props.modalEdit);
//console.log(modalEdit2.value);
</script>

<template>
   
              <transition
  								enter-active-class="transition duration-100"
  								enter-from-class="transform opacity-0 -translate-y-2 "
  								leave-active-class="transition duration-100"
 								 leave-to-class="transform opacity-0 -translate-y-2">	
             <div class="animated  fadeInLeft"	v-show="modalEdit" >
                    <h5>おいしいよ！</h5>
									<img src="src\assets\tk213-2.jpg" />
                  </div>
             </transition>

              
</template>