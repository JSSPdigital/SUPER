from flask import Flask, request, jsonify
from flask_socketio import SocketIO
import os

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def home():
    return jsonify({"status": "Backend online"})

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    return jsonify({"reply": f"Simulação de resposta para: {data.get('message')}"}), 200

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
