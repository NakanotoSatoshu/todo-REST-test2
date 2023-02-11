<script setup lang="ts">
import { reactive, ref,computed,PropType } from 'vue';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import tra from '../services/TrantisonService';
import type {TodoItems} from "../models/TodoItems";
import type{ Task } from "../models/Task";

dayjs.locale(ja);

const props = defineProps<{modalEdit: boolean }>();

const emit = defineEmits<{
  (eventName: "complete", id?: number ,item?: any): any;
  (eventName: "incomplete", id?: number , item?:any): any;
  (eventName: "delete", id?: number): void;
  (transName: "comp",id?:number): any;
}>();

const modalEdit =  ref(props.modalEdit);

</script>

<template>


 <div class="animated  fadeInLeft"	id="" v-show="modalEdit">
 <h5>おいしいよ！</h5>
									<img src="src\assets\tk213-2.jpg" />
              </div>
              
</template>