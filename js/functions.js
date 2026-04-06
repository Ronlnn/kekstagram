export const checkStringLength = (str, maxLength) => str.length <= maxLength;

export const checkStringPalindrome = (str) => {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();
  let result = '';
  for (let i = normalizedStr.length - 1; i >= 0; i--) {
    result += normalizedStr[i];
  }
  return normalizedStr === result;
};
console.log('checkStringPalindrome:');
console.log(checkStringPalindrome('Лёша на полке клопа нашёл '));

export const getNumberFromString = (str) => {
  let result = '';
  if (typeof str === 'number') {
    str = str.toString();
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= '0' && str[i] <= '9') {
      result += str[i];
    }
  }
  return parseInt(result, 10);
};
console.log('getNumberFromString:');
console.log(getNumberFromString('2023 год'));
console.log(getNumberFromString('ECMAScript 2022'));
console.log(getNumberFromString('1 кефир, 0.5 батона'));
console.log(getNumberFromString('агент 007'));
console.log(getNumberFromString('а я томат'));
console.log(getNumberFromString(2023));
console.log(getNumberFromString(-1));
console.log(getNumberFromString(1.5));
