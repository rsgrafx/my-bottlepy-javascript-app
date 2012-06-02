 _user_url = 'user-block'
 
 function loadBlocks(css_javascript_url) {
     var head = document.getElementsByTagName('head')[0]
     var _script = document.createElement('script')
     _script.src = 'javascripts/' + css_javascript_url + '.js'
     head.appendChild(_script);
 }

function check_and_load_if_block_id_exists(block_id) {
  if (document.getElementById(block_id)) {
    loadBlocks(block_id);
  }
}

// check_and_load_if_block_id_exists(_user_url)
// check_and_load_if_block_id_exists('posts')

function urlArguments() {
  var args = {}
  
  var my_javascripts = new Array()
  
  var query = location.search.substring(1)
  // var pairs = query.split('&')
  var pairs = query.split('&')
  for (var i = 0; i < pairs.length; i++ ) {
    var pos = pairs[i].indexOf('=');
    if (pos == -1) continue;
    var name = pairs[i].substring(0, pos);
    my_javascripts.push(name)
    var value = pairs[i].substring(pos+1);
    
    value = decodeURIComponent(value)
    args[name]  = value
  
  }
  var results = {}

  results.params = args
  results.script_names = my_javascripts
  return results
}

results = urlArguments()
console.log(results)

// all_args = results.params
// document.write('<h1>' + all_args['item'] + '</h1>');  

for(var i = 0; i < results.script_names.length; i++) {
  document.write('<h1>' + results.script_names[i] + '</h1>');  
  check_and_load_if_block_id_exists(results.script_names[i])
}
