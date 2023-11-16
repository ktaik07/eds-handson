export default function decorate(block) {
  // スライドの外側のdiv要素を取得
  const slideDivs = [...block.querySelectorAll(":scope > div")];

  // スライドコンテナの作成
  const slidesContainer = document.createElement("div");
  slidesContainer.className = "slides";

  slideDivs.forEach((slideDiv) => {
    // スライド要素の作成
    const slide = document.createElement("div");
    slide.className = "slide";

    // 画像要素（picture）を移動
    const pictureDiv = slideDiv.querySelector("div:first-child");
    if (pictureDiv && pictureDiv.querySelector("picture")) {
      slide.appendChild(pictureDiv.querySelector("picture").cloneNode(true));
    }

    // テキストボックスの作成
    const textBox = document.createElement("div");
    textBox.className = "text-box";
    const textDiv = slideDiv.querySelector("div:nth-child(2)");
    if (textDiv) {
      textBox.textContent = textDiv.textContent.trim();
    }
    slide.appendChild(textBox);

    // スライドをコンテナに追加
    slidesContainer.appendChild(slide);
  });

  // 既存のコンテンツをクリアし、新しい構造を追加
  block.innerHTML = "";
  block.appendChild(slidesContainer);

  // スライダーナビゲーションとインジケーターのコンテナを作成
  const controlsContainer = document.createElement("div");
  controlsContainer.className = "slider-controls";

  // Prevボタンをコンテナに追加
  const prevButton = document.createElement("a");
  prevButton.className = "prev";
  prevButton.innerHTML = "&#10094;";
  prevButton.onclick = () => moveSlide(-1);
  controlsContainer.appendChild(prevButton);

  // Nextボタンをコンテナに追加
  const nextButton = document.createElement("a");
  nextButton.className = "next";
  nextButton.innerHTML = "&#10095;";
  nextButton.onclick = () => moveSlide(1);
  controlsContainer.appendChild(nextButton);

  // コンテナをブロックに追加
  block.appendChild(controlsContainer);

  // スライドインジケーターをコンテナに追加
  addSlideIndicators(block, controlsContainer);

  const event = new Event("contentDecorated");
  document.dispatchEvent(event);
}

function initializeSlider(sliderId) {
  let slideIndex = 1;

  function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(`#${sliderId} .slide`);
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    updateIndicators(); // インジケーターの更新
  }

  function moveSlide(n) {
    showSlides((slideIndex += n));
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll(`#${sliderId} .indicator`);
    indicators.forEach((indicator, index) => {
      indicator.className =
        index === slideIndex - 1 ? "indicator active" : "indicator";
    });
  }

  document.querySelector(`#${sliderId} .prev`).onclick = () => moveSlide(-1);
  document.querySelector(`#${sliderId} .next`).onclick = () => moveSlide(1);
  showSlides(slideIndex); // 初期スライドの表示
}

function initializeSliders() {
  const sliders = document.querySelectorAll(".description-slider");

  sliders.forEach((slider, index) => {
    const sliderId = "description-slider" + (index + 1);
    slider.id = sliderId;
    initializeSlider(sliderId);
  });
}

// スライドインジケーターの追加関数
function addSlideIndicators(block, container, sliderId) {
  const slides = block.querySelectorAll(".slide");
  const indicatorContainer = document.createElement("div");
  indicatorContainer.className = "slide-indicators";

  slides.forEach((slide, index) => {
    const indicator = document.createElement("span");
    indicator.className = "indicator";
    indicator.onclick = () => {
      document.querySelector(`#${sliderId} .prev`).onclick = () =>
        moveSlide(index + 1);
    };
    indicatorContainer.appendChild(indicator);
  });

  container.appendChild(indicatorContainer);
}

// イベントリスナーを追加
document.addEventListener("contentDecorated", () => {
  initializeSliders();
});

/*
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSliders);
} else {
  initializeSliders();  // DOMContentLoaded が発生している場合
}
*/
