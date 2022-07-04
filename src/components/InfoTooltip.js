export default function InfoToolTip({type, isOpen, onClose, onOverlayClick, loggedIn}) {
  return (
    <section className={`popup popup_type_${type.type} ${isOpen ? 'popup_opened' : ''}`} onClick={onOverlayClick}>
    <div className="popup__container">
        <div className={`info-tool-tip info-tool-tip_type_${type.type}`}>
        <p className="info-tool-tip__text">{type.text}</p>
        </div>
        <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={onClose}></button>

    </div>
  </section>
  )
}
