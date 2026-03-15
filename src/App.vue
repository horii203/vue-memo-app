<script setup lang="ts">
import { ref } from "vue";

// とりあえず名前と趣味だけ
const name = ref("");
const hobby = ref("");

const people = ref<{ name: string; hobby: string }[]>([]);

const addPerson = () => {
  if (!name.value || !hobby.value) return;

  people.value.push({
    name: name.value,
    hobby: hobby.value,
  });

  name.value = "";
  hobby.value = "";
};
</script>

<template>
  <h1>メモアプリ</h1>

  <!-- 入力フィールド -->
  <div>
    <input v-model="name" placeholder="名前" />
    <input v-model="hobby" placeholder="趣味" />
    <button @click="addPerson">追加</button>
  </div>

  <ul>
    <!-- 配列をループ表示 -->
    <li v-for="person in people" :key="person.name">
      {{ person.name }}
    </li>
  </ul>
</template>
