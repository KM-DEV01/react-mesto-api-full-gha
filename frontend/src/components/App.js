import React from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Main } from "./Main";
import { Footer } from "./Footer";
import { ImagePopup } from "./ImagePopup";
import { api, authApi } from "../utils/api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import defaultImage from '../images/profile-image.jpg';
import { Register } from "./Register";
import { Login } from "./Login";
import { ProtectedRouteElement } from "./ProtectedRoute";
import { InfoTooltip } from "./InfoTooltip";
import { Header } from "./Header";

function App() {

  const defaultUser = {
    name: 'Жак-Ив Кусто',
    about: 'Исследователь океана',
    avatar: defaultImage,
  }
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState(defaultUser);
  const [cards, setCards] = React.useState([]);
  const [userData, setUserData] = React.useState('');
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isAuthValid, setIsAuthValid] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.likeCard(isLiked, card._id)
      .then((res) => {
        setCards((state) => {
          return state.map((cardsItem) => cardsItem._id === card._id ? res : cardsItem);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((cardsItem) => cardsItem._id !== card._id)
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(info) {
    api.setUserInfo(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(link) {
    api.updateAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(place) {
    api.addNewCard(place)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignIn(data) {
    authApi.signin(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setUserData(data.email);
          navigate('/', {replace: true});
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        setIsAuthValid(false);
        setIsTooltipOpen(true);
        console.log(err);
      });
  }

  function handleSignup(data) {
    authApi.signup(data)
      .then((res) => {
        setIsAuthValid(true);
        setIsTooltipOpen(true);
        navigate('/sign-in', {replace: true});
      })
      .catch((err) => {
        setIsAuthValid(false);
        setIsTooltipOpen(true);
        console.log(err);
      });
  }

  function handleLogout() {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
      setIsLoggedIn(false);
      navigate('/sign-in', {replace: true});
    }
  }

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      authApi.authorization(localStorage.getItem('jwt'))
        .then((res) => {
          setUserData(res.data.email);
          navigate('/', {replace: true});
          setIsLoggedIn(true)
        })
        .catch(err => console.log(err))
    }
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      api.getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn])

  React.useEffect(() => {
    checkToken();
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">

        <Header
          userData={userData}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/sign-up" element={<Register onSignUp={handleSignup}/>}/>
          <Route path="/sign-in" element={<Login onSignIn={handleSignIn}/>}/>

          <Route element={<ProtectedRouteElement loggedIn={isLoggedIn}/>}>
            <Route
              path="/"
              element={
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />}
            />
          </Route>
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isTooltipOpen}
          response={isAuthValid}
          onClose={closeAllPopups}
        />

        <Footer loggedIn={userData}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

