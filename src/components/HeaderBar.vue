<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  userName: string;
  signOut: () => void;
}>();

const menuOpen = ref(false);
</script>

<template>
  <header class="flex items-center bg-white shadow-sm px-6 py-4">
    <div class="flex-1" />
    <img src="/logo.svg" alt="TechMemory" class="h-6 w-auto" />
    <div class="flex flex-1 justify-end">
      <button
        @click="menuOpen = true"
        class="p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </div>
  </header>

  <!-- オーバーレイ -->
  <Transition name="fade">
    <div
      v-if="menuOpen"
      class="fixed inset-0 bg-black/30 z-40"
      @click="menuOpen = false"
    />
  </Transition>

  <!-- ドロワー -->
  <Transition name="slide">
    <div
      v-if="menuOpen"
      class="fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 flex flex-col"
    >
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <p class="text-sm text-gray-400">{{ userName }}</p>
        <button
          @click="menuOpen = false"
          class="p-1 rounded hover:bg-gray-100 transition text-gray-400 hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <nav class="flex-1 py-2">
        <button
          @click="() => { menuOpen = false; signOut(); }"
          class="w-full text-left px-5 py-3 text-sm hover:bg-blue-50 text-gray-700 transition"
        >
          ログアウト
        </button>
      </nav>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
