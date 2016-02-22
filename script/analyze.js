// contains ES6 code
"use strict";
const fs = require('fs')

function analyze(title){
  let inputFile = 'proc/' + title + '-processed.json'
  let report = {}

  let input =  JSON.parse(fs.readFileSync(inputFile, 'utf8'))
  // report.title = title
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

function punctuation(title){
  let inputFile = 'raw/' + title + '.txt'
  let outputFile = 'punct/' + title + '-punct.txt'
  let outputFile2 = 'punctCount/' + title + '-count.json'

  let originalText = fs.readFileSync(inputFile, 'utf8')
  let processedText = originalText.match(/[^a-zA-Z0-9\s]/g)

  let punctCount = {}

  processedText.forEach(punct=>{
    punctCount[punct] = punctCount[punct] || 0
    punctCount[punct] = punctCount[punct] + 1
  })

  let dataArr = []
  for (let mark in punctCount){
    dataArr.push({
      name: mark,
      value: punctCount[mark]
    })
  }

  processedText = chunkString(processedText.join(''), 75)

  writeToFile( processedText.join('\n'), outputFile)
  // writeToFile( JSON.stringify(dataArr), outputFile2)
  outputObj[title].punctuation = dataArr;
  // dataObj[title] = dataArr;
  // writeToFile( JSON.stringify(dataObj), 'all.json')
}

function writeToFile(data, filename){
  fs.writeFile(filename, data, function(err) {
    if(err) {
      console.log('error saving document', err)
    } else {
      console.log('The file was saved as ' + filename)
    }
  })
}

function twoDecimals(num){
  return Math.round(num * 100) / 100
}

function chunkString(str, length) {
  return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

let outputFile = 'report.json'
let output = []
let outputObj = {}

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




// titles.forEach(title => output.push(analyze(title)))
titles.forEach(title => {
  outputObj[title] = analyze(title)
  punctuation(title)
})

//output the file
writeToFile( JSON.stringify(outputObj), outputFile)
