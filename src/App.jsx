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
    
    //I'm disabling this because I want it to run only on first Mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles[activeTheme]} ${styles.mainWrapper}`}>
      <MessagesList />

      <MessageSender />
    </div>
  );
}
