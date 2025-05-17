from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

from transformers import pipeline

# Load vectorizer and model
with open("models/tfidf_vectorizer.pkl", "rb") as f:
    vectorizer: TfidfVectorizer = pickle.load(f)

with open("models/fake_news_model.pkl", "rb") as f:
    model: LogisticRegression = pickle.load(f)

# Load BERT model using HuggingFace pipeline
bert_model = pipeline("text-classification", model="mrm8488/bert-tiny-finetuned-fake-news")

# Initialize Flask app
app = Flask(__name__)

CORS(app)  # Enable CORS for all routes

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    if not data or 'title' not in data or 'text' not in data:
        return jsonify({'error': 'Missing title or text'}), 400

    title = data['title']
    text = data['text']
    selected_model = data.get('model', 'tfidf')  # default to tfidf

    combined_text = title + " " + text

    if selected_model == 'bert':
        result = bert_model(combined_text)[0]
        label = result['label']
        # Normalize output
        prediction = 'Real' if label.upper() == 'REAL' else 'Fake'
    else:
        vectorized_input = vectorizer.transform([combined_text])
        pred = model.predict(vectorized_input)[0]
        prediction = 'Fake' if pred == 0 else 'Real'

    return jsonify({
        'prediction': prediction
    })

if __name__ == '__main__':
    app.run(debug=True)
