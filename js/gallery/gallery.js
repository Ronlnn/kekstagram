import { generatePicturesData } from './generatePicturesData.js';
import { renderPictures } from './renderPictures.js';
import { initUploadForm } from './initUploadForm.js';
const gallery = () => {
  const picturesData = generatePicturesData();
  renderPictures(picturesData);
  initUploadForm();
};

export { gallery };
