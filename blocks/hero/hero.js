// Hero画像の高さを取得して、その高さ分の余白を挿入する
function insertHeroPlaceholder() {
  const heroBlock = document.querySelector(".hero");

  if (heroBlock) {
    // heroBlock 内の <img> 要素の高さを取得
    const pictureElement = heroBlock.querySelector("img");
    const pictureHeight = pictureElement ? pictureElement.offsetHeight : 0;

    const placeholder = document.createElement("div");
    placeholder.className = "hero-placeholder";
    heroBlock.insertAdjacentElement("afterend", placeholder);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", insertHeroPlaceholder);
} else {
  insertHeroPlaceholder();
}

// ヒーローブロックがある場合にヘッダーの背景を透過するために、ヘッダーにクラスを追加する
function setupMutationObserver() {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.matches && node.matches(".nav-wrapper")) {
          node.classList.add("on-hero");
          observer.disconnect();
        }
      });
    });
  });

  const header = document.querySelector("header");
  if (header) {
    observer.observe(header, { childList: true, subtree: true });
  }
}

setupMutationObserver();
