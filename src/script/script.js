import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupFones = document.querySelectorAll('.popup');

const popupProfileEdt = document.querySelector('#popup__profile-edt');
const popupPhotoEdt = document.querySelector('#popup__photo-edt');
const popupPhotoOpen = document.querySelector('#popup__photo-open');

const popupPhotoOpenBlock = document.querySelector('.popup__photo-watch');
const popupPhotoOpenText = document.querySelector('.popup__photo-watch-text');

const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupProfile = document.querySelector('.popup__close-icon_profile');
const closePopupPhoto = document.querySelector('.popup__close-icon_photo');
const closePopupPhotoOpen = document.querySelector('.popup__close-icon_photo-watch');

const addPhotoButton = document.querySelector('.profile__add-button');

const formProfile = document.querySelector('#profile-form');
const formPhoto = document.querySelector('#profile-photo');
const profileTitle = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input-text_profile_name');
const infoInput = document.querySelector('.popup__input-text_profile_info');

const namePhotoInput = document.querySelector('.popup__input-text_photo_name');
const urlPhotoInput = document.querySelector('.popup__input-text_photo_url');

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

const cards = [
  {
    text: 'Архыз',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    text: 'Челябинская область',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    text: 'Иваново',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    text: 'Камчатка',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    text: 'Холмогорский район',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    text: 'Байкал',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

formValidatorPhoto.enableValidation();
formValidatorProfile.enableValidation();

cards.forEach((item) => {
  const cardElement = addCard(item);
  document.querySelector('.elements').append(cardElement);
});

// открытие фото 
function openPhoto(image, text) {
  popupPhotoOpenBlock.src = image;
  popupPhotoOpenBlock.alt = text;
  popupPhotoOpenText.textContent = text;
  
  openPopup(popupPhotoOpen);
};

function addCard(item) {
  const card = new Card('#element_template', item);
  card.onOpenPhoto(openPhoto)
  return card.generateCard();
}

// добавление новых фото
function addNewPhoto() {
  const photoValue = namePhotoInput.value;
  const urlValue = urlPhotoInput.value;

  const cardElement = addCard({ text: photoValue, image: urlValue})

  document.querySelector('.elements').prepend(cardElement);

  closePopup(popupPhotoEdt);
};

// Заполняет форму
function setFormValues() {
  formProfile.reset();
  nameInput.value = profileTitle.textContent;
  infoInput.value = profileInfo.textContent;
}

// функции открытия закрытия
function openPopup(openPopup) {
  openPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscPopup)
};

function closePopup(closePopup) {
  closePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscPopup)
};

// открытие попапа добавления фото
function togglePhotoPopup() {
  formPhoto.reset();
  openPopup(popupPhotoEdt);
}

// открывает форму профиля
function editHandler() {
  setFormValues();
  openPopup(popupProfileEdt);
}
// сохранение формы
function saveProfileForm(event) {
  event.preventDefault();
  closePopup(popupProfileEdt);
  profileTitle.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
}
// сохранение фото
function savePhotoForm(event) {
  event.preventDefault();
  addNewPhoto();
}
// закрытие по Esc
function closeEscPopup(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}
// закрытие по оверу
popupFones.forEach(popupElement => popupElement.addEventListener('mousedown', function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupElement)
  }
}))
// события с кнопками
formProfile.addEventListener('submit', saveProfileForm);
popupPhotoEdt.addEventListener('submit', savePhotoForm);

editProfileButton.addEventListener('click', editHandler);
closePopupProfile.addEventListener('click', function () { closePopup(popupProfileEdt) });
addPhotoButton.addEventListener('click', togglePhotoPopup);
closePopupPhoto.addEventListener('click', function () { closePopup(popupPhotoEdt) });
closePopupPhotoOpen.addEventListener('click', function () { closePopup(popupPhotoOpen) });