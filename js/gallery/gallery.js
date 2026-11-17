import { generatePicturesData } from './generatePicturesData.js';
import { renderPictures } from './renderPictures.js';

const gallery = () => {
  const picturesData = generatePicturesData();
  renderPictures(picturesData);
};

export { gallery };
