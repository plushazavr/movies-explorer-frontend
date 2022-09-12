import React from 'react';
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
import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Menu from "../Menu/Menu";
import {
  BEATFILM_SOURCE_URL,
  UNKNOWN_STRING,
  UNKNOWN_NUMBER,
  UNKNOWN_IMAGE_URL,
  UNKNOWN_TRAILER_URL,
  UNAUTHORIZED,
  SHORT_FILM_DURATION,
} from '../../utils/constants';

function App() {
  const [ isMenuOpen, setIsMenuOpen ] = React.useState(false);
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ errorMessage, setErrorMessage ] = React.useState('');
  const [ globalError, setGlobalError ] = React.useState(false);
  const [ successMessage, setSuccessMessage ] = React.useState(false);
  const [ allMovies, setAllMovies ] = React.useState([]);
  const [ savedMovies, setSavedMovies ] = React.useState([]);

  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    handleGetUser();
    handleGetSavedMovies();
    checkLocalStorage();
  }, []);

  function checkLocalStorage() {
    const localAllMovies = localStorage.getItem('localAllMovies');
    if (localAllMovies) {
      setAllMovies(JSON.parse(localAllMovies));
    } else {
      handleGetAllMovies();
    }
  }

  function handleRegister({ email, password, name }) {
    setIsLoading(true);
    mainApi.register({ email, password, name })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    mainApi.login({ email, password })
      .then(() => {
        setIsLoggedIn(true);
        handleGetUser();
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }
  
  function handleLogout() {
    setIsLoading(true);
    mainApi.logout()
      .then(() => {
        setIsLoggedIn(false);
        history.push('/');
        clearData();
      })
      .catch((err) => {
        handleErrors(err);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }
  
  function clearData() {
    localStorage.removeItem('lastSearch');
    setGlobalError(false);
    setErrorMessage('');
    setSuccessMessage('');

  }

  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    mainApi.updateUser({ name, email })
      .then(() => {
        setCurrentUser({ name, email });
        setSuccessMessage(true);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        handleErrors(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleGetUser() {
    mainApi.getUser()
      .then((res) => {
        const { name, email } = res;
        setCurrentUser({ name, email });
        setIsLoggedIn(true);
        (location.pathname === '/signup' || location.pathname === '/signin') ? history.push('/movies') : history.push(location.pathname);
      })
      .catch((err) => {
        handleErrors(err);
      })
  }

  function handleGetAllMovies() {
    moviesApi.getAllMovies()
      .then((data) => {
        const movies = data.map((item) => {
          const imageUrl = item.image && item.image.url;
          const thumbnailUrl = item.image && item.image.formats.thumbnail.url;

          return {
            country : item.country || UNKNOWN_STRING,
            director : item.director || UNKNOWN_STRING,
            duration : item.duration || UNKNOWN_NUMBER,
            year : item.year || UNKNOWN_STRING,
            description : item.description || UNKNOWN_STRING,
            image: imageUrl ? BEATFILM_SOURCE_URL + imageUrl : UNKNOWN_IMAGE_URL,
            trailerLink: item.trailerLink ? item.trailerLink : UNKNOWN_TRAILER_URL,
            thumbnail: thumbnailUrl ? BEATFILM_SOURCE_URL + thumbnailUrl : UNKNOWN_IMAGE_URL,
            movieId: item.id || UNKNOWN_NUMBER,
            nameRU : item.nameRU || UNKNOWN_STRING,
            nameEN : item.nameEN || UNKNOWN_STRING,
          }
        });
        localStorage.setItem('localAllMovies', JSON.stringify(movies));
        setAllMovies(movies);
      })
      .catch(() => {
        setGlobalError(true);
      })
  }

  function handleGetSavedMovies() {
    setIsLoading(true);
    mainApi.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies.slice().reverse());
      })
      .catch((err) => {
        setGlobalError(true);
        handleErrors(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleSaveMovie(movie) {
      mainApi.saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
      })
      .catch((err) => {
        setGlobalError(err);
        handleErrors(err);
      })
  }

  function handleRemoveMovie(_id) {
    mainApi.removeMovie(_id)
      .then(() => {
        const newSavedMovies = savedMovies.filter((movie) => movie._id !== _id);
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        setGlobalError(err);
        handleErrors(err);
      })
  }

  function handleSearch(moviesLIst, searchInput) {
    return moviesLIst.filter((movie) => {
      return movie.nameRU.toLocaleLowerCase().includes(searchInput);
    });
  }

  function filterByDuration(moviesLIst) {
    return moviesLIst.filter((movie) => {
      return movie.duration <= SHORT_FILM_DURATION;
    });
  }
  
  function setIntoLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  function handleErrors(err) {
    if (err.status === UNAUTHORIZED) {
      setIsLoggedIn(false);
      clearData();
    }
  }

  function handleMenuButtonClick() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      closeMenu();
    }
  }

  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('menu')) {
      closeMenu();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('mouseup', handleOverlayClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mouseup', handleOverlayClose);
    }
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <div className="page__header-container">
              <Header
                isLoggedIn={isLoggedIn}
                onOpenMenu={handleMenuButtonClick}
              />
            </div>
            <Main/>
            <Footer/>
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            isLoggedIn={isLoggedIn}
            onOpenMenu={handleMenuButtonClick}
            allMovies={allMovies}
            savedMovies={savedMovies}
            handleSaveMovie={handleSaveMovie}
            handleRemoveMovie={handleRemoveMovie}
            onSearch={handleSearch}
            onFilter={filterByDuration}
            isLoading={isLoading}
            setIntoLocalStorage={setIntoLocalStorage}
            getFromLocalStorage={getFromLocalStorage}
            globalError={globalError}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            onOpenMenu={handleMenuButtonClick}
            savedMovies={savedMovies}
            handleGetSavedMovies={handleGetSavedMovies}
            handleRemoveMovie={handleRemoveMovie}
            onSearch={handleSearch}
            onFilter={filterByDuration}
            isLoading={isLoading}
            globalError={globalError}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            isLoading={isLoading}
            onOpenMenu={handleMenuButtonClick}
            onUpdate={handleUpdateUser}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
          <Route path="/signup">
            <Register
              isLoading={isLoading}
              onRegister={handleRegister}
              errorMessage={errorMessage}
            />
          </Route>
          <Route path="/signin">
            <Login
              isLoading={isLoading}
              onLogin={handleLogin}
              errorMessage={errorMessage}
            />
          </Route>
          <Route path="*">
            <PageNotFound/>
          </Route>
        </Switch>
        <Menu
          isOpen={isMenuOpen}
          onClose={closeMenu}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
