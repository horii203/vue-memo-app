<script setup lang="ts">
import { ref } from "vue";

// name・job・hobby の3つをリアクティブな状態として管理
const name = ref("");
const job = ref("");
const hobby = ref("");

//　addMemo イベントを親 (App.vue) に向けて発火するための emit 関数を定義
const emit = defineEmits(["addMemo"]);

// addMemo イベントを発火して、name・job・hobby の値を親に渡す
const submit = () => {
  emit("addMemo", {
    name: name.value,
    job: job.value,
    hobby: hobby.value,
  });

  // フォームをリセットするために、name・job・hobby の値を空にする
  name.value = "";
  job.value = "";
  hobby.value = "";
};
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow max-w-md w-full mx-auto space-y-4">
    <h2 class="text-xl font-bold">プロフィール登録</h2>

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

    <button
      @click="submit"
      class="w-full bg-gray-200 hover:bg-gray-300 p-2 rounded-lg"
    >
      追加
    </button>
  </div>
</template>
