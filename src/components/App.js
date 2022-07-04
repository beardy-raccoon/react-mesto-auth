import React from 'react';

import { useState, useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';
import InfoToolTip from './InfoTooltip';
import { infoToolTipError } from '../utils/const';
import { infoToolTipSuccess } from '../utils/const';


export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [infoToolTipType, setInfoToolTipType] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserEmail, setCurrentUserEmail] = useState({})
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const tokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUserEmail(res.data.email);
          }
        })
        .catch(console.log)
    }
  }

  const handleLogin = ({ email, password }) => {
    auth.authorization(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        tokenCheck();
        history.push("/");
      })
      .catch(() => {
        setIsInfoToolTipOpen(true);
        setInfoToolTipType(infoToolTipError);
      })
  };

  const handleRegister = ({ email, password }) => {
    auth.registration(email, password)
      .then(() => {
        setInfoToolTipType(infoToolTipSuccess);
        setIsInfoToolTipOpen(true);
        history.push('/sign-in');
        setTimeout(() => setIsInfoToolTipOpen(false), 2000)
      })
      .catch((err) => {
        setInfoToolTipType(infoToolTipError);
        setIsInfoToolTipOpen(true);
      })
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.log);
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((currentCard) => currentCard._id !== card._id && currentCard));
        closeAllPopups();
      })
      .catch(console.log);
  };

  const handleUpdateUser = (userInfo) => {
    api.editProfile({ name: userInfo.name, about: userInfo.about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups()
      })
      .catch(console.log);
  };

  const handleUpdateAvatar = (avatar) => {
    api.editProfileAvatar({ avatarlink: avatar.avatar })
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch(console.log);
  };

  const handleAddNewPlace = (newPlace) => {
    api.addCard(newPlace.name, newPlace.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log);
  };

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({});
  };

  const handleSignOut = () => {
    console.log('handleSignOut')
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  // Получили данные профиля
  useEffect(() => {
    api.getProfile()
      .then((profile) => {
        setCurrentUser(profile)
      })
      .catch(console.log);
  }, []);

  // Получили массив объектов карточек
  useEffect(() => {
    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch(console.log);
  }, [loggedIn]);

  useEffect(() => {
    const handleCloseByEsc = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", handleCloseByEsc);
    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
    }
  }, []);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    loggedIn ? history.push("/") : history.push("/sign-in")
  }, [loggedIn]);

  return (
    <div className="App">
      <div className="page">
        {/** Providing context to the App */}
        <CurrentUserContext.Provider value={currentUser}>
          <Header handleClick={handleSignOut} loggedIn={loggedIn} email={currentUserEmail} />

          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn} to>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            </ProtectedRoute>

            <Route exact path="/sign-in">
              <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
            </Route>

            <Route exact path="/sign-up">
              <Register handleRegister={handleRegister} />
            </Route>

            <Route>
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onOverlayClick={handleOverlayClick} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddNewPlace={handleAddNewPlace}
            onOverlayClick={handleOverlayClick} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onOverlayClick={handleOverlayClick} />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            onOverlayClick={handleOverlayClick} />

          <InfoToolTip
            type={infoToolTipType}
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            onOverlayClick={handleOverlayClick}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}
