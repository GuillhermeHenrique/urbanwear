// css
import classes from "./Modal.module.css";

// icons
import { IoClose } from "react-icons/io5";

// types
import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div
        className={classes.modal_container}
        onClick={(e) => e.stopPropagation()}
      >
        <IoClose className={classes.close_btn} onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
