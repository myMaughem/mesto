
function defaultResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export default class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  _request(method, path, data) {
    return fetch(this.url + path, {
      method,
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined
    })
      .then(defaultResponse)
  }

  // загрузка инфо о пользователе с сервера
  getProfileInfo() {
    return this._request('GET', '/users/me')
  }

  // загрузка карточек
  getCards() {
    return this._request('GET', '/cards')
  }

  // редактирование профиля
  profileUpdate(name, about) {
    return this._request('PATCH', '/users/me', { name, about })
  }

  // добавление новой карточки
  addNewCard(name, link) {
    return this._request('POST', '/cards', { name, link })
  }

  // обновление аватара пользователя
  avatarUpdate(avatar) {
    return this._request('PATCH', '/users/me/avatar', { avatar })
  }

  // удаление карточки по её ID
  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(defaultResponse)
  }

  // постановка и снятие лайка по её ID
  toggleLike(id, like) {
    const method = like ? 'PUT' : 'DELETE'
    return this._request(method, `/cards/likes/${id}`)
  }
}
