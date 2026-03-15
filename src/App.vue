<script setup lang="ts">
import { ref } from "vue";
import HeaderBar from "./components/HeaderBar.vue";
import ProfileForm from "./components/ProfileForm.vue";
import MemoList from "./components/MemoList.vue";

// メモの型定義。name・job・hobby の3フィールドを持つ
type Memo = {
  name: string;
  job: string;
  hobby: string;
};

// メモの配列をリアクティブな状態として管理
const memos = ref<Memo[]>([]);

// メモを追加する関数。引数として受け取ったメモを memos 配列に追加する
const addMemo = (memo: Memo) => {
  memos.value.push(memo);
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-5xl mx-auto space-y-8">
      <HeaderBar />
      <ProfileForm @addMemo="addMemo" />
      <MemoList :memos="memos" />
    </div>
  </div>
</template>
