<script setup lang="ts">
import { ref } from "vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import { signIn, signOut } from "aws-amplify/auth";
import "@aws-amplify/ui-vue/styles.css";
import MemoApp from "./components/MemoApp.vue";
import { DEMO_EMAIL, DEMO_PASSWORD } from "./demo";

const demoLoading = ref(false);
const demoError = ref("");
// Authenticator を再マウントさせるためのキー。デモログイン後に更新して認証状態を読み直させる。
const authKey = ref(0);

const signInAsDemo = async () => {
  demoLoading.value = true;
  demoError.value = "";
  try {
    // 既存のログインセッションが残っていると signIn が失敗するため、先にサインアウトする
    await signOut();
    await signIn({ username: DEMO_EMAIL, password: DEMO_PASSWORD });
    // 直接 signIn した結果を Authenticator が検知しないため、再マウントして反映させる
    authKey.value++;
  } catch (e) {
    console.error("demo signIn error:", e);
    const err = e as { name?: string; message?: string };
    demoError.value = `デモにログインできませんでした（${err.name ?? "Error"}: ${err.message ?? ""}）`;
  } finally {
    demoLoading.value = false;
  }
};
</script>

<template>
  <Authenticator :key="authKey">
    <template #sign-in-footer>
      <div class="px-8 pb-6 space-y-3">
        <div class="flex items-center gap-3 text-xs text-gray-400">
          <span class="flex-1 h-px bg-gray-200" />
          または
          <span class="flex-1 h-px bg-gray-200" />
        </div>
        <button
          type="button"
          @click="signInAsDemo"
          :disabled="demoLoading"
          class="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition disabled:opacity-50"
        >
          {{ demoLoading ? "読み込み中..." : "デモを見る（登録不要）" }}
        </button>
        <p v-if="demoError" class="text-xs text-red-500 text-center">
          {{ demoError }}
        </p>
      </div>
    </template>

    <template #default="{ user, signOut }">
      <MemoApp :user-name="user?.signInDetails?.loginId ?? ''" :sign-out="signOut" />
    </template>
  </Authenticator>
</template>
