# 引継ぎメモ

## プロジェクト概要
- Vue3 + TypeScript + Tailwind CSS + AWS Amplify Gen2 のエンジニア向けプロフィールメモアプリ
- アプリ名: TechMemory
- GitHub: https://github.com/horii203/vue-memo-app
- Amplify Console アプリID: d2a8to79lcf5pq
- リージョン: ap-northeast-1（東京）
- ローカル AWS プロファイル: `default`（設定済み）

---

## 現在の状態（重要）

### コードとバックエンドが不一致
フロントエンドのコードには `xAccount` と `UserSettings` が実装済みだが、**本番バックエンドにはまだ反映されていない**。そのため現在アプリでプロフィール追加ができない状態。

| 機能 | コード | バックエンド |
|---|---|---|
| xAccount フィールド | ✅ 実装済み | ❌ 未反映 |
| UserSettings モデル | ✅ 実装済み | ❌ 未反映 |
| Memo CRUD | ✅ | ✅ |
| ログイン（Cognito） | ✅ | ✅ |

### 直近でやったこと
- Amplify Console のサービスロールを適切な権限に変更しようとしている（**途中**）

---

## バックエンド未反映の根本原因

Amplify Hosting がフロントエンド専用ビルドになっており、スキーマ変更がバックエンドに反映されない。

**現在のサービスロール（権限不足）**:
`AmplifySSRLoggingRole`（ログ専用）

---

## 解決手順（続き）

### ステップ1: IAM ロール作成（AWS コンソール）
1. AWS コンソール → IAM → ロール → 「ロールを作成」
2. 信頼エンティティ: 「AWS のサービス」→「Amplify」
3. ポリシー: `AdministratorAccess-Amplify` を付与
4. ロール名: `AmplifyBackendDeployRole`（任意）

### ステップ2: Amplify Console でサービスロールを更新
1. Amplify Console → vue-memo-app → アプリケーションの設定 → IAM ロール
2. サービスロールを上記で作成したロールに変更

### ステップ3: amplify.yml にバックエンドビルドを追加して push
```yaml
version: 1
backend:
  phases:
    build:
      commands:
        - npm install --legacy-peer-deps
        - npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID
frontend:
  phases:
    preBuild:
      commands:
        - nvm install 20
        - nvm use 20
        - npm install --legacy-peer-deps
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

※ 以前 Docker エラーが出たが、サービスロールを正しく設定すれば解消される可能性がある。

### ステップ4: デプロイ成功後の確認
- プロフィール追加が動くか
- X アカウントの保存・表示が動くか
- 職業選択肢の設定（UserSettings）が保存されるか

---

## ファイル構成

```
src/
  components/
    HeaderBar.vue        # ハンバーガーメニュー付きヘッダー（ドロワー式）
    MemoCard.vue         # 一覧カード（名前のみ表示）
    MemoDetail.vue       # 詳細ページ（編集・削除・X アカウント表示）
    ProfileForm.vue      # 新規登録フォーム（モーダル）
    MemoList.vue         # 一覧
    JobOptionsEditor.vue # 職業選択肢の設定 UI（ハンバーガー → 設定 から開く）
  composables/
    useMemos.ts          # Memo CRUD（xAccount 含む）
    useJobOptions.ts     # 職業選択肢管理（バックエンド未対応時は try-catch で fallback）
amplify/
  data/resource.ts       # スキーマ（xAccount・UserSettings 定義済み・バックエンド未反映）
amplify_outputs.json     # 本番バックエンドの接続情報（変更しないこと）
amplify.yml              # 現在フロントエンドのみのビルド設定
```

---

## 注意事項
- `amplify_outputs.json` は本番バックエンドを指しているので変更しないこと
- `npx ampx sandbox --once` は**別環境を作成してログイン不能になる**ので実行しないこと
- ローカル AWS 認証情報（`default` プロファイル）は設定済み
