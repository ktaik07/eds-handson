import { getMetadata } from "./aem.js";

// TemplateがArticlesの場合、サイドバー付きのレイアウトにするため、mainコンテナにflex-containerクラスを追加する
document.addEventListener("DOMContentLoaded", () => {
  const template = getMetadata("template").toLowerCase();
  if (template === "articles") {
    const mainElement = document.querySelector("main");
    mainElement.classList.add("flex-container");
  }
});

// TemplateがArticlesの場合、サイドバー付きのレイアウトにするため、mainコンテナにflex-containerクラスを追加する
document.addEventListener("DOMContentLoaded", () => {
  const template = getMetadata("template").toLowerCase();
  if (template === "articles") {
    const mainElement = document.querySelector(".hero");
    mainElement.classList.add("dark");
  }
});
