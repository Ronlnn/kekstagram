const uploadForm = document.querySelector('.img-upload__form');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
const effectLevelInput = uploadForm.querySelector('.effect-level__value');
const effectsList = uploadForm.querySelector('.effects__list');

const EFFECT_SETTINGS = {
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};

let currentEffectName = 'none';

/**
 * Выбирает эффект и настраивает слайдер на максимальную интенсивность.
 * @param {string} effectName - Имя эффекта или none для оригинала.
 */
const setEffect = (effectName) => {
  currentEffectName = effectName;

  if (currentEffectName === 'none') {
    sliderContainer.classList.add('hidden');
    previewImage.style.removeProperty('filter');
    effectLevelInput.value = '';
    return;
  }

  const effectSettings = EFFECT_SETTINGS[currentEffectName];
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: { min: effectSettings.min, max: effectSettings.max },
    step: effectSettings.step,
    start: effectSettings.max,
  });
};

/**
 * Возвращает оригинальное изображение и начальные настройки слайдера.
 */
const resetEffects = () => {
  uploadForm.querySelector('#effect-none').checked = true;
  setEffect('none');
  sliderElement.noUiSlider.updateOptions({
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1,
  });
};

/**
 * Создаёт слайдер и связывает его с выбором эффекта и CSS-фильтром.
 */
const initEffects = () => {
  noUiSlider.create(sliderElement, {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    if (currentEffectName === 'none') {
      return;
    }

    const effectSettings = EFFECT_SETTINGS[currentEffectName];
    const value = Number(sliderElement.noUiSlider.get());
    effectLevelInput.value = value;
    previewImage.style.filter = `${effectSettings.filter}(${value}${effectSettings.unit})`;
  });

  effectsList.addEventListener('change', (e) => {
    if (e.target.matches('.effects__radio')) {
      setEffect(e.target.value);
    }
  });

  resetEffects();
};

export { initEffects, resetEffects };
