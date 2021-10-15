import '../pages/index.css';

import { cardItemsData, cardListSectionSelector, profileOpenButton, formProfile, formPhoto, addPhotoOpenButton, profileNameInput, profileInfoInput} from '../utils/constants.js';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

const validateSelectors = {
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__input-text_type_error',
  inputErrorTextClass: 'popup__input-error_active'
}

const formValidatorProfile = new FormValidator(validateSelectors, formProfile)
const formValidatorPhoto = new FormValidator(validateSelectors, formPhoto)
formValidatorProfile.enableValidation();
formValidatorPhoto.enableValidation();

const popupWithImage = new PopupWithImage('#popup__photo-open');

// отрисовка попапа с фото
const cardClickHandler = (text, image) => {
  popupWithImage.open(text, image)
}
// генерация элемента карточки для отрисовки
const cardItemRenderer = (data) => {
  const card = new Card(data, '#element_template', cardClickHandler)

  return card.generateCard();
}
// куда и что отрисовывает
const cardListSection = new Section({
  items: cardItemsData,
  renderer: cardItemRenderer
}, cardListSectionSelector);

cardListSection.renderer();


const userInfo = new UserInfo('.profile__title', '.profile__subtitle');
const popupProfile = new PopupWithForm('#popup__profile-edt', ({ fullname, info }) => {
  userInfo.setUserInfo(fullname, info);
});

profileOpenButton.addEventListener('click', () => {
  popupProfile.open()
});

profileOpenButton.addEventListener('click', () => {
  const { name, info } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileInfoInput.value = info;
})

const popupPhotoEdt = new PopupWithForm('#popup__photo-edt', (formInputValues) => {
  const newCardItem = cardItemRenderer({
    text: formInputValues['photo-name'],
    image: formInputValues['photo-url']
  })
  cardListSection.addItem(newCardItem);
});

addPhotoOpenButton.addEventListener('click', () => {
  popupPhotoEdt.open();
})