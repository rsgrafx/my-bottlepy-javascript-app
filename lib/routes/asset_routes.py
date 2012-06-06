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

@app.route('/javascripts/includes/<filename>')

def serve_js_includes(filename):
  return HTMLfile(filename, root='public/javascripts/includes/')    

@app.route('/javascripts/<filename>')
def serve_js(filename):
  return HTMLfile(filename, root='public/javascripts/')

@app.route('/images/<filename>')
def serve_images(filename):
  return HTMLfile(filename, root='public/images')

@app.route('/images/icons/<filename>')
def serve_icon_images(filename):
  return HTMLfile(filename, root='public/images/icons/')

@app.route('/stylesheets/<filename>')
def serve_stylesheets(filename):
  return HTMLfile(filename, root='public/stylesheets/')

@app.route('/javascripts/errors/<filename>')
def serve_error_js(filename):
  return HTMLfile(filename, root='public/javascripts/errors/')
