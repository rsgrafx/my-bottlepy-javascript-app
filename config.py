import os
import sys
import simplejson
sys.path.append('lib')
from app_routes import app
Application = app

#  If you don't have the  ApacheWSGI python module running simply uncomment the lines below. Ignore the server.wsgi file

from bottle import run as RunApp
RunApp(app, host='localhost', port=8999, reloader=True)  