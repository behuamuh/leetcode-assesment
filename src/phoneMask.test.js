import { getMaskedValue, getNewCursor, phoneMask } from "./phoneMask";
import { it, assert } from "./test";

export const runTests = () => {
  console.log("Test getMaskedValue");

  it("Should delete letters", () => {
    assert(getMaskedValue("1ab2cd") === "12");
  });

  it("Should add brackets", () => {
    assert(getMaskedValue("1234") === "(123) 4");
  });

  it("Should add dash", () => {
    assert(getMaskedValue("(123) 4567") === "(123) 456-7");
  });

  it("Should remove last digit", () => {
    assert(getMaskedValue("(123) 456-78901") === "(123) 456-7890");
  });

  console.log("Test getNewCursor");

  it("Should return 2", () => {
    assert(
      getNewCursor({
        cursor: 2,
        lastValue: "1",
        newValue: "12",
      }) === 2
    );
  });

  it("Should return 7", () => {
    assert(
      getNewCursor({
        cursor: 4,
        lastValue: "123",
        newValue: "(123) 4",
      }) === 7
    );
  });

  it("Should return 11", () => {
    assert(
      getNewCursor({
        cursor: 11,
        lastValue: "(132) 345",
        newValue: "(132) 345-6",
      }) === 11
    );
  });

  it("Should return 1", () => {
    assert(
      getNewCursor({
        cursor: 1,
        lastValue: "2",
        newValue: "12",
      }) === 1
    );
  });

  it("Should return 3", () => {
    assert(
      getNewCursor({
        cursor: 2,
        lastValue: "123",
        newValue: "(142) 3",
      }) === 3
    );
  });

  it("Should return 4", () => {
    assert(
      getNewCursor({
        cursor: 3,
        lastValue: "(123) 456",
        newValue: "(172) 345-6",
      }) === 4
    );
  });

  it("Should return 1", () => {
    assert(
      getNewCursor({
        cursor: 1,
        lastValue: "12",
        newValue: "1",
      }) === 1
    );
  });

  it("Should return 3", () => {
    assert(
      getNewCursor({
        cursor: 6,
        lastValue: "(123) 4",
        newValue: "123",
      }) === 3
    );
  });

  it("Should return 9", () => {
    assert(
      getNewCursor({
        cursor: 10,
        lastValue: "(132) 345-6",
        newValue: "(132) 345",
      }) === 9
    );
  });

  it("Should return 0", () => {
    assert(
      getNewCursor({
        cursor: 0,
        lastValue: "12",
        newValue: "2",
      }) === 0
    );
  });

  it("Should return 1", () => {
    assert(
      getNewCursor({
        cursor: 2,
        lastValue: "(123) 4",
        newValue: "134",
      }) === 1
    );
  });

  it("Should return 2", () => {
    assert(
      getNewCursor({
        cursor: 2,
        lastValue: "(132) 345-6",
        newValue: "(12) 345-6",
      }) === 2
    );
  });

  console.log("Test phoneMask");
  it("Should throw error", () => {
    let hasError = false;

    try {
      phoneMask(123);
    } catch (error) {
      hasError = true;
    }

    assert(hasError);
  });

  it("Should mask value", () => {
    const input = document.createElement("input");

    phoneMask(input);

    const value = "123456";
    input.value = value;
    input.dispatchEvent(new InputEvent("input"));

    assert(input.value === getMaskedValue(value));
  });
};
