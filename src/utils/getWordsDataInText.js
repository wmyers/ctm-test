import {formatPrimesInMap} from './getPrimesMap';

const punctuation = /[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+\"\n\r]/g;

const updateWordCount = (map, word) => {
  map.set(word, map.has(word) ? map.get(word)+1 : 1);
};

export const getTextArray = (text, limit) => {
  return text.replace(punctuation, '')
  .split(' ', limit)
  .map(word => word.length > 1 ? word.toLowerCase() : word)
};

export const getWordsDataInTextWithSet = ({text, collection, limit}) => {
  const set = collection ? new Set(collection) : new Set();
  const map = new Map();
  const textArr = getTextArray(text, limit);
  textArr.forEach(word => {
    set.add(word)
    updateWordCount(map, word);
  });
  return {
    collection: Array.from(set).sort(), 
    primesMap: formatPrimesInMap(map)
  };
};

export const getWordsDataInTextWithArray = ({text, collection, limit}) => {
  let arr = collection || [];
  const map = new Map();
  arr = arr.concat(getTextArray(text, limit));
  arr = arr.filter((word, i) => {
    updateWordCount(map, word);
    return arr.indexOf(word) === i;
  });
  return {
    collection: arr.sort(), 
    primesMap: formatPrimesInMap(map)
  };
};