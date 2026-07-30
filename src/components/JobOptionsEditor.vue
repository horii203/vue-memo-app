<script setup lang="ts">
import { ref } from "vue";
import { useJobOptions } from "../composables/useJobOptions";

defineEmits(["close"]);

const { jobOptions, addOption, removeOption, moveOption } = useJobOptions();
const newOption = ref("");

const handleAdd = async () => {
  const label = newOption.value;
  newOption.value = "";
  await addOption(label);
};
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow max-w-md w-full mx-auto space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold">職業の選択肢</h2>
      <button
        @click="$emit('close')"
        class="text-blue-300 hover:text-blue-500 text-2xl leading-none"
      >
        &times;
      </button>
    </div>

    <div class="flex gap-2">
      <input
        v-model="newOption"
        class="border rounded-lg p-2 flex-1 text-sm"
        placeholder="新しい選択肢"
        @keyup.enter="handleAdd"
      />
      <button
        @click="handleAdd"
        class="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg transition"
      >
        追加
      </button>
    </div>

    <ul class="space-y-2">
      <li
        v-for="(option, index) in jobOptions"
        :key="option"
        class="flex items-center justify-between px-3 py-2 bg-blue-50 rounded-lg"
      >
        <span class="text-sm">{{ option }}</span>
        <div class="flex items-center gap-1">
          <button
            @click="moveOption(index, -1)"
            :disabled="index === 0"
            class="text-gray-400 hover:text-blue-500 transition disabled:opacity-30 disabled:hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
          <button
            @click="moveOption(index, 1)"
            :disabled="index === jobOptions.length - 1"
            class="text-gray-400 hover:text-blue-500 transition disabled:opacity-30 disabled:hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <button
            @click="removeOption(option)"
            class="text-gray-400 hover:text-red-500 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </li>
    </ul>

    <button
      @click="$emit('close')"
      class="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition"
    >
      完了
    </button>
  </div>
</template>
