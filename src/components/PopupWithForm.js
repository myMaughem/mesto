import { profileSaveBtn, savePhotoBtn } from "../utils/constants.js";
import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    document.getElementById('profile-form').reset();
    document.getElementById('profile-photo').reset();
  }

  setEventListeners() {
    profileSaveBtn.addEventListener('click', () => {
      document.getElementById('profile-form').submit();
    })
    savePhotoBtn.addEventListener('click', () => {
      document.getElementById('profile-photo').submit();
    })
    super.setEventListeners();
  }
}