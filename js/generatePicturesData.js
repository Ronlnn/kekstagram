import { getRandomInteger } from './utils.js';
import { names, descriptions, messages } from './picturesData.js';

const generateMessages = () => {
  const messageCount = getRandomInteger(1, 2);
  const result = [];
  for (let i = 0; i < messageCount; i++) {
    const randomMessage = messages[getRandomInteger(0, messages.length - 1)];
    result.push(randomMessage);
  }
  return result;
};

const generatePictureDescription = (id) => {
  const url = `photos/${id}.jpg`;
  const description =
    descriptions[getRandomInteger(0, descriptions.length - 1)];
  const likes = getRandomInteger(15, 200);
  const commentsAvatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
  const commentsMessage = generateMessages();
  const commentsName = names[getRandomInteger(0, names.length - 1)];

  return {
    id: id,
    url: url,
    description: description,
    likes: likes,
    comments: [
      {
        id: id,
        avatar: commentsAvatar,
        message: commentsMessage,
        name: commentsName,
      },
    ],
  };
};

export const generatePicturesData = () =>
  Array.from({ length: 25 }, (_, i) => generatePictureDescription(i + 1));

//console.log(JSON.stringify(generatePicturesData(), null, 2));
//console.log(JSON.stringify(generatePicturesData()[0].comments, null, 2));
