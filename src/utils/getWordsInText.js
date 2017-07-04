import {formatPrimesInMap} from './getPrimesMap';

const punctuation = /[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+\"\n\r]/g;

const updateMap = (map, word) => {
  map.set(word, map.has(word) ? map.get(word)+1 : 1);
};

export const getTextArray = (text, limit) => {
  return text.replace(punctuation, ' ')
  .split(' ', limit)
  .map(word => word.length > 1 ? word.toLowerCase() : word)
};

export const getWordsInTextWithSet = ({text, collection, limit}) => {
  const set = collection || new Set();
  const map = new Map();
  const textArr = getTextArray(text, limit).sort();
  textArr.forEach(word => {
    set.add(word)
    updateMap(map, word);
  });
  return {
    collection: set, 
    primesMap: formatPrimesInMap(map)
  };
};

export const getWordsInTextWithArray = ({text, collection, limit}) => {
  let arr = collection || [];
  const map = new Map();
  arr = arr.concat(getTextArray(text, limit));
  arr = arr.filter((word, i) => {
    updateMap(map, word);
    return arr.indexOf(word) === i;
  }).sort(); //nb sorting before the filter makes much slower
  return {
    collection: arr, 
    primesMap: formatPrimesInMap(map)
  };
};