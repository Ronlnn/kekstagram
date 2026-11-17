import { isEscKey, toggleClass } from '../utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const shownCountElement = bigPicture.querySelector(
  '.social__comment-shown-count',
);
const totalCountElement = bigPicture.querySelector(
  '.social__comment-total-count',
);
const loadButton = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const COMMENT_AVATAR_WIDTH = 35;
const COMMENT_AVATAR_HEIGHT = 35;
const COMMENTS_STEP = 5;

let shownCommentsCount = 0;
let currentComments = [];

/**
 * Переключает видимость большой картинки
 * Зависит от предыдущего состояния
 */
const toggleModal = () => {
  toggleClass(bigPicture, 'hidden');
  toggleClass(document.body, 'modal-open');
};

/**
 * Создает один комментарий
 * @param {Object} comment - Объект с одним комментарием
 * @returns {Element}
 */
const createComment = (comment) => {
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

  return commentElement;
};
/**
 * Рендерит комментарии внутри большой картинки
 */
const renderComments = () => {
  const fragment = document.createDocumentFragment();

  const nextComments = currentComments.slice(
    shownCommentsCount,
    shownCommentsCount + COMMENTS_STEP,
  );
  nextComments.forEach((comment) => {
    fragment.appendChild(createComment(comment));
  });

  socialComments.appendChild(fragment);
  shownCommentsCount += nextComments.length;

  shownCountElement.textContent = shownCommentsCount;
  totalCountElement.textContent = currentComments.length;

  loadButton.classList.toggle(
    'hidden',
    shownCommentsCount >= currentComments.length,
  );
};
/**
 * Меняет данные большой картинки
 * @param {Object} picture - Объект с одной картинкой
 */
const show = (picture) => {
  const { url, likes, description } = picture;

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  bigPictureCaption.textContent = description;
  bigPictureImage.alt = description;
};

const onLoadButtonClick = () => {
  renderComments();
};

function onEscKeyDown(e) {
  if (isEscKey(e)) {
    closeBigPicture();
  }
}

function closeBigPicture() {
  document.removeEventListener('keydown', onEscKeyDown);
  toggleModal();
}

const onCloseButtonClick = () => {
  closeBigPicture();
};

/**
 * Открывает большую картинку
 * @param {Object} picture - Объект с одной картинкой
 */
const showBigPicture = (picture) => {
  currentComments = picture.comments;
  shownCommentsCount = 0;
  socialComments.replaceChildren();
  socialCommentsCount.classList.remove('hidden');

  show(picture);
  renderComments();

  document.addEventListener('keydown', onEscKeyDown);
  toggleModal();
};

loadButton.addEventListener('click', onLoadButtonClick);
closeButton.addEventListener('click', onCloseButtonClick);

export { showBigPicture };
