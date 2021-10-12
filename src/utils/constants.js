export const items = [
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

export const cardListSection = ('.elements');
export const elementPhoto = document.querySelector('.element__photo');

export const popupElement = document.querySelector('.popup');
export const popupOpen = document.querySelector('.popup_opened');

export const formProfile = document.querySelector('#profile-form');
export const formPhoto = document.querySelector('#profile-photo');

export const popupImage = document.querySelector('.popup__photo-open');
export const popupImagePhoto = document.querySelector('.popup__photo-watch');
export const popupImageText = document.querySelector('.popup__photo-watch-text');

export const popupProfileEdt = document.querySelector('#popup__profile-edt');
export const popupPhotoEdt = document.querySelector('#popup__photo-edt');

export const profileOpenButton = document.querySelector('.profile__edit-button');
export const addPhotoOpenButton = document.querySelector('.profile__add-button');

export const closeImageBtn = document.querySelector('.popup__close-icon_photo-watch');
export const closeProfileBtn = document.querySelector('.popup__close-icon_profile');
export const closeEdtPhotoBtn = document.querySelector('.popup__close-icon_photo');

export const popupPhotoOpenText = document.querySelector('.popup__photo-watch-text');

export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profileNameInput = document.querySelector('.popup__input-text_profile_name');
export const profileInfoInput = document.querySelector('.popup__input-text_profile_info');
export const profileSaveBtn = document.querySelector('.popup__save-button_profile');

export const savePhotoBtn = document.querySelector('.popup__save-button_hpoto');

export const photoNameInput = document.querySelector('.popup__input-text_photo_name');
export const photoImageInput = document.querySelector('.popup__input-text_photo_url');