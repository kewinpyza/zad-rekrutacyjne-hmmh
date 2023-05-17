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
const errorMsg = document.querySelector(".message__error--s1");
const labelPreview = document.querySelector(".img__logo--preview");
const emailInput = document.getElementById("email");
const emailError = document.querySelector(
  ".form__field--email .message__error--detail"
);
const zipCodeInput = document.getElementById("zipCode");
const zipCodeError = document.querySelector(
  ".form__field--zipcode .message__error--detail"
);
const phoneInput = document.getElementById("phone");
const phoneError = document.querySelector(
  ".form__field--phone .message__error--detail"
);
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const cityInput = document.getElementById("city");
const streetInput = document.getElementById("street");
const buildingNumInput = document.getElementById("bNumber");
const flatNumInput = document.getElementById("fNumber");

const summaryPlans = document.querySelectorAll(".summary__plans");
const summaryDetails = document.querySelectorAll(".summary__details");
const planCardFront = document.querySelector(".plan__card--front");
const planCardBack = document.querySelector(".plan__card--back");
const totalPrice = document.querySelector(".summary__total--price b");
const totalDetailsPrice = document.querySelector(".summary__details--price b");

let currentStep = 1;
let currentCircle = 0;
const state = {
  preview: "",
  price: 0,
  firstName: "",
  lastName: "",
  street: "",
  buildingNumber: null,
  flatNumber: null,
  city: "",
  postalCode: "",
  phone: "",
  email: "",
};
const loremArr = [200];
let loremPics = 200;

steps.forEach((step, i) => {
  const nextBtn = step.querySelector(".btn--next");
  const prevBtn = step.querySelector(".btn--prev");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentStep === 4) {
        summaryPlans.forEach((el) => (el.innerHTML = ""));
        summaryDetails.forEach((el) => (el.innerHTML = ""));
      }
      goPreviousPage(steps);
    });
  }

  nextBtn.addEventListener("click", () => {
    if (currentStep === 3) {
      const isEmailValid = checkEmail();
      const isZipCodeValid = checkZipCode();
      const isPhoneValid = checkPhone();
      const isFormValid = validateForm();
      emailErrorMsg();
      zipCodeErrorMsg();
      phoneErrorMsg();
      if (isEmailValid && isZipCodeValid && isPhoneValid && isFormValid) {
        saveDataInObject();
        goNextPage(steps);
        displayFormDetails();
      }
    } else {
      goNextPage(steps);
    }
    console.log(state);
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

function validateForm() {
  const formFields = document.querySelectorAll(".form__step--3 input");

  let isValid = true;
  formFields.forEach((field) => {
    if (field.value.trim() === "" && field.required) {
      field.nextElementSibling.classList.remove("hidden");
      field.classList.add("err");
      isValid = false;
    } else {
      field.nextElementSibling.classList.add("hidden");
      field.classList.remove("err");
    }
  });
  return isValid;
}

function goNextPage(steps) {
  let isValid = true;
  steps[currentStep - 1].style.display = "none";
  if (currentStep < 5) {
    if (currentStep === 1) {
      const planCards = document.querySelectorAll(".plan__card");
      const isFrontSelected = planCards[0].classList.contains("selected");
      const isBackSelected = planCards[1].classList.contains("selected");
      if (!isFrontSelected && !isBackSelected) {
        isValid = false;
        errorMsg.classList.remove("hide");
      }
    }
    if (currentStep === 3) {
      validateForm();
    }
    if (isValid) {
      if (errorMsg) {
        errorMsg.classList.add("hide");
      }
      currentStep++;
      currentCircle++;
    }
  }
  steps[currentStep - 1].style.display = "flex";
  circleSteps[currentCircle].classList.add("active");
  steps[currentStep - 1].querySelector(".btns").before(state.preview);
}

function goPreviousPage(steps) {
  steps[currentStep - 1].style.display = "none";
  currentStep--;
  steps[currentStep - 1].style.display = "flex";
  circleSteps[currentCircle].classList.remove("active");
  currentCircle--;
  steps[currentStep - 1].querySelector(".btns").before(state.preview);
}

function showEmailError(message) {
  emailError.textContent = message;
  emailInput.classList.add("err");
  emailError.classList.remove("hidden");
}

function hideEmailError() {
  emailError.textContent = "";
  emailInput.classList.remove("err");
  emailError.classList.add("hidden");
}

function showZipCodeError(message) {
  zipCodeError.textContent = message;
  zipCodeInput.classList.add("err");
  zipCodeError.classList.remove("hidden");
}

function hideZipCodeError() {
  zipCodeError.textContent = "";
  zipCodeInput.classList.remove("err");
  zipCodeError.classList.add("hidden");
}

function showPhoneError() {
  phoneInput.classList.add("err");
  phoneError.classList.remove("hidden");
}

function hidePhoneError() {
  phoneInput.classList.remove("err");
  phoneError.classList.add("hidden");
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateZipCode(zipCode) {
  const zipCodeRegex = /^[0-9]{2}-[0-9]{3}$/;
  return zipCodeRegex.test(zipCode);
}

function validatePhoneNumber(phoneNumber) {
  const phoneRegex = /^\d{3}-\d{3}-\d{3}$/;
  if (phoneNumber === "") {
    return true;
  }
  return phoneRegex.test(phoneNumber);
}

function checkEmail() {
  emailInput.addEventListener("input", phoneErrorMsg);
  return validateEmail(emailInput.value.trim());
}

function checkZipCode() {
  zipCodeInput.addEventListener("input", zipCodeErrorMsg);
  return validateZipCode(zipCodeInput.value.trim());
}

function checkPhone() {
  phoneInput.addEventListener("input", phoneErrorMsg);
  return validatePhoneNumber(phoneInput.value.trim());
}

function phoneErrorMsg() {
  const phoneValue = phoneInput.value.trim();

  if (phoneValue === "") {
    hidePhoneError();
  }
  if (!validatePhoneNumber(phoneValue)) {
    showPhoneError();
  } else {
    hidePhoneError();
  }
}

function emailErrorMsg() {
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    showEmailError("Pole email jest wymagane");
  }
  if (!validateEmail(emailValue)) {
    showEmailError("Niepoprawny format adresu email");
  } else {
    hideEmailError();
  }
}

function zipCodeErrorMsg() {
  const zipCodeValue = zipCodeInput.value.trim();

  if (zipCodeValue === "") {
    showZipCodeError("Pole 'Kod pocztowy' jest wymagane");
  }
  if (!validateZipCode(zipCodeValue)) {
    showZipCodeError("Niepoprawny format kodu pocztowego");
  } else {
    hideZipCodeError();
  }
}

function saveDataInObject() {
  state.firstName = firstNameInput.value.trim();
  state.lastName = lastNameInput.value.trim();
  state.street = streetInput.value.trim();
  state.city = cityInput.value.trim();
  state.buildingNumber = buildingNumInput.value.trim();
  state.flatNumber = flatNumInput.value.trim();
  state.postalCode = zipCodeInput.value.trim();
  state.phone = phoneInput.value.trim();
  state.email = emailInput.value.trim();
}

function displayFormDetails() {
  const html1 = `
        <div class="summary__plan">
          <p class="summary__plan--name">T-shirt - Nadruk (Przód)</p>
          <p class="summary__plan--price">10.00</p>
        </div>
    `;

  const html2 = `
        <div class="summary__plan">
          <p class="summary__plan--name">T-shirt - Nadruk (Tył)</p>
          <p class="summary__plan--price">10.00</p>
        </div>
    `;

  if (planCardFront.classList.contains("selected")) {
    summaryPlans.forEach((el) => el.insertAdjacentHTML("beforeend", html1));
  }
  if (planCardBack.classList.contains("selected")) {
    summaryPlans.forEach((el) => el.insertAdjacentHTML("beforeend", html2));
  }

  const html3 = `
    <div class="summary__details--header">Dane zamawiającego:</div>
    <div class="summary__details--name">${state.firstName} ${
    state.lastName
  }</div>
    <div class="summary__details--address">
      ${state.city}, ul.${state.street} ${state.buildingNumber}${
    state.flatNumber ? "/" + state.flatNumber : ""
  }, ${state.postalCode}
    </div>
    <div class="summary__details--more">
      ${state.phone ? "Tel: " + state.phone + ", " : ""}Email: ${state.email}
    </div>
  `;
  summaryDetails.forEach((el) => el.insertAdjacentHTML("beforeend", html3));
  totalPrice.textContent = state.price.toFixed(2);
  totalDetailsPrice.textContent = state.price.toFixed(2);
}

// function validateTextInputs(arr) {
//   const textInputRegex = /^[A-Za-z]{3,}$/;
//   arr.forEach((inp) => textInputRegex.test(inp));
// }

// function checkTextInputs() {
//   return validateTextInputs([
//     firstNameInput.value.trim(),
//     lastNameInput.value.trim(),
//     cityInput.value.trim(),
//     streetInput.value.trim(),
//   ]);
// }
