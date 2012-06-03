if(window.innerWidth && window.innerWidth <= 480) {
	$(document).ready(function() {
		$('header ul').addClass('hide');
		$('header').append('<div class="homeButton" onclick="toggleMenu()">Home</div>');
	});
	
	function toggleMenu() {
		$('header ul').toggleClass('hide');
		$('header .homeButton').toggleClass('pressed')
	}
}

window.MOBILE_APP = {
	siteName: 'orion-bottle.local',	
	targetDiv: $('#container') ,
	
	loadPage: function(url, status){

		$('body').append('<div id="progress">Loading...</div>')
		scrollTo(0,0)
		if (url == undefined) {
			$('#base-content').load('/ #content', this.HighJackLinks )
		} else if (status == 'error') {
			$('#base-content').load('/ #content', this.HighJackLinks )
		} else {
			$('#base-content').load(url + ' #content', this.HighJackLinks)
		}
	},
	HighJackLinks: function(response, status, xhr){
		console.log(status);
		console.log(xhr);
		$('#container a').click(function(e) {
			var url = e.target.href;
			
			console.log(this.siteName)
			
			if (url.match("/" + MOBILE_APP.siteName + "/")) {
				e.preventDefault();
				window.MOBILE_APP.loadPage(e.target.href, status)
		}
		})
		var title = $('h2').html() || 'Hello and Welcome!'
		$('h1').html(title)
		$('h2').remove()
		$('#progress').remove()
	},
}

$(document).ready(function(){
	MOBILE_APP.loadPage();
})