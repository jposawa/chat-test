import PropTypes from "prop-types";

import styles from "./ModalSettings.module.scss";
import { ChatSettings } from "../ChatSettings";
import { Button } from "../Button";

export const ModalSettings = ({ isOpen, setIsOpenCallback, className }) => {
  const callClose = () => {
    setIsOpenCallback(false);
  };

  return (
    <div className={`${styles.modal} ${className} ${!isOpen ? "hidden" : ""}`}>
      <span onClick={callClose} />

      <section className={styles.modalContentContainer}>
        <Button type="button" onClick={callClose} sameDimensionSize="3rem">
          &times;
        </Button>

        <h3>User settings</h3>

        <ChatSettings />
      </section>
    </div>
  );
};

ModalSettings.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpenCallback: PropTypes.func.isRequired,
  className: PropTypes.string,
};
