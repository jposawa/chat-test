import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ChatSettings } from "../ChatSettings";
import { RecoilRoot } from "recoil";
import "@testing-library/jest-dom/extend-expect";

describe("User name save UI test", () => {
  test("Hide Save button if current input value is the same of current name", () => {
    render(
      <RecoilRoot>
        <ChatSettings />
      </RecoilRoot>
    );
    const button = screen.getByTestId("btnSaveName");

    expect(button).toBeDefined();
    expect(button).toHaveStyle("transform: scaleX(0)");
  });

  test("Show Save button if current input value is different than current name", () => {
    render(
      <RecoilRoot>
        <ChatSettings />
      </RecoilRoot>
    );
    const input = screen.getByTestId("inputSaveName");
    const button = screen.getByTestId("btnSaveName");

    fireEvent.change(input, { target: { value: "New name" } });

    expect(button).toBeDefined();
    expect(button).not.toHaveStyle("transform: scaleX(0)");
  });
});
