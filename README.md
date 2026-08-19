# Vue Memo App

AWS Amplify をバックエンドとした、ユーザー認証付きのメモ管理 Web アプリです。

## 機能

- メールアドレスによるユーザー認証（サインアップ・ログイン・ログアウト）
- デモアカウントでのお試しログイン（登録不要）
- メモの作成・表示・編集・削除（CRUD）
- 各メモに「名前・職業・趣味・X アカウント・その他」を記録
- 職業の選択肢を自由に追加・削除・並べ替えできる設定画面
- ログインユーザーごとに独立したデータ管理

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フロントエンド | Vue 3 (Composition API) + TypeScript |
| ビルドツール | Vite |
| スタイリング | Tailwind CSS |
| 認証 | AWS Cognito (Amplify UI Vue) |
| API | AWS AppSync (GraphQL) |
| データベース | Amazon DynamoDB |
| インフラ管理 | AWS Amplify Gen 2 |
| ホスティング | AWS Amplify Hosting |

## プロジェクト構成

```
vue-memo-app/
├── amplify/                  # バックエンドインフラ定義
│   ├── auth/resource.ts      # Cognito 認証設定
│   ├── data/resource.ts      # AppSync GraphQL スキーマ
│   └── backend.ts            # バックエンドエントリポイント
├── src/
│   ├── components/
│   │   ├── HeaderBar.vue         # ヘッダー（ハンバーガーメニュー・設定・ログアウト）
│   │   ├── MemoApp.vue           # メモ機能のルート（状態管理・画面切り替え）
│   │   ├── ProfileForm.vue       # メモ追加フォーム
│   │   ├── MemoList.vue          # メモ一覧
│   │   ├── MemoCard.vue          # メモ一覧の各カード
│   │   ├── MemoDetail.vue        # メモ詳細・編集画面
│   │   └── JobOptionsEditor.vue  # 職業選択肢の設定画面
│   ├── composables/
│   │   ├── useMemos.ts       # メモ CRUD ロジック
│   │   └── useJobOptions.ts  # 職業選択肢の管理ロジック
│   ├── App.vue                # ルートコンポーネント（認証・デモログイン）
│   ├── demo.ts                # デモアカウントの認証情報
│   └── main.ts                # エントリポイント
├── amplify_outputs.json      # Amplify 生成設定ファイル
└── amplify.yml               # Amplify Hosting CI/CD 設定
```

## セットアップ

### 前提条件

- Node.js 20 以上
- AWS アカウント（Amplify Gen 2 を使用するため）

### インストール

```bash
npm install
```

### デモログインの設定（任意）

ログイン画面の「デモを見る」ボタンは `src/demo.ts` に設定したメールアドレス／パスワードで自動ログインします。
利用するには、事前にそのアカウントでサインアップ・メール確認を済ませておく必要があります。
デモアカウントは共有アカウントのため、ログインした人は全員同じデータを閲覧・編集できます。

### ローカル開発

```bash
# フロントエンド開発サーバーを起動
npm run dev

# Amplify サンドボックス（ローカルバックエンド）を起動（別ターミナル）
npm run sandbox
```

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

## デプロイ

**本番 URL:** https://main.drgukncoyom3j.amplifyapp.com/

AWS Amplify Hosting を使用した Git ベースの CI/CD によって自動デプロイされます。
`main` ブランチへのプッシュで `amplify.yml` の設定に従いビルド・デプロイが実行されます。

## データモデル

```
Memo {
  name:     String  (必須) - 名前
  job:      String  (必須) - 職業
  hobby:    String  (必須) - 趣味
  xAccount: String  (任意) - X アカウント
  other:    String  (任意) - その他
}

UserSettings {
  jobOptions: JSON  (任意) - 職業選択肢のカスタム設定
}
```

データはログインユーザーごとに分離されており、他のユーザーのメモは参照できません。
