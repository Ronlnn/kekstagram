import { generatePicturesData } from './mock/generatePictures.js';
import { renderPictures } from './feed/renderFeed.js';
import { initUploadForm } from './upload/uploadForm.js';

/**
 * Запускает отрисовку ленты и подключает форму загрузки.
 */
const initPhotoGallery = () => {
  const picturesData = generatePicturesData();
  renderPictures(picturesData);
  initUploadForm();
};

export { initPhotoGallery };
