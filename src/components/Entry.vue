<script setup lang="ts">
import { ref,reactive } from "vue";

const props = defineProps<{ EntryOpen: boolean }>();

const emit = defineEmits<{
  (eventName: "entry",formData?:any):any;
}>();

const formData = reactive({
  id: "",
  user_id: "",
  userName: " " ,
  fullName: " " ,
  registration_date:"",
  item_name: "",
  first_name: "",
  family_name: "",
  expire_date: "",
  finished_date: "",
  is_deleted: "",
  create_date_time: "",
  update_date_time: "",
  priority: "",
  user: "",
});

const EntryOpen = ref(false);
console.log(props);
const EntryToggle = () => { props.EntryOpen === !props.EntryOpen  }

//defineExpose({
//    EntryToggle
//});
</script>

<template>
<!--  <div v-show="entryOpen === !entryOpen">  -->
  <div v-show="{EntryOpen}"> 
<!-- <div class="container"> -->
              <!-- 入力フォーム -->
              <div class="row my-2">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                      <form action="" method="post"  >
<!--------------------------------------------------------------------------------- 項目名の入力エリア -->
                        <div class="form-group" >
                            <label for="item_name">項目名</label>
                            <input type="text" class="form-control" value="" />
                        <span class="text-danger" >item_name error</span>
                        </div>
<!--------------------------------------------------------------------------------- 担当者の入力エリア -->
                         <div class="form-group" >
                            <label for="user_id">担当者</label>
                           
                        </div>
                        <div class="form-group" >
                            <label for="expire_date">期限</label>
                            <input type="date" class="form-control"	/>
                       <span class="text-danger" >expire_date error</span>
                        </div>
                          <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" >
                            <label for="finished">完了</label>
                        </div>
                        <button class="btn btn-primary" type="submit"
                        v-bind:href="'/entry'" @click="emit('entry', formData)">登録</button>
                       <button type="button" class="btn btn-default pull-right"><a href="/home">キャンセル</a></button>
                    </form>
                </div>
                <div class="col-sm-3"></div>
            </div>
            <!-- 入力フォーム ここまで -->

        </div>
        <!-- コンテナ ここまで -->

</template>