<script setup lang="ts">
import MemoCard from "./MemoCard.vue";

// 親 (App.vue) から memos の配列を props として受け取る
defineProps<{
  memos: {
    name: string;
    job: string;
    hobby: string;
  }[];
}>();
</script>

<!--  MemoCard コンポーネントをインポートして、v-for ディレクティブで memos 配列をループして表示する -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <MemoCard
      v-for="(memo, index) in memos"
      :key="index"
      :name="memo.name"
      :job="memo.job"
      :hobby="memo.hobby"
    />
  </div>
</template>
