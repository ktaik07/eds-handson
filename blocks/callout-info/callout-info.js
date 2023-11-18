// 要素を取得し、不要なdivブロックを再帰的に削除して再格納する
export default function decorate(block) {
  const div = block.querySelector("div");
  if (div) {
    const parent = div.parentNode;
    while (div.firstChild) {
      parent.insertBefore(div.firstChild, div);
    }
    parent.removeChild(div);
  }
}
