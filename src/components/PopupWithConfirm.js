import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handlers) {
    super(popupSelector)

    this.confirmBtn = this.popup.querySelector('button[data-confirm=true]')
    this.refuseBtn = this.popup.querySelector('button[data-confirm=false]')

    this.confirmHandler = handlers.onConfirm

    this.setEventListeners()
  }

  open(confirmationData) {
    this.confirmationData = confirmationData
    super.open()
  }

  setEventListeners() {
    if (this.confirmHandler && this.confirmBtn) {
      this.confirmBtn.addEventListener('click', () => {
        super.close()
        this.confirmHandler(this.confirmationData)
      })
    }

    super.setEventListeners()
  }
}