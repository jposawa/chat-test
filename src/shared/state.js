import { atom } from "recoil";
import { PREFIX } from "./constants";

export const themeState = atom({
  key: `${PREFIX}@theme`,
  default: "lightTheme",
});

export const usernameState = atom({
  key: `${PREFIX}@username`,
  default: "User",
});

export const messagesListState = atom({
  key: `${PREFIX}@messagesList`,
  default: [],
});

export const sendWithReturnState = atom({
  key: `${PREFIX}@sendWithReturn`,
  default: false,
});
