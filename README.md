# アプリケーション名
    Task-Manager フロントエンド (シンプル設計のTodoアプリ)
<img width="650" src="https://github.com/user-attachments/assets/5d76e794-35e1-46e4-875a-b1af501044ff">




## 概要説明
- 仕事用タスクとプライベート用タスクを分けられるTODOアプリ




## 作成目的
- Vue.jsでの基本的なCRUD操作やAPIとの連携を学習するため

- 日常的にメモすることが多く、メモ帳と分けてTodoリストを管理すれば便利になると思ったため




## フロントエンドの役割
- 1.バックエンドAPIとの連携
    Task manager アプリのフロントエンドとして、バックエンドAPIと連携し、ユーザーにUI,UXを提供する。

- 2.UI / UX の提供
    ユーザーが直感的に操作できる シンプルなデザイン の実装
    レスポンシブ対応（スマホ・PC どちらでも快適に利用可能）
    Light mode と Dark mode でテーマの切り替え

- 3.API 通信
    ユーザー登録、ログイン、ログアウト管理
    プロフィールの編集、削除
    タスクの取得・作成・更新・削除 のリクエストをバックエンドに送信
    認証済みユーザーのみがタスクを管理できるよう制御

- 4.状態管理（アプリのデータ管理）
    Pinia を使用し、ユーザー情報・タスクデータをリアクティブに管理
    ローカルストレージのキャッシュを活用して無駄なAPIリクエストを削減
    リアルタイムでデータを更新し、スムーズな操作性を実現

- 5.エラーハンドリング & セキュリティ
    API通信の エラーハンドリング（ネットワークエラー・認証エラーなどを適切に処理）
    未ログインユーザーの制限（タスクの閲覧や管理はログイン済みのユーザーのみ可能）
    入力バリデーションの実装（不正なタスクデータが送られないようにチェック）

- 6.認証情報の管理
    認証トークンを`HttpOnly cookie`で管理




## アプリケーションURL
##### ローカル環境
`http://localhost:5173/`




## 機能一覧
- ユーザー認証機能
    - 新規登録・ログイン・ログアウト (laravel Fortify)
    - 認証トークンは `HttpOnly Cookie` で管理

- ユーザー管理機能
    ユーザー情報の取得・編集・削除
    Profileでのユーザー情報の編集は一部のみの更新も可能

- タスク管理機能
    タスクの作成・取得・編集・削除
    タスクを「本日のタスク」「仕事用」「個人用」に分類
    タスクの操作は認証ユーザーのみ可能
    リアルタイム更新 と 確認用ダイアログ表示

- テーマの切り替え
    Light Mode / Dark Modeの切り替えが可能
    ローカルストレージを使用し選択したテーマを維持




## 詳細内容
- ユーザー認証機能
    新規登録時は名前・メールアドレス・パスワードを入力
    ログイン時は名前・メールアドレス・パスワードを入力
    認証情報はhttponly cookieでトークンを管理して認証保持
    認証が失われると再度ログインして認証トークンをhttponly cookieで管理

- ユーザー管理機能
    ユーザー情報はPiniaで管理して認証保持
    ログイン状態でProfileページにて登録内容の確認が可能
    ログイン状態でProfileページから削除と編集が可能
    ユーザー情報の編集は更新したい項目だけ更新可能

- タスク管理機能
    タスク内容はPiniaで管理してデータ保持
    タスクの閲覧・管理は認証ユーザーのみ可能
    タスクの作成・編集・削除時はリアルタイムで反映
    タスクの作成・編集・削除時は確認ダイアログを表示

- テーマの切り替え
    ローカルストレージを利用して選択したテーマを維持




## 使用技術
- Vue 3.5 (Composition API)
- Pinia (状態管理)
- Tailwind CSS (スタイリング)
- Vite (ビルドツール)
- Prettier / ESLint (コードフォーマット & 静的解析)
- Font Awesome（アイコン）（CDN）
- Google Fonts（フォント）（CDN）




## セットアップ & 起動手順

- 1.リポジトリをクローン
```sh
git clone https://github.com/Okazuma/task-manager-frontend.git
cd task-manager-frontend
```

- 2.依存パッケージのインストール
```sh
npm install
```

- 3..env ファイルの作成
```sh
cp .env.example .env
```

- 4..env の設定
```env
VITE_API_BASE_URL = http://localhost/api
```


- 5.開発サーバーの起動
```sh
npm run dev
```



### 開発サーバーが起動しない場合
- .env の VITE_API_BASE_URL を正しく設定

- Laravel バックエンドが http://localhost:8000 で起動していることを確認




### トラブルシューティング
- npm install でエラーが発生する場合
```sh
rm -rf node_modules package-lock.json
npm install
```

- ポート 3000 がすでに使用されている場合
    他のアプリが 5173 番ポートを使用していないか確認
```sh
npx kill-port 5173
```