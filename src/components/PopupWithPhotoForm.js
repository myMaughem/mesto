import PopupWithForm from "../components/PopupWithForm.js";
import { addPhotoOpenButton } from "../utils/constants.js"

export default class PopupWithPhotoForm extends PopupWithForm {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open() {
    addPhotoOpenButton.addEventListener('click', () => {
      super.open();
    })
  }
}