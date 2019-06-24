var W = 100;
var A0Ref = document.getElementById("T1Pink") ;

function mouseEnter(e) {
	var currImg = document.getElementById(e.id)
    var newName = currImg.src.slice(0,-4)+"Sprite.png";
    currImg.src = newName;
    $(currImg).css({"transform-origin":"0 0 0", "-webkit-transform": "scale(3)", "position": "relative", "z-index": "1", "-webkit-transition": ".1s ease-out", "transition": ".1s ease-out"})
}

function mouseLeave(e) {
	var currImg = document.getElementById(e.id)
    var nameShort = currImg.src.slice(0,-10);
	$(currImg).css({"-webkit-transition": "0s ease-out", "transition": "0s ease-out", "transform-origin":"0 0 0", "-webkit-transform": "scale(1)", "position": "relative", "z-index": "0"/*, "-webkit-transition": "2s ease-in-out", "transition": "2s ease"*/})
    currImg.src=nameShort+".png";
    
}
