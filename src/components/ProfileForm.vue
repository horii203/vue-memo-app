<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const job = ref("");
const hobby = ref("");
const other = ref("");

const emit = defineEmits(["addMemo", "close"]);

const submit = () => {
  emit("addMemo", {
    name: name.value,
    job: job.value,
    hobby: hobby.value,
    other: other.value,
  });

  name.value = "";
  job.value = "";
  hobby.value = "";
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

    <input
      v-model="job"
      class="border rounded-lg p-2 w-full"
      placeholder="職業"
    />

    <input
      v-model="hobby"
      class="border rounded-lg p-2 w-full"
      placeholder="趣味"
    />

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
