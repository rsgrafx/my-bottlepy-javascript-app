from bottle import Bottle
from bottle import (
    route, error, HTTPError, get, post, request, response, view, url,
    cookie_is_encoded, abort, debug
    )
from bottle import static_file as HTMLfile

app = Bottle()

import sys
sys.path.append('routes')

import routes.page_routes
import routes.asset_routes
import routes.json_api
