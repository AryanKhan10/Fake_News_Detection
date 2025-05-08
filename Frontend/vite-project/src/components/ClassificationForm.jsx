import React, { useState } from 'react';
import axios from 'axios';
import { AlertCircle, ArrowRight, Check, Loader2 } from 'lucide-react';

const ClassificationForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [textError, setTextError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    // Reset error states
    setTitleError("");
    setTextError("");
    setSuccess(false);

    // Validate inputs
    let isValid = true;

    if (!title.trim()) {
      setTitleError("Please enter a news title");
      isValid = false;
    }

    if (!text.trim()) {
      setTextError("Please enter news content");
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/predict", {
        title: title,
        text: text,
        model: "tfidf", // or "bert"
      });
      console.log(res.data);
      setResult(res.data.prediction);
      setSuccess(true);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setText("");
    setResult(null);
    setTitleError("");
    setTextError("");
  };

  return (
    <div id="classification-form" className="max-w-3xl w-full mx-auto bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 animate-slideUp">
      <h2 className="text-2xl font-bold text-center mb-2 text-white">News Classification</h2>
      <p className="text-gray-400 text-center mb-8">Enter a news article title and content to classify it</p>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-300 block">
            News Title <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              className={`w-full bg-gray-700 text-white p-3 rounded-lg border ${
                titleError ? "border-red-500" : "border-gray-600"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm`}
              placeholder="Enter a descriptive news title..."
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {titleError && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                <AlertCircle className="h-5 w-5" />
              </div>
            )}
          </div>
          {titleError && <p className="mt-1 text-red-400 text-sm font-medium">{titleError}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="newsText" className="text-sm font-medium text-gray-300 block">
            News Content <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <textarea
              id="newsText"
              placeholder="Enter the full news article text here..."
              className={`w-full bg-gray-700 text-white p-3 rounded-lg border ${
                textError ? "border-red-500" : "border-gray-600"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 min-h-[150px] shadow-sm`}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {textError && (
              <div className="absolute right-3 top-6 text-red-500">
                <AlertCircle className="h-5 w-5" />
              </div>
            )}
          </div>
          {textError && <p className="mt-1 text-red-400 text-sm font-medium">{textError}</p>}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            className={`px-6 py-3 rounded-lg font-medium cursor-pointer transition duration-200 shadow-lg flex items-center justify-center ${
              loading 
                ? "bg-gray-600 cursor-not-allowed" 
                : success 
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Processing...
              </span>
            ) : success ? (
              <span className="flex items-center">
                <Check className="mr-2 h-5 w-5" />
                Classified!
              </span>
            ) : (
              <span className="flex items-center">
                Classify News
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            )}
          </button>
          
          {(title || text || result) && (
            <button
              className="px-6 py-3 rounded-lg font-medium cursor-pointer transition duration-200 bg-gray-700 hover:bg-gray-600 text-gray-300"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </div>

        {result && (
          <div className="mt-8 p-6 bg-gray-700 rounded-lg border border-gray-600 shadow-inner animate-fadeIn">
            <h2 className="text-lg font-medium text-gray-300 mb-4">Classification Result</h2>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-400">{result}</span>
              <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-xs font-medium">Prediction</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              This classification is based on the content analysis using our machine learning algorithm.
              The model identified patterns in your text that match this category.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This tool uses machine learning to classify news articles into predefined categories.</p>
        <p className="mt-1">The classification helps organize news content for better understanding and analysis.</p>
      </div>
    </div>
  );
};

export default ClassificationForm;