<script setup lang="ts">
import MemoCard from "./MemoCard.vue";
import type { Memo } from "../composables/useMemos";

defineProps<{ memos: Memo[] }>();
defineEmits<{ selectMemo: [id: string] }>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <MemoCard
      v-for="memo in memos"
      :key="memo.id"
      :id="memo.id"
      :name="memo.name"
      @select-memo="$emit('selectMemo', $event)"
    />
  </div>
</template>
