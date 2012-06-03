# Change working directory so relative paths (and template lookup) work again

import os
os.chdir(os.path.dirname(__file__))
import bottle

# from config import Application
import sys
sys.path.append('lib')

from app_routes import app
Application = app

application = Application