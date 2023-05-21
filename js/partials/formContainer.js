class FormContainer {
  _planCardFront = document.querySelector(".plan__card--front");
  _planCardBack = document.querySelector(".plan__card--back");
  _summaryPlans = document.querySelectorAll(".summary__plans");
  _summaryDetails = document.querySelectorAll(".summary__details");
  _totalPrice = document.querySelector(".summary__total--price b");
  _totalDetailsPrice = document.querySelector(".summary__details--price b");

  displayFormDetails(state) {
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

    if (this._planCardFront.classList.contains("selected")) {
      this._summaryPlans.forEach((el) =>
        el.insertAdjacentHTML("beforeend", html1)
      );
    }
    if (this._planCardBack.classList.contains("selected")) {
      this._summaryPlans.forEach((el) =>
        el.insertAdjacentHTML("beforeend", html2)
      );
    }

    const html3 = `
          <div class="summary__details--header">Dane zamawiającego:</div>
          <div class="summary__details--name">${state.firstName} ${
      state.lastName
    }</div>
          <div class="summary__details--address">
            ${state.city}, ul.${state.street} ${state.buildingNumber}${
      state.flatNumber ? "/" + state.flatNumber : ""
    }, ${state.zipCode}
          </div>
          <div class="summary__details--more">
            ${state.phone ? "Tel: " + state.phone + ", " : ""}Email: ${
      state.email
    }
          </div>
        `;
    this._summaryDetails.forEach((el) =>
      el.insertAdjacentHTML("beforeend", html3)
    );
    this._totalPrice.textContent = state.price.toFixed(2);
    this._totalDetailsPrice.textContent = state.price.toFixed(2);
  }
}

export default new FormContainer();
