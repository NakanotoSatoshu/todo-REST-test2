<script lang="ts">
import {inject,provide} from 'vue'

// ロケールのインポート
import 'dayjs/locale/ja'
import dayjs from "dayjs";
import { icon } from "@fortawesome/fontawesome-svg-core";

// ロケール設定
//DATEフォーマット
const format =  (date: string | number | Date | dayjs.Dayjs | null | undefined) => { let created_at = dayjs(date).format('YYYY年M月DD日'); return created_at      };

// メニュー用のinterfaceを追加
export interface MenuItem {
  type: "heading" | "menu";
  title: string;
  icon?: string;
  url?: string;
}

</script>

<script setup lang="ts">
import { ref ,reactive,toRefs,computed} from "vue";
import { defineStore ,storeToRefs } from 'pinia';
import { useStoreSearchTodo } from '../store/StoredTodoList';
import { RouterView, useRouter } from "vue-router";
import todoService from "../services/TodoService";

// タイトルとメニューアイテムを設定できるようにする。
defineProps<{ title: string; menuItems: MenuItem[] }>();

// const emit = defineEmits<{
//   (eventName: "search", searchword2?: any): any;
// }>();

//const param = ref('');
//const searchword = toRefs(reactive({  }) );
//const searchword = ref('');
//provide('search', searchword.value);
const {search} = storeToRefs(useStoreSearchTodo());
console.log('@Navi' + search.value);

//Pinia方式検索メソッド値props以外で・・検索ワードでストア管理しているコンピュートされたものがここにくる
//TodoliSTをグローバルにしないとめんどくさい
// const GetSearch2 = computed (  (param : any) => { TodoList.filter( item => { return   TodoList.includes(param)}
//   );  console.log('sliced' + TodoList);});
//const searchword2  = searchword.value.trim;
//console.log(searchword2);
//const search = todoService.GetSearch(searchword.value);
//const EntryOpen = ref(false);
//const test = todoService.Search();

const router = useRouter();

const isToggle = ref(false);

const goToUrl = (url?: string) => {
  if (url != undefined) {
    router.push(url); }
};
</script>

<template>
  <!-- js/script.jsを参考にbodyにtoggleを追加 -->
  <body class="sb-nav-fixed" :class="isToggle ? 'sb-sidenav-toggled' : ''">
    <nav class="sb-topnav navbar navbar-expand navbar-light bg-light McShadow">
      <!-- titleを可変にし、hrefをrouterで切り替えるように修正 -->
      <a class="navbar-brand ps-3 " @click="goToUrl('/home')">{{ title }}</a>
      <!-- isToggleでスライドバーの表示/非表示を切り替える -->
      <button id="sidebarToggle" class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 " @click="isToggle = !isToggle">
        <i class="fas fa-bars"></i>
      </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active ">
                </li>
                <li class="nav-item ">
                    <a class="nav-link mr-2  p-1 mb-2  rounded border-bottom-0" >タスク追加</a>
                </li>
            <li>
              <div class="mr-2  p-2 mb-2  rounded border-bottom-0 iPhoneSE2" text="">
            現在日時
          </div>
            </li>
            <li>
            <div class="mr-2  p-2 mb-2  rounded border-bottom-0 iPhoneSE2" text="">{{dayjs().format('YYYY年M月DD日')}}</div>
            </li>
            <li>
            <form class="form-inline my-2 my-lg-0" >
                <li>
                <!-- #####################検索フォーム#################### -->
                <input class="form-control mr-sm-2 m-1 p-2 iPhoneSE2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search" 
                v-model="search"
               
                >
                </li>
                <li>
                  <!-- #####################インクリメンタルサーチ発火#################### -->
                <button class="btn btn-outline-dark m-4 my-sm-1  p-2 iPhoneSE2" type="submit" 
                >検索</button>
                {{ search }}
               
              </li>
            </form>
            </li>
            <li>
              <a class="btn btn-outline-dark my-2 my-sm-1  p-2 iPhoneSE2" href="http://localhost:8080/logout">ログアウト</a>
            </li>
          </ul>
        </div>  
      <!-- 不要な項目は削除 -->
    </nav>
    <div id="layoutSidenav">
      <!-- #####################サイドバー#################### -->
      <div id="layoutSidenav_nav">
        <nav id="sidenavAccordion" class="sb-sidenav accordion sb-sidenav-light">
          <div class="sb-sidenav-menu">
            <!-- menuItemsからメニューが生成されるように修正, サブメニューも改良すれば対応可能 -->
            <div v-for="(item, index) in menuItems" :key="index" class="nav">
              <div v-if="item.type == 'heading'" class="sb-sidenav-menu-heading">{{ item.title }}</div>
              <a v-if="item.type == 'menu'" class="nav-link" @click="goToUrl(item.url)">
                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt" :class="item.icon"></i></div>
                {{ item.title }}
              </a>
            </div>
          </div>
        </nav>
      </div>
      <!-- #####################コンテンツ部分#################### -->
      <div id="layoutSidenav_content">
        <section class="" id="">
            <!-- コンテンツをrouter-viewに変更 -->
            <!-- この中にMainAppが入ります ------------------------->
            <router-view />
        </section>
        <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright © Your Website 2022</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                ·
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
      </div>
    </div>
  </body>
  
</template>