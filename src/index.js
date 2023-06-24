import ReactDOM from "react-dom/client";
import { phoneMask } from "./phoneMask";
import { Input } from "./input-react";
import { runTests } from "./phoneMask.test";

const inputEl = document.querySelector("#phone");
const rootEl = document.querySelector("#root");
const testButtonEl = document.querySelector("#auto-tests");

phoneMask(inputEl);

const root = ReactDOM.createRoot(rootEl);

testButtonEl.addEventListener("click", () => {
  runTests();
});

root.render(<Input />);
