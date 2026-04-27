import { createPortal } from "react-dom";

export default function Modal({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText,
}) {
  const modalRoot = document.getElementById("modal");

  return (
    show &&
    createPortal(
      <>
        <div className="modal-backdrop fade show"></div>
        <div className="modal d-block " tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
              </div>

              <div className="modal-body">{content}</div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>
                  Annulla
                </button>

                <button className="btn btn-danger" onClick={onConfirm}>
                  Conferma
                </button>
              </div>
            </div>
          </div>
        </div>
      </>,
      modalRoot,
    )
  );
}
