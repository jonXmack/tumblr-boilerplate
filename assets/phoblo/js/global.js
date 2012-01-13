// iframe resizer - if you're runnning a single column blog
// From http://blog.kamicrafted.com/post/14312661589/custom-width-for-tumblr-photosets

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
	var newSrc = $(this).attr("src").replace('500','830');
	// Replace 830 with your column width
	$(this).attr("src", newSrc);		
}); 

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
	document.getElementById(postId).href = "http://www.tumblr.com/reblog/" + vpid + "/" + vrk + "?redirect_to=http%3A%2F%2FYOURTUMBLRUSERNAME.tumblr.com%2F";
}

$(document).ready(function() {

	// Removes the font-face stylesheet once the google appended one is in to prevent duplication of styles in inspector
	$('link[title=font-face]').remove();
	
	// FancyBox
	$(".fancy").fancybox();

	var tagText = $('.tags li a').text();
	
/*
	var pageWidth = $('#wrapper').width();
	
	$('.meta .wrap').css('width',pageWidth);
	
	$('.post').hover(function(){
		$(this).children('.meta').css('width',pageWidth);
	},
	function(){
		$(this).children('.meta').css('width','34px');
	});
*/


});
