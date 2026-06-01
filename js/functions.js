export const checkStringLength = (str, maxLength) => str.length <= maxLength;

export const checkStringPalindrome = (str) => {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();
  let result = '';
  for (let i = normalizedStr.length - 1; i >= 0; i--) {
    result += normalizedStr[i];
  }
  return normalizedStr === result;
};

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

export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const isMeetingInWorkDay = (
  workStart,
  workEnd,
  meetingStart,
  meetingDuration,
) => {
  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return (
    meetingStartMinutes >= workStartMinutes &&
    meetingEndMinutes <= workEndMinutes
  );
};
