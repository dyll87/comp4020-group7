from flask import Blueprint, render_template, current_app

bp = Blueprint('main', __name__)  # Create a Blueprint



@bp.route('/')
def home():
    print("blueprint loaded!")
    return render_template("index.html")


@bp.route('/test', methods = ["POST"])
def testFunc():  
    return current_app.a

@bp.route('/buttonPress/<var>', methods = ["POST"])
def buttonPress(var):
    current_app.a.append(var)
    return [f"Button Pressed {var}",]