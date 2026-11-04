import { generatePicturesData } from './generatePicturesData.js';
import { renderPictures } from './renderPictures.js';

const picturesData = generatePicturesData();

renderPictures(picturesData);
