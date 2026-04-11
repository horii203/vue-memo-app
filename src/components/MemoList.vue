<script setup lang="ts">
import MemoCard from "./MemoCard.vue";
import type { Memo } from "../composables/useMemos";

defineProps<{
  memos: Memo[];
}>();

defineEmits<{
  deleteMemo: [id: string];
  updateMemo: [payload: { id: string; input: { name: string; job: string; hobby: string; other: string } }];
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <MemoCard
      v-for="memo in memos"
      :key="memo.id"
      v-bind="memo"
      @delete-memo="$emit('deleteMemo', $event)"
      @update-memo="$emit('updateMemo', $event)"
    />
  </div>
</template>
