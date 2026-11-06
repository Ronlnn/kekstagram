const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

export const renderPicture = (data) => {
  const {id, url, description, likes, comments } = data;
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.dataset.photoId = id;
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent =
    comments.length;

  return pictureElement;
};

export const renderPictures = (objects) => {
  const fragment = document.createDocumentFragment();
  objects.forEach((item) => {
    fragment.appendChild(renderPicture(item));
  });
  pictures.appendChild(fragment);
};
