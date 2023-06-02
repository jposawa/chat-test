import React from "react";
import { CaretRightOutlined, CheckCircleOutlined } from "@ant-design/icons";

import styles from "./App.module.css";
import { loadSessionStorage, saveSessionStorage } from "./utils";

export default function App() {
  const [activeTheme, setActiveTheme] = React.useState("lightTheme");
  const [username, setUsername] = React.useState("User");
  const [messagesList, setMessagesList] = React.useState([]);
  const [currentMessage, setCurrentMessage] = React.useState();
  const [shouldEnterSend, setShouldEnterSend] = React.useState(false);

  const handleThemeSwitch = () => {
    setActiveTheme(activeTheme === "lightTheme" ? "darkTheme" : "lightTheme");
  };

  const handleNameUpdate = (event) => {
    event.preventDefault();

    const form = event.target;
    const newUsername = form?.username?.value || "User";

    saveSessionStorage("username", newUsername);
    setUsername(newUsername);
  };

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

    const newList = [...messagesList, currentMessage.trim()];

    saveSessionStorage("messages", newList, true);
    setCurrentMessage("");
    setMessagesList(newList);
  };

  React.useEffect(() => {
    const sessionMessages = loadSessionStorage("messages", true);
    const sessionUsername = loadSessionStorage("username");

    setUsername(sessionUsername || "User");
    setMessagesList(sessionMessages || []);
  }, []);

  return (
    <div className={`${styles[activeTheme]} ${styles.mainWrapper}`}>
      <section className={styles.messagesList}>
        {messagesList.map((message, index) => (
          <p key={`msg${index}`}>
            <b>{username}:</b> {message}
          </p>
        ))}
      </section>

      <section className={styles.userWrapper}>
        <div className={styles.chatSettings}>
          <form className={styles.userSettings} onSubmit={handleNameUpdate}>
            <input name="username" type="text" defaultValue={username} />
            <button type="submit">
              <CheckCircleOutlined />
            </button>
          </form>

          <button type="button" onClick={handleThemeSwitch}>
            Switch to {activeTheme === "lightTheme" ? "Dark" : "Light"} theme
          </button>

          <span>
            <input
              id="enterSend"
              type="checkbox"
              onChange={({ target: field }) => {
                setShouldEnterSend(field?.checked);
              }}
            />
            <label htmlFor="enterSend"> Send with Enter</label>
          </span>
        </div>

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
            disabled={!currentMessage || currentMessage === ""}
          >
            <CaretRightOutlined />
          </button>
        </form>
      </section>
    </div>
  );
}
