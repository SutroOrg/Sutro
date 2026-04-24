export const inTest = () => {
  const NODE_ENV =
    typeof process !== "undefined" ? process.env["NODE_ENV"] : "";
  return NODE_ENV === "test";
};
