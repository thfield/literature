// contains ES6 code
"use strict";

let fs = require('fs')
let wf = require('wordfreq')
let ts = require('text-statistics')


function crunch(title){
  let inputFile = 'raw/' + title + '.txt'
  let outputFile = 'proc/' + title + '-processed.json'

  let originalText = fs.readFileSync(inputFile, 'utf8')
  let processedText = {}

  let wordList = wf().process(originalText)
  processedText.frequencies = wordList

  let punctuation = originalText.match(/[^\w\s]/g)
  processedText.punctuation = punctuation//.join('')

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
  'A-Dolls-House',
  'A-Tale-of-Two-Cities',
  'Adventures-of-Huckleberry-Finn',
  'Alices-Adventures-in-Wonderland',
  'Beowulf',
  'Dracula',
  'Frankenstein',
  'Great-Expectations',
  'Metamorphosis',
  'Moby-Dick',
  'Pride-and-Prejudice',
  'The-Adventures-of-Sherlock-Holmes',
  'The-Adventures-of-Tom-Sawyer',
  'The-Golden-Key',
  'The-Kama-Sutra-of-Vatsyayana',
  'The-Narrative-of-the-Life-of-Frederick-Douglass',
  'The-Yellow-Wallpaper',
  'Ulysses',
  'War-and-Peace',
  'Yesterday-House'
]
titles.forEach(title => crunch(title))
