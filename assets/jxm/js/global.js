// iframe resizer - if you're runnning a single column blog
// From http://blog.kamicrafted.com/post/14312661589/custom-width-for-tumblr-photosets

/*
$(function(){
var iFrames = $('.photoset');
function iResize() {
	for (var i = 0, j = iFrames.length; i < j; i++) {
		iFrames[i].style.height = iFrames[i].contentWindow.document.body.offsetHeight + 'px';}
	}
	
	if ($.browser.safari || $.browser.opera) { 
		iFrames.load(function(){
			setTimeout(iResize, 0);	
		});
		
		for (var i = 0, j = iFrames.length; i < j; i++) {
			var iSource = iFrames[i].src;
			iFrames[i].src = '';
			iFrames[i].src = iSource;
		}
	} else {
		iFrames.load(function() {
			this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
		});
	}
});

$(".photoset").each(function() { 
	var newSrc = $(this).attr("src").replace('500','750');
	// Replace 830 with your column width
	$(this).attr("src", newSrc);		
}); 
*/

// reblog tool

function GETReblogLink(postId) {

	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlHttp=new XMLHttpRequest();
	}
	else {// code for IE6, IE5
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlHttp.open("GET", document.getElementById(postId).href, false);
	xmlHttp.send();
	
		var str = xmlHttp.responseText;
	
	str = str.slice(str.lastIndexOf("BEGIN TUMBLR CODE"), str.lastIndexOf("END TUMBLR CODE"));
	vpid = str.substring(str.search("pid=") + 4, str.search("pid=") + 4 + str.substring(str.search("pid=") + 4).search("&"));
	vrk = str.substring(str.search("rk=") + 3, str.search("rk=") + 3 + str.substring(str.search("rk=") + 3).search("&"));
	document.getElementById(postId).href = "http://www.tumblr.com/reblog/" + vpid + "/" + vrk + "?redirect_to=http%3A%2F%2Fjonxmack.co.uk%2F";
}

// Fit text

/*global jQuery */
/*!	
* FitText.js 1.0
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){
	
	$.fn.fitText = function( kompressor, options ) {
	    
	    var settings = {
        'minFontSize' : Number.NEGATIVE_INFINITY,
        'maxFontSize' : Number.POSITIVE_INFINITY
      };
	
			return this.each(function(){
				var $this = $(this);              // store the object
				var compressor = kompressor || 1; // set the compressor
        
        if ( options ) { 
          $.extend( settings, options );
        }
        
        // Resizer() resizes items based on the object width divided by the compressor * 10
				var resizer = function () {
					$this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
				};

				// Call once to set.
				resizer();
				
				// Call on resize. Opera debounces their resize by default. 
      	$(window).resize(resizer);
      	
			});

	};

})( jQuery );


$(document).ready(function() {

	// Removes the font-face stylesheet once the google appended one is in to prevent duplication of styles in inspector
	$('link[title=font-face]').remove();

	$("#logo").fitText(0.343);
	
	var navElements 			= $('nav li').length;
	var	containerWidth			= parseInt(100) - parseInt(navElements);
	var	finalWidth 				= parseInt(containerWidth) / parseInt(navElements);
	
	$('nav li').css('width',finalWidth + '%');


});
