const editProfileButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-icon');
const saveButton = document.querySelector('.popup__save-button');

const formElement = document.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__text_type_name');
const InfoInput = document.querySelector('.popup__text_type_info');

const userData = {
  name: 'Жак-Ив Кусто',
  Info: 'Исследователь океана',
}

// Обновляет профиль
function updateProfile() {
  profileTitle.textContent = userData.name;
  profileInfo.textContent = userData.Info;
}

// Заполняет форму и замыкание
function setFormValues() {
  nameInput.value = userData.name;
  InfoInput.value = userData.Info;
}

function togglePopup () {
  popup.classList.toggle('popup_opened');
}

function editHandler() {
  setFormValues();
  togglePopup();
}

function saveHandler(event) {
  event.preventDefault();
  togglePopup();
  userData.name = nameInput.value;
  userData.Info = InfoInput.value;
  updateProfile();
}

formElement.addEventListener('submit', saveHandler);

editProfileButton.addEventListener('click', editHandler);
closePopupButton.addEventListener('click', togglePopup);
