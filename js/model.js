export const state = {
  preview: "",
  price: 0,
  firstName: "",
  lastName: "",
  street: "",
  buildingNumber: null,
  flatNumber: null,
  city: "",
  zipCode: "",
  phone: "",
  email: "",
  currentStep: 1,
  currentCircle: 0,
  loremPics: 200,
  loremArr: [200],
};

export function saveDataInObject() {
  const emailInput = document.getElementById("email");
  const zipCodeInput = document.getElementById("zipCode");
  const phoneInput = document.getElementById("phone");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const cityInput = document.getElementById("city");
  const streetInput = document.getElementById("street");
  const buildingNumInput = document.getElementById("bNumber");
  const flatNumInput = document.getElementById("fNumber");

  state.firstName = firstNameInput.value.trim();
  state.lastName = lastNameInput.value.trim();
  state.street = streetInput.value.trim();
  state.city = cityInput.value.trim();
  state.buildingNumber = buildingNumInput.value.trim();
  state.flatNumber = flatNumInput.value.trim();
  state.zipCode = zipCodeInput.value.trim();
  state.phone = phoneInput.value.trim();
  state.email = emailInput.value.trim();
}
