import { ref, onMounted } from "vue";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

const DEFAULT_OPTIONS = ["フロントエンド", "バックエンド", "フルスタック", "インフラ", "その他"];

const jobOptions = ref<string[]>([...DEFAULT_OPTIONS]);
const settingsId = ref<string | null>(null);
let initialized = false;

const fetchSettings = async () => {
  try {
    const { data } = await client.models.UserSettings.list();
    if (data.length > 0) {
      settingsId.value = data[0].id;
      if (data[0].jobOptions) {
        jobOptions.value = JSON.parse(data[0].jobOptions as string);
      }
    }
  } catch {
    // 取得失敗時はデフォルト値を使用
  }
};

const persist = async () => {
  try {
    const payload = JSON.stringify(jobOptions.value);
    if (settingsId.value) {
      await client.models.UserSettings.update({ id: settingsId.value, jobOptions: payload });
    } else {
      const { data } = await client.models.UserSettings.create({ jobOptions: payload });
      if (data) settingsId.value = data.id;
    }
  } catch {
    // 保存失敗時はスキップ
  }
};

export function useJobOptions() {
  onMounted(async () => {
    if (initialized) return;
    initialized = true;
    await fetchSettings();
  });

  const addOption = async (label: string) => {
    const trimmed = label.trim();
    if (!trimmed || jobOptions.value.includes(trimmed)) return;
    jobOptions.value.push(trimmed);
    await persist();
  };

  const removeOption = async (label: string) => {
    jobOptions.value = jobOptions.value.filter((o) => o !== label);
    await persist();
  };

  const moveOption = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= jobOptions.value.length) return;
    const options = [...jobOptions.value];
    [options[index], options[target]] = [options[target], options[index]];
    jobOptions.value = options;
    await persist();
  };

  return { jobOptions, addOption, removeOption, moveOption };
}
