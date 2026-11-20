const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

/**
 * Настраивает проверки полей и обработчики валидации формы.
 * @returns {Pristine} Экземпляр валидатора для сброса ошибок.
 */
const initUploadFormValidation = () => {
  const pristine = new Pristine(
    uploadForm,
    {
      classTo: 'img-upload__field-wrapper',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: 'div',
      errorTextClass: 'img-upload__field-wrapper--error',
    },
    false,
  );

  const MAX_DESCRIPTION_LENGTH = 140;
  const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
  const MAX_HASHTAG_COUNT = 5;

  /**
   * Проверяет допустимую длину комментария.
   * @param {string} value - Текст комментария.
   * @returns {boolean} Допустима ли длина комментария.
   */
  const validateDescriptionLength = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

  /**
   * Разбивает строку хэштегов на массив, убирая лишние пробелы.
   * @param {string} value - Содержимое поля хэштегов.
   * @returns {string[]} Массив хэштегов.
   */
  const parseHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

  /**
   * Проверяет формат каждого хэштега.
   * @param {string} value - Содержимое поля хэштегов.
   * @returns {boolean} Соответствуют ли все хэштеги формату.
   */
  const validateHashtagsFormat = (value) =>
    parseHashtags(value).every((hashtag) => HASHTAG_PATTERN.test(hashtag));

  /**
   * Проверяет ограничение на количество хэштегов.
   * @param {string} value - Содержимое поля хэштегов.
   * @returns {boolean} Не превышено ли допустимое количество.
   */
  const validateHashtagsCount = (value) =>
    parseHashtags(value).length <= MAX_HASHTAG_COUNT;

  /**
   * Проверяет отсутствие повторов без учёта регистра.
   * @param {string} value - Содержимое поля хэштегов.
   * @returns {boolean} Уникальны ли хэштеги.
   */
  const validateHashtagsUnique = (value) => {
    const hashtags = parseHashtags(value).map((hashtag) => hashtag.toLowerCase());

    return new Set(hashtags).size === hashtags.length;
  };

  pristine.addValidator(
    descriptionInput,
    validateDescriptionLength,
    'Комментарий должен быть не длиннее 140 символов',
  );

  pristine.addValidator(
    hashtagsInput,
    validateHashtagsFormat,
    'Хэштег должен начинаться с # и содержать от 1 до 19 букв или цифр',
  );

  pristine.addValidator(
    hashtagsInput,
    validateHashtagsCount,
    'Можно указать не больше пяти хэштегов',
  );

  pristine.addValidator(
    hashtagsInput,
    validateHashtagsUnique,
    'Хэштеги не должны повторяться',
  );

  /**
   * Проверяет поля и отменяет действие события при ошибках.
   * @param {Event} e - Событие отправки или изменения формы.
   */
  const onUploadFormSubmit = (e) => {
    const isValid = pristine.validate([hashtagsInput, descriptionInput]);

    if (!isValid) {
      e.preventDefault();
    }
  };

  uploadForm.addEventListener('submit', onUploadFormSubmit);
  uploadForm.addEventListener('change', onUploadFormSubmit);

  return pristine;
};

export { initUploadFormValidation };
