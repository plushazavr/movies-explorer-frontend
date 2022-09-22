class Api {
  constructor(options) {
      this._url = options.baseUrl
      this._headers = options.headers
  }

  _checkRes(res) {
      if (res.ok) {
          return res.json()
      } else {
          return Promise.reject(`ERROR! => ${res.status}`)
      }
  }

  getAllMovies() {
      return fetch(`${this._url}/beatfilm-movies`, {
          headers: this._headers,
      },
      )
          .then(this._checkRes)
  };
}

export const moviesApi = new Api({
  baseUrl: 'https://api.nomoreparties.co',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  }
});