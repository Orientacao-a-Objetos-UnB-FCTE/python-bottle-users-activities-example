from bottle import Bottle
from controllers.user_controller import user_routes
from controllers.activity_controller import activity_routes

def init_controllers(app: Bottle):
    app.merge(user_routes)
    app.merge(activity_routes)
