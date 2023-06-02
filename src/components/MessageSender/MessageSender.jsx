import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  messagesListState,
  shouldEnterSendState,
  themeState,
} from "../../shared/state";
import PropTypes from "prop-types";
import { ChatSettings } from "../ChatSettings";
import { CaretRightOutlined } from "@ant-design/icons";
import { saveSessionStorage } from "../../shared/utils";

import styles from "./MessageSender.module.scss";

export const MessageSender = ({ className }) => {
  const [currentMessage, setCurrentMessage] = React.useState("");
  const [messagesList, setMessagesList] = useRecoilState(messagesListState);
  const activeTheme = useRecoilValue(themeState);
  const shouldEnterSend = useRecoilValue(shouldEnterSendState);

  const handleMessageChange = ({ target: field }) => {
    setCurrentMessage(field?.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && shouldEnterSend) {
      sendMessage();

      event.preventDefault();
    }
  };

  const sendMessage = (event) => {
    event?.preventDefault();

    const trimmedMessage = currentMessage.trim();

    if (trimmedMessage !== "") {
      const newList = [...messagesList, currentMessage.trim()];

      saveSessionStorage("messages", newList, true);
      setCurrentMessage("");
      setMessagesList(newList);
    }
  };

  return (
    <section className={`${styles.messageSender} ${className}`}>
      <ChatSettings className={styles.chatSettings} />

      <form className={styles.messageWrapper} onSubmit={sendMessage}>
        <span
          className={styles.textContainer}
          style={
            activeTheme === "darkTheme"
              ? { "--background": "var(--mainColorDarker)" }
              : undefined
          }
        >
          <span />
          <textarea
            name="messageField"
            title="Your message"
            placeholder="Write a message..."
            value={currentMessage}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
          />
        </span>

        <button
          type="submit"
          className={shouldEnterSend ? "hidden collapse" : ""}
          disabled={!currentMessage || currentMessage === ""}
        >
          <CaretRightOutlined />
        </button>
      </form>
    </section>
  );
};

MessageSender.propTypes = {
  className: PropTypes.string,
};
