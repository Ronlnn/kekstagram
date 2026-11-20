import { isEscKey } from '../../utils.js';
import { initUploadFormValidation } from './uploadFormValidation.js';
import { initEffects, resetEffects } from './effects.js';

const fileInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCloseButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const scaleInput = document.querySelector('.scale__control--value');
const scaleIncreaseButton = document.querySelector('.scale__control--bigger');
const scaleDecreaseButton = document.querySelector('.scale__control--smaller');
const previewImage = document.querySelector('.img-upload__preview img');

const SCALE_DEFAULT = 100;
const SCALE_STEP = 25;
const SCALE_MIN = 25;

/**
 * Подключает открытие и закрытие формы, масштабирование и эффекты.
 */
const initUploadForm = () => {
  const pristine = initUploadFormValidation();
  initEffects();

  /**
   * Открывает редактор после выбора файла.
   */
  const onFileInputChange = () => {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscKeyDown);
  };

  /**
   * Закрывает форму по нажатию кнопки отмены.
   */
  const onUploadCloseButtonClick = () => {
    closeUploadForm();
  };

  /**
   * Закрывает окно по Escape с учётом условий текущего модуля.
   * @param {KeyboardEvent} e - Событие нажатия клавиши.
   */
  function onEscKeyDown(e) {
    const isTextInputTarget = e.target === descriptionInput || e.target === hashtagsInput;

    if (isEscKey(e) && !isTextInputTarget) {
      e.preventDefault();
      closeUploadForm();
    }
  }
  /**
   * Обновляет значение масштаба в поле и размер изображения.
   * @param {number} value - Масштаб в процентах.
   */
  const updateScale = (value) => {
    scaleInput.value = `${value}%`;
    previewImage.style.transform = `scale(${value / 100})`;
  };

  /**
   * Увеличивает масштаб на один шаг, не превышая максимум.
   */
  const onScaleIncreaseButtonClick = () => {
    const currentScale = parseInt(scaleInput.value, 10);
    const nextScale = Math.min(currentScale + SCALE_STEP, SCALE_DEFAULT);

    updateScale(nextScale);
  };

  /**
   * Уменьшает масштаб на один шаг, не выходя за минимум.
   */
  const onScaleDecreaseButtonClick = () => {
    const currentScale = parseInt(scaleInput.value, 10);
    const nextScale = Math.max(currentScale - SCALE_STEP, SCALE_MIN);

    updateScale(nextScale);
  };

  /**
   * Закрывает редактор, снимает обработчик клавиатуры и сбрасывает поля, эффекты и ошибки.
   */
  function closeUploadForm() {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscKeyDown);
    updateScale(SCALE_DEFAULT);
    uploadForm.reset();
    resetEffects();
    pristine.reset();
  }

  fileInput.addEventListener('change', onFileInputChange);
  uploadCloseButton.addEventListener('click', onUploadCloseButtonClick);
  scaleIncreaseButton.addEventListener('click', onScaleIncreaseButtonClick);
  scaleDecreaseButton.addEventListener('click', onScaleDecreaseButtonClick);
  updateScale(SCALE_DEFAULT);
};

export { initUploadForm };
