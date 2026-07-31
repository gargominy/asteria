from flask import Flask, jsonify, request, session, redirect
from flask_cors import CORS
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from db import DB
from response import api_success, api_error
from login import login_required


app = Flask(__name__)

CORS(app)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

db = DB("./asteria.db")

@app.route('/register', methods=["GET", "POST"])
def register():
    session.clear()

    if request.method == "POST":
        user = request.get_json()

        username = user.get("username")
        if not username:
            return api_error("Username not provided :(")

        password = user.get("password")
        if not password:
            return api_error("Password not provided :(")
        confirmation = user.get("confirmation")
        if not confirmation:
            return api_error("Confirmation not provided :(")

        if password != confirmation:
            return api_error("Password and confirmation don't match :(")

        fullname = user.get("fullname")
        age = user.get("age")

        try:
            db.execute(
                "INSERT INTO users (username, fullname, age, hash) VALUES (?, ?, ?, ?)",
                username,
                fullname if fullname else "GUEST",
                age if age else 0,
                generate_password_hash(password)
            )
        except (RuntimeError) as e:
            return api_error("This username is already taken")
        return api_success()
    return api_success()


@app.route('/login', methods=["GET", "POST"])
def login():
    session.clear()

    if request.method == "POST":
        current = request.get_json()
        username = current.get("username")
        if not username:
            return api_error("Username not provided :(")

        password = current.get("password")
        if not password:
            return api_error("Password not provided :(")

        user = db.execute(
            "SELECT * FROM users WHERE username = ?",
            username
        )
        if not user:
            return api_error("User isn't registered yet")
        user = user[0]

        if not check_password_hash(user["hash"], password):
            return  api_error("Invalid Password")

        session["user_id"] = user["id"]
        return api_success()
    return api_success()

@app.route('/logout', methods=["GET", "POST"])
@login_required
def logout():
    if request.method == "POST":
        session.clear()
        return api_success()
    return api_success()

@app.route('/', methods=['GET'])
@login_required
def index():
    return api_success({"message": "Welcome to Asteria"})

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello, from Flask!"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
