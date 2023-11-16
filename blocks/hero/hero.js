function insertHeroPlaceholder() {
  const heroBlock = document.querySelector(".hero-container");

  if (heroBlock) {
    // heroBlock 内の <img> 要素の高さを取得
    const pictureElement = heroBlock.querySelector("img");
    const pictureHeight = pictureElement ? pictureElement.offsetHeight : 0;

    const placeholder = document.createElement("div");
    placeholder.className = "hero-placeholder";
    //placeholder.style.height = `${pictureHeight}px`; // <img> の高さを使用
    heroBlock.insertAdjacentElement("afterend", placeholder);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", insertHeroPlaceholder);
} else {
  insertHeroPlaceholder();
}

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
