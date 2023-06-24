import React from "react";
import { MAX_LENGTH, getMaskedValue, getNewCursor } from "./phoneMask";

export const Input = () => {
  const [value, setValue] = React.useState("");
  const [cursor, setCursor] = React.useState("");
  const inputRef = React.useRef();

  React.useLayoutEffect(() => {
    inputRef.current.selectionStart = cursor;
    inputRef.current.selectionEnd = cursor;
  }, [cursor]);

  const handleChange = (e) => {
    const newValue = getMaskedValue(e.target.value);

    const newCursor = getNewCursor({
      cursor: e.target.selectionStart,
      lastValue: value,
      newValue,
    });

    setValue(newValue);
    setCursor(newCursor);
  };

  return (
    <div className="container text-center">
      <input
        value={value}
        onChange={handleChange}
        ref={inputRef}
        type="tel"
        id="phone-react"
        maxLength={MAX_LENGTH}
        placeholder="mobile number"
        autoComplete="off"
      />
      <div>
        <label htmlFor="phone">(123) 456-7890</label>
      </div>
    </div>
  );
};
