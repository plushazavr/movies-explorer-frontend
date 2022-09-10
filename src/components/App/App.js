import React from 'react';
import './App.css';
import Header from "../Header/Header";
import { Route, Switch } from "react-router-dom";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function handleMenuButtonClick() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false)
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
    <div className="page">
      <Switch>
        <Route exact path="/">
          <div className="page__header-container">
            <Header/>
          </div>
          <Main/>
          <Footer/>
        </Route>
        <Route path="/movies">
          <Movies
            onOpenMenu={handleMenuButtonClick}
            isOpen={isMenuOpen}
            onClose={closeMenu}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies
            onOpenMenu={handleMenuButtonClick}
            isOpen={isMenuOpen}
            onClose={closeMenu}
          />
        </Route>
        <Route path="/profile">
          <Profile
            onOpenMenu={handleMenuButtonClick}
            isOpen={isMenuOpen}
            onClose={closeMenu}
          />
        </Route>
        <Route path="/signup">
          <Register/>
        </Route>
        <Route path="/signin">
          <Login/>
        </Route>
        <Route path="*">
          <PageNotFound/>
        </Route>
      </Switch>

    </div>
  );
}

export default App;