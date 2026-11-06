import { getRandomInteger } from '../utils.js';
import { names, descriptions, messages } from './picturesData.js';

const generateMessage = () => {
  const sentenceCount = getRandomInteger(1, 2);
  const sentences = [];

  for (let i = 0; i < sentenceCount; i++) {
    const sentence = messages[getRandomInteger(0, messages.length - 1)];
    sentences.push(sentence);
  }

  return sentences.join(' ');
};

const generateComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateMessage(),
  name: names[getRandomInteger(0, names.length - 1)],
});

export const generatePicturesData = () => {
  let commentId = 0;

  return Array.from({ length: 25 }, (_, index) => {
    const id = index + 1;
    const commentCount = getRandomInteger(0, 30);

    const comments = Array.from({ length: commentCount }, () => {
      commentId += 1;
      return generateComment(commentId);
    });

    return {
      id,
      url: `photos/${id}.jpg`,
      description: descriptions[getRandomInteger(0, descriptions.length - 1)],
      likes: getRandomInteger(15, 200),
      comments,
    };
  });
};
