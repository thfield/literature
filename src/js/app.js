(function () {
  "use strict";

  function dropdown(selector, optionsArr){
    let selectorEl= document.getElementById(selector)
    clearOptions()
    optionsArr.forEach(function(el,i){
      addOption(el);
    })
    function addOption(el,i, arr){
      var option = document.createElement("option");
      option.value = el;
      option.text = el;
      selectorEl.appendChild(option);
    }
    function clearOptions(){
      var myNode = selectorEl;
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
    }
  }

  function textReport(book){
    //
    // "title": "A-Dolls-House",
    // "wordCount": 27263,
    // "avgGradeLevel": 2,
    // "sentenceCount": 4213,
    // "averageWordsPerSentence": 6.47,
    // "averageSyllablesPerWord": 1.28,
    // "topWords": [    ],
    // "wordsUsedMultiple": 25675,
    // "wordsUsedOnce": 1588
    //
    //
    //
  }

  let barchart = d3.select("#foo")
    .append('svg')
    .chart('BarChart', {})
    .yFormat('n')
    .height(400)
    .width(800);
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
  dropdown('title-dropdown', titles)
  // let filename = titles[0]

  d3.json(`data/punctCount.json`, function(data){
    barchart.draw(data[titles[0]]);

    d3.select('#title-dropdown')
      .on('change', function(el){
        barchart.draw(data[this.value]);
      })
  })

  // d3.json('data/report.json', function(data){
  //   let report = _.find(data, (el)=>{ el.title === titles[0] });
  //
  // })


}());