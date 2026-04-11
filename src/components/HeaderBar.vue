<script setup lang="ts">
defineProps<{
  userName: string;
  signOut: () => void;
}>();
</script>

<template>
  <header class="flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-bold">メモ帳</h1>
      <p class="text-gray-500">こんにちは、{{ userName }}</p>
    </div>

    <button
      class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
      @click="signOut"
    >
      ログアウト
    </button>
  </header>
</template>
