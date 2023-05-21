class ErrorView {
  validateForm() {
    const emailInput = document.getElementById("email");
    const zipCodeInput = document.getElementById("zipCode");
    const phoneInput = document.getElementById("phone");
    const emailError = document.querySelector(
      ".form__field--email .message__error--detail"
    );
    const zipCodeError = document.querySelector(
      ".form__field--zipcode .message__error--detail"
    );
    const phoneError = document.querySelector(
      ".form__field--phone .message__error--detail"
    );

    const emailErrorMsg = this.inputErrorMsg(emailInput, emailError);
    const zipCodeErrorMsg = this.inputErrorMsg(zipCodeInput, zipCodeError);
    const phoneErrorMsg = this.inputErrorMsg(phoneInput, phoneError);

    const isEmailValid = this.checkInput(emailInput, emailErrorMsg);
    const isZipCodeValid = this.checkInput(zipCodeInput, zipCodeErrorMsg);
    const isPhoneValid = this.checkInput(phoneInput, phoneErrorMsg);
    const isFormValid = this.checkFormInputs();

    this.inputErrorMsg(emailInput, emailError);
    this.inputErrorMsg(zipCodeInput, zipCodeError);
    this.inputErrorMsg(phoneInput, phoneError);

    return isEmailValid && isZipCodeValid && isPhoneValid && isFormValid;
  }

  inputErrorMsg(inpEl, errEl) {
    const inputValue = inpEl.value.trim();
    let label = inpEl.previousElementSibling.textContent;

    if (inputValue === "") {
      if (inpEl.id === "phone") {
        this.hideInputError(inpEl, errEl);
      }
      if (inpEl.id === "email" || inpEl.id === "zipCode") {
        this.showInputError(inpEl, errEl, `Pole '${label}' jest wymagane`);
      }
      // this.showInputError(inpEl, errEl, `Pole '${label}' jest wymagane`);
    } else {
      if (!this.validateInput(inputValue, inpEl.id)) {
        this.showInputError(inpEl, errEl, `Niepoprawny format pola '${label}'`);
      } else {
        this.hideInputError(inpEl, errEl);
      }
    }
  }

  showInputError(inpEl, errEl, msg) {
    errEl.textContent = msg;
    inpEl.classList.add("err");
    errEl.classList.remove("hidden");
  }

  hideInputError(inpEl, errEl) {
    errEl.textContent = "";
    inpEl.classList.remove("err");
    errEl.classList.add("hidden");
  }

  checkFormInputs() {
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

  checkInput(inpEl, errMsg) {
    inpEl.addEventListener("input", errMsg);
    return this.validateInput(inpEl.value.trim(), inpEl.id);
  }

  validateInput(inpValue, inpName) {
    let regex = "";
    if (inpName === "email") regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inpName === "zipCode") regex = /^[0-9]{2}-[0-9]{3}$/;
    if (inpName === "phone") {
      regex = /^\d{3}-\d{3}-\d{3}$/;
    }
    return inpName === "phone" ? true : regex.test(inpValue);
  }
}

export default new ErrorView();
