import React from "react";

import styles from "./App.module.scss";
import { loadSessionStorage } from "./shared/utils";
import { MessagesList, MessageSender } from "./components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { messagesListState, sendWithReturnState, themeState, usernameState } from "./shared/state";

export default function App() {
  const [activeTheme, setActiveTheme] = useRecoilState(themeState);
  const setUsername = useSetRecoilState(usernameState);
  const setMessagesList = useSetRecoilState(messagesListState);
  const setSendWithReturn = useSetRecoilState(sendWithReturnState);

  React.useEffect(() => {
    const sessionMessages = loadSessionStorage("messages", true);
    const sessionUsername = loadSessionStorage("username");
    const sessionTheme = loadSessionStorage("theme");
    //Doing this because session and local storages save strings, so we have to compare it
    const sessionEnterSend = loadSessionStorage("enterSend") === "true";

    setActiveTheme(sessionTheme || "lightTheme");
    setUsername(sessionUsername || "User");
    setMessagesList(sessionMessages || []);
    setSendWithReturn(sessionEnterSend);
  }, [setActiveTheme, setMessagesList, setSendWithReturn, setUsername]);

  return (
    <div className={`${styles[activeTheme]} ${styles.mainWrapper}`}>
      <MessagesList />

      <MessageSender />
    </div>
  );
}
