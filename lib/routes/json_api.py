import sys, datetime
import simplejson as json
from bottle import Bottle
from bottle import (
    route, error, HTTPError, get, post, request, response, view, url,
    cookie_is_encoded, abort, debug
    )

from bottle import static_file as HTMLfile

import os.path
sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))

from app_routes import app, DBConnection
from json_plugin import JSONAPIPlugin

connection = DBConnection.Plugin('root', '', 'tony_gaskins_development')
app.install(connection)
app.install(JSONAPIPlugin())

# @app.route('/api/retailers/<retailer_id>/consumers/<card_number>')

@app.route('/api/events/<item>')

def retailer_json(item, db):
	dthandler = lambda obj: obj.isoformat() if isinstance(obj, datetime.datetime) else None
	response.content_type = 'application/json; charset=utf-8'
	db.execute('SELECT * from events')
	rows = db.fetchall()
	return json.dumps( [{'results' : rows }] , default=dthandler)
	
