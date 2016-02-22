// contains ES6 code
"use strict";

let fs = require('fs')

function analyze(title){
  let inputFile = 'proc/' + title + '-processed.json'
  let report = {}

  let input =  JSON.parse(fs.readFileSync(inputFile, 'utf8'))
  report.title = title
  report.wordCount = input.wordCount
  // report.fleschKincaid = input.fleschKincaid
  report.avgGradeLevel = twoDecimals((input.fleschKincaidGradeLevel + input.smog + input.automatedReadabilityIndex)/3)
  report.sentenceCount = input.sentenceCount
  report.averageWordsPerSentence = twoDecimals(input.averageWordsPerSentence)
  report.averageSyllablesPerWord = twoDecimals(input.averageSyllablesPerWord)

  report.topWords = input.frequencies.slice(0,10)

  report.wordsUsedMultiple = input.frequencies.reduce(function(count, el){
    return count + +el[1]
  },0)
  report.wordsUsedOnce = report.wordCount - report.wordsUsedMultiple

  return report
}

function twoDecimals(num){
  return Math.round(num * 100) / 100
}

let outputFile = 'report.json'
let output = []

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

titles.forEach(title => output.push(analyze(title)))

// //output the file
fs.writeFile(outputFile, JSON.stringify(output),
  function(err) {
    if (err) { return console.log(err); }
    console.log("The file was saved as", outputFile);
  }
)
