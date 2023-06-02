import styles from "./MessagesList.module.css";
import { useRecoilValue } from "recoil";
import { messagesListState, usernameState } from "../../shared/state";
import PropTypes from "prop-types";

export const MessagesList = ({ className }) => {
  const username = useRecoilValue(usernameState);
  const messagesList = useRecoilValue(messagesListState);

  return (
    <section className={`${styles.messagesList} ${className}`}>
      {messagesList.map((message, index) => (
        <p key={`msg${index}`}>
          <b>{username}:</b> {message}
        </p>
      ))}
    </section>
  );
};

MessagesList.propTypes = {
  className: PropTypes.string
}