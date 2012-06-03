window.onload = function() {
 displayTime()
 var elements  = document.getElementsByClassName("reveal")
 for(var i = 0; i < elements.length; i++) {
    var elt = elements[i];
    var title = elt.getElementsByClassName('handle')[0]

    title.onclick = function() {
      if (elt.className == 'reveal') elt.className = 'revealed';
      else if (elt.className == 'revealed') elt.className = 'reveal'
      }
    }
  }

function displayTime() {
  var elt = document.getElementById('clock');
  var now = new Date();
  elt.innerHTML = now.toLocaleTimeString();
  setTimeout(displayTime, 1000)
}

$('#realclock').html("hello real world");      
if ( document.getElementById('realclock') ){
  $('#realclock').text("hello real world")
}
// window.onload = function() {
//   App.popup('reveal', 'handle')
// }
