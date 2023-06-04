class Api {
  constructor(url, options) {
    this._options = options;
    this._baseUrl = url;
  }

  _getResponse(res) {
    if (res.ok) {


      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, this._options)
      .then((res) => this._getResponse(res));
  }

  async getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, this._options)
      .then((res) => this._getResponse(res));
  }

  async setUserInfo(userInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._options,
      method: 'PATCH',
      body: JSON.stringify(userInfo)
    })
      .then((res) => this._getResponse(res));
  }

  async addNewCard(place) {
    return fetch(`${this._baseUrl}/cards`, {
      ...this._options,
      method: 'POST',
      body: JSON.stringify(place)
    })
      .then((res) => this._getResponse(res));
  }

  async deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      ...this._options,
      method: 'DELETE'
    })
      .then((res) => this._getResponse(res));
  }

  async likeCard(state, cardId) {
    const method = state ? 'DELETE' : 'PUT';
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      ...this._options,
      method: method
    })
      .then((res) => this._getResponse(res));
  }

  async updateAvatar(link){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      ...this._options,
      method: 'PATCH',
      body: JSON.stringify(link)
    })
      .then((res) => this._getResponse(res));
  }

  async signup(data){
    return fetch(`${this._baseUrl}/signup`, {
      ...this._options,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then((res) => this._getResponse(res));
  }

  async signin(data){
    return fetch(`${this._baseUrl}/signin`, {
      ...this._options,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then((res) => this._getResponse(res));
  }

  async authorization(token){
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._options,
      headers: {
        "Authorization" : `Bearer ${token}`
      },
      method: 'GET'
    })
      .then((res) => this._getResponse(res));
  }
}

export const api = new Api('api.toxicity.nomoredomains.rocks',
  {
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const authApi = new Api('api.toxicity.nomoredomains.rocks',
  {
    headers: {
      'Content-Type': 'application/json',
    }
  });