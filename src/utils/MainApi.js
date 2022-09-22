class Api {
  constructor(options) {
    this._url = options.baseURL
    this._headers = options.headers
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`ERROR! => ${res.status}`)
    }
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    },
    )
      .then(this._checkRes)
  };

  editUserInfo(userName, userEmail) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: userName,
        email: userEmail
      })
    })

      .then(this._checkRes)
  }

  getInitialMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
      credentials: 'include',
    },
    )
      .then(this._checkRes)
  };

  saveNewMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: movie.country ? movie.country : "Страна не указана",
        director: movie.director ? movie.director : "Режиссер не указан",
        duration: movie.duration,
        year: movie.year ? movie.year : "Год не указан",
        description: movie.description ? movie.description : "Описание не указано",
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink ? movie.trailerLink : "Трейлера нет",
        nameRU: movie.nameRU ? movie.nameRU : "Название не указано",
        nameEN: movie.nameEN ? movie.nameEN : "Назввание не указано",
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        owner: movie.owner
      })
    })
      .then(this._checkRes)
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })

      .then(this._checkRes)
  }
}

export const api = new Api({
  //baseURL: 'http://localhost:3000',
  baseURL: 'https://api.diploma.kazantseva.nomoredomains.sbs',
 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});