import { openPhotoDetails } from '../photoDetails/photoDetails.js';

const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

/**
 * Рендерит фото и заполняет все данные из генератора,
 * сразу навешивает слушатель
 * @param {Object} data - Данные фото
 * @returns {Element} - Заполненное фото
 */
const createPictureElement = (data) => {
  const { url, description, likes, comments } = data;
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent =
    comments.length;

  const onPictureElementClick = (e) => {
    e.preventDefault();
    openPhotoDetails(data);
  };
  pictureElement.addEventListener('click', onPictureElementClick);

  return pictureElement;
};
/**
 * Рендерит все фотки
 * @param {Object[]} picturesData - Массив данных фото
 */
const renderPictures = (picturesData) => {
  const fragment = document.createDocumentFragment();
  picturesData.forEach((item) => {
    fragment.appendChild(createPictureElement(item));
  });
  picturesContainer.appendChild(fragment);
};

export { renderPictures };
