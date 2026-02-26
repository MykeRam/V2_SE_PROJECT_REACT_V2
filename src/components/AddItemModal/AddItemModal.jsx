import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import "./AddItemModal.css";

function AddItemModal({ isOpen, onAddItem, onClose }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    link: "",
    weather: "hot",
  });

  const isValid = values.name.trim() && values.link.trim() && values.weather;

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValid) return;
    onAddItem(values, resetForm);
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
          name="link"
          placeholder="Image URL"
          value={values.link}
          onChange={handleChange}
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
