<script setup lang="ts">
import { ref } from "vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import HeaderBar from "./components/HeaderBar.vue";
import ProfileForm from "./components/ProfileForm.vue";
import MemoList from "./components/MemoList.vue";

// メモの型定義。name・job・hobby・other の4フィールドを持つ
type Memo = {
  name: string;
  job: string;
  hobby: string;
  other: string;
};

// メモの配列をリアクティブな状態として管理
const memos = ref<Memo[]>([]);

// メモを追加する関数。引数として受け取ったメモを memos 配列に追加する
const addMemo = (memo: Memo) => {
  memos.value.push(memo);
};
</script>

<template>
  <Authenticator>
    <template #default="{ user, signOut }">
      <div class="min-h-screen bg-gray-100 p-6">
        <div class="max-w-5xl mx-auto space-y-8">
          <HeaderBar
            :user-name="user?.signInDetails?.loginId ?? ''"
            :sign-out="signOut"
          />
          <ProfileForm @addMemo="addMemo" />
          <MemoList :memos="memos" />
        </div>
      </div>
    </template>
  </Authenticator>
</template>
