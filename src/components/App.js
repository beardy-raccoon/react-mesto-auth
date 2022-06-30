import React from 'react';

import { useState, useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';


export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

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
    setSelectedCard({});
  };

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
  }, []);

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

  return (
    <div className="App">
      <div className="page">
        {/** Providing context to the App */}
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
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
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}
