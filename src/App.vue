<script setup lang="ts">
import { ref } from "vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import HeaderBar from "./components/HeaderBar.vue";
import ProfileForm from "./components/ProfileForm.vue";
import MemoList from "./components/MemoList.vue";
import { useMemos } from "./composables/useMemos";

const { memos, isLoading, addMemo, deleteMemo, updateMemo } = useMemos();

const showForm = ref(false);
</script>

<template>
  <Authenticator>
    <template #default="{ user, signOut }">
      <div class="min-h-screen bg-gray-100 p-6">
        <div class="max-w-5xl mx-auto space-y-8">
          <HeaderBar
            :user-name="user?.signInDetails?.loginId ?? ''"
            :sign-out="signOut"
          />
          <div v-if="isLoading" class="text-center text-gray-500">
            読み込み中...
          </div>
          <MemoList
            v-else
            :memos="memos"
            @delete-memo="deleteMemo"
            @update-memo="({ id, input }) => updateMemo(id, input)"
          />
        </div>

        <!-- FAB -->
        <button
          @click="showForm = true"
          class="fixed bottom-6 right-6 w-14 h-14 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg flex items-center justify-center transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        <!-- モーダルオーバーレイ -->
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
  </Authenticator>
</template>
