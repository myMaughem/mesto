import '../pages/index.css';

import { cardListSectionSelector, profileOpenButton, formProfile, formPhoto, addPhotoOpenButton, profileNameInput, profileInfoInput, profileAvatarButton, formAvatar } from '../utils/constants.js';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';

const validateSelectors = {
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__input-text_type_error',
  inputErrorTextClass: 'popup__input-error_active'
}

const formValidatorProfile = new FormValidator(validateSelectors, formProfile)
const formValidatorPhoto = new FormValidator(validateSelectors, formPhoto)
const formValidatorAvatr = new FormValidator(validateSelectors, formAvatar)
formValidatorProfile.enableValidation();
formValidatorPhoto.enableValidation();
formValidatorAvatr.enableValidation();

const popupWithImage = new PopupWithImage('#popup__photo-open');
const popupDeleteImage = new PopupWithConfirm('#popup__photo-delete', {
  onConfirm: ({ id }) => {
    api.deleteCard(id).then(() => {
      Cards[id].deleteCard();
    })
  }
});

const Cards = {}

// отрисовка попапа с фото
const cardClickHandler = (text, image) => {
  popupWithImage.open(text, image)
}
const handleLikeClick = (id) => {
  const card = Cards[id]
  const userId = userInfo.getUserId()
  const isCardLiked = card.isCardLiked(userId)

  api.toggleLike(id, !isCardLiked)
    .then((newCardData) => {
      card.updateLikes(userId, newCardData.likes)
    })
    .catch(defualtErrorHandler)
}
const handleTrashClick = (id) => {
  popupDeleteImage.open({ id });
}
// генерация элемента карточки для отрисовки
const cardItemRenderer = (data) => {
  const cardData = {
    ...data,
    userId: userInfo.getUserId(),
  }
  const card = new Card(cardData, '#element_template', {
    onCardClick: cardClickHandler,
    onLikeClick: handleLikeClick,
    onTrashClick: handleTrashClick,
  })

  Cards[data._id] = card

  return card.generateCard();
}
// куда и что отрисовывает
const cardListSection = new Section({
  items: [],
  renderer: cardItemRenderer
}, cardListSectionSelector);

cardListSection.renderer();

// обновление аватара
const popupAvatarEdt = new PopupWithForm('#popup__profile-edt-avatar', (inputs, resolve) => {
  api.avatarUpdate(inputs['avatar-photo-url'])
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch(defualtErrorHandler)
    .finally(resolve)
}, true);
profileAvatarButton.addEventListener('click', () => {
  popupAvatarEdt.open();
})

const userInfo = new UserInfo({
  name: '.profile__title',
  about: '.profile__subtitle',
  avatar: '.profile__avatar'
});

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-29',
  headers: {
    authorization: '2399b66a-f3da-4425-8ef3-39005dfdd9c5',
    'Content-Type': 'application/json'
  }
});

Promise.all([
  api.getProfileInfo(),
  api.getCards(),
])
  .then(([userData, cardsList]) => {
    userInfo.setUserInfo(userData)
    cardListSection
      .setItems(cardsList)
      .renderer()
  })
  .catch(defualtErrorHandler)

// обновление профиля
const popupProfile = new PopupWithForm('#popup__profile-edt', ({ fullname, info }, resolve) => {
  api.profileUpdate(fullname, info)
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch(defualtErrorHandler)
    .finally(resolve)
}, true);
profileOpenButton.addEventListener('click', () => {
  popupProfile.open()
});
profileOpenButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileInfoInput.value = about;
})

// добавлене новой карточки
const popupPhotoEdt = new PopupWithForm('#popup__photo-edt', (formInputValues, resolve) => {
  // передаёт данные формы на сервер
  api.addNewCard(formInputValues['photo-name'], formInputValues['photo-url'])
    // получает данные пришедшие от сервера
    .then((newCard) => {
      // передаёт данные пришедшие от сервера в функцию отрисовки
      const newCardItem = cardItemRenderer(newCard)
      cardListSection.addItem(newCardItem, 'before');
    })
    .catch(defualtErrorHandler)
    .finally(resolve)
}, true);
addPhotoOpenButton.addEventListener('click', () => {
  popupPhotoEdt.open();
})

function defualtErrorHandler(error) {
  // TODO: Выводить в блок 
  console.error(error);
}