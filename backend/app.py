from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "🚀 Performance Predictor Backend is Running"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        hours = float(data.get("hours", 0))
        days = float(data.get("days", 0))
        sleep = float(data.get("sleep", 0))
        assign = float(data.get("assign", 0))
        attend = float(data.get("attend", 0))

        hours_n = hours / 10
        days_n = days / 7
        sleep_n = sleep / 10
        assign_n = assign / 100
        attend_n = attend / 100

        prediction = (
            (hours_n * 30) +
            (days_n * 20) +
            (sleep_n * 10) +
            (assign_n * 20) +
            (attend_n * 20)
        )

        if sleep < 5:
            prediction -= 5

        if hours >= 5 and days >= 5:
            prediction += 17

        prediction = max(0, min(prediction, 100))

        return jsonify({
            "status": "success",
            "prediction": round(prediction, 2)
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        })

if __name__ == "__main__":
    app.run(debug=True)