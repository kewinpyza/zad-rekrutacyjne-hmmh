"use strict";

import * as model from "./model.js";
import GalleryManager from "./partials/galleryBtns.js";
import StepManager from "./partials/stepManager.js";

const init = () => {
  StepManager.renderInitialStep();
  StepManager.renderStep(
    model.state.currentStep,
    model.state.currentCircle,
    model.state
  );
  GalleryManager.addHandlerSpin();
  GalleryManager.addHandlerPrev();
  GalleryManager.addHandlerNext();
};

init();
