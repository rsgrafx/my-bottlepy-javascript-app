from bottle import Bottle
from bottle import (
    route, error, HTTPError, get, post, request, response, view, url,
    cookie_is_encoded, abort, debug
    )
from bottle import static_file as HTMLfile

app = Bottle()

@app.route('/')
def index():
  return HTMLfile('index.html', root='public/')

@app.route('/about')
def about():
	return HTMLfile('about.html', root='public/')

@app.route('/<filename:re:[a-z]+>')
def index(filename):
  assert filename.isalpha()
  try:
    open('public/' + filename +'.html')
    return HTMLfile((filename+'.html'), root='public/')
  except IOError as e:
    return HTMLfile('404.html', root='public/errors/')
    
@app.route('/javascripts/<filename>')
def serve_js(filename):
  return HTMLfile(filename, root='public/javascripts/')

@app.route('/stylesheets/<filename>')
def serve_stylesheets(filename):
  return HTMLfile(filename, root='public/stylesheets/')

@app.route('/javascripts/errors/<filename>')
def serve_error_js(filename):
  return HTMLfile(filename, root='public/javascripts/errors/')
