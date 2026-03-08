import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import "./AddItemModal.css";

const INITIAL_FORM_VALUES = {
  name: "",
  imageUrl: "",
  weather: "",
};

const WEATHER_TYPES = ["hot", "warm", "cold"];

function isValidImageUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

function AddItemModal({ isOpen, onAddItem, onClose }) {
  const { values, handleChange, resetForm } = useForm(INITIAL_FORM_VALUES);

  useEffect(() => {
    if (isOpen) {
      resetForm(INITIAL_FORM_VALUES);
    }
  }, [isOpen, resetForm]);

  const trimmedName = values.name.trim();
  const trimmedImageUrl = values.imageUrl.trim();

  const isNameValid = trimmedName.length > 0;
  const isImageUrlValid = isValidImageUrl(trimmedImageUrl);
  const isWeatherValid = WEATHER_TYPES.includes(values.weather);
  const isValid = isNameValid && isImageUrlValid && isWeatherValid;

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValid) return;
    onAddItem(
      { ...values, name: trimmedName, imageUrl: trimmedImageUrl },
      resetForm,
    );
  }

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="add-item__label">
        Name
        <input
          className="add-item__input"
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="add-item__label">
        Image
        <input
          className="add-item__input"
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          pattern="https?://.+"
          required
        />
      </label>

      <fieldset className="add-item__fieldset">
        <legend className="add-item__legend">Select the weather type:</legend>

        <label className="add-item__radio-label">
          <input
            className="add-item__radio"
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          Hot
        </label>

        <label className="add-item__radio-label">
          <input
            className="add-item__radio"
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>

        <label className="add-item__radio-label">
          <input
            className="add-item__radio"
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
