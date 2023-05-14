"use strict";

const steps = document.querySelectorAll(".form__step");
const circleSteps = document.querySelectorAll(".page__step--circle");
const plans = document.querySelectorAll(".plan__card");
const planPrice = document.querySelector(".summary__plan--price");
const currentPrice = document.querySelector(".page__price--current b");

let currentStep = 1;
let currentCircle = 0;
const state = {
  preview: null,
  price: 0,
};

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
  const previewContainer = document.querySelector(".preview__container");
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
        src="https://picsum.photos/40"
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
