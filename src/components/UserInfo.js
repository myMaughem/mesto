import { profileTitle, profileSubtitle, profileSaveBtn } from "../utils/constants.js"

export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this.name = document.querySelector(nameSelector);
    this.info = document.querySelector(infoSelector);
  }

  getUserInfo() {
    this.name.value = profileTitle.textContent;
    this.info.value = profileSubtitle.textContent;
  }

  setUserInfo() {
    profileSaveBtn.addEventListener('click', () => {
      profileTitle.textContent = this.name.value;
      profileSubtitle.textContent = this.info.value;
    })
  }
}