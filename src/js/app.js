(function () {
  "use strict";

  function dropdown(selector, optionsArr){
    // clears the selctor with id={selector}
    // then populates it with options in optionsArr
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
    for (let prop in book) {
      if (prop != 'punctuation'){
        if (prop === 'topWords'){
          d3.select(`#${prop}`).html(tableify(book[prop]))
        } else{
          d3.select(`#${prop}`).html(book[prop])
        }
      }
    }
  }

  function tableify(arr){
    let result = '<table>'
    arr.forEach(function(el){
      result = result.concat(`<tr><td>${el[0]}</td><td>${el[1]}</td></tr>`)
    })
    result = result.concat('</table>')
    return result
  }

  function chunkString(str, length) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
  }

  function colorFromMark(mark){
    switch (mark) {
      case '?':
      case '!':
      case '.':
        return 'red';
        break;
      case '\'':
      case '"':
      case ',':
        return 'green';
        break;
      case ':':
      case ';':
        return 'blue';
        break;
      default:
        return 'white';
    }
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

  dropdown('title-dropdown', titles);

  let barchart = d3.select("#foo")
    .append('svg')
    .chart('BarChart', {})
    .yFormat('n')
    .height(400)
    .width(800);


  d3.json(`data/report.json`, function(data){
    barchart.draw(data[titles[0]].punctuation);
    textReport(data[titles[0]]);
    drawGraphic(titles[0]);
    d3.select('#title').html(titles[0].replace(/-/g,' '));

    d3.select('#title-dropdown')
      .on('change', function(el){
        barchart.draw(data[this.value].punctuation);
        textReport(data[this.value]);
        drawGraphic(this.value);
        d3.select('#title').html(this.value.replace(/-/g,' '));
      });
  });


function drawGraphic(title){
  d3.select('#graphic svg').remove()

  let svg = d3.select('#graphic').append('svg')

  let square = 4
  d3.text(`data/punctString/${title}-punct.txt`, function(data){
    let arr = chunkString(data, 250)
    arr = arr.map(function(el){
      return el.split('')
    })

    svg.attr('height', function(){
      return arr.length * square
    })

    arr.forEach(function(row,i){
      row.forEach(function(mark, col){
        svg.append('rect')
            .attr('height',square)
            .attr('width',square)
            .attr('y',i*square)
            .attr('x',col*square)
            .attr('fill', function(){
              return colorFromMark(mark)
            })
      })
    })
  })
}


}());