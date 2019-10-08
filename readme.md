# !!!See fix for Firefox 68 and higher below!!!
# HTML database viewer

Create an HTML viewer able to display one slice per animal 
per exam in an HTML page. The page is zoomable (ctrl+scroll) and interaction with images is possible on click with a left click.

## Principle

img/ contains .png images that are displayed by ViewerDemo.html. Visual settings are contained in styles.css and interaction is done through Interaction.js.

The idea is to have a module on MP3 or populse_mia that generates the img/ folder and the corresponding .html file for easy and interactive visualisation.

## To do

* Add dynamic contrast range in addition to existing brightness control
* Add more interaction depending on needs (python mpld3 or bokeh pages?)
* Left margin's width is dependent on the width on what's written into it, might be a problem for long label names.
Rotation results in overlap for long names
* ~~Zooming requires 2 images so far (=lot of redundant information). If critical, implement sprites strategy in css.~~
* ~~Aspects ratios are hard coded so far --> Problem?~~
* ~~Write MP3 module that creates .png files, .txt files with list of animals, and .html file.~~
* Write cleaner fix for Firefox issues, using ```XMLHttpRequest``` or ```Fetch``` as suggested [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp)

## Enhancement
* Add colormap option in the MP3 module

## For Firefox 68 and higher:
* Open a new tab and type ```about:config``` in address bar
* Click on __I’ll be careful, I promise!__ (and be careful)
* In search bar type ```privacy.file_unique_origin```
* Double click on the result to set value to __False__
* Restart Firefox
