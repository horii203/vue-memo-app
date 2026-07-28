<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import MemoApp from "./components/MemoApp.vue";
</script>

<template>
  <Authenticator>
    <template #default="{ user, signOut }">
      <MemoApp :user-name="user?.signInDetails?.loginId ?? ''" :sign-out="signOut" />
    </template>
  </Authenticator>
</template>
