// var OriginalWidth = document.getElementById('A0Ref').naturalWidth;
// var OriginalHeight = document.getElementById('A0Ref').naturalHeight;

function singleClick(e) {

	// Applies adaptative zoom when clicking on an image
	// If the image is not a reference, it is replaced by the 'large' image

	var currImg = document.getElementById(e.id); //Get current image

	switch (currImg.classList.contains("zoomed")){

		case false:	
			currImg.classList.add('zoomed');
			var fracWidth = 0.3; // Target fraction of width after scale
			// The aim is to have a constant size after scale, no matter the window zoom

			if (currImg.width / $('html').innerWidth() >= fracWidth) { //WIP adapt scaling to the case where 'small' image is already larger that the target width
				var S = (0.5 * $('html').innerWidth()) / currImg.width;
			} else {
				var S = (fracWidth * $('html').innerWidth()) / currImg.width;
			};

			// Distinguish references and maps for scaling
			if (e.id.includes("Ref") != true) {
			    var newName = currImg.src.slice(0,-4)+"Large.png";
			    currImg.src = newName;
			    $(currImg).width('100');
			    $(currImg).height('64'); //Ratio (h/w) *100
			    $(currImg).css({"transform-origin":"0 0 0", "-webkit-transform": "scale("+S+")", "position": "relative", "z-index": "1", "-webkit-transition": ".1s ease-out", "transition": ".1s ease-out"})
		    } else {
		    	$(currImg).css({"transform-origin":"0 0 0", "-webkit-transform": "scale("+S/2+")", "position": "relative", "z-index": "1", "-webkit-transition": ".1s ease-out", "transition": ".1s ease-out"})
		    };

		    break;

		case true:

			if (e.id.includes("Ref") != true) {
			$(currImg).width(100);
	    	$(currImg).height(129);
	    	var nameShort = currImg.src.slice(0,-9);
	    	currImg.src=nameShort+".png";
		    }

			$(currImg).css({"transform-origin":"0 0 0", "-webkit-transform": "scale(1)", "position": "relative", "z-index": "0", "-webkit-transition": ".1s ease-out", "transition": ".1s ease-out"})
			currImg.classList.remove('zoomed');
			
			break;
    }; //end switch   
};

function showMap(e) {
    // loads the table corresponding to user selection
	var Path = "HTML/";
	var mapToShow = document.getElementById("mapToDisplay");
    $("#includedContent").load(Path+"Table"+mapToShow.value+".html");
};
