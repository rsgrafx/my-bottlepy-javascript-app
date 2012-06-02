import os as FileCheck

from bottle import Bottle
from bottle import (
    route, error, HTTPError, get, post, request, response, view, url,
    cookie_is_encoded, abort, debug
    )
from bottle import static_file as HTMLfile
from bottle import run as RunApp

app = Bottle()

@error(404)
def error404(error):
  return app.HTTPError(404, "Sorry Not working")
#   return HTMLfile('404.js', root='public/javascripts/errors/')

# @route('/error')
# def error():
#   return HTMLfile('error.html', root='public/')
#   # return HTMLfile('404.js', root='public/javascripts/errors/')

@app.route('/')
def index():
  return HTMLfile('index.html', root='public/')


@app.route('/<filename:re:[a-z]+>')
def index(filename):
  assert filename.isalpha()
  try:
    open('public/' + filename +'.html')
    return HTMLfile((filename+'.html'), root='public/')
  except IOError as e:
    response.set_header('Content-Type', 'application/voodoscript')
    return HTMLfile('404.js', root='public/javascripts/errors/')
    
  # try:
  #   if HTMLfile((filename+'.html'), root='public/'):
  #     return HTMLfile((filename+'.html'), root='public/')
  # except HTTPError:
  #   return HTMLfile('index.html', root='public/')


@app.route('/javascripts/<filename>')
def serve_js(filename):
  return HTMLfile(filename, root='public/javascripts/')

@app.route('/stylesheets/<filename>')
def serve_js(filename):
  return HTMLfile(filename, root='public/stylesheets/')

@app.route('/javascripts/errors/<filename>')
def serve_error_js(filename):
  return HTMLfile(filename, root='public/javascripts/errors/')

RunApp(app, host='localhost', port=8999, reloader=True)  