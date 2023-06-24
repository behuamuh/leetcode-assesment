export const it = (desc, fn) => {
  try {
    fn();
    console.log(desc, "Done!");
  } catch (error) {
    console.log("\n");
    console.error(desc, "Fail!");
  }
};

export const assert = (isTrue) => {
  if (!isTrue) {
    throw new Error();
  }
};
