import {expect} from 'chai';
import {
  getTextArray, 
  getWordsDataInTextWithSet,
  getWordsDataInTextWithArray
} from '../utils/getWordsDataInText';

describe('getWordsDataInText', () => {
  const wordsArray = ['lorem', 'ipsum', 'quia', 'dolor', 'sit', 'amet'];
  const sortedWordsArray = ["amet", "dolor", "ipsum", "lorem", "quia", "sit"];

  const getDupWordsArray = () => Array.prototype.slice.call(wordsArray);

  describe('#getTextArray', () => {
    it('returns an array of words', () => {
      const text = 'lorem ipsum quia dolor sit amet';
      const limit = 3;
      const limitedWordsArray = wordsArray.slice(0, limit);
      expect(getTextArray(text, limit)).to.deep.equal(limitedWordsArray);
    });

    it('returns a limited array of words', () => {
      const text = 'lorem ipsum quia dolor sit amet';
      expect(getTextArray(text)).to.deep.equal(wordsArray);
    });

    it('returns an array of words in lowercase except single letter words', () => {
      const text = 'I LoRem IpsUm QUia DolOr Sit AmEt';
      const wordsArrayWithSingleLetterWord = ['I'].concat(getDupWordsArray());
      expect(getTextArray(text)).to.deep.equal(wordsArrayWithSingleLetterWord);
    });

    it('returns an array of words stripped of punctuation ', () => {
      const text = 'lorem... ipsum?? !!quia dolor;; ::sit amet--';
      expect(getTextArray(text)).to.deep.equal(wordsArray);
    });
  });

  describe('#getWordsDataInTextWithSet', () => {
    it('returns a collection of words stripped of duplicates', () => {
      const text = 'lorem lorem ipsum quia lorem quia dolor sit amet';
      const {collection} = getWordsDataInTextWithSet({text});
      expect(collection).to.deep.equal(sortedWordsArray);
    });

    it('returns a collection of words concatenated to an existing collection', () => {
      const text = 'consectetur adipiscing elit';
      const existingAndNewSortedWordsArray = getDupWordsArray().concat(text.split(' ')).sort();
      const {collection} = getWordsDataInTextWithSet({text, collection:getDupWordsArray()});
      expect(collection).to.deep.equal(existingAndNewSortedWordsArray);
    });
  });

  describe('#getWordsDataInTextWithArray', () => {
    it('returns a collection of words stripped of duplicates', () => {
      const text = 'lorem lorem ipsum quia lorem quia dolor sit amet';
      const {collection} = getWordsDataInTextWithArray({text});
      expect(collection).to.deep.equal(sortedWordsArray);
    });

    it('returns a collection of words concatenated to an existing collection', () => {
      const text = 'consectetur adipiscing elit';
      const existingAndNewSortedWordsArray = getDupWordsArray().concat(text.split(' ')).sort();
      const {collection} = getWordsDataInTextWithArray({text, collection:getDupWordsArray()});
      expect(collection).to.deep.equal(existingAndNewSortedWordsArray);
    });
  });

});