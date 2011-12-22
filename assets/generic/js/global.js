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

});
