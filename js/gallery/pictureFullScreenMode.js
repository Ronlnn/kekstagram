import { isEscKey } from '../utils.js';
const pictureCardModal = document.querySelector('.big-picture');
const pictureCardImage = pictureCardModal.querySelector(
  '.big-picture__img img',
);
const pictureLikesCount = pictureCardModal.querySelector('.likes-count');
const commentShownCount = pictureCardModal.querySelector(
  '.social__comment-shown-count',
);
const commentTotalCount = pictureCardModal.querySelector(
  '.social__comment-total-count',
);
const commentCounter = pictureCardModal.querySelector('.social__comment-count');
const commentLoader = pictureCardModal.querySelector('.comments-loader');
const commentList = pictureCardModal.querySelector('.social__comments');
const pictureDescription = pictureCardModal.querySelector('.social__caption');
const pictures = document.querySelector('.pictures');
const closeFullScreenModeButton = pictureCardModal.querySelector(
  '.big-picture__cancel',
);
const COMMENT_AVATAR_WIDTH = 35;
const COMMENT_AVATAR_HEIGHT = 35;

export const pictureFullScreenMode = (data) => {
  function onEscKeydown(e) {
    if (isEscKey(e)) {
      e.preventDefault();
      closeFullScreenMode();
    }
  }
  function closeFullScreenMode() {
    pictureCardModal.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    //Чистим события
    closeFullScreenModeButton.removeEventListener('click', closeFullScreenMode);
    document.removeEventListener('keydown', onEscKeydown);
    //Заново добавляем событие открытия
    pictures.addEventListener('click', openFullScreenMode);
  }
  function openFullScreenMode(e) {
    const picture = e.target.closest('.picture');
    if (!picture) {
      return;
    }
    e.preventDefault();
    const pictureData = data.find(
      (item) => item.id === Number(picture.dataset.photoId),
    );
    if (!pictureData) {
      return;
    }
    pictureCardModal.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onEscKeydown);
    closeFullScreenModeButton.addEventListener('click', closeFullScreenMode);
    //Чистим события
    pictures.removeEventListener('click', openFullScreenMode);

    renderFullScreenPicture(pictureData);
  }

  function renderFullScreenPicture(pictureData) {
    pictureCardImage.src = pictureData.url;
    pictureDescription.textContent = pictureData.description;
    pictureLikesCount.textContent = pictureData.likes;
    commentTotalCount.textContent = pictureData.comments.length;
    pictureCardModal.classList.remove('hidden');

    renderCommentList(pictureData.comments);

    //Скрываем счетчик комментов и кнопку загрузки комментов, доделаем в след модуле
    commentLoader.classList.add('hidden');
    commentCounter.classList.add('hidden');
    //Пока рендерим все комментарии, доделаем в след модуле
    commentShownCount.textContent = 12;
  }

  function renderCommentList(comments) {
    commentList.replaceChildren();

    const fragment = document.createDocumentFragment();

    comments.forEach((comment) => {
      const commentElement = document.createElement('li');
      commentElement.classList.add('social__comment');

      const avatarElement = document.createElement('img');
      avatarElement.classList.add('social__picture');
      avatarElement.src = comment.avatar;
      avatarElement.alt = comment.name;
      avatarElement.width = COMMENT_AVATAR_WIDTH;
      avatarElement.height = COMMENT_AVATAR_HEIGHT;

      const textElement = document.createElement('p');
      textElement.classList.add('social__text');
      textElement.textContent = comment.message;

      commentElement.append(avatarElement, textElement);
      fragment.appendChild(commentElement);
    });

    commentList.appendChild(fragment);
    commentTotalCount.textContent = comments.length;
  }

  pictures.addEventListener('click', openFullScreenMode);
};
