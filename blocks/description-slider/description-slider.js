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

  // スライダーに一意のIDを割り当て
  const sliderId = block.id || `description-slider-${Date.now()}`; // 一時的な一意IDを生成
  block.id = sliderId;

  // スライドインジケーターをコンテナに追加
  addSlideIndicators(block, controlsContainer, sliderId);

  const event = new Event("contentDecorated");
  document.dispatchEvent(event);
}

// スライダーの初期化関数
function initializeSlider(sliderId) {
  let slideIndex = 1;
  const slides = document.querySelectorAll(`#${sliderId} .slide`);

  // moveSlide 関数の定義
  function moveSlide(n) {
    slideIndex += n;

    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    if (slideIndex < 1) {
      slideIndex = slides.length;
    }

    window.showSlides(sliderId, slideIndex);
  }

  // 初期スライドの表示
  window.showSlides(sliderId, slideIndex);

  // ナビゲーションボタンの設定
  const prevButton = document.querySelector(`#${sliderId} .prev`);
  const nextButton = document.querySelector(`#${sliderId} .next`);

  if (prevButton) prevButton.onclick = () => moveSlide(-1);
  if (nextButton) nextButton.onclick = () => moveSlide(1);
}

// ページ中に存在するスライダーごとにIDを付与
function initializeSliders() {
  const sliders = document.querySelectorAll(".description-slider");

  sliders.forEach((slider) => {
    const sliderId = slider.id;
    initializeSlider(sliderId);
  });
}

// スライド移動関数
window.moveSlide = function (sliderId, slideIndex) {
  window.showSlides(sliderId, slideIndex);
};

// スライド表示関数
window.showSlides = function (sliderId, n) {
  const slides = document.querySelectorAll(`#${sliderId} .slide`);
  let slideIndex = n;

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  slides.forEach((slide, index) => {
    slide.style.display = index === n - 1 ? "block" : "none";
  });

  // 更新されたインジケーターの状態を表示
  const indicators = document.querySelectorAll(`#${sliderId} .indicator`);
  indicators.forEach((indicator, index) => {
    indicator.className =
      index === slideIndex - 1 ? "indicator active" : "indicator";
  });
};

// スライドインジケーターの追加関数
function addSlideIndicators(block, container, sliderId) {
  const slides = Array.from(block.querySelectorAll(".slide"));
  const indicatorContainer = document.createElement("div");
  indicatorContainer.className = "slide-indicators";

  slides.forEach((slide, index) => {
    const indicator = document.createElement("span");
    indicator.className = "indicator";
    indicator.onclick = () => {
      window.moveSlide(sliderId, index + 1); // インデックスは1から始まるため、index + 1 を使用
    };
    indicatorContainer.appendChild(indicator);
  });

  container.appendChild(indicatorContainer);
}

// イベントリスナーを追加
document.addEventListener("contentDecorated", () => {
  initializeSliders();
});
