import React from "react";
import { useRecoilValue } from "recoil";
import { messagesListState, usernameState } from "../../shared/state";
import PropTypes from "prop-types";

import styles from "./MessagesList.module.scss";

export const MessagesList = ({
  className,
  lineBgColor = "var(--greyColor)",
}) => {
  const messagesListRef = React.useRef();
  const username = useRecoilValue(usernameState);
  const messagesList = useRecoilValue(messagesListState);

  React.useEffect(() => {
    if (messagesListRef?.current) {
      const { current: listElement } = messagesListRef;

      listElement.scrollTo({
        left: 0,
        top: listElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messagesList]);

  return (
    <section
      className={`${styles.messagesList} ${className}`}
      style={{ "--bgLineColor": lineBgColor }}
      ref={messagesListRef}
    >
      {messagesList.map((message, index) => (
        <pre key={`msg${index}`}>
          {index % 2 === 1 && <span />}
          <p>
            <b>{username}:</b> {message}
          </p>
        </pre>
      ))}
    </section>
  );
};

MessagesList.propTypes = {
  className: PropTypes.string,
  lineBgColor: PropTypes.string,
};
