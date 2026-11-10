import { showBigPicture } from './bigPicture.js';

const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

/**
 * Рендерит фото и заполняет все данные из генератора,
 * сразу навешивает слушатель
 * @param {Object} data - Данные фото
 * @returns {Element} - Заполненное фото
 */
const renderPicture = (data) => {
  const { url, description, likes, comments } = data;
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent =
    comments.length;

  const onPictureElementClick = (e) => {
    e.preventDefault();
    showBigPicture(data);
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
    fragment.appendChild(renderPicture(item));
  });
  pictures.appendChild(fragment);
};

export { renderPictures };
