<script setup lang="ts">
import { ref, watch } from "vue";
import type { Memo } from "../composables/useMemos";
import { useJobOptions } from "../composables/useJobOptions";

const { jobOptions } = useJobOptions();

const props = defineProps<{ memo: Memo }>();
const emit = defineEmits<{
  back: [];
  deleteMemo: [id: string];
  updateMemo: [payload: { id: string; input: { name: string; job: string; hobby: string; xAccount: string; other: string } }];
}>();

const isEditing = ref(false);
const editName = ref(props.memo.name);
const editJob = ref(props.memo.job);
const editXAccount = ref(props.memo.xAccount ?? "");
const editOther = ref(props.memo.other ?? "");

watch(() => props.memo, (m) => {
  editName.value = m.name;
  editJob.value = m.job;
  editXAccount.value = m.xAccount ?? "";
  editOther.value = m.other ?? "";
});

const handleUpdate = () => {
  emit("updateMemo", {
    id: props.memo.id,
    input: {
      name: editName.value,
      job: editJob.value,
      hobby: "",
      xAccount: editXAccount.value,
      other: editOther.value,
    },
  });
  isEditing.value = false;
};

const handleCancel = () => {
  editName.value = props.memo.name;
  editJob.value = props.memo.job;
  editXAccount.value = props.memo.xAccount ?? "";
  editOther.value = props.memo.other ?? "";
  isEditing.value = false;
};
</script>

<template>
  <div class="space-y-6">
    <button
      @click="$emit('back')"
      class="flex items-center gap-1 text-blue-400 hover:text-blue-600 transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
      戻る
    </button>

    <div v-if="!isEditing" class="space-y-6">
      <h1 class="text-3xl font-bold">{{ memo.name }}</h1>

      <div class="space-y-4">
        <div>
          <p class="text-xs text-blue-400 mb-1">職業</p>
          <p class="text-base">{{ memo.job }}</p>
        </div>
        <div v-if="memo.xAccount">
          <p class="text-xs text-blue-400 mb-1">X アカウント</p>
          <a
            :href="`https://x.com/${memo.xAccount}`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline"
          >@{{ memo.xAccount }}</a>
        </div>
        <div v-if="memo.other">
          <p class="text-xs text-blue-400 mb-1">その他</p>
          <p class="text-base whitespace-pre-wrap">{{ memo.other }}</p>
        </div>
      </div>

      <div class="flex gap-2">
        <button
          class="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 p-2 rounded-lg transition"
          @click="isEditing = true"
        >
          編集
        </button>
        <button
          class="flex-1 bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition"
          @click="$emit('deleteMemo', memo.id)"
        >
          削除
        </button>
      </div>
    </div>

    <div v-else class="space-y-4">
      <input v-model="editName" class="border rounded-lg p-2 w-full" placeholder="名前" />

      <div class="space-y-1">
        <p class="text-xs text-gray-400">職業</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="option in jobOptions"
            :key="option"
            type="button"
            @click="editJob = option"
            :class="[
              'px-3 py-1.5 rounded-full text-sm border transition',
              editJob === option
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
            ]"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <div class="flex items-center border rounded-lg overflow-hidden">
        <span class="px-3 py-2 bg-gray-50 text-gray-400 text-sm border-r select-none">@</span>
        <input
          v-model="editXAccount"
          class="p-2 flex-1 outline-none text-sm"
          placeholder="X アカウント"
        />
      </div>

      <textarea v-model="editOther" class="border rounded-lg p-2 w-full" placeholder="その他" rows="3" />

      <div class="flex gap-2">
        <button
          class="flex-1 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition"
          @click="handleUpdate"
        >
          保存
        </button>
        <button
          class="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 p-2 rounded-lg transition"
          @click="handleCancel"
        >
          キャンセル
        </button>
      </div>
    </div>
  </div>
</template>
