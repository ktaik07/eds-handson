export default function decorate(block) {
  // blockが正しいHTMLElementであることを確認
  if (!block || !(block instanceof HTMLElement)) {
    console.error("Invalid block element provided");
    return;
  }

  // blockの中身をクリア
  block.innerHTML = "";

  // 新しい<nav>要素を作成し、idを設定
  const toc = document.createElement("nav");
  toc.id = "toc";

  //tocにタイトルを追加
  const title = document.createElement("h5");
  title.textContent = "目次";
  toc.appendChild(title);

  // 作成した<nav>要素をblockに追加
  block.appendChild(toc);
}

// 目次の生成
function init() {
  const toc = document.getElementById("toc");
  const headers = document.querySelectorAll("h2, h3");
  const tocList = document.createElement("ul");

  headers.forEach((header, index) => {
    const headerId = `heading-${index}`;
    header.id = headerId;

    const listItem = document.createElement("li");
    // headerのタグ名（h2、h3など）に基づいてクラスを追加
    listItem.classList.add(header.tagName.toLowerCase());

    const link = document.createElement("a");
    link.href = `#${headerId}`;
    link.textContent = header.textContent;
    listItem.appendChild(link);

    tocList.appendChild(listItem);
  });

  toc.appendChild(tocList);
}

const observer = new MutationObserver((mutations, obs) => {
  if (document.getElementById("toc")) {
    init();
    obs.disconnect(); // 監視を停止
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// 目次の表示位置監視
const indicator = new MutationObserver((mutations, obs) => {
  const toc = document.getElementById("toc");
  if (toc) {
    const headers = document.querySelectorAll("h2, h3");
    const tocLinks = toc.querySelectorAll("a");

    function highlightCurrentTocLink() {
      let currentSectionId = "";

      headers.forEach((header) => {
        const sectionTop = header.getBoundingClientRect().top;

        if (sectionTop <= window.innerHeight * 0.25) {
          currentSectionId = header.id;
        }
      });

      tocLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }

    window.addEventListener("scroll", highlightCurrentTocLink);
    obs.disconnect(); // 監視を停止
  }
});

indicator.observe(document.body, { childList: true, subtree: true });
