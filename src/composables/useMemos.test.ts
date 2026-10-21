import { describe, it, expect, vi, beforeEach } from "vitest";
import { defineComponent } from "vue";
import { mount, flushPromises } from "@vue/test-utils";

// Amplify の通信部分を偽物（モック）に差し替える。
// vi.mock はファイルの先頭に巻き上げられるので、使う関数は vi.hoisted で用意する。
const mockMemo = vi.hoisted(() => ({
  list: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
}));

vi.mock("aws-amplify/api", () => ({
  generateClient: () => ({ models: { Memo: mockMemo } }),
}));

import { useMemos } from "./useMemos";

// useMemos は onMounted を使うので、テスト用の小さなコンポーネントの中で呼び出す
function setup() {
  let result!: ReturnType<typeof useMemos>;
  mount(
    defineComponent({
      setup() {
        result = useMemos();
        return () => null;
      },
    }),
  );
  return result;
}

const input = { name: "佐藤", job: "フロントエンド", hobby: "", xAccount: "", other: "" };

describe("useMemos", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMemo.list.mockResolvedValue({ data: [{ id: "1", name: "山田" }] });
  });

  it("マウント時にメモ一覧を取得する", async () => {
    const { memos, isLoading } = setup();
    await flushPromises(); // 非同期処理が終わるのを待つ

    expect(mockMemo.list).toHaveBeenCalledTimes(1);
    expect(memos.value).toEqual([{ id: "1", name: "山田" }]);
    expect(isLoading.value).toBe(false);
  });

  it("addMemo で作成したメモが先頭に追加される", async () => {
    mockMemo.create.mockResolvedValue({ data: { id: "2", ...input } });
    const { memos, addMemo } = setup();
    await flushPromises();

    await addMemo(input);

    expect(mockMemo.create).toHaveBeenCalledWith(input);
    expect(memos.value[0].id).toBe("2");
    expect(memos.value).toHaveLength(2);
  });

  it("deleteMemo で指定したメモが一覧から消える", async () => {
    mockMemo.delete.mockResolvedValue({ data: null });
    const { memos, deleteMemo } = setup();
    await flushPromises();

    await deleteMemo("1");

    expect(mockMemo.delete).toHaveBeenCalledWith({ id: "1" });
    expect(memos.value).toEqual([]);
  });

  it("updateMemo で一覧の該当メモが置き換わる", async () => {
    mockMemo.update.mockResolvedValue({ data: { id: "1", ...input } });
    const { memos, updateMemo } = setup();
    await flushPromises();

    await updateMemo("1", input);

    expect(mockMemo.update).toHaveBeenCalledWith({ id: "1", ...input });
    expect(memos.value[0].name).toBe("佐藤");
  });
});
