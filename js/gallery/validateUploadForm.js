const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const validateForm = () => {
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

  const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

  const getHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

  const validateHashtagsFormat = (value) =>
    getHashtags(value).every((hashtag) => HASHTAG_PATTERN.test(hashtag));

  const validateHashtagsCount = (value) =>
    getHashtags(value).length <= MAX_HASHTAG_COUNT;

  const validateHashtagsUnique = (value) => {
    const hashtags = getHashtags(value).map((hashtag) => hashtag.toLowerCase());

    return new Set(hashtags).size === hashtags.length;
  };

  pristine.addValidator(
    descriptionInput,
    validateDescription,
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

  const onUploadFormSubmit = (evt) => {
    const isValid = pristine.validate([hashtagsInput, descriptionInput]);

    if (!isValid) {
      evt.preventDefault();
    }
  };

  uploadForm.addEventListener('submit', onUploadFormSubmit);
  uploadForm.addEventListener('change', onUploadFormSubmit);

  return pristine;
};

export { validateForm };
