import styles from "./ChatSettings.module.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  shouldEnterSendState,
  themeState,
  usernameState,
} from "../../shared/state";
import PropTypes from "prop-types";
import { CheckCircleOutlined } from "@ant-design/icons";
import { saveSessionStorage } from "../../shared/utils";

export const ChatSettings = ({ className }) => {
  const [username, setUsername] = useRecoilState(usernameState);
  const [activeTheme, setActiveTheme] = useRecoilState(themeState);
  const setShouldEnterSend = useSetRecoilState(shouldEnterSendState);

  const handleThemeSwitch = () => {
    const newTheme = activeTheme === "lightTheme" ? "darkTheme" : "lightTheme";

    setActiveTheme(newTheme);
    saveSessionStorage("theme", newTheme);
  };

  const handleNameUpdate = (event) => {
    event.preventDefault();

    const form = event.target;
    const newUsername = form?.username?.value || "User";

    saveSessionStorage("username", newUsername);
    setUsername(newUsername);
  };

  return (
    <div className={`${styles.chatSettings} ${className}`}>
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
  );
};

ChatSettings.propTypes = {
  className: PropTypes.string,
};
