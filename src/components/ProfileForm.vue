<script setup lang="ts">
import { ref } from "vue";
import { jobOptions } from "../constants/jobOptions";

const name = ref("");
const job = ref("");
const other = ref("");

const emit = defineEmits(["addMemo", "close"]);

const submit = () => {
  emit("addMemo", {
    name: name.value,
    job: job.value,
    hobby: "",
    other: other.value,
  });

  name.value = "";
  job.value = "";
  other.value = "";
  emit("close");
};
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow max-w-md w-full mx-auto space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold">プロフィール登録</h2>
      <button
        @click="$emit('close')"
        class="text-blue-300 hover:text-blue-500 text-2xl leading-none"
      >
        &times;
      </button>
    </div>

    <input
      v-model="name"
      class="border rounded-lg p-2 w-full"
      placeholder="名前"
    />

    <div class="space-y-1">
      <p class="text-xs text-gray-400">職業</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="option in jobOptions"
          :key="option"
          type="button"
          @click="job = option"
          :class="[
            'px-3 py-1.5 rounded-full text-sm border transition',
            job === option
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
          ]"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <textarea
      v-model="other"
      class="border rounded-lg p-2 w-full"
      placeholder="その他"
      rows="3"
    />

    <button
      @click="submit"
      class="w-full bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition"
    >
      追加
    </button>
  </div>
</template>
