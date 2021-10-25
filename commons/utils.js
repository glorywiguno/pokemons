export const padLeftWithZero = (str, ln) => {
  const newStr = `${'0'.repeat(ln - String(str).length)}${str}`;

  return newStr;
};


