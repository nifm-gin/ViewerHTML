function mouseEnter(e) {
	// Applies adaptative zoom when hovering on an image
	// If the image is not a reference, it is replaced by the 'large' image
	var fracWidth = 0.3; // Target fraction of width after scale
	// The aim is to have a constant size after scale, no matter the window zoom
	var currImg = document.getElementById(e.id); //Get current image
	if (currImg.width / $('html').innerWidth() >= fracWidth) { //WIP adapt scaling to the case where 'small' image is already larger that the target width
		var S = (0.5 * $('html').innerWidth()) / currImg.width;
	} else {
		var S = (fracWidth * $('html').innerWidth()) / currImg.width;
	}
	// Distinguish references and maps for scaling
	if (e.id.includes("Ref") != true) {
	    var newName = currImg.src.slice(0,-4)+"Large.png";
	    currImg.src = newName;
	    $(currImg).width('100');
	    $(currImg).height('64'); //Ratio (h/w) *100
	    $(currImg).css({"transform-origin":"0 0 0", "-webkit-transform": "scale("+S+")", "position": "relative", "z-index": "1", "-webkit-transition": ".1s ease-out", "transition": ".1s ease-out"})
    } else {
    	$(currImg).css({"transform-origin":"0 0 0", "-webkit-transform": "scale("+S/2+")", "position": "relative", "z-index": "1", "-webkit-transition": ".1s ease-out", "transition": ".1s ease-out"})
    }   
};

function mouseLeave(e) {
	// Restores original images and aspects
	var currImg = document.getElementById(e.id);
	if (e.id.includes("Ref") != true) {
		$(currImg).width(100);
    	$(currImg).height(129);
    	var nameShort = currImg.src.slice(0,-9);
    	currImg.src=nameShort+".png";

    }
	$(currImg).css({"transform-origin":"0 0 0", "-webkit-transform": "scale(1)", "position": "relative", "z-index": "0", "-webkit-transition": ".1s ease-out", "transition": ".1s ease-out"})
};
