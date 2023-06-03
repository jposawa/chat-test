import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  messagesListState,
  shouldEnterSendState,
  themeState,
} from "../../shared/state";
import PropTypes from "prop-types";
import { SendOutlined, SettingOutlined } from "@ant-design/icons";
import { saveSessionStorage } from "../../shared/utils";

import styles from "./MessageSender.module.scss";
import { ModalSettings } from "../ModalSettings";
import { Button } from "../Button";

export const MessageSender = ({ className }) => {
  const [currentMessage, setCurrentMessage] = React.useState("");
  const [messagesList, setMessagesList] = useRecoilState(messagesListState);
  const shouldEnterSend = useRecoilValue(shouldEnterSendState);
  const activeTheme = useRecoilValue(themeState);
  const textAreaRef = React.useRef();
  const [isModalSettingsOpen, setIsModalSettingsOpen] = React.useState(false);

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

  const callSettingsModal = () => {
    setIsModalSettingsOpen(true);
  };

  React.useEffect(() => {
    textAreaRef.current.style.height = calcTextareaHeight(currentMessage);
  }, [currentMessage]);

  return (
    <>
      <section className={`${styles.messageSender} ${className}`}>
        <span className={styles.transparentBackground} />
        <div className={styles.settingsCallerContainer}>
          <Button type="button" onClick={callSettingsModal}>
            <SettingOutlined />
          </Button>
        </div>

        <form
          className={styles.messageWrapper}
          onSubmit={sendMessage}
          style={
            !shouldEnterSend
              ? {
                  "--borderColor":
                    activeTheme === "lightTheme"
                      ? "var(--greyColorLight)"
                      : "var(--greyColorDarker)",
                }
              : undefined
          }
        >
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
              paddingRight: shouldEnterSend ? "0.5rem" : "5rem",
            }}
          />

          <Button
            type="submit"
            style={shouldEnterSend ? { transform: "scale(0)" } : undefined}
            disabled={!currentMessage || currentMessage === ""}
          >
            <SendOutlined />
          </Button>
        </form>
      </section>

      <ModalSettings
        isOpen={isModalSettingsOpen}
        setIsOpenCallback={setIsModalSettingsOpen}
      />
    </>
  );
};

MessageSender.propTypes = {
  className: PropTypes.string,
};
