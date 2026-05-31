import { getRandomInteger } from './functions.js';
import { names, descriptions, messages } from './data.js';

const generateMessages = () => {
  const messageCount = getRandomInteger(1, 2);
  let result = [];
  for (let i = 0; i < messageCount; i++) {
    const randomMessage = messages[getRandomInteger(0, messages.length - 1)];
    result.push(randomMessage);
  }
  return result;
};

const generatePhotoDescription = (id) => {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: descriptions[getRandomInteger(0, descriptions.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: [
      {
        id: id,
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: generateMessages() ,
        name: names[getRandomInteger(0, names.length - 1)],
      },
    ],
  };
};

const photoDescriptions = Array.from({ length: 25 }, (_, i) =>
  generatePhotoDescription(i + 1),
);

console.log(photoDescriptions);
console.log(photoDescriptions[0].comments);
