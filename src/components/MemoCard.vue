<script setup lang="ts">
defineProps<{
  id: string;
  name: string;
}>();
defineEmits<{ selectMemo: [id: string] }>();
</script>

<template>
  <div
    class="bg-white p-4 rounded-xl shadow cursor-pointer transition flex items-center justify-between"
    @click="$emit('selectMemo', id)"
  >
    <span class="font-medium">{{ name }}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-4 h-4 text-blue-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </div>
</template>
