import sys
from bottle import Bottle
from bottle import (
    route, error, HTTPError, get, post, request, response, view, url,
    cookie_is_encoded, abort, debug
    )
from bottle import static_file as HTMLfile

import os.path
sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))

from app_routes import app

@app.route('/')
def index():
  return HTMLfile('index.html', root='public/')

@app.route('/about')
def about():
	return HTMLfile('about.html', root='public/')

@app.route('/main')
def about():
	return HTMLfile('main.html', root='public/')

@app.route('/bio')
def biography():
	return HTMLfile('about.html', root='public/')

@app.route('/mytweets')
def biography():
	return HTMLfile('tweets.html', root='public/')

@app.route('<filename:re:[a-z]+>')
@app.route('/<filename:re:[a-z]+>')
def index(filename):
  assert filename.isalpha()
  try:
    open('public/' + filename +'.html')
    return HTMLfile((filename+'.html'), root='public/')
  except IOError as e:
    return HTMLfile('404.html', root='public/errors/')
