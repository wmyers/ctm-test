import styles from './app.css';
import {
  getWordsDataInTextWithSet, 
  getWordsDataInTextWithArray
} from '../utils/getWordsDataInText';

import {book} from '../service';
import apiClient from '../service/apiClient';

const bookService = book(apiClient);

const RAILWAY_CHILDREN_URL = 'test-data/railway-children.txt';

const controlBarContainer = document.getElementById('controlBarContainer');
const wordsContainer = document.getElementById('wordsContainer');

// ----------------------------------

class App {

  getBookText(url = RAILWAY_CHILDREN_URL) {
    return bookService.getText(url);
  }

  renderBookText(text) {
    const markup = `
      <div class="${styles.bookText}">${text}</div>
    `;
    wordsContainer.innerHTML = markup;
  }

  renderWordsData({collection, primesMap}) {
    let markup = `<div class="${styles.wordsInText}">`;
    collection.forEach(word => {
      const {value: num, isPrime} = primesMap.get(word);
      markup = markup.concat(`<div class="${isPrime ? styles.isPrime : null}">${word}_${num}</div>`);
    });
    markup = markup.concat('</div>');
    wordsContainer.innerHTML = markup;
  }

  getBook() {
    this.getBookText().then(text => this.renderBookText(text));
  };

  getWordsDataUsingArray() {
    this.getBookText()
    .then(text => getWordsDataInTextWithArray({text}))
    .then(this.renderWordsData);
  };  

  getWordsDataUsingSet() {
    this.getBookText()
    .then(text => getWordsDataInTextWithSet({text}))
    .then(this.renderWordsData);
  };

  clearText() {
    this.renderBookText('');
  };

  renderControlBar() {
    const markup = `
      <div class="${styles.controlBar}">
        <button name="getBook" type="button">Get book text</button>
        <button name="getWordsDataUsingArray" type="button">Get words in book with array :(</button>
        <button name="getWordsDataUsingSet" type="button">Get words in book with set :)</button>
        <button name="clearText" type="button">Clear text</button>
      </div>
    `;
    controlBarContainer.innerHTML = markup;
    const buttons = Array.prototype.slice.call(controlBarContainer.querySelectorAll('button'));
    buttons.forEach(button => {
      button.addEventListener('click', this[button.name].bind(this));
    })
  }
} 

export const app = new App();

export default (() => app.renderControlBar())();