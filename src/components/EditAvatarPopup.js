import React from "react";
import PopupWithForm from "./PopupWithForm";
import InputEditAvatar from "./InputEditAvatar";

export default function EditAvatarPopup(props) {

  const avatarLinkRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarLinkRef.current.value
    });
  }

  React.useEffect(() => {
    avatarLinkRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name='set-avatar'
      title='Обновить аватар'
      buttonName='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onOverlayClick={props.onOverlayClick} >

      <InputEditAvatar
        avatarLinkRef={avatarLinkRef} />
    </PopupWithForm>
  )
}
