<script setup lang="ts">
defineProps<{
  name: string;
  job: string;
  hobby: string;
}>();
</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow space-y-2">
    <div class="flex justify-between items-center">
      <strong class="text-lg">{{ name }}</strong>

      <div class="space-x-2">
        <button class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">
          編集
        </button>
        <button class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">
          削除
        </button>
      </div>
    </div>

    <p>職業：{{ job }}</p>
    <p>趣味：{{ hobby }}</p>
  </div>
</template>
