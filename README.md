# RESTfullTODOアプリです。
これからやること（Todo）を項目として登録でき、複数のTodoで構成されたリストを他のユーザーと共有できるWebアプリケーションを作成しました。Springについて学習しながら作成し、基本的な機能は備わっています。主に、フロントエンドはJavaScriptのフレームワークであるVue、バックエンドはJavaのフレームワークであるSpringで作成しました。

<p align="center"><img src="doc\ScShot 2023-04-04 153300.png" width="830"></a></p>

## 実装環境

**バックエンドミドルウェア**
- Java:11 
- Spring Boot : 2.7.3

**データベースサーバー**
- MySQL : 8.0

**フロントエンド**
- Vue.js:3.2.45
- TypeScript:4.9.3
- @fortawesome/vue-fontawesome: 3.0.0-5
- GoogleFont
- Bootstrap5:
   - startbootstrap-sb-admin:7.0.5
- animate.css: 4.1.1
- axios: 1.2.3
- dayjs: 1.11.7
- pinia: 2.0.33
- vue-i18n: 9.3.0-beta.16
- vue-router: 4.1.6
- sass: 1.32.13

**ビルドツール**
- vite:4.0.0

## 工夫した点
画面遷移なしでアプリケーションを使っていただけるように工夫しました。またサーバーと最低限の情報で通信を行えるようにしました。
具体的には、VueのRooter、Pinea、またAxiosを利用してJson形式でサーバーとやり取り行えるようにしました。
サーバー側ではJson型式で送られてきたデータをRestAPIの仕組みを利用してデータベースに対して操作を行えるようにしております。
またCSSが冗長になりそうだったので、SASSの仕組みを利用してコンパクトにコーディングをするよう心がけました。
学習しながら作ったので、少し動作が重いところがありますので、リファクタリングしながら技術向上を図っていきたいと思っています。

- 完了させるという点でわかりやすく一目でわかりやすくデザインしました。
- クロスオリジン共有に苦労した
- SpringのREST化に苦労
- SpringSecurityの設定が難しかったのですが実装できました。

**ユーザー利用環境**

レスポンシブデザインとなっていますので、スマホやタブレットにも対応しています。
他にもユーザーに親しみやすいデザインを心がけて作成しております。


## 機能

至ってシンプルなTODOアプリです。

<li>ログインログアウト機能</li>
<li>作業情報登録・完了・削除・更新・検索機能</li>

## 課題点

<li>インクリメンタルサーチなど実装していきたいです。</li>
<li>多少のバグが存在します。</li>
<li>ユーザー新規登録などやOAuth2.0といった他Googleアカウントなどと連携も実装を考えています。</li>

**今後整理しながらモダンフロントエンドを目指していきたいです。**















