<script setup lang="ts">
import { ref } from "vue";
import HeaderBar from "./components/HeaderBar.vue";
import ProfileForm from "./components/ProfileForm.vue";
import MemoList from "./components/MemoList.vue";

type Memo = {
  name: string;
  job: string;
  hobby: string;
};

const memos = ref<Memo[]>([]);

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
