import {expect} from 'chai';
import {isPrimeNumber, formatPrimesInMap} from '../utils/getPrimesMap';

describe('getPrimesMap', () => {
  describe('#isPrimeNumber', () => {
    it('recognises a prime number', () => {
      expect(isPrimeNumber(7)).to.be.true;
      expect(isPrimeNumber(6)).to.be.false;
    });
  });

  describe('#formatPrimesInMap', () => {
    it('converts a map of numeric values to a map of objects with value and isPrime props', () => {
      const foo = 'foo';
      const bar = 'bar';

      const primesMap = new Map()
      primesMap.set(foo, 6);
      primesMap.set(bar, 7);

      const formattedFoo =  {
        value: 6,
        isPrime: false
      };      
      const formattedBar =  {
        value: 7,
        isPrime: true
      };
      const formattedPrimesMap = formatPrimesInMap(primesMap);
      expect(formattedPrimesMap.get(foo)).to.deep.equal(formattedFoo);
      expect(formattedPrimesMap.get(bar)).to.deep.equal(formattedBar);
    });
  });
});