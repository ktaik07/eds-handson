export default function decorate(block) {
  // ここでは引数のblockを直接操作します

  // 内部の要素を取得
  const picture = block.querySelector("picture");
  const title = block.querySelector("h3");
  const description = block.querySelectorAll("p")[1]; // 説明文の<p>
  const button = block.querySelector("a.button");

  // 新しいcontent divを作成
  const contentDiv = document.createElement("div");
  contentDiv.className = "content";

  // contentDivに要素を追加
  if (title) contentDiv.appendChild(title);
  if (description) contentDiv.appendChild(description);
  if (button) contentDiv.appendChild(button);

  // 既存の内容をクリアし、新しい構造を追加
  block.innerHTML = "";
  if (picture) block.appendChild(picture);
  block.appendChild(contentDiv);
}
