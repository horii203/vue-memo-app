<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import HeaderBar from "./components/HeaderBar.vue";
import ProfileForm from "./components/ProfileForm.vue";
import MemoList from "./components/MemoList.vue";
import { useMemos } from "./composables/useMemos";

const { memos, isLoading, addMemo, deleteMemo, updateMemo } = useMemos();
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
          <ProfileForm @addMemo="addMemo" />
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
      </div>
    </template>
  </Authenticator>
</template>
