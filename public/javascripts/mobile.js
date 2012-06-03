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
	targetDiv: $('#container') ,
	
	loadPage: function(url, status){

		$('body').append('<div id="progress">Loading...</div>')
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
		$('#progress').remove()
		$('#container a').click(function(e) {
			e.preventDefault();
			window.MOBILE_APP.loadPage(e.target.href, status)
		})
		
	},
}

$(document).ready(function(){
	MOBILE_APP.loadPage();
})