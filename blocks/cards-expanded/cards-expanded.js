import { createOptimizedPicture } from "../../scripts/aem.js";

function processLine(lines) {
  const cardContent = document.createElement("div");
  cardContent.className = "card-content";
  cardContent.append(lines);
  cardContent
    .querySelectorAll("p")
    .forEach((p) => p.replaceWith(...p.childNodes));

  // 画像の場合は最適化処理を行う
  if (cardContent.querySelector("picture")) {
    cardContent.className = "card-image";
    cardContent
      .querySelectorAll("img")
      .forEach((img) =>
        img
          .closest("picture")
          .replaceWith(createOptimizedPicture(img.src, img.alt, false))
      );
  }

  return cardContent;
}

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`cards-${cols.length}-col`);

  const cardList = document.createElement("ul");

  const allContent = block.firstElementChild;
  [...allContent.children].forEach((rows) => {
    const card = document.createElement("li");
    [...rows.children].forEach((lines) => {
      const cardContent = processLine(lines);
      card.append(cardContent);
    });
    card.className = "card";
    cardList.append(card);
  });

  cardList.className = "cards-list";
  block.textContent = "";
  block.append(cardList);
}
