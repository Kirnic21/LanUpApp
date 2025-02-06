export const nullToNumber = (value) => (value === null ? 0 : value);

export const convertInputToNumber = (value) => {
  return Number(value.replace(",", ""));
};

export const removeMask = (value) => {
  if (value === null) {
    return "";
  }
  return value.replace(/\D/g, "");
};
