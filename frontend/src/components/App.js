import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import api from "../utils/Api.js";
import auth from "../utils/Auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";
import ImagePopup from "./ImagePopup.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
// import ConfirmationPopup from "./ConfirmationPopup.js";

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  // const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [deleteCard, setDeleteCard] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const history = useHistory();

  const isPopupOpened =
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isImagePopupOpen;
  
    useEffect(() => {
      if (isLoggedIn) {
        history.push("/");
      }
    }, [isLoggedIn, history]);
  
    function handleCheckToken() {
      auth.checkToken()
        .then((data) => {
          setIsLoggedIn(true);
          setUserEmail(data.email);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        })
    } 

    useEffect(() => {
      const loggedIn = localStorage.getItem('loggedIn');
      if (loggedIn) {
        handleCheckToken();
      }
    }, []);


  function handleAuthorizer(userData) {
    setUserEmail(userData.email)
    auth
      .authorize(userData)
      .then((userData) => {
        setIsLoggedIn(true);
        localStorage.setItem('loggedIn', true);
        setCurrentUser(userData.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        setIsSuccess(false);
        handleInfoTooltip();
      });
  }

  function handleRegister(userInfo) {
    auth
      .register(userInfo)
      .then((data) => {
        handleAuthorizer(userInfo);
        handleInfoTooltip();
        setUserEmail(data.email);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        setIsSuccess(false);
        handleInfoTooltip();
      });
  }

  function handleSignOut() {
    auth
    .logOut()
    .then((res) => {
      setIsLoggedIn(false);
      localStorage.removeItem('loggedIn');
      history.push("/sign-in");
    })
    .catch((err) => {
      console.log(err);
    })
   
  }

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

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
  }

  // function handleCardDeleteClick(card) {
  //   setConfirmationPopupOpen(true);
  //   setDeleteCard(card);
  // }

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isPopupOpened) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isPopupOpened]);

  function handleUpdateUser(newUserInfo) {
    api
      .setNewUserInfo(newUserInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(newAvatar) {
    api
      .setUserAvatar(newAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    const isOwn = card.owner === currentUser._id;
    if (isOwn) {
      api
        .deleteCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => card._id !== c._id));
        })
        .catch((err) => console.log(err));
    }
  }

  function handleAddPlace(card) {
    api
      .setNewCardsInfo(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    // eslint-disable-next-line no-undef
    setIsStatusRegistration(false);
    // setConfirmationPopupOpen(false);
    setDeleteCard({});
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onSignOut={handleSignOut}
          userEmail={userEmail}
        />
        <Switch>
          <Route path="/sign-up">
            <div className="form">
              <Register onRegister={handleRegister} />
            </div>
          </Route>
          <Route path="/sign-in">
            <div className="form">
              <Login onLogin={handleAuthorizer} />
            </div>
          </Route>
          {/* <Route>
            {isLoggedIn ? <Redirect to="/sign-in" /> : <Redirect to="/" />}
          </Route> */}
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            isLoggedIn={isLoggedIn}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>
        <Footer />
        <EditProfilePopup
          isPopupOpened={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isPopupOpened={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isPopupOpened={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        {/* <ConfirmationPopup
          card={deleteCard}
          isPopupOpened={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          onConfirmation={handleCardDeleteClick}
        /> */}
        <InfoTooltip
          isPopupOpened={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isLoggedIn={isLoggedIn}
          isSuccess={isSuccess}
        />
        <ImagePopup
          isPopupOpened={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
