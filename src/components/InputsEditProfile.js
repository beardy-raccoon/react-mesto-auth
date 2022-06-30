export default function InputsEditProfile(props) {
  return (
    <>
      <input type="text" name="name" id="name" className="popup__input popup__input_type_name" minLength="2"
        maxLength="40" required placeholder="Имя" value={props.name || ''} onChange={props.onChange} />
      <span id="error-name" className="popup__error"></span>
      <input type="text" name="about" id="about" className="popup__input popup__input_type_about" minLength="2"
        maxLength="200" required placeholder="О себе" value={props.about || ''} onChange={props.onChange} />
      <span id="error-about" className="popup__error"></span>
    </>
  );
}
