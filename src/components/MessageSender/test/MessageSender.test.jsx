import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MessageSender } from "../MessageSender";
import { RecoilRoot } from "recoil";
import { sendWithReturnState } from "../../../shared/state";
import "@testing-library/jest-dom/extend-expect";

describe("Send button UI test", () => {
  test("Should show send button", () => {
    render(
      <RecoilRoot>
        <MessageSender />
      </RecoilRoot>
    );

    expect(screen.getByTestId("btnSendMessage")).toBeDefined();
    expect(screen.getByTestId("btnSendMessage")).not.toHaveStyle(
      "transform: scale(0)"
    );
  });

  test("Shouldn't show send button if set to send with Return", () => {
    const mockedData = { sendWithReturnState: true };

    render(
      <RecoilRoot
        initializeState={(snapshot) =>
          snapshot.set(sendWithReturnState, mockedData)
        }
      >
        <MessageSender />
      </RecoilRoot>
    );

    expect(screen.getByTestId("btnSendMessage")).toBeDefined();
    expect(screen.getByTestId("btnSendMessage")).toHaveStyle(
      "transform: scale(0)"
    );
  });
});
