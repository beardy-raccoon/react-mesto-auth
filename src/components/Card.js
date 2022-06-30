import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {
  // Подписываемся на контекст текущего пользователя
  const currentUser = React.useContext(CurrentUserContext);
  // Вынимаем нужные поля из объекта с карточками
  const { link, name, likes, owner } = props.card;
  // Сравниваем card.owner._id и currentUser._id
  const isOwn = owner._id === currentUser._id;
  // В зависимости от значения переменной показываем или убираем кнопку удаления карточки
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_active' : 'element__delete-button_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some(i => i._id === currentUser._id);

  // В зависимости от значения переменной красим или нет сердечко в 'className' для кнопки лайка
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
  );

  // Прокидываем пропсы для открытия превью каточки
  function handleClick() {
    props.onCardClick(props.card);
  }
  // for like
  function handleCardLike() {
    props.onCardLike(props.card);
  }
  // for delete
  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (
      <li className="element">
        <button type="button" aria-label="Удалить" className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
        <img className="element__image" src={link} alt={name} onClick={handleClick} />
        <div className="element__wrap">
          <h2 className="element__image-name">{name}</h2>
          <div className="element__like-wrap">
            <button type="button" aria-label="Нравится" className={cardLikeButtonClassName} onClick={handleCardLike}></button>
            <span className="element__like-counter">{likes.length}</span>
          </div>
        </div>
      </li>
  )
}
