import { generatePicturesData } from './generatePicturesData.js';
import { renderPictures } from './renderPictures.js';
import { pictureFullScreenMode } from './pictureFullScreenMode.js';

export const gallery = () => {
  const picturesData = generatePicturesData();
  console.log(picturesData);
  renderPictures(picturesData);
  pictureFullScreenMode(picturesData);
};
