import styles from "./MessagesList.module.scss";
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
          {index % 2 === 1 && <span />}
          <b>{username}:</b> {message}
        </p>
      ))}
    </section>
  );
};

MessagesList.propTypes = {
  className: PropTypes.string,
};
