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
			$('#base-content').load('/ #base-content', this.HighJackLinks )
		} else if (status == 'error') {
			$('#base-content').load('/ #base-content', this.HighJackLinks )
		} else {
			$('#base-content').load(url + ' #base-content', this.HighJackLinks)
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
	
	PageHistory: [],
	startUrl: 'index.html',
	
	LoadSetupPages: function(url){
		$('body').append('<div id="progresss"> Loading..</div>')
		scrollTo(0,0)
		if (url == this.startUrl) {
			var element = ' header ul'
		} else {
			var element = ' #content'
		}
		$('#base-content').load(url+element, function(){
				var title = $('h2').html() || "Hello and Welcome";
				$('h1').html(title)
				$('h2').remove()
				$('.leftButton').remove()
				this.PageHistory.unshift({'url': url, 'title':title})
				if (this.PageHistory > 1) {
					$('header').append('<div class="leftButton"' + this.PageHistory[1].title + '</div>')
					$('header .leftButton').click(function() {
						var thisPage = this.PageHistory.shift()
						var previousPage = this.PageHistory.shift()
						MOBILE_APP.loadPage(previousPage.url)
					});
				}
		});
		
		$('#container a').click(function(e) {
			var url = e.target.href;
			if (url.match('/'+this.siteName+'/'))
			e.preventDefault()
			this.loadPage(url)
		})
		$('#progress').remove()
	},
	loadUserObject: function(retailer_id, card_number){
		$.mobile.showPageLoadingMsg()
		window.setTimeout(20000)
		// Will not allow * Access-Origin Error
		var data;

		$.get('http://orion-bottle.local/api/retailers/' + retailer_id + '/consumers/'+card_number , function(data){
			console.log(data)
			$('#base-content').html(data).listview()
			$.mobile.hidePageLoadingMsg()
		});
		return data;
	},
}


$(document).ready(function(){
	// MOBILE_APP.loadPage();
})