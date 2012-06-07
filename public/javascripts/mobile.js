(function($) {
/*---
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
---*/

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
				MOBILE_APP.loadPage(e.target.href, status)
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
		// $.mobile.loading('show')
		window.setTimeout(20000)
		// Will not allow * Access-Origin Error
		var data;

		$.get('http://orion-bottle.local/api/retailers/' + retailer_id + '/consumers/'+card_number , function(data){
			console.log(data)
			$('#base-content').html(data).listview()
			// $.mobile.loading('hide')
		});
		return data;
	},

	fetchMyTweets: function(){
		// $.mobile.loading('show')
		
		var page_tweet_list = $('#pageTweetList')

		var strUrl = "http://search.twitter.com/search.json?callback=?&rpp=";
		strUrl += page_tweet_list.data("rpp");
		strUrl += "&q=from:" + page_tweet_list.data("twitterUser");
		
		$.ajax({
			url: strUrl, // 'http://search.twitter.com/search.json?rpp=20&q=from:' + username ,
			dataType: 'jsonp',

		success: function(data) {
			page_tweet_list.find('.content').empty()
			page_tweet_list.find('.content').html('<ul></ul>')
			$list = page_tweet_list.find('.content ul')
			console.log(data)
			for (var i=0; i < data.results.length; i++) {
				var stringHtml = '<li class="tweet-text"><a href="#pageTweetDetail">';
				stringHtml += '<img src="' + data.results[i].profile_image_url+ '"/>';
				stringHtml += data.results[i].text;
				stringHtml += '</a></li>\n'
				var tweet = $(stringHtml);
				$list.append(tweet)
				$list.find('a:last').data("tweetJSON", JSON.stringify(data.results[i]))
			};
			$list.listview()
			// $.mobile.loading('hide')

			$list.find('a').click(function() {
				var $this = $(this);
				$('#pageTweetDetail').data("tweetJSON", $this.data('tweetJSON'))
			})

		},
		error: function() {
			var $page = ('#pageError .content')

			strHtml = '<h1> Update Failed</h1>'
			strHtml += '<p> Were unable to update the twitter feed</p>'
			
			$page.html(strHtml)
			$('#show-error-page').click()
			// $.mobile.loading('hide')
			}
		});
	},
}

})(jQuery);

(function($) {
	var methods={
		initMainPage: function(){
			var $page = $('#pageTweetList');
			$page.data("rpp", 20)
			$page.data('twitterUser', 'fijiczar')
			$page.data('boolUpdate', false)
			
			window.MOBILE_APP.fetchMyTweets()
			
			$page.bind('pageshow', function(event, ui){
				if($page.data("boolUpdate")) {
					window.MOBILE_APP.fetchMyTweets()
					$page.data('boolUpdate', false)
				}
			})
		},
		
		initSettingsPage: function(){
			var $page = $('#pageSettings')
			$datapage = $('#pageTweetList')
			
			$page.find('#username').change(function(){
				var newVal = $(this).val();
				$datapage.data('twitterUser', newVal)
				$datapage.data('boolUpdate', true)
			});
						
			$page.bind('pagebeforehide', function(event , ui){
				var sliderValue = $page.find('#slider').val()
				if ( parseInt(sliderValue, 10) != parseInt( $datapage.data('rpp'), 10)) {
					$datapage.data('rpp', sliderValue)
					$datapage.data('boolUpdate', true)
				}
			})
				
				$page.bind('pageshow', function(event, ui) {
					$page.find('#slider').val($datapage.data("rpp")).slider('refresh');
					$page.find('#username').val($datapage.data('twitterUser'))
				})
		},

		initDetailPage: function(){
			var $page = $('#pageTweetDetail')
			$page.bind( 'pageshow', function( event, ui ) {
				var objTweet = JSON.parse( $page.data('tweetJSON') );
				var strHtml = '<p><img src="' + objTweet.profile_image_url +'"/>'
				strHtml += objTweet.text + '</p>'
				$page.find('.container-tweet').html(strHtml)
			})
			
		},

		initAll: function(){
			$().initApp("initMainPage");
			$().initApp("initSettingsPage");
			$().initApp("initDetailPage");
		}
	}
	
	$.fn.initApp = function(method) {
		// if methods object contain * method name
		if (methods[method]) {
			return methods[ method ].apply( this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method ) {
			return methods.initAll.apply(this, arguments);
		} else {
			$.error( 'Method ' + method + ' does not exist');
		}
	}
})(jQuery);

(function($) {
	$.fn.initApp();
})(jQuery)
