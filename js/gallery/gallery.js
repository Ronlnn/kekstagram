import { generatePicturesData } from './generatePicturesData.js';
import { renderPictures } from './renderPictures.js';

const gallery = () => {
  const picturesData = generatePicturesData();
  console.log(picturesData);
  renderPictures(picturesData);
};

export { gallery };
