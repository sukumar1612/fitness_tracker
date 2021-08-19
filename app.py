from flask import Flask, render_template, request, make_response, redirect, Response
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_restful import Api, Resource

from models.user_model import User
from services.mongo_wrapper import MongoDatabase

app = Flask(__name__, static_url_path='/static')
api = Api(app)
app.secret_key = 'a24aca7a4e1686c098b34309624341f38f4c2b7f6d4fe48e1543ea62843e65fb'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

database = MongoDatabase()

locations = [
    [18.595948, 73.784044],
    [18.596356, 73.784002],
    [18.596855, 73.784024],
    [18.597220, 73.784302],
    [18.597176, 73.784826],
    [18.597166, 73.785373],
    [18.596605, 73.785523],
    [18.596309, 73.785458],
    [18.595902, 73.785361],
    [18.595926, 73.784714]
]
locations1 = [locations[0:i] for i in range(1, len(locations))]
data1 = {"location_data": locations1,
         "total_time": "hello",
         "walking": 0,
         "running": 0}


class Home(Resource):
    @login_required
    def get(self):
        #print(current_user.get_id())
        html_headers = {'Content-Type': 'text/html'}
        return make_response(render_template('index.html'), 200, html_headers)


@login_manager.user_loader
def load_user(email):
    return User(email)


# somewhere to login
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if database.authenticate(user_email=email, password=password):
            print("__________________authenticated__________________")
            user = User(email)
            login_user(user)
            return redirect("/")
        else:
            return {"message": "incorrect username/password"}
    else:
        return Response('''
        <form action="" method="post">
            <p><input type=text name=email>
            <p><input type=password name=password>
            <p><input type=submit value=Login>
        </form>
        ''')


class DisplayUserData(Resource):
    @login_required
    def get(self):
        html_headers = {'Content-Type': 'text/html'}
        return make_response(render_template('geo_location.html'), 200, html_headers)

    @login_required
    def post(self):
        #print(request.get_json())
        return data1


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/login")


api.add_resource(DisplayUserData, "/display-user-data/")
api.add_resource(Home, "/")

if __name__ == '__main__':
    app.run(host="0.0.0.0")
