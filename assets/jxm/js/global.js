// iFrame resizer

$(function(){
	var iFrames = $('.photoset');
	
	function iResize() {
		for (var i = 0, j = iFrames.length; i < j; i++) {
			iFrames[i].style.height = iFrames[i].contentWindow.document.body.offsetHeight + 'px';
		}
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

setTimeout(function(){
	if ((screen.width == 320) && (screen.height == 480)) {
	  	if ((window.orientation == 0) || (window.orientation == 180)) {
			$(".photoset").each(function() { 
				var newSrc = $(this).attr("src").replace('500','270');
				// Replace 830 with your column width
				$(this).attr("src", newSrc);		
			}); 
		}
	  	else if ((window.orientation == 90) || (window.orientation == -90)) {
			$(".photoset").each(function() { 
				var newSrc = $(this).attr("src").replace('500','430');
				// Replace 830 with your column width
				$(this).attr("src", newSrc);		
			}); 
		}

	}
}, 100);

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

// Lazy Load

/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2011 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.6.0
 *
 */
(function(a){a.fn.lazyload=function(b){var c={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:window,skip_invisible:!0};b&&(null!==b.failurelimit&&(b.failure_limit=b.failurelimit,delete b.failurelimit),a.extend(c,b));var d=this;return 0==c.event.indexOf("scroll")&&a(c.container).bind(c.event,function(b){var e=0;d.each(function(){if(c.skip_invisible&&!a(this).is(":visible"))return;if(!a.abovethetop(this,c)&&!a.leftofbegin(this,c))if(!a.belowthefold(this,c)&&!a.rightoffold(this,c))a(this).trigger("appear");else if(++e>c.failure_limit)return!1});var f=a.grep(d,function(a){return!a.loaded});d=a(f)}),this.each(function(){var b=this;b.loaded=!1,a(b).one("appear",function(){this.loaded||a("<img />").bind("load",function(){a(b).hide().attr("src",a(b).data("original"))[c.effect](c.effectspeed),b.loaded=!0}).attr("src",a(b).data("original"))}),0!=c.event.indexOf("scroll")&&a(b).bind(c.event,function(c){b.loaded||a(b).trigger("appear")})}),a(c.container).trigger(c.event),this},a.belowthefold=function(b,c){if(c.container===undefined||c.container===window)var d=a(window).height()+a(window).scrollTop();else var d=a(c.container).offset().top+a(c.container).height();return d<=a(b).offset().top-c.threshold},a.rightoffold=function(b,c){if(c.container===undefined||c.container===window)var d=a(window).width()+a(window).scrollLeft();else var d=a(c.container).offset().left+a(c.container).width();return d<=a(b).offset().left-c.threshold},a.abovethetop=function(b,c){if(c.container===undefined||c.container===window)var d=a(window).scrollTop();else var d=a(c.container).offset().top;return d>=a(b).offset().top+c.threshold+a(b).height()},a.leftofbegin=function(b,c){if(c.container===undefined||c.container===window)var d=a(window).scrollLeft();else var d=a(c.container).offset().left;return d>=a(b).offset().left+c.threshold+a(b).width()},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0,container:window})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0,container:window})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0,container:window})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0,container:window})}})})(jQuery)


// ScrollTo

/**  * jQuery.ScrollTo - Easy element scrolling using jQuery.  * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com  * Dual licensed under MIT and GPL.  * Date: 5/25/2009  * @author Ariel Flesler  * @version 1.4.2  *  * http://flesler.blogspot.com/2007/10/jqueryscrollto.html  */ ;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

function scroll(direction) {
    var scroll, i, positions = [],
        here = $(window).scrollTop(),
        collection = $('.post');

    collection.each(function () {
        positions.push(parseInt($(this).offset()['top'], 10));
    });
    for (i = 0; i < positions.length; i++) {
        if (direction == 'next' && positions[i] > here) {
            scroll = collection.get(i);
            break;
        }
        if (direction == 'prev' && i > 0 && positions[i] >= here) {
            scroll = collection.get(i - 1);
            break;
        }
    }
    if (scroll) {
        $.scrollTo(scroll, {
            duration: 750
        });
    }
    return false;
}

$(document).ready(function() {


	// Removes the font-face stylesheet once the google appended one is in to prevent duplication of styles in inspector
		$('link[title=font-face]').remove();

	// FitText
		$("#logo").fitText(0.372);
	
	// Pinned nav
		var bar = $('#header');

		bar.addClass('main');
		bar.clone().appendTo('#wrapper').removeClass('main').addClass('pinned');

		var pin = $('#header.pinned');

		pin.find('#logo').addClass('mini-logo');

	    var pos = pin.css('bottom');

		$(window).scroll(function() {
			if($(this).scrollTop() > 450) {
				pin.stop().animate({'bottom' : '0px'}, 500);
				$(".mini-logo").fitText(0.372);
			} else {
				pin.stop().animate({'bottom' : pos}, 500);
				$(".mini-logo").fitText(0.372);
			}
		});
	
		// Pinned nav li width
			var pNavElements	= $('.pinned nav li').length;
			var pContainerWidth	= parseInt(100) - parseInt(pNavElements);
			var pFinalWidth		= parseInt(pContainerWidth) / parseInt(pNavElements);

			$('.pinned nav li').css('width',pFinalWidth + '%');
	
		// Pinned nav text to title
			pin.find('nav li a').each(function() {
				var elemTxt = $(this).text();
				$(this).attr('title', elemTxt);		
			});
	//END Pinned Nav
	
	// Main nav li width
		var navElements		= $('.main nav li').length;
		var containerWidth	= parseInt(100) - parseInt(navElements);
		var finalWidth		= parseInt(containerWidth) / parseInt(navElements);

		$('.main nav li').css('width',finalWidth + '%');

	// Arrow next/prev
		$(window).keydown (function(event) {
	        switch (event.keyCode) {
	            case 37: // key is left
	                scroll ('prev');
	                break;
	            case 39: // key is right
	                scroll ('next');
	                break;
	        }
		});


});
