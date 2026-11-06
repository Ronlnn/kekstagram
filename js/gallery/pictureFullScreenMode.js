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
const COMMENT_PER_PAGE = 5;

export const pictureFullScreenMode = (data) => {
  let currentPicture = null;
  let shownCommentCount = 0;

  function onEscKeydown(e) {
    if (isEscKey(e)) {
      e.preventDefault();
      closeFullScreenMode();
    }
  }

  function onPictureClick(e) {
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
    openFullScreenMode(pictureData);
  }

  function closeFullScreenMode() {
    pictureCardModal.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    closeFullScreenModeButton.removeEventListener('click', closeFullScreenMode);
    document.removeEventListener('keydown', onEscKeydown);
    commentLoader.removeEventListener('click', showNextComments);

    pictures.addEventListener('click', onPictureClick);
  }

  function openFullScreenMode(pictureData) {
    currentPicture = pictureData;
    shownCommentCount = 0;
    commentList.replaceChildren();
    pictureCardModal.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    commentCounter.classList.remove('hidden');
    //Слушатели
    document.addEventListener('keydown', onEscKeydown);
    closeFullScreenModeButton.addEventListener('click', closeFullScreenMode);
    commentLoader.addEventListener('click', showNextComments);
    //Чистим события
    pictures.removeEventListener('click', onPictureClick);

    renderFullScreenPicture(pictureData);
    showNextComments();
  }

  function renderFullScreenPicture(pictureData) {
    pictureCardImage.src = pictureData.url;
    pictureDescription.textContent = pictureData.description;
    pictureLikesCount.textContent = pictureData.likes;
    commentTotalCount.textContent = pictureData.comments.length;
    pictureCardModal.classList.remove('hidden');
  }

  function showNextComments() {
    if (!currentPicture) {
      return;
    }

    const nextComments = currentPicture.comments.slice(
      shownCommentCount,
      shownCommentCount + COMMENT_PER_PAGE,
    );

    renderCommentList(nextComments);

    shownCommentCount += nextComments.length;
    commentShownCount.textContent = shownCommentCount;

    const allCommentsShown =
      shownCommentCount >= currentPicture.comments.length;

    commentLoader.classList.toggle('hidden', allCommentsShown);
  }

  function renderCommentList(comments) {
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
  }

  pictures.addEventListener('click', onPictureClick);
};
