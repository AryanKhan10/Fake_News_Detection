from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Load vectorizer and model
with open("models/tfidf_vectorizer.pkl", "rb") as f:
    vectorizer: TfidfVectorizer = pickle.load(f)

with open("models/fake_news_model.pkl", "rb") as f:
    model: LogisticRegression = pickle.load(f)

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

    combined_text = title + " " + text
    vectorized_input = vectorizer.transform([combined_text])
    prediction = model.predict(vectorized_input)[0]

    return jsonify({
        'prediction': 'Fake' if prediction == 0 else 'Real'
    })

if __name__ == '__main__':
    app.run(debug=True)
