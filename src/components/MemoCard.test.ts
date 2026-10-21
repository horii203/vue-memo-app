import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MemoCard from "./MemoCard.vue";

describe("MemoCard", () => {
  it("名前が表示される", () => {
    // 準備: props を渡してコンポーネントを描画する
    const wrapper = mount(MemoCard, { props: { id: "1", name: "山田太郎" } });

    // 確認: 画面に名前が出ているか
    expect(wrapper.text()).toContain("山田太郎");
  });

  it("クリックすると selectMemo イベントが id 付きで発火する", async () => {
    const wrapper = mount(MemoCard, { props: { id: "abc", name: "山田太郎" } });

    // 操作: クリックする
    await wrapper.trigger("click");

    // 確認: イベントが1回、"abc" を引数に発火したか
    expect(wrapper.emitted("selectMemo")).toEqual([["abc"]]);
  });
});
