// contains ES6 code
"use strict";

let texttext =  "--_What's wrong with him_? He said. _He's dead_, he said. And, faith, he filled up. _Is it Paddy Dignam_? I said. I couldn't believe it when I heard it. I was with him no later than Friday last or Thursday was it in the Arch. _Yes,_ he said. _He's gone. He died on Monday, poor fellow_. Watch! Watch! Silk flash rich stockings white. Watch!"

function countTheWords(textString){
  //adapted from http://stackoverflow.com/questions/30906807/word-frequency-in-javascript
  textString = textString.replace(/'s|'/g,'').toLowerCase()

  let words = textString.match(/\b[a-zA-Z]+\b/g)
  let counts = words.reduce(function ( stats, word ) {
      /* `stats` is the object that we'll be building up over time.
         `word` is each individual entry in the `matchedWords` array */
      if ( stats.hasOwnProperty( word ) ) {
          /* `stats` already has an entry for the current `word`.
             As a result, let's increment the count for that `word`. */
          stats[ word ] = stats[ word ] + 1;
      } else {
          /* `stats` does not yet have an entry for the current `word`.
             As a result, let's add a new entry, and set count to 1. */
          stats[ word ] = 1;
      }
      /* Because we are building up `stats` over numerous iterations,
         we need to return it for the next pass to modify it. */
      return stats;
  }, {} );
  /* Now that `counts` has our object, we can log it. */
  for (let word in counts){
    if (counts[word] == 1){
      delete counts[word]
    }
  }
  return counts
}

function countsFromObjToSortedArray(countsObject){
  let countsArray = []

  for (let word in countsObject){
    countsArray.push([word, countsObject[word]])
  }
  return countsArray.sort(function(a, b) {return b[1] - a[1]})
}
