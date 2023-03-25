import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { act } from "react-dom/test-utils";

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("Application root", () => {
    const addEvt = new Event('DOMContentLoaded');
    document.dispatchEvent(addEvt);

  test('DOMContentLoaded changes', () => {
    document.addEventListener('DOMContentLoaded', () => {
        const div = document.createElement("div");
        div.id = "root";
        document.body.appendChild(div);
        require("./main.tsx");
        expect(document.addEventListener).toBeCalledWith('DOMContentLoaded', expect.any(Function));
    });
  })
});