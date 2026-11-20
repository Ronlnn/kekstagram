/**
 * Проверяет, укладывается ли строка в ограничение длины.
 * @param {string} str - Проверяемая строка.
 * @param {number} maxLength - Максимальная длина.
 * @returns {boolean} Не превышена ли длина.
 */
export const checkStringLength = (str, maxLength) => str.length <= maxLength;

/**
 * Проверяет палиндром без учёта регистра и обычных пробелов.
 * @param {string} str - Проверяемая строка.
 * @returns {boolean} Является ли строка палиндромом.
 */
export const checkStringPalindrome = (str) => {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();
  let result = '';
  for (let i = normalizedStr.length - 1; i >= 0; i--) {
    result += normalizedStr[i];
  }
  return normalizedStr === result;
};

/**
 * Извлекает цифры из строки или числа и объединяет их в целое число.
 * @param {string|number} str - Исходное значение.
 * @returns {number} Полученное число или NaN, если цифр нет.
 */
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

/**
 * Возвращает случайное целое число в заданных границах включительно.
 * @param {number} a - Первая граница диапазона.
 * @param {number} b - Вторая граница диапазона.
 * @returns {number} Случайное целое число.
 */
export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Переводит время из формата ЧЧ:ММ в минуты от начала суток.
 * @param {string} time - Время в формате ЧЧ:ММ.
 * @returns {number} Количество минут.
 */
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Проверяет, помещается ли встреча целиком в рабочий день.
 * @param {string} workStart - Начало рабочего дня в формате ЧЧ:ММ.
 * @param {string} workEnd - Конец рабочего дня в формате ЧЧ:ММ.
 * @param {string} meetingStart - Начало встречи в формате ЧЧ:ММ.
 * @param {number} meetingDuration - Длительность встречи в минутах.
 * @returns {boolean} Помещается ли встреча в рабочий день.
 */
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

/**
 * Проверяет нажатие клавиши Escape.
 * @param {KeyboardEvent} e - Событие клавиатуры.
 * @returns {boolean} Нажата ли клавиша Escape.
 */
export const isEscKey = (e) => e.key === 'Escape' || e.key === 'Esc';

/**
 * Проверяет наличие класса открытого модального окна на body.
 * @returns {boolean} Установлен ли класс modal-open.
 */
export const isModalOpen = () =>
  document.querySelector('body').classList.contains('modal-open');

/**
 * Переключает класс у переданного элемента, если он существует.
 * @param {Element|null} element - Элемент для изменения.
 * @param {string} className - Имя переключаемого класса.
 */
export const toggleClass = (element, className = '') => {
  if (element) {
    element.classList.toggle(className);
  }
};
