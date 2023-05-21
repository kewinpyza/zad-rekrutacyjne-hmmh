import * as model from "../model.js";
// import FormManager from "../partials/validateForm.js";
import FormContainer from "../partials/formContainer.js";
import ErrorView from "../partials/errorMsg.js";

class StepManager {
  _steps = document.querySelectorAll(".form__step");
  _circleSteps = document.querySelectorAll(".page__step--circle");
  _labelPreview = document.querySelector(".img__logo--preview");
  _currentPrice = document.querySelector(".page__price--current b");
  _errorMsg = document.querySelector(".message__error--s1");

  constructor() {}

  renderStep() {
    this._steps.forEach((step) => {
      const nextBtn = step.querySelector(".btn--next");
      const prevBtn = step.querySelector(".btn--prev");
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          if (model.state.currentStep === 4) {
            const summaryPlans = document.querySelectorAll(".summary__plans");
            const summaryDetails =
              document.querySelectorAll(".summary__details");

            summaryPlans.forEach((el) => (el.innerHTML = ""));
            summaryDetails.forEach((el) => (el.innerHTML = ""));
          }
          this._goPreviousPage();
        });
      }

      nextBtn.addEventListener("click", () => {
        if (model.state.currentStep === 3) {
          if (ErrorView.validateForm()) {
            this.renderPersonalDataStep();
          }
        } else {
          this._goNextPage();
        }
        console.log(model.state);
      });
    });
  }

  renderPersonalDataStep() {
    model.saveDataInObject();
    this._goNextPage();
    FormContainer.displayFormDetails(model.state);
  }

  renderInitialStep() {
    this._steps[0].addEventListener("click", (e) => {
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
              src="https://picsum.photos/${model.state.loremPics}"
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

      if (this._errorMsg && tshirtSelect.classList.contains("selected")) {
        this._errorMsg.classList.add("hide");
      }

      if (tshirtSelect.classList.contains("selected")) {
        previewContainer.insertAdjacentHTML("beforeend", html);
        this._labelPreview.classList.remove("hidden");
        model.state.price += 10;
        this._currentPrice.textContent = model.state.price.toFixed(2);
      } else {
        matchingContainers.forEach((container) =>
          previewContainer.removeChild(container)
        );
        model.state.price -= 10;
        this._currentPrice.textContent = model.state.price.toFixed(2);
      }

      model.state.preview = document.querySelector(".preview");
    });
  }

  _goNextPage() {
    let isValid = true;
    this._steps[model.state.currentStep - 1].style.display = "none";
    if (model.state.currentStep < 5) {
      if (model.state.currentStep === 1) {
        const planCards = document.querySelectorAll(".plan__card");
        const isFrontSelected = planCards[0].classList.contains("selected");
        const isBackSelected = planCards[1].classList.contains("selected");
        if (!isFrontSelected && !isBackSelected) {
          isValid = false;
          this._errorMsg.classList.remove("hide");
        }
      }
      if (isValid) {
        if (this._errorMsg) {
          this._errorMsg.classList.add("hide");
        }
        model.state.currentStep++;
        model.state.currentCircle++;
      }
    }
    this._steps[model.state.currentStep - 1].style.display = "flex";
    this._circleSteps[model.state.currentCircle].classList.add("active");
    this._steps[model.state.currentStep - 1]
      .querySelector(".btns")
      .before(model.state.preview);
  }

  _goPreviousPage() {
    this._steps[model.state.currentStep - 1].style.display = "none";
    model.state.currentStep--;
    this._steps[model.state.currentStep - 1].style.display = "flex";
    this._circleSteps[model.state.currentCircle].classList.remove("active");
    model.state.currentCircle--;
    this._steps[model.state.currentStep - 1]
      .querySelector(".btns")
      .before(model.state.preview);
  }
}

export default new StepManager();
