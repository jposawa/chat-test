import React from "react";
import { useRecoilValue } from "recoil";
import { messagesListState, usernameState } from "../../shared/state";
import PropTypes from "prop-types";

import styles from "./MessagesList.module.scss";
import { Button } from "../Button";
import { SettingOutlined } from "@ant-design/icons";
import { ModalSettings } from "../ModalSettings";

export const MessagesList = ({
  className,
  evenLineBackground = "var(--greyColor)",
}) => {
  const messagesListRef = React.useRef();
  const username = useRecoilValue(usernameState);
  const messagesList = useRecoilValue(messagesListState);
  const [isModalSettingsOpen, setIsModalSettingsOpen] = React.useState(false);

  const callSettingsModal = () => {
    setIsModalSettingsOpen(true);
  };

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
    <>
      <section
        className={`${styles.messagesList} ${className}`}
        style={{ "--evenLineBackground": evenLineBackground }}
      >
        <div className={styles.settingsCallerContainer}>
          <Button type="button" onClick={callSettingsModal}>
            <SettingOutlined />
          </Button>
        </div>
        <div className={styles.messagesContainer} ref={messagesListRef}>
          {messagesList.map((message, index) => (
            <span key={`msg${index}`}>
              <span />

              <dl>
                <dt>
                  <h5>{username}</h5>
                </dt>
                <dd>
                  {message}
                </dd>
              </dl>
            </span>
          ))}
        </div>
      </section>

      <ModalSettings
        isOpen={isModalSettingsOpen}
        setIsOpenCallback={setIsModalSettingsOpen}
      />
    </>
  );
};

MessagesList.propTypes = {
  className: PropTypes.string,
  evenLineBackground: PropTypes.string,
};
