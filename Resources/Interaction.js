// var OriginalWidth = document.getElementById('A0Ref').naturalWidth;
// var OriginalHeight = document.getElementById('A0Ref').naturalHeight;

function singleClick(e) {

	// Applies adaptative zoom when clicking on an image
	// If the image is not a reference, it is replaced by the 'large' image
	var ctx = e.getContext('2d');
	var currImg = e.nextElementSibling;
	// var currImg = document.getElementById(e.id); //Get current image

	switch (currImg.classList.contains("zoomed")){

		case false:	// Image is not zoomed
			currImg.classList.add('zoomed');
			// Distinguish references and maps for scaling 
			if (currImg.id.includes("Ref") != true) { // Image is not a Ref
				const isRef = 0;
			    var newName = currImg.src.slice(0,-4)+"Large.png";
			    currImg.src = newName;
			    S = computeScale(isRef);
			    Ratio = (currImg.naturalHeight / currImg.naturalWidth)*100;
			    $(e).height(Ratio); //Ratio (h/w) *100

			    ctx.clearRect(0, 0, e.width, e.height);
		    	ctx.drawImage(currImg, 0, 0, e.width,e.height);

		    } else { // Image is a Ref
		    	const isRef = 1;
		    	S = computeScale(isRef);
		    };
		    $(e).css({"transform-origin":"0 0 0", "-webkit-transform": "scale("+S+")", "position": "relative", "z-index": "1", "-webkit-transition": ".1s ease-out", "transition": ".1s ease-out"})
		    break;

		case true:
			if (currImg.id.includes("Ref") != true) {
		    	var nameShort = currImg.src.slice(0,-9);
		    	currImg.src=nameShort+".png";
		    	Ratio = (currImg.naturalHeight / currImg.naturalWidth)*100;
		    	$(e).height(Ratio);
		    }

			currImg.classList.remove('zoomed');
			$(e).css({"transform-origin":"0 0 0", "-webkit-transform": "scale(1)", "position": "relative", "z-index": "0", "-webkit-transition": ".1s ease-out", "transition": ".1s ease-out"})
			ctx.clearRect(0, 0, e.width, e.height);
			ctx.drawImage(currImg, 0,0)	;
			break;
		
    }; //end switch   
};

function drawAll() {

  // Boucle à travers toutes les images
  // console.log(document.images.length);
  for (var i = 0; i < document.images.length; i++) {
      // Crée un élément canvas
      canvas = document.createElement('canvas');
      canvas.setAttribute('width', document.images[i].naturalWidth);
      canvas.setAttribute('height', document.images[i].naturalHeight);
      canvas.onclick = function () { singleClick(this)}

      // Insère avant l'image
      document.images[i].parentNode.insertBefore(canvas,document.images[i]);
      ctx = canvas.getContext('2d');
      // Dessine l'image sur canvas
      ctx.drawImage(document.images[i], 0, 0);
      // console.log('Done');
  	};
}

function computeScale(isRef) { // WIP 
	// Computes scaling factor to apply when zooming
	// The width on display after 
	var fracWidth = 0.3; // Target fraction of width after scale
	// The aim is to have a constant size after scale, no matter the window zoom
	var S = (fracWidth * $('html').innerWidth()) / 100;
	console.log(S);
	if (S >=1) {
		switch (isRef){
			case 0:
				return S;
				break;
			case 1:
				return S/2;
				break;
		}
	} else {
		return 1;
	}
};


function showMap(e) {
    // loads the table corresponding to user selection
	var Path = "HTML/";
	var mapToShow = document.getElementById("mapToDisplay");
    $("#includedContent").load(Path+"Table"+mapToShow.value+".html", function() {
    	Srcs = getSources();
    	promiseOfAllImages(Srcs)
    		.then(function() {
    			promiseOfAllLargeImages(Srcs);
    		})
    		.then(function () {
    			drawAll();
    		})
    } );
};

var promiseOfAllImages = function (Srcs) {
  // Wait until ALL images are loaded
  return Promise.all(
    Srcs.map(function (s) {
      // Load each tile, and "resolve" when done
      return new Promise(function (resolve) {
        var img = new Image();
        img.src = s;
        img.onload = function () {
          // Image has loaded... resolve the promise!
          resolve(img);
        };
      });
    })    
  );
};

var promiseOfAllLargeImages = function (Srcs) {
  // Wait until ALL images are loaded
  return Promise.all(
    Srcs.map(function (s) {
      // Load each tile, and "resolve" when done
      return new Promise(function (resolve) {
        var img = new Image();
        img.src = s.slice(0,-4)+"Large.png";;
        img.onload = function () {
          // Image has loaded... resolve the promise!
          resolve(img);
        };
      });
    })    
  );
};

function getSources() {
	var Imgs = document.images; 
	var imgSrcs = [];
	for (var i =0; i<Imgs.length; i++) {
  	imgSrcs.push(Imgs[i].src);
	}
	return imgSrcs
}