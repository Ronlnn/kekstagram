const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const pictures = document.querySelector('.pictures');


export const renderPictures = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach(({ url, description, likes, comments }) => {
    const pictureClone = pictureTemplate.cloneNode(true);
    const image = pictureClone.querySelector('.picture__img');

    image.src = url;
    image.alt = description;

    pictureClone.querySelector('.picture__likes').textContent = likes;
    pictureClone.querySelector('.picture__comments').textContent =
      comments.length;

    fragment.appendChild(pictureClone);
  });
  pictures.appendChild(fragment);
};
