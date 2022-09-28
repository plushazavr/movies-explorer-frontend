import React, { useEffect, useState } from 'react';
import './App.css';
import Header from "../Header/Header";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import { api } from "../../utils/MainApi";
import { moviesApi } from '../../utils/MoviesApi'
import { filterDuration, filterMovies } from "../../utils/FilterMovies";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({});
  /* const allMovies = JSON.parse(localStorage.getItem('allMovies')); */
  const [shownMovies, setShownMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [shownSavedMovies, setShownSavedMovies] = useState([])
  const [isNotMovies, setIsNotMovies] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState('');
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  
  const history = useHistory();
  const pathname = useLocation();
  useEffect(() => {
     
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialMovies()])
        .then(([userInfo, InitialMovies]) => {
          setCurrentUser(userInfo);
          setSavedMovies(InitialMovies)
          setShownSavedMovies(InitialMovies)
          localStorage.setItem("InitialMovies", JSON.stringify(InitialMovies))
        })
        .catch((err) => console.log("ERROR! =>", err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    auth
      .checkToken()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log("ERROR! =>", err);
        setIsLoggedIn(false);
      });
  }, [history])

  function hadleLogin(email, password) {
    setIsLoading(true)
    setIsDisabledInput(true)
    setIsDisabledButton(true)

    auth
      .login(email, password)
      .then((res) => {        
        setCurrentUser(res)              
        setIsLoggedIn(true)
        history.push('/movies')            
        setIsErrorMessage('')
      })
      .catch((err) => {
        if (400) {
          setIsErrorMessage('Вы ввели неправильный логин или пароль.');
        } else {
          setIsErrorMessage('При авторизации произошла ошибка.')
        }
        console.log("ERROR =>", err)
      })
      .finally(() => {
        setIsLoading(false)
        setIsDisabledInput(false)
        setIsDisabledButton(false)
      }
      )
  }

  const handleRegister = (name, email, password) => {
    setIsLoading(true)
    setIsDisabledInput(true)
    setIsDisabledButton(true)

    auth
      .register(name, email, password)

      .then(() => {
        hadleLogin(email, password)
        setIsErrorMessage('')
      })
      .catch((err) => {
        if (409) {
          setIsErrorMessage('Пользователь с таким email уже существует.');
        } else {
          setIsErrorMessage('При регистрации пользователя произошла ошибка.')
        }
      })
      .finally(() => {
        setIsLoading(false)
        setIsDisabledInput(false)
        setIsDisabledButton(false)
      }
      )
  }

  const handleOnUpdateUser = (user) => {
    setIsLoading(true)
    setIsDisabledInput(true)
    setIsDisabledButton(true)
    setIsErrorMessage('')

    api
      .editUserInfo(user.name, user.email)
      .then((user) => {
        setCurrentUser(user);
        setIsErrorMessage('Данные успешно обновлены')
      })
      .catch((err) => {
        if (409) {
          setIsErrorMessage('Пользователь с таким email уже существует.');
        } else {
          setIsErrorMessage('При обновлении профиля произошла ошибка.')
        }
      })
      .finally(() => {
        setIsLoading(false)
        setIsDisabledInput(false)
        setIsDisabledButton(false)
      });
  }

  useEffect(() => {
    if (isLoggedIn) {
      setIsChecked(false)
      setIsLoading(true);
      if (localStorage.getItem("allMovies")) {
        JSON.parse(localStorage.getItem("allMovies"))
      } else {
        moviesApi
          .getAllMovies()
          .then((movies) => {
            localStorage.setItem('allMovies', JSON.stringify(movies))
          })
          .catch((err) => {
            console.log("ERROR! =>", err);
            setIsErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте еще раз');
          })
      }
    } setIsLoading(false)
  }, [isLoggedIn]);

  const handleMovieSave = (movie) => {
    if(savedMovies.find(item => item.trailerLink === movie.trailerLink)){return};    
    setIsLoading(true)
    api
      .saveNewMovie(movie)
      .then((movie) => setSavedMovies([movie, ...savedMovies]))
      .catch((err) => console.log("ERROR =>", err))
      .finally(() => setIsLoading(false));
  }

  const handleMovieDelete = (movieId) => {
    setIsLoading(true)
    api
      .deleteMovie(movieId)
      .then(() => {
        const newList = savedMovies.filter((element) => element._id !== movieId);
        setSavedMovies(newList)
        setShownSavedMovies(newList);
      })
      .catch((err) => console.log("ERROR =>", err))
      .finally(() => setIsLoading(false));
  }

  const searchMovies = (title, isChecked) => {
    console.log(title)
    const shortMovies = filterDuration(JSON.parse(localStorage.getItem('allMovies')))
    setIsNotMovies(false)
    if (Boolean(isChecked)) {
      const shortResult = filterMovies(shortMovies, title)
      if (shortResult.length === 0) {
        setIsNotMovies(true)
        localStorage.setItem("shortMovies", JSON.stringify([]));
      } else {
        localStorage.setItem("shortMovies", JSON.stringify(shortResult));
        setShownMovies(shortResult) 
      }

    } else {
      const allResult = filterMovies(JSON.parse(localStorage.getItem('allMovies')), title)
      if (allResult.length === 0) {
        setIsNotMovies(true)
        localStorage.setItem("searchMovies", JSON.stringify([]));
      } else {
        localStorage.setItem("searchMovies", JSON.stringify(allResult));
        setShownMovies(allResult)
      }
      const shortResult = filterMovies(shortMovies, title)
      if (localStorage.getItem("shortMovies")){localStorage.removeItem("shortMovies");}
      if (shortResult.length === 0) {
        localStorage.setItem("shortMovies", JSON.stringify([]));
        setIsNotMovies(true);
    }
      else {
        localStorage.setItem("shortMovies", JSON.stringify(shortResult));
        
      }
    }

    localStorage.setItem("lastMoviesRequest", JSON.stringify(title));
    
  }

  const searchSavedMovies = (title) => {
    const shortSavedMovies = filterDuration(savedMovies)
    setIsNotMovies(false)
    if (isChecked) {
      const shortSavedResult = filterMovies(shortSavedMovies, title)
      if (shortSavedResult.length === 0) {
        setIsNotMovies(true)
      }
      else {
        setShownSavedMovies(shortSavedResult)
      }
    } else {
      const allSavedResult = filterMovies(savedMovies, title)

      if (allSavedResult.length === 0) {
        setIsNotMovies(true)
      }
      else {
        setShownSavedMovies(allSavedResult)
      }
    }
  }
  /*  */

  const handleSignOut = () => {
    auth
      .logout()
      .then((res) => {
        setIsLoggedIn(false);          
        isChecked(false)
        setCurrentUser({})

        history.push("/");
      })
      .catch((err) => {
        console.log('ERROR =>', err)
      })
      localStorage.removeItem("allMovies");
      localStorage.removeItem("InitialMovies");
      localStorage.removeItem("shortMovies");
      localStorage.removeItem("searchMovies");
      localStorage.removeItem("lastMoviesRequest");
      localStorage.removeItem("lastCheckboxState");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
        <Route exact path="/">
            <div className="page__header-container">
              <Header
                isLoggedIn={isLoggedIn}
              />
            </div>
            <Main/>
            <Footer/>
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setIsErrorMessage={setIsErrorMessage}
            isNotMovies={isNotMovies}
            setIsNotMovies={setIsNotMovies}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            movies={JSON.parse(localStorage.getItem('allMovies'))}
            setShownMovies={setShownMovies}
            shownMovies={shownMovies}
            savedMovies={savedMovies}
            onCardDelete={handleMovieDelete}
            onCardSaved={handleMovieSave}
            onSearch={searchMovies}
          />
          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            path="/saved-movies"
            component={SavedMovies}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isNotMovies={isNotMovies}
            setIsNotMovies={setIsNotMovies}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            movies={savedMovies}
            setShownMovies={setShownSavedMovies}
            shownMovies={shownSavedMovies}
            onCardDelete={handleMovieDelete}
            onSearch={searchSavedMovies}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            isLoggedIn={isLoggedIn}
            isErrorMessage={isErrorMessage}
            setIsErrorMessage={setIsErrorMessage}
            isDisabledInput={isDisabledInput}
            isDisabledButton={isDisabledButton}
            setIsDisabledButton={setIsDisabledButton}
            OnSignOut={handleSignOut}
            onUpdateUser={handleOnUpdateUser}
          />

          <Route exact path="/">
            <Main
              isLoggedIn={isLoggedIn}
            />
          </Route>


          <Route path="/signin">
            <Login
              onLogin={hadleLogin}
              isErrorMessage={isErrorMessage}
              isDisabledInput={isDisabledInput}
              isDisabledButton={isDisabledButton}
            />
          </Route>
          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              isErrorMessage={isErrorMessage}
              isDisabledInput={isDisabledInput}
              isDisabledButton={isDisabledButton}
            />
          </Route>

          <Route exact path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider >
  )
};

export default App;
