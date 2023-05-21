import * as model from "../model.js";

class GalleryManager {
  _galleryBtnPrev = document.querySelector(".gallery__nav--prev");
  _galleryBtnNext = document.querySelector(".gallery__nav--next");
  _galleryBtnSpin = document.querySelector(".gallery__nav--spin");

  constructor() {}

  addHandlerSpin() {
    this._galleryBtnSpin.addEventListener("click", () => {
      model.state.loremPics++;
      model.state.loremArr.push(model.state.loremPics);
      this.updateLogo();
      this.showButtonsLogo();
    });
  }

  addHandlerNext() {
    this._galleryBtnNext.addEventListener("click", () => {
      model.state.loremPics++;
      this.updateLogo();
      this.showButtonsLogo();
    });
  }

  addHandlerPrev() {
    this._galleryBtnPrev.addEventListener("click", () => {
      model.state.loremPics--;
      this.updateLogo();
      this.showButtonsLogo();
    });
  }

  updateLogo() {
    const selectedImg = document.getElementById("selected-img");
    const tshirtFront = document.querySelector(".img__logo--front");
    const tshirtBack = document.querySelector(".img__logo--back");
    const logoPreview = document.querySelector(".img__logo--preview");

    selectedImg.src = `https://picsum.photos/${model.state.loremPics}`;
    logoPreview.src = `https://picsum.photos/${model.state.loremPics}`;
    if (tshirtFront)
      tshirtFront.src = `https://picsum.photos/${model.state.loremPics}`;
    if (tshirtBack)
      tshirtBack.src = `https://picsum.photos/${model.state.loremPics}`;
  }

  showButtonsLogo() {
    model.state.loremPics > 200
      ? this._galleryBtnPrev.classList.remove("hidden")
      : this._galleryBtnPrev.classList.add("hidden");

    model.state.loremPics <
    model.state.loremArr[model.state.loremArr.length - 1]
      ? this._galleryBtnNext.classList.remove("hidden")
      : this._galleryBtnNext.classList.add("hidden");
  }
}

export default new GalleryManager();
