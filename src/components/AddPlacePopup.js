import React from "react";
import PopupWithForm from "./PopupWithForm";
import InputsAddPlace from "./InputsAddPlace";

export default function AddPlacePopup({isOpen, onClose, onAddNewPlace, onOverlayClick}) {

  const [newPlace, setNewPlace] = React.useState({ name: '', link: '' });

  function handleAddNewPlace(evt) {
    const { name, value } = evt.target;
    setNewPlace({
      ...newPlace,
      [name]: value
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddNewPlace(newPlace);
  }

  React.useEffect(() => {
    setNewPlace({ "name": '', "link": '' })
  }, [isOpen]);

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      buttonName='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick} >

      <InputsAddPlace
        name={newPlace.name}
        link={newPlace.link}
        onChange={handleAddNewPlace} />
    </PopupWithForm>
  )
}
