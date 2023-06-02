import React from "react";

import styles from "./App.module.css";
import { loadSessionStorage } from "./shared/utils";
import { MessagesList, MessageSender } from "./components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { messagesListState, themeState, usernameState } from "./shared/state";

export default function App() {
  const [activeTheme, setActiveTheme] = useRecoilState(themeState);
  const setUsername = useSetRecoilState(usernameState);
  const setMessagesList = useSetRecoilState(messagesListState);

  React.useEffect(() => {
    const sessionMessages = loadSessionStorage("messages", true);
    const sessionUsername = loadSessionStorage("username");
    const sessionTheme = loadSessionStorage("theme");

    setActiveTheme(sessionTheme);
    setUsername(sessionUsername || "User");
    setMessagesList(sessionMessages || []);
    
    //I'm disabling this because I want it to run only on first Mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles[activeTheme]} ${styles.mainWrapper}`}>
      <MessagesList className={styles.messagesList} />

      <MessageSender className={styles.userWrapper} />
    </div>
  );
}
