import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import PopupWithForm from "./PopupWithForm";
import InputsEditProfile from "./InputsEditProfile";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, about } = currentUser;
  const [userInfo, setUserInfo] = React.useState({ name: '', about: '' });

  function handleUserInfoChange(evt) {
    const { name, value } = evt.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser(userInfo);
  }

  React.useEffect(() => {
    setUserInfo({ "name": name, "about": about })
  }, [name, about]);

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      buttonName='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onOverlayClick={props.onOverlayClick} >

      <InputsEditProfile
        name={userInfo.name}
        about={userInfo.about}
        onChange={handleUserInfoChange}
      />
    </PopupWithForm>
  )
}
