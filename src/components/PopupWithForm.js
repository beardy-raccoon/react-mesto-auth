export default function PopupWithForm({ name, title, buttonName, isOpen, onClose, onSubmit, onOverlayClick, children }) {

  return (
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onOverlayClick}>
      <div className="popup__container">
        <form action="#" method="get" name={`${name}`} className="popup__form" noValidate onSubmit={onSubmit}>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button type="submit" aria-label="Сохранить" className="popup__submit-button">{buttonName}</button>
          <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={onClose}></button>
        </form>
      </div>
    </section>
  );
}
