import styles from "./ChatSettings.module.scss";
import { useRecoilState } from "recoil";
import {
  shouldEnterSendState,
  themeState,
  usernameState,
} from "../../shared/state";
import PropTypes from "prop-types";
import { CheckOutlined } from "@ant-design/icons";
import { saveSessionStorage } from "../../shared/utils";
import React from "react";
import { Switch } from "antd";

export const ChatSettings = ({ className }) => {
  const [username, setUsername] = useRecoilState(usernameState);
  const [activeTheme, setActiveTheme] = useRecoilState(themeState);
  const [shouldEnterSend, setShouldEnterSend] =
    useRecoilState(shouldEnterSendState);
  const [usernameInput, setUsernameInput] = React.useState(username);

  const handleThemeSwitch = () => {
    const newTheme = activeTheme === "lightTheme" ? "darkTheme" : "lightTheme";

    setActiveTheme(newTheme);
    saveSessionStorage("theme", newTheme);
  };

  const handleSwitchEnterSend = (checked) => {
    setShouldEnterSend(checked);
    saveSessionStorage("enterSend", checked);
  };

  const handleNameInputChange = ({ target: field }) => {
    const newName = field?.value?.trim();

    setUsernameInput(newName);
  };

  const handleNameUpdate = (event) => {
    event.preventDefault();

    const form = event.target;
    const newUsername = form?.username?.value || "User";

    saveSessionStorage("username", newUsername);
    setUsername(newUsername);
  };

  React.useEffect(() => {
    setUsernameInput(username);
  }, [username]);

  return (
    <div className={`${styles.chatSettings} ${className}`}>
      <form className={styles.userSettings} onSubmit={handleNameUpdate}>
        <span>
          <label htmlFor="username">Name: </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Your name"
            value={usernameInput}
            onChange={handleNameInputChange}
          />
        </span>

        <button type="submit">
          <CheckOutlined />
        </button>
      </form>

      <p>
        <label htmlFor="themeToggle">Active theme: </label>
        <Switch
          id="themeToggle"
          unCheckedChildren="Light"
          checkedChildren="Dark"
          checked={activeTheme === "darkTheme"}
          onChange={handleThemeSwitch}
        />
      </p>

      <p>
        <label htmlFor="enterSend">Send with enter: </label>
        <Switch
          id="enterSend"
          checked={shouldEnterSend}
          onChange={handleSwitchEnterSend}
          style={
            activeTheme === "darkTheme"
              ? {
                  border: "1px solid var(--textColor)",
                }
              : undefined
          }
        />
      </p>
    </div>
  );
};

ChatSettings.propTypes = {
  className: PropTypes.string,
};
