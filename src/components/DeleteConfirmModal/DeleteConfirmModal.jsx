import useModalClose from "../../hooks/useModalClose";
import "./DeleteConfirmModal.css";

function DeleteConfirmModal({ isOpen, onClose, onConfirm, buttonText }) {
  useModalClose(isOpen, onClose);

  return (
    <div
      className={`modal modal_type_confirm-delete ${isOpen ? "modal_is-opened" : ""}`}
    >
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />
        <p className="confirm-modal__text">
          Are you sure you want to delete this item?
        </p>
        <p className="confirm-modal__subtext">This action is irreversible.</p>
        <button
          className="confirm-modal__button confirm-modal__button_type_delete"
          type="button"
          onClick={onConfirm}
        >
          {buttonText}
        </button>
        <button
          className="confirm-modal__button confirm-modal__button_type_cancel"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
