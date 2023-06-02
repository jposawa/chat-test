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
        <input
          name="username"
          type="text"
          value={usernameInput}
          onChange={({ target: field }) => {
            const newName = field?.value?.trim();

            setUsernameInput(newName);
          }}
        />
        <button type="submit">
          <CheckOutlined />
        </button>
      </form>

      <Switch
        unCheckedChildren={"\u263C"}
        checkedChildren={"\u263E"}
        checked={activeTheme === "darkTheme"}
        onChange={handleThemeSwitch}
      />

      <span>
        <Switch
          id="enterSend"
          checked={shouldEnterSend}
          onChange={handleSwitchEnterSend}
          unCheckedChildren="Enter don't send"
          checkedChildren="Enter send"
        />
      </span>
    </div>
  );
};

ChatSettings.propTypes = {
  className: PropTypes.string,
};
