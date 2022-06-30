class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._getResponse);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._getResponse);
  }

  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._getResponse);
  }

  editProfileAvatar({ avatarlink }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarlink
      })
    })
      .then(this._getResponse);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._getResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._getResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
    })
      .then(this._getResponse);
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'be572c5e-d007-4eb5-8f11-d7febc239ede',
    'Content-Type': 'application/json'
  }
});

