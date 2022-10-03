class Api {
  constructor(options) {
    this._options = options;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "GET",
      headers: this._options.headers,
      credentials: 'include'
    }).then(this._getResponse);
  }

  getCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: "GET",
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._getResponse);
  }

  getData() {
    return Promise.all([this.getUserInfo(), this.getCards()])
  }

  setNewUserInfo(data) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponse);
  }

  setUserAvatar(link) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: link.avatar,
      }),
    }).then(this._getResponse);
  }

  setNewCardsInfo(card) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: "POST",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: card.title,
        link: card.link,
      }),
    }).then(this._getResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._options.headers,
      credentials: 'include'
    }).then(this._getResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._options.headers,
        credentials: 'include'
      }).then(this._getResponse);
    } else {
      return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._options.headers,
        credentials: 'include'
      }).then(this._getResponse);
    }
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.irinavladi.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});


export default api;