class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }
  _headers = {
    "Content-Type": "application/json",
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register({ email, password }) {
      return fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({ email, password }),
      }).then((res) => this._checkResponse(res));;
    }
    
    authorize({ email, password }) {
      return fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({ email, password }),
      }).then((res) => this._checkResponse(res));
    }
    
    checkToken(token) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        credentials: 'include',
        headers: {
          ...this._headers,
          authorization: `Bearer ${token}`,
        },
      }).then((res) => this._checkResponse(res));
    }
}
    
const auth = new Auth({
  baseUrl: "https://api.mesto.irinavladi.nomoredomains.sbs",
  credentials: 'include',
});

export default auth;