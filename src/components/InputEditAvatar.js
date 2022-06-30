export default function InputsEditAvatar(props) {
  return (
    <>
      <input type="url" name="avatarlink" id="avatar-link" className="popup__input popup__input_avatar_link" required
        placeholder="Ссылка на аватар" ref={props.avatarLinkRef} />
      <span id="error-avatar-link" className="popup__error"></span>
    </>
  );
}
