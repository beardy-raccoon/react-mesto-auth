export default function InputsAddPlace(props) {
  return (
    <>
      <input type="text" name="name" id="name" className="popup__input popup__input_card_name" minLength="2"
        maxLength="30" required placeholder="Название" value={props.name || ''} onChange={props.onChange} />
      <span id="error-card-name" className="popup__error"></span>
      <input type="url" name="link" id="link" className="popup__input popup__input_card_link" required
        placeholder="Ссылка на картинку" value={props.link || ''} onChange={props.onChange} />
      <span id="error-card-link" className="popup__error"></span>
    </>
  );
}
