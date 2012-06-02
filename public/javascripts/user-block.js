$('#user-block').html("<h1> This is THE USERS BLOCK</h1><div class='child-block'>Child Block</div>");

_factorial_html = ''
  // Stuff to do as soon as the DOM is ready;
  function factorial(_var) {
    if (_var <= 1) return _var;
    else return _var * factorial(_var-1);
  }  
  // document.write('<div class="factorial">')
  // document.write('<p> Hello Factorial</p>')
  for(var i = 1; i <= 5; i++ ) {
    // _factorial_html += document.write('<h1> More Factorials</h1>' + factorial(i))
    _factorial_html += '<h1> More Factorials</h1>' + factorial(i)
    console.log(factorial(i))
  }
  // document.write('</div>')
  // document.write("Generated at:" + new Date())
  
$('#factorial').html(_factorial_html);