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
const saveButton = document.querySelector('.popup__save-button_profile');

const addPhotoButton = document.querySelector('.profile__add-button');
const saveNewPhotoButton = document.querySelector('.popup__save-button_hpoto');
// шаблон
const photoTemplate = document.querySelector('#element_template');

const formProfile = document.querySelector('#profile-form');
const formPhoto = document.querySelector('#profile-photo');
const profileTitle = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input-text_profile_name');
const infoInput = document.querySelector('.popup__input-text_profile_info');

const namePhotoInput = document.querySelector('.popup__input-text_photo_name');
const urlPhotoInput = document.querySelector('.popup__input-text_photo_url');

const formValidatorProfile = new FormValidator('#profile-form', '.popup__input-text', '.popup__save-button_profile',
  'popup__input-text_type_error', 'popup__input-error_active')
formValidatorProfile.enableValidation();

const formValidatorPhoto = new FormValidator('#profile-photo', '.popup__input-text', '.popup__save-button_hpoto',
  'popup__input-text_type_error', 'popup__input-error_active')
formValidatorPhoto.enableValidation();


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

cards.forEach((item) => {
  const card = new Card('#element_template', item);
  const cardElement = card.generateCard();

  document.querySelector('.elements').append(cardElement);
});
// добавление новых фото
function addNewPhoto() {
  const photoValue = namePhotoInput.value;
  const urlValue = urlPhotoInput.value;

  const card = new Card('#element_template', { text: photoValue, image: urlValue });
  const cardElement = card.generateCard();

  document.querySelector('.elements').prepend(cardElement);

  closePopup(popupPhotoEdt);
};

// Заполняет форму
function setFormValues() {
  nameInput.value = profileTitle.textContent;
  infoInput.value = profileInfo.textContent;
}
// фун-ции открытия закрытия кнопок
function openPopup(openPopup) {
  openPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscPopup)
};
function closePopup(closePopup) {
  closePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscPopup)
};

function togglePhotoPopup() {
  openPopup(popupPhotoEdt);
  namePhotoInput.value = '';
  urlPhotoInput.value = '';
  formValidatorPhoto.openPopupClear();
}

// открывает форму профиля
function editHandler() {
  setFormValues();
  openPopup(popupProfileEdt);
  formValidatorProfile.openPopupClear();
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