# Vue Memo App

AWS Amplify をバックエンドとした、ユーザー認証付きのメモ管理 Web アプリです。

## 機能

- メールアドレスによるユーザー認証（サインアップ・ログイン・ログアウト）
- メモの作成・表示・編集・削除（CRUD）
- 各メモに「名前・職業・趣味・その他」を記録
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
│   │   ├── HeaderBar.vue     # ヘッダー（ユーザー名・ログアウト）
│   │   ├── ProfileForm.vue   # メモ追加フォーム
│   │   ├── MemoList.vue      # メモ一覧
│   │   └── MemoCard.vue      # メモカード（編集・削除）
│   ├── composables/
│   │   └── useMemos.ts       # メモ CRUD ロジック
│   ├── App.vue               # ルートコンポーネント
│   └── main.ts               # エントリポイント
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

**本番 URL:** https://main.d2a8to79lcf5pq.amplifyapp.com/

AWS Amplify Hosting を使用した Git ベースの CI/CD によって自動デプロイされます。
`main` ブランチへのプッシュで `amplify.yml` の設定に従いビルド・デプロイが実行されます。

## データモデル

```
Memo {
  name:  String  (必須) - 名前
  job:   String  (必須) - 職業
  hobby: String  (必須) - 趣味
  other: String  (任意) - その他
}
```

データはログインユーザーごとに分離されており、他のユーザーのメモは参照できません。
