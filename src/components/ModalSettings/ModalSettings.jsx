import PropTypes from "prop-types";

import styles from "./ModalSettings.module.scss";
import { ChatSettings } from "../ChatSettings";

export const ModalSettings = ({ isOpen, setIsOpenCallback, className }) => {
  const callClose = () => {
    setIsOpenCallback(false);
  };

  return (
    <div className={`${styles.modal} ${className} ${!isOpen ? "hidden" : ""}`}>
      <span onClick={callClose} />

      <main className={styles.modalContentContainer}>
        <h3>User settings</h3>
        <ChatSettings />
        <div className={styles.buttonContainer}>
          <button type="button" onClick={callClose}>
            Ok
          </button>
        </div>
      </main>
    </div>
  );
};

ModalSettings.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpenCallback: PropTypes.func.isRequired,
  className: PropTypes.string,
};
