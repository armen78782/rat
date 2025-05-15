from flask import Flask, render_template
import datetime

app = Flask(__name__)
logs = []

@app.route('/log', methods=['POST'])
def log():
    content = request.json
    content['time'] = datetime.datetime.now().strftime('%H:%M:%S')
    logs.append(content)
    return 'OK'

@app.route('/panel')
def panel():
    return render_template('panel.html', logs=logs)
