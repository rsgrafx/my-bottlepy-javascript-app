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