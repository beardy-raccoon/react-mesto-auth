export default function ImagePopup({card, isOpen, onClose, onOverlayClick}) {
  return (
    <section className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`} onClick={onOverlayClick}>
    <div className="popup__container">
      <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={onClose}></button>
      <img className="popup__image-link" src={card.link} alt={card.name} />
      <h3 className="popup__image-name">{card.name}</h3>
    </div>
  </section>
  );
}

