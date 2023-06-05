import React from "react";

import styles from "./App.module.scss";
import { loadSessionStorage } from "./shared/utils";
import { MessagesList, MessageSender } from "./components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { messagesListState, shouldEnterSendState, themeState, usernameState } from "./shared/state";

export default function App() {
  const [activeTheme, setActiveTheme] = useRecoilState(themeState);
  const setUsername = useSetRecoilState(usernameState);
  const setMessagesList = useSetRecoilState(messagesListState);
  const setShouldEnterSend = useSetRecoilState(shouldEnterSendState);

  React.useEffect(() => {
    const sessionMessages = loadSessionStorage("messages", true);
    const sessionUsername = loadSessionStorage("username");
    const sessionTheme = loadSessionStorage("theme");
    //Doing this because session and local storages save strings, so we have to compare it
    const sessionEnterSend = loadSessionStorage("enterSend") === "true";

    setActiveTheme(sessionTheme || "lightTheme");
    setUsername(sessionUsername || "User");
    setMessagesList(sessionMessages || []);
    setShouldEnterSend(sessionEnterSend);
  }, [setActiveTheme, setMessagesList, setShouldEnterSend, setUsername]);

  return (
    <div className={`${styles[activeTheme]} ${styles.mainWrapper}`}>
      <MessagesList />

      <MessageSender />
    </div>
  );
}
