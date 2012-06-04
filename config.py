import os
import sys
sys.path.append('lib')
from app_routes import app
Application = app

from bottle import run as RunApp
RunApp(app, host='localhost', port=8999, reloader=True)  