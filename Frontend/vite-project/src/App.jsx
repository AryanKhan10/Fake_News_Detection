import { useState } from "react"
import "./App.css"
import axios from "axios"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import QrCode from "./QrCode"
import QrReader from "./QrReader"
function App() {
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [titleError, setTitleError] = useState("")
  const [textError, setTextError] = useState("")

  const handleSubmit = async () => {
    // Reset error states
    setTitleError("")
    setTextError("")

    // Validate inputs
    let isValid = true

    if (!title.trim()) {
      setTitleError("Please enter a news title")
      isValid = false
    }

    if (!text.trim()) {
      setTextError("Please enter news content")
      isValid = false
    }

    if (!isValid) return

    setLoading(true)
    try {
      const res = await axios.post("http://localhost:5000/predict", {
        title: title,
        text: text,
        model: "tfidf", // or "bert"
      })
      console.log(res.data)
      setResult(res.data.prediction)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      
    
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">News Classification</h1>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-300 block">
              News Title
            </label>
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
            {titleError && <p className="mt-1 text-red-400 text-sm font-medium">{titleError}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="newsText" className="text-sm font-medium text-gray-300 block">
              News Content
            </label>
            <textarea
              id="newsText"
              placeholder="Enter the full news article text here..."
              className={`w-full bg-gray-700 text-white p-3 rounded-lg border ${
                textError ? "border-red-500" : "border-gray-600"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 min-h-[150px] shadow-sm`}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {textError && <p className="mt-1 text-red-400 text-sm font-medium">{textError}</p>}
          </div>

          <div className="flex justify-center mt-6">
            <button
              className={`px-6 py-3 rounded-lg font-medium cursor-pointer transition duration-200 shadow-lg ${
                loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              }`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Classify News"
              )}
            </button>
          </div>

          {result && (
            <div className="mt-8 p-4 bg-gray-700 rounded-lg border border-gray-600 shadow-inner">
              <h2 className="text-lg font-medium text-gray-300 mb-2">Classification Result</h2>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-blue-400">{result}</span>
                <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-xs font-medium">Prediction</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>This tool uses machine learning to classify news articles.</p>
          <p>Enter a title and content to get started.</p>
        </div>
      </div>
    </div>
          </>
        } />
        <Route path="/qr" element={<QrCode/>} />
        <Route path="/read" element={<QrReader/>} />

      </Routes>
    </Router>

    </>
  )
}

export default App
