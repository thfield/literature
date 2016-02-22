// contains ES6 code
"use strict";

let fs = require('fs')


function crunch(title){
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

  processedText = chunkString(processedText.join(''), 75)

  writeToFile( processedText.join('\n'), outputFile)
  writeToFile( JSON.stringify(punctCount), outputFile2)
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

function chunkString(str, length) {
  return str.match(new RegExp('.{1,' + length + '}', 'g'));
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
