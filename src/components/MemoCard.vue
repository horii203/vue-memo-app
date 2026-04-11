<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  id: string;
  name: string;
  job: string;
  hobby: string;
  other?: string | null;
}>();
const emit = defineEmits<{
  deleteMemo: [id: string];
  updateMemo: [payload: { id: string; input: { name: string; job: string; hobby: string; other: string } }];
}>();

const isEditing = ref(false);
const editName = ref(props.name);
const editJob = ref(props.job);
const editHobby = ref(props.hobby);
const editOther = ref(props.other ?? "");

const handleDelete = () => emit("deleteMemo", props.id);

const handleEdit = () => {
  isEditing.value = true;
};

const handleUpdate = () => {
  emit("updateMemo", {
    id: props.id,
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
  editName.value = props.name;
  editJob.value = props.job;
  editHobby.value = props.hobby;
  editOther.value = props.other ?? "";
  isEditing.value = false;
};
</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow space-y-2">
    <div v-if="!isEditing">
      <div class="flex justify-between items-center">
        <strong class="text-lg">{{ name }}</strong>
        <div class="space-x-2">
          <button
            class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
            @click="handleEdit"
          >
            編集
          </button>
          <button
            class="bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-red-700"
            @click="handleDelete"
          >
            削除
          </button>
        </div>
      </div>
      <p>職業：{{ job }}</p>
      <p>趣味：{{ hobby }}</p>
      <p class="whitespace-pre-wrap">その他：{{ other }}</p>
    </div>

    <div v-else class="space-y-2">
      <input v-model="editName" class="border rounded-lg p-2 w-full" placeholder="名前" />
      <input v-model="editJob" class="border rounded-lg p-2 w-full" placeholder="職業" />
      <input v-model="editHobby" class="border rounded-lg p-2 w-full" placeholder="趣味" />
      <textarea v-model="editOther" class="border rounded-lg p-2 w-full" placeholder="その他" rows="2" />
      <div class="flex gap-2">
        <button
          class="flex-1 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg"
          @click="handleUpdate"
        >
          保存
        </button>
        <button
          class="flex-1 bg-gray-200 hover:bg-gray-300 p-2 rounded-lg"
          @click="handleCancel"
        >
          キャンセル
        </button>
      </div>
    </div>
  </div>
</template>
