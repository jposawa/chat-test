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
  const textAreaRef = React.useRef();

  const handleMessageChange = ({ target: field }) => {
    setCurrentMessage(field?.value);
  };

  const calcTextareaHeight = (text) => {
    const numLineBreaks = (text.match(/\n/g) || []).length;
    const newHeight = 20 + numLineBreaks * 11;

    return newHeight;
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

  React.useEffect(() => {
    textAreaRef.current.style.height = calcTextareaHeight(currentMessage);
  }, [currentMessage]);

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
            ref={textAreaRef}
            style={{
              height: calcTextareaHeight(currentMessage),
            }}
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
