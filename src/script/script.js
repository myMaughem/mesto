const popupProfileEdt = document.querySelector('.popup__profile-edt');
const popupPhotoEdt = document.querySelector('.popup__photo-edt');
const popupPhotoOpen = document.querySelector('.popup__photo-open');

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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// где лягут фотки
const elementsSection = document.querySelector('.elements');
const photoWatchSection = document.querySelector('.photo-watch');
// перебор массива
initialCards.forEach(function(element) {
  const newPhoto = createPhotoElement(element.name, element.link)

  elementsSection.append(newPhoto);
});


function createPhotoElement (name, link) {

  const newPhoto = photoTemplate.content.querySelector('.element').cloneNode(true);
  const textPhoto = newPhoto.querySelector('.element__photo-text');
  const urlPhoto = newPhoto.querySelector('.element__photo');
  const deleteBtn = newPhoto.querySelector('.element__trash');
  const likeButton = newPhoto.querySelector('.element__like-button');

  textPhoto.textContent = name;
  urlPhoto.src = link;
  urlPhoto.alt = name;
  urlPhoto.dataset.name = name;

  deleteBtn.addEventListener('click', delPhoto);
  likeButton.addEventListener('click', likePhoto);
  urlPhoto.addEventListener('click', openPhoto);

  return newPhoto
}

// добавление новых фото
function addNewPhoto () {
  const photoValue = namePhotoInput.value;
  const urlValue = urlPhotoInput.value;

  const newPhoto = createPhotoElement(photoValue, urlValue)

  elementsSection.prepend(newPhoto);
  closePopup(popupPhotoEdt);
};

// лайки и удаление
function delPhoto (event) {
  event.target.closest('.element').remove();
};
function likePhoto (event) {
  event.target.classList.toggle('element__like-button_active');
};
// открыть фото
function openPhoto(event) {
  openPopup(popupPhotoOpen);
  popupPhotoOpenBlock.src = event.target.src;
  popupPhotoOpenText.textContent = event.target.dataset.name;
};

const userData = {
  name: 'Жак-Ив Кусто',
  info: 'Исследователь океана',
}
// Обновляет профиль
function updateProfile() {
  profileTitle.textContent = userData.name;
  profileInfo.textContent = userData.info;
}
// Заполняет форму и замыкает
function setFormValues() {
  nameInput.value = userData.name;
  infoInput.value = userData.info;
}
// фун-ции открытия закрытия кнопок
function openPopup(openPopup) {
  openPopup.classList.add('popup_opened');
};
function closePopup(closePopup) {
  closePopup.classList.remove('popup_opened');
};

function togglePhotoPopup() {
  openPopup (popupPhotoEdt);
  namePhotoInput.value = '';
  urlPhotoInput.value = '';
}

// открывает форму профиля
function editHandler() {
  setFormValues();
  openPopup(popupProfileEdt);
}
// сохранение формы
function saveProfileForm(event) {
  event.preventDefault();
  closePopup (popupProfileEdt);
  userData.name = nameInput.value;
  userData.info = infoInput.value;
  updateProfile();
}
// сохранение фото
function savePhotoForm(event) {
  event.preventDefault();
  addNewPhoto();
}
// события с кнопками
formProfile.addEventListener('submit', saveProfileForm);
popupPhotoEdt.addEventListener('submit', savePhotoForm);

editProfileButton.addEventListener('click', editHandler);
closePopupProfile.addEventListener('click', function() {closePopup(popupProfileEdt)});
addPhotoButton.addEventListener('click', togglePhotoPopup);
closePopupPhoto.addEventListener('click', function() {closePopup(popupPhotoEdt)});
closePopupPhotoOpen.addEventListener('click', function() {closePopup(popupPhotoOpen)});