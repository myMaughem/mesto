import '../pages/index.css';

import { items, cardListSection, profileOpenButton, savePhotoBtn, photoNameInput, photoImageInput, formProfile, formPhoto } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithPhotoForm from '../components/PopupWithPhotoForm.js';
import PopupWithProfileForm from '../components/PopupWithProfileForm.js';
import UserInfo from '../components/UserInfo.js';

const formValidatorProfile = new FormValidator({
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-button_profile',
  inputErrorClass: 'popup__input-text_type_error',
  inputErrorTextClass: 'popup__input-error_active'
}, formProfile)

const formValidatorPhoto = new FormValidator({
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-button_hpoto',
  inputErrorClass: 'popup__input-text_type_error',
  inputErrorTextClass: 'popup__input-error_active'
}, formPhoto)

formValidatorPhoto.enableValidation();
formValidatorProfile.enableValidation();

const cardList = new Section({
  data: items
}, cardListSection);
cardList.renderItems();

export const popupWithImage = new PopupWithImage('#popup__photo-open');

const popupProfile = new PopupWithProfileForm('#popup__profile-edt');
popupProfile.open();
popupProfile.setEventListeners();

const popupPhotoEdt = new PopupWithPhotoForm('#popup__photo-edt');
popupPhotoEdt.open();
popupPhotoEdt.setEventListeners();

profileOpenButton.addEventListener('click', () => {
  const userInfo = new UserInfo('.popup__input-text_profile_name', '.popup__input-text_profile_info');
  userInfo.getUserInfo();
  userInfo.setUserInfo();
})

savePhotoBtn.addEventListener('click', () => {
  const inputPhoto = [
    {
      text: photoNameInput.value,
      image: photoImageInput.value
    }
  ];
  const card = new Section({
    data: inputPhoto
  }, cardListSection);
  card.renderItems();
})