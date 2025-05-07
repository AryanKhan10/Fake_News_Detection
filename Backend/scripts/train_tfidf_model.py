import os
import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# Ensure directories exist
os.makedirs("../models", exist_ok=True)

# Load datasets
fake_df = pd.read_csv("../data/Fake.csv")
true_df = pd.read_csv("../data/True.csv")

# Add labels
fake_df["label"] = 0  # Fake
true_df["label"] = 1  # Real

# Combine datasets
df = pd.concat([fake_df, true_df], ignore_index=True)

# Combine title and text columns into a single feature
df["combined_text"] = df["title"].fillna("") + " " + df["text"].fillna("")

# Vectorize using TF-IDF
vectorizer = TfidfVectorizer(stop_words="english", max_df=0.7)
X = vectorizer.fit_transform(df["combined_text"])
y = df["label"]

# Split for evaluation (optional)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train classifier
model = LogisticRegression()
model.fit(X_train, y_train)

# Save vectorizer
with open("../models/tfidf_vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

# Save model
with open("../models/fake_news_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ TF-IDF vectorizer and fake news model saved successfully!")
