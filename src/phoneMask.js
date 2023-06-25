export const MAX_LENGTH = 14;

export const getMaskedValue = (value) => {
  value = value.replace(/\D/g, "");

  if (value.length > 3) {
    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
  }

  if (value.length > 9) {
    value = `${value.slice(0, 9)}-${value.slice(9)}`;
  }

  value = value.slice(0, MAX_LENGTH);

  return value;
};

export const getNewCursor = ({ cursor, newValue, lastValue }) => {
  let res = cursor;
  const isInsert = newValue.length > lastValue.length;

  if (isInsert) {
    const isCursorOnEnd = cursor > lastValue.length;

    if (isCursorOnEnd) {
      res = newValue.length;
    } else {
      switch (cursor) {
        case 1:
        case 2:
        case 3:
          res = newValue.length > 3 ? cursor + 1 : cursor;
          break;

        case 5:
          res = 7;
          break;

        case 9:
          res = 10;
          break;

        case 10:
          res = 11;
      }
    }
  } else {
    const isCursorOnEnd = cursor === lastValue.length - 1;

    if (isCursorOnEnd) {
      res = newValue.length;
    } else if (newValue.length === 3 || newValue.length > 3 && cursor === 5) {
      res = cursor - 1;
    }
  }

  return res;
};

const updateInput = ({ inputEl, newValue, newCursor }) => {
  inputEl.value = newValue;
  inputEl.selectionStart = newCursor;
  inputEl.selectionEnd = newCursor;
};

export const phoneMask = (inputEl) => {
  if (!(inputEl instanceof HTMLInputElement)) {
    throw new Error("You must provide ref to input element");
  }

  inputEl.maxLength = MAX_LENGTH;
  let lastValue = getMaskedValue(inputEl.value);
  inputEl.value = lastValue;

  const handleInput = () => {
    const cursor = inputEl.selectionStart;
    let newValue = getMaskedValue(inputEl.value);
    let newCursor = getNewCursor({ cursor, newValue, lastValue });

    updateInput({ inputEl, newValue, newCursor });
    lastValue = newValue;
  };

  inputEl.addEventListener("input", handleInput);

  return {
    destroy: () => {
      inputEl.removeEventListener("input", handleInput);
    },
  };
};
