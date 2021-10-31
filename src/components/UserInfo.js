export default class UserInfo {
  data = {}

  constructor(selectors) {
    this.nameElement = document.querySelector(selectors.name);
    this.aboutElement = document.querySelector(selectors.about);
    this.avatarElement = document.querySelector(selectors.avatar);
  }

  getUserId() {
    return this.data._id
  }

  getUserInfo() {
    return this.data
  }

  setUserInfo(newData) {
    Object.assign(this.data, newData)

    this.updateElements()
  }

  updateElements(name, info) {
    this.avatarElement.src = this.data.avatar;
    this.nameElement.textContent = this.data.name;
    this.aboutElement.textContent = this.data.about;
  }
}