import { ref, onMounted } from "vue";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

export type Memo = Schema["Memo"]["type"];

export function useMemos() {
  const memos = ref<Memo[]>([]);
  const isLoading = ref(false);

  const fetchMemos = async () => {
    isLoading.value = true;
    const { data } = await client.models.Memo.list();
    memos.value = data;
    isLoading.value = false;
  };

  const addMemo = async (input: {
    name: string;
    job: string;
    hobby: string;
    other: string;
  }) => {
    const { data: newMemo } = await client.models.Memo.create(input);
    if (newMemo) memos.value.unshift(newMemo);
  };

  const deleteMemo = async (id: string) => {
    await client.models.Memo.delete({ id });
    memos.value = memos.value.filter((m) => m.id !== id);
  };

  const updateMemo = async (
    id: string,
    input: { name: string; job: string; hobby: string; other: string }
  ) => {
    const { data: updated } = await client.models.Memo.update({ id, ...input });
    if (updated) {
      const index = memos.value.findIndex((m) => m.id === id);
      if (index !== -1) memos.value[index] = updated;
    }
  };

  onMounted(fetchMemos);

  return { memos, isLoading, addMemo, deleteMemo, updateMemo };
}
