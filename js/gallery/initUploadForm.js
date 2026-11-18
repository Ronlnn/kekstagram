import { isEscKey } from '../utils';
import { validateForm } from './validateUploadForm';

const imageInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCloseButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const hashtags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');

const initUploadForm = () => {
  const pristine = validateForm();

  const onImageInputChange = () => {
    imageUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscKeyDown);
  };

  const onUploadCloseButton = () => {
    imageUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadForm.reset();
    pristine.reset();
  };

  function onEscKeyDown(e) {
    const isTextField = e.target === comment || e.target === hashtags;

    if (isEscKey(e) && !isTextField) {
      e.preventDefault();
      closeUploadForm();
    }
  }

  function closeUploadForm() {
    imageUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscKeyDown);
    uploadForm.reset();
    pristine.reset();
  }

  imageInput.addEventListener('change', onImageInputChange);
  uploadCloseButton.addEventListener('click', onUploadCloseButton);
  validateForm();
};

export { initUploadForm };
