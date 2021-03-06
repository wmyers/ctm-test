import sinon from 'sinon';
import {expect} from 'chai';
import {book} from '../service';

describe('service', () => {
  describe('#book service', () => {
    it('calls the api client with an url', () => {
      const url = 'some.txt';
      const apiClient = {
        get: sinon.spy(() => Promise.resolve())
      };

      book(apiClient).getText(url);
      expect(apiClient.get.calledOnce).to.be.true;
      expect(apiClient.get.calledWithExactly(url)).to.be.true;
    });

    it('does not call the api client for a repeat fetch, but returns cached data', (done) => {

      const apiResponse = {}; // return an object to confirm equality
      const apiClient = {
        get: sinon.spy(() => Promise.resolve(apiResponse))
      };
      const url = 'some.txt';
      const bookService = book(apiClient);

      let response1, response2;

      bookService.getText(url)
      .then(res1 => {
        response1 = res1;
        return bookService.getText(url);
      })
      .then(res2 => {
        response2 = res2;
        expect(apiClient.get.calledOnce).to.be.true;
        expect(apiClient.get.calledTwice).to.be.false;
        expect(response2).to.equal(response1);
        done();
      });
    });
  });
});
