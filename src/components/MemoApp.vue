<script setup lang="ts">
import { ref, computed } from "vue";
import HeaderBar from "./HeaderBar.vue";
import ProfileForm from "./ProfileForm.vue";
import MemoList from "./MemoList.vue";
import MemoDetail from "./MemoDetail.vue";
import JobOptionsEditor from "./JobOptionsEditor.vue";
import { useMemos } from "../composables/useMemos";

defineProps<{
  userName: string;
  signOut: () => void;
}>();

const { memos, isLoading, addMemo, deleteMemo, updateMemo } = useMemos();

const showForm = ref(false);
const showSettings = ref(false);
const selectedMemoId = ref<string | null>(null);
const selectedMemo = computed(() => memos.value.find((m) => m.id === selectedMemoId.value) ?? null);

const handleDeleteMemo = async (id: string) => {
  await deleteMemo(id);
  selectedMemoId.value = null;
};
</script>

<template>
  <div class="min-h-screen bg-blue-50">
    <HeaderBar
      :user-name="userName"
      :sign-out="signOut"
      @settings="showSettings = true"
    />

    <div class="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <!-- 詳細ページ -->
      <MemoDetail
        v-if="selectedMemo"
        :memo="selectedMemo"
        @back="selectedMemoId = null"
        @delete-memo="handleDeleteMemo"
        @update-memo="({ id, input }) => updateMemo(id, input)"
      />

      <!-- 一覧ページ -->
      <template v-else>
        <div v-if="isLoading" class="text-center text-gray-500">
          読み込み中...
        </div>
        <MemoList
          v-else
          :memos="memos"
          @select-memo="selectedMemoId = $event"
        />
      </template>
    </div>

    <!-- FAB（一覧ページのみ表示） -->
    <button
      v-if="!selectedMemo"
      @click="showForm = true"
      class="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>

    <!-- 設定モーダル -->
    <div
      v-if="showSettings"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      @click.self="showSettings = false"
    >
      <JobOptionsEditor @close="showSettings = false" />
    </div>

    <!-- 登録モーダル -->
    <div
      v-if="showForm"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      @click.self="showForm = false"
    >
      <ProfileForm
        @addMemo="addMemo"
        @close="showForm = false"
      />
    </div>
  </div>
</template>
