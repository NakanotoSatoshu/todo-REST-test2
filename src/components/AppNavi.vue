<script lang="ts">
import {inject} from 'vue'

// ロケールのインポート
import 'dayjs/locale/ja'
import dayjs from "dayjs";

// ロケール設定
//DATEフォーマット
const format =  (date: string | number | Date | dayjs.Dayjs | null | undefined) => { let created_at = dayjs(date).format('YYYY年M月DD日') 
				                                                                     return created_at      };

// メニュー用のinterfaceを追加
export interface MenuItem {
  type: "heading" | "menu";
  title: string;
  icon?: string;
  url?: string;
}
</script>

<script setup lang="ts">
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";

// タイトルとメニューアイテムを設定できるようにする。
defineProps<{ title: string; menuItems: MenuItem[] }>();

const router = useRouter();

const isToggle = ref(false);

const goToUrl = (url?: string) => {
  if (url != undefined) {
    router.push(url);
  }
};
</script>

<template>
  <!-- js/script.jsを参考にbodyにtoggleを追加 -->
  <body class="sb-nav-fixed" :class="isToggle ? 'sb-sidenav-toggled' : ''">
    <nav class="sb-topnav navbar navbar-expand navbar-light bg-light McShadow">
      <!-- titleを可変にし、hrefをrouterで切り替えるように修正 -->
      <a class="navbar-brand ps-3 " @click="goToUrl('/')">{{ title }}</a>
      <!-- isToggleでスライドバーの表示/非表示を切り替える -->
      <button id="sidebarToggle" class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" @click="isToggle = !isToggle">
        <i class="fas fa-bars"></i>
      </button>
     
      <!--   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button> -->

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active ">
                    <a class="nav-link " href="/home"> <span class="sr-only"></span></a>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" href="/entry">登録</a>
                </li>
                <li class="nav-item "></li>

                 <!--   <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> -->

					 <a class="nav-link "  id="navbar" role="button"
                        data-toggle="" aria-haspopup="true" aria-expanded="false" href="#" sec:authentication="name"></a>
							<li sec:authorize="isAuthenticated()"></li>
							<li class="nav-link">さんようこそ。</li>
                <!--   <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                         <div class="dropdown-divider"></div>
                        <form class="dropdown-item" method="post" >-->

            </ul>
            現在日時
            <div class="mr-2 shadow-lg p-1 mb-2  rounded border-bottom-0" text="">{{dayjs().format('YYYY年M月DD日')}}</div>
            <div text=""></div>
           	<div class="mr-2"></div>
            <div class="mr-2"><a class="btn btn-outline-dark my-2 my-sm-0 shadow-lg p-1" href="http://localhost:8080/logout">ログアウト</a>
                    </div>
            <form class="form-inline my-2 my-lg-0" action="/search" method="post">
                <input class="form-control mr-sm-2 shadow-lg p-1" type="search" placeholder="Search" aria-label="Search" name="str"
                    value="">
                <button class="btn btn-outline-dark my-2 my-sm-0 shadow-lg p-1" type="submit">検索</button>
            </form>
        </div>  
      <!-- 不要な項目は削除 -->
    </nav>
    <div id="layoutSidenav">
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
      <div id="layoutSidenav_content">
        <section class="" id="">
          <div class="container-fluid" >
            <!-- コンテンツをrouter-viewに変更 -->
            <router-view />
          </div>
        </section>
      </div>
    </div>
  </body>
</template>