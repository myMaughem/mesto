import { profileOpenButton } from "../utils/constants.js"
import PopupWithForm from "../components/PopupWithForm.js";

export default class PopupWithProfileForm extends PopupWithForm {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open() {
    profileOpenButton.addEventListener('click', () => {
      super.open();
    });
  }
}