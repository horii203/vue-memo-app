<script setup lang="ts">
import MemoCard from "./MemoCard.vue";

defineProps<{
  memos: {
    name: string;
    job: string;
    hobby: string;
  }[];
}>();
</script>

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
