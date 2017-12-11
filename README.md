# About
Initially inspired by [Between the Words](http://www.c82.net/work/?id=347), I decided to make a similar project.  On 1/15/16 I downloaded Project Gutenberg's [Top 100 EBooks yesterday](https://www.gutenberg.org/browse/scores/top) and grabbed the text files for the top 10.

First, I stripped out the Gutenberg boilerplate and any tables of contents from the downloaded files.  With some help from [Readability Score](https://readability-score.com/) and using [Text-Statistics](https://github.com/DaveChild/Text-Statistics), calculated some statistics for each book; eg word count, grade level, sentence count.

I set this project aside for a few weeks and came across a [Vox article](http://www.vox.com/2016/2/17/11036614/punctuation-visualization) based on [Adam Calhoun's Medium](https://medium.com/@neuroecology/punctuation-in-novels-8f316d542ec4#.b572mo5ih) post.  Which reminded me I had set this aside in the first place.  

I liked what Adam had done with graphs and "heatmaps" of punctuation, so I recreated that.  

I wrote about this on [Medium](https://medium.com/@thfield/punctuation-in-some-more-novels-ee89ef854402)

## Next steps
- Better layout
- Adapt the script so that arbitrary text can be input and analyzed, as that seems to be what a lot of the Medium responses are asking for.

### To get this on your machine
1. clone this repo
2. `$ npm install`
3. `$ gulp`
4. I probably forgot a step or two in the gulpfile, which I need to correct.
