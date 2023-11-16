// サイドバーとメインコンテンツのレイアウトの場合、 flex-container クラスを追加する
document.addEventListener("DOMContentLoaded", () => {
  const mainElement = document.querySelector("main");
  const sidebar = mainElement.querySelector(".sidebar");
  const mainContent = mainElement.querySelector(".main-content");

  if (sidebar && mainContent) {
    mainElement.classList.add("flex-container");
  }
});
