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

@app.route('/api/retailers/<retailer_id>/consumers/<card_number>')
def retailer_json(retailer_id,card_number):
	return {'Task': ['Orion', 'Melinda', 'Chris', 'Chuckwuma', 'Adrian', 'Karina'] }
