import { isEscKey } from '../../utils.js';

const photoDetailsModal = document.querySelector('.big-picture');
const photoDetailsImage = photoDetailsModal.querySelector('.big-picture__img img');
const photoDescriptionElement = photoDetailsModal.querySelector('.social__caption');
const likesCountElement = photoDetailsModal.querySelector('.likes-count');
const commentsList = photoDetailsModal.querySelector('.social__comments');
const commentsCounter = photoDetailsModal.querySelector('.social__comment-count');
const shownCountElement = photoDetailsModal.querySelector(
  '.social__comment-shown-count',
);
const totalCountElement = photoDetailsModal.querySelector(
  '.social__comment-total-count',
);
const loadCommentsButton = photoDetailsModal.querySelector('.comments-loader');
const closeButton = photoDetailsModal.querySelector('.big-picture__cancel');

const COMMENT_AVATAR_WIDTH = 35;
const COMMENT_AVATAR_HEIGHT = 35;
const COMMENTS_STEP = 5;

let shownCommentsCount = 0;
let currentComments = [];

/**
 * Создает один комментарий
 * @param {Object} comment - Объект с одним комментарием
 * @returns {Element}
 */
const createCommentElement = (comment) => {
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
 * Добавляет следующую порцию комментариев выбранной фотографии
 */
const renderNextComments = () => {
  const fragment = document.createDocumentFragment();

  const nextComments = currentComments.slice(
    shownCommentsCount,
    shownCommentsCount + COMMENTS_STEP,
  );
  nextComments.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });

  commentsList.appendChild(fragment);
  shownCommentsCount += nextComments.length;

  shownCountElement.textContent = shownCommentsCount;
  totalCountElement.textContent = currentComments.length;

  loadCommentsButton.classList.toggle(
    'hidden',
    shownCommentsCount >= currentComments.length,
  );
};
/**
 * Заполняет данные выбранной фотографии
 * @param {Object} picture - Объект с одной картинкой
 */
const fillPhotoDetails = (picture) => {
  const { url, likes, description } = picture;

  photoDetailsImage.src = url;
  likesCountElement.textContent = likes;
  photoDescriptionElement.textContent = description;
  photoDetailsImage.alt = description;
};

/**
 * Добавляет следующую порцию комментариев по нажатию кнопки.
 */
const onLoadCommentsButtonClick = () => {
  renderNextComments();
};

/**
 * Закрывает окно по Escape с учётом условий текущего модуля.
 * @param {KeyboardEvent} e - Событие нажатия клавиши.
 */
function onEscKeyDown(e) {
  if (isEscKey(e)) {
    e.preventDefault();
    closePhotoDetails();
  }
}

/**
 * Скрывает окно подробностей и снимает обработчик клавиатуры.
 */
function closePhotoDetails() {
  document.removeEventListener('keydown', onEscKeyDown);
  photoDetailsModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

/**
 * Закрывает окно подробностей по нажатию кнопки.
 */
const onCloseButtonClick = () => {
  closePhotoDetails();
};

/**
 * Открывает окно с подробностями фотографии
 * @param {Object} picture - Объект с одной картинкой
 */
const openPhotoDetails = (picture) => {
  currentComments = picture.comments;
  shownCommentsCount = 0;
  commentsList.replaceChildren();
  commentsCounter.classList.remove('hidden');

  fillPhotoDetails(picture);
  renderNextComments();

  document.addEventListener('keydown', onEscKeyDown);
  photoDetailsModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

loadCommentsButton.addEventListener('click', onLoadCommentsButtonClick);
closeButton.addEventListener('click', onCloseButtonClick);

export { openPhotoDetails };
