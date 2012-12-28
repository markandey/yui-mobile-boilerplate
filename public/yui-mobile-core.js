YUI.add('yui3-mobile-core', function(Y) {
		
		var scrollview = new Y.ScrollView({
	        srcNode:"#content",
	        height:"400px"
	    });
	    scrollview.render();
	    Y.mobileContainerView=scrollview;
	    
	    setTimeout(function () {
	      window.scrollTo(0, 1);
	    }, 1000);

}, '0.0.0', {
    requires: ['scrollview']
});
