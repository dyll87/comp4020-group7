from flask import Flask, render_template, request
from routes import main
import webbrowser

app = Flask(__name__)

app.a = list()
app.a.append("apple")
app.a.append("orange")

# Register blueprints
app.register_blueprint(main.bp)


if __name__ == '__main__':
    app.run(debug=True, port=4020, host = '0.0.0.0')


