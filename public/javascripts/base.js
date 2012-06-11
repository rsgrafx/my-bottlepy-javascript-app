AppBase = {
	DisplayTime: function(_div_element){
		var elt = document.getElementById(_div_element);
	  var now = new Date();
	  elt.innerHTML = now.toLocaleTimeString();
	  setTimeout(displayTime, 1000)
	},

	hide_reveal_div: function(_hide_div, _show_div){
		displayTime()
	 var elements  = document.getElementsByClassName(_div_element)
	 for(var i = 0; i < elements.length; i++) {
	    var elt = elements[i];
	    var title = elt.getElementsByClassName('handle')[0]

	    title.onclick = function() {
	      if (elt.className == _hide_div) elt.className = _show_div;
	      else if (elt.className == _show_div) elt.className = _hide_div
	      }
	    }
	},
}

// $('#realclock').html("hello real world");      
// 	if ( document.getElementById('realclock') ){
//   	$('#realclock').text("hello real world")
// }
// window.onload = function() {
//   App.popup('reveal', 'handle')
// }
