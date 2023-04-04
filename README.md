#RESTfullTODOアプリです。

フロントエンドのWeb APIにVue3を使い、バックエンドのREST APIをSpringで構築しました。


# 実装環境
開発環境
バックエンド
サーバー：Java11 Spring Boot2.7.3
DB:MySQL

フロントエンド
HTML＆CSS(Saas)
JavaScript(Vue3.2.45:TypeScript4.9.3)
ビルドツール:vite4.0.0
FontAwesome
GoogleFont
Bootstrap5

工夫した点
画面遷移なしでアプリケーションを使っていただけるように工夫しました。またサーバーと最低限の情報で通信を行えるようにしました。
具体的には、VueのRooter、Pinea、またAxiosを利用してJson形式でサーバーとやり取り行えるようにしました。
サーバー側ではJson型式で送られてきたデータをRestAPIの仕組みを利用してデータベースに対して操作を行えるようにしております。
またCSSが冗長になりそうだったので、SASSの仕組みを利用してコンパクトにコーディングをするよう心がけました。
学習しながら作ったので、少し動作が重いところがありますので、リファクタリングしながら技術向上を図っていきたいと思っています。

未を主張させた
# ユーザー利用環境

　レスポンシブデザインとなっていますので、スマホやタブレットにも対応しています。






















# Vue 3 + TypeScript + Vite
This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
