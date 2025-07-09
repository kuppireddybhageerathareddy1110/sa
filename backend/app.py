from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from textblob import TextBlob
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

client = MongoClient(os.environ.get("MONGODB_URI"))
db = client['sentiment_db']
collection = db['sentiments']

@app.route("/")
def home():
    return "✅ Flask Sentiment API is running. Use POST /analyze and GET /results."

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()
        text = data.get("text", "").strip()

        if not text:
            return jsonify({"error": "Text is required"}), 400

        blob = TextBlob(text)
        polarity = blob.sentiment.polarity
        sentiment = "Positive" if polarity > 0 else "Negative" if polarity < 0 else "Neutral"

        result = {
            "text": text,
            "sentiment": sentiment,
            "polarity": polarity
        }

        inserted = collection.insert_one(result)
        result["_id"] = str(inserted.inserted_id)

        return jsonify({"results": [result]})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/results", methods=["GET"])
def results():
    docs = list(collection.find())
    for doc in docs:
        doc["_id"] = str(doc["_id"])
    return jsonify(docs)
