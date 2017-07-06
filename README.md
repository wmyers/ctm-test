# ctm-test

Built with node `v6.2.2`

```
npm i
npm start
```

Browse to <http://localhost:8080>

### TODO
 - implement caching for calls to `getWordsDataInText` functions (poss using redux/reselect)
 - still not detecting apostrophes used as quotation marks (needs another regex)
 - use different O(n) approach for `getWordsDataInTextWithArray`
 - pagination of large texts using `limit` and `collection` params
