// contains ES6 code
"use strict";

let fs = require('fs')
let ts = require('text-statistics')

function countTheWords(textString){
  //adapted from http://stackoverflow.com/questions/30906807/word-frequency-in-javascript
  textString = textString.replace(/'s|'/g,'').toLowerCase()
  let words = textString.match(/\b[a-zA-Z]+\b/g)
  let counts = words.reduce(function ( stats, word ) {
      if ( stats.hasOwnProperty( word ) ) {
          stats[ word ] = stats[ word ] + 1;
      } else {
          stats[ word ] = 1;
      }
      return stats;
  }, {} );
  for (let word in counts){
    if (counts[word] == 1){
      delete counts[word]
    }
  }
  return counts;
}

function countsFromObjToSortedArray(countsObject){
  let countsArray = []

  for (let word in countsObject){
    countsArray.push([word, countsObject[word]])
  }
  return countsArray.sort(function(a, b) {return b[1] - a[1]})
}

function crunch(title){
  let inputFile = 'raw/' + title + '.txt'
  let outputFile = 'proc/' + title + '-processed.json'

  let originalText = fs.readFileSync(inputFile, 'utf8')
  let processedText = {}

  let wordsObj = countTheWords(originalText)
  let wordList = countsFromObjToSortedArray(wordsObj)

  processedText.frequencies = wordList

  // let punctuation = originalText.match(/[^\w\s]/g)
  // processedText.punctuation = punctuation//.join('')

  let stats = ts(originalText)
  processedText.wordCount = stats.wordCount()
  processedText.fleschKincaid = stats.fleschKincaidReadingEase()
  processedText.fleschKincaidGradeLevel = stats.fleschKincaidGradeLevel()
  processedText.smog = stats.smogIndex()
  processedText.automatedReadabilityIndex = stats.automatedReadabilityIndex()
  processedText.sentenceCount = stats.sentenceCount()
  processedText.averageWordsPerSentence = stats.averageWordsPerSentence()
  processedText.averageSyllablesPerWord = stats.averageSyllablesPerWord()

  //output the file
  fs.writeFile(outputFile, JSON.stringify(processedText),
    function(err) {
      if (err) { return console.log(err); }
      console.log("The file was saved as", outputFile);
    }
  )
}



let titles = [
  'A-Connecticut-Yankee-in-King-Arthurs-Court',
  'Life-On-The-Mississippi',
  'The-Prince-and-The-Pauper',
  'David-Copperfield',
  'Nicholas-Nickleby',
  'Oliver-Twist'
  // 'A-Dolls-House',
  // 'A-Tale-of-Two-Cities',
  // 'Adventures-of-Huckleberry-Finn',
  // 'Alices-Adventures-in-Wonderland',
  // 'Beowulf',
  // 'Dracula',
  // 'Frankenstein',
  // 'Great-Expectations',
  // 'Metamorphosis',
  // 'Moby-Dick',
  // 'Pride-and-Prejudice',
  // 'The-Adventures-of-Sherlock-Holmes',
  // 'The-Adventures-of-Tom-Sawyer',
  // 'The-Golden-Key',
  // 'The-Kama-Sutra-of-Vatsyayana',
  // 'The-Narrative-of-the-Life-of-Frederick-Douglass',
  // 'The-Yellow-Wallpaper',
  // 'Ulysses',
  // 'War-and-Peace',
  // 'Yesterday-House'
]

titles.forEach(title => crunch(title))
