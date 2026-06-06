<script setup lang="ts">
import { ref, watch } from "vue";
import type { Memo } from "../composables/useMemos";

const props = defineProps<{ memo: Memo }>();
const emit = defineEmits<{
  back: [];
  deleteMemo: [id: string];
  updateMemo: [payload: { id: string; input: { name: string; job: string; hobby: string; other: string } }];
}>();

const isEditing = ref(false);
const editName = ref(props.memo.name);
const editJob = ref(props.memo.job);
const editHobby = ref(props.memo.hobby);
const editOther = ref(props.memo.other ?? "");

watch(() => props.memo, (m) => {
  editName.value = m.name;
  editJob.value = m.job;
  editHobby.value = m.hobby;
  editOther.value = m.other ?? "";
});

const handleUpdate = () => {
  emit("updateMemo", {
    id: props.memo.id,
    input: {
      name: editName.value,
      job: editJob.value,
      hobby: editHobby.value,
      other: editOther.value,
    },
  });
  isEditing.value = false;
};

const handleCancel = () => {
  editName.value = props.memo.name;
  editJob.value = props.memo.job;
  editHobby.value = props.memo.hobby;
  editOther.value = props.memo.other ?? "";
  isEditing.value = false;
};
</script>

<template>
  <div class="space-y-6">
    <!-- 戻るボタン -->
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
      <!-- 名前をタイトルとして大きく表示 -->
      <h1 class="text-3xl font-bold">{{ memo.name }}</h1>

      <div class="space-y-4">
        <div>
          <p class="text-xs text-blue-400 mb-1">職業</p>
          <p class="text-base">{{ memo.job }}</p>
        </div>
        <div>
          <p class="text-xs text-blue-400 mb-1">趣味</p>
          <p class="text-base">{{ memo.hobby }}</p>
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

    <div v-else class="space-y-3">
      <input v-model="editName" class="border rounded-lg p-2 w-full" placeholder="名前" />
      <input v-model="editJob" class="border rounded-lg p-2 w-full" placeholder="職業" />
      <input v-model="editHobby" class="border rounded-lg p-2 w-full" placeholder="趣味" />
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
