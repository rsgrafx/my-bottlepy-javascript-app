import os as FileCheck
import sys
sys.path.append('lib')

import app_routes
from app_routes import app
from bottle import run as RunApp

RunApp(app, host='localhost', port=8999, reloader=True)  