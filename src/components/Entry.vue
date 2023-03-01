<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ EntryOpen: boolean }>();

const emit = defineEmits<{
  (eventName: "add", newTaskTitle: string): void;
}>();

const entryOpen = ref(false);

const EntryToggle = () => { entryOpen.value === !entryOpen.value  }
const newTaskTitle = ref("");

const addTask = () => {
  // テキストが1文字以上のとき、イベントを起こす。
  if (newTaskTitle.value.length > 0) {
    emit("add", newTaskTitle.value);
    newTaskTitle.value = "";
  }
};

defineExpose({
    EntryToggle
});
</script>

<template>
 <div v-show="entryOpen">
  <form class="form-floating">
    <input v-model="newTaskTitle" type="text" class="form-control mt-4" placeholder="Add Task"
     @keydown.enter.prevent="addTask()" />
    <label>Add Task</label>
  </form>
</div>
</template>