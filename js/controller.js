"use strict";

const steps = document.querySelectorAll(".form__step");
const circleSteps = document.querySelectorAll(".page__step--circle");
const plans = document.querySelectorAll(".plan__card");
const planPrice = document.querySelector(".summary__plan--price");
const currentPrice = document.querySelector(".page__price--current b");
const selectedImageElement = document.getElementById("selected-image");
const galleryBtnPrev = document.querySelector(".gallery__nav--prev");
const galleryBtnNext = document.querySelector(".gallery__nav--next");
const galleryBtnSpin = document.querySelector(".gallery__nav--spin");
const labelPreview = document.querySelector(".img__logo--preview");

let currentStep = 1;
let currentCircle = 0;
const state = {
  preview: null,
  price: 0,
};
const loremArr = [200];
let loremPics = 200;

steps.forEach((step) => {
  const nextBtn = step.querySelector(".btn--next");
  const prevBtn = step.querySelector(".btn--prev");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      steps[currentStep - 1].style.display = "none";
      currentStep--;
      steps[currentStep - 1].style.display = "flex";
      circleSteps[currentCircle].classList.remove("active");
      currentCircle--;
      steps[currentStep - 1].querySelector(".btns").before(state.preview);
    });
  }

  nextBtn.addEventListener("click", () => {
    steps[currentStep - 1].style.display = "none";
    if (currentStep < 5) {
      currentStep++;
      currentCircle++;
    }
    steps[currentStep - 1].style.display = "flex";
    circleSteps[currentCircle].classList.add("active");
    steps[currentStep - 1].querySelector(".btns").before(state.preview);
  });
});

steps[0].addEventListener("click", (e) => {
  const previewContainer = document.querySelector(
    ".preview__container--tshirts"
  );
  const tshirtSelect = e.target.closest(".plan__card");
  if (!tshirtSelect) return;
  const tshirtSide = tshirtSelect.id;
  tshirtSelect.classList.toggle("selected");
  const html = `
    <div class="preview__container--img" data-tshirt-side="${tshirtSide}">
      <img
        class="img img--${tshirtSide}"
        src="./img/tshirt-${tshirtSide}.png"
        alt="tshirt-${tshirtSide}"
      />
      <img
        class="img__logo--${tshirtSide}"
        src="https://picsum.photos/${loremPics}"
        alt="tshirt-logo"
      />
    </div>
  `;
  const previewContainers = Array.from(
    previewContainer.querySelectorAll(".preview__container--img")
  );
  const matchingContainers = previewContainers.filter(
    (container) => container.dataset.tshirtSide === tshirtSide
  );
  if (tshirtSelect.classList.contains("selected")) {
    previewContainer.insertAdjacentHTML("beforeend", html);
    labelPreview.classList.remove("hidden");
    state.price += 10;
    currentPrice.textContent = state.price.toFixed(2);
  } else {
    matchingContainers.forEach((container) =>
      previewContainer.removeChild(container)
    );
    state.price -= 10;
    currentPrice.textContent = state.price.toFixed(2);
  }
  state.preview = document.querySelector(".preview");
});

galleryBtnSpin.addEventListener("click", () => {
  loremPics++;
  loremArr.push(loremPics);
  updateLogo();
  showButtonsLogo();
});

galleryBtnPrev.addEventListener("click", () => {
  loremPics--;
  updateLogo();
  showButtonsLogo();
});

galleryBtnNext.addEventListener("click", () => {
  loremPics++;
  updateLogo();
  showButtonsLogo();
});

function updateLogo() {
  const selectedImg = document.getElementById("selected-img");
  const tshirtFront = document.querySelector(".img__logo--front");
  const tshirtBack = document.querySelector(".img__logo--back");
  const logoPreview = document.querySelector(".img__logo--preview");

  selectedImg.src = `https://picsum.photos/${loremPics}`;
  logoPreview.src = `https://picsum.photos/${loremPics}`;
  if (tshirtFront) tshirtFront.src = `https://picsum.photos/${loremPics}`;
  if (tshirtBack) tshirtBack.src = `https://picsum.photos/${loremPics}`;
}

function showButtonsLogo() {
  loremPics > 200
    ? galleryBtnPrev.classList.remove("hidden")
    : galleryBtnPrev.classList.add("hidden");

  loremPics < loremArr[loremArr.length - 1]
    ? galleryBtnNext.classList.remove("hidden")
    : galleryBtnNext.classList.add("hidden");
}
