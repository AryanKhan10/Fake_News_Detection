import { useState,useRef } from "react"
import "./App.css"
import axios from "axios"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import QrCode from "./QrCode"
import QrReader from "./QrReader"

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ClassificationForm from './components/ClassificationForm';

function App() {
  
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  const handleTryItOut = () => {
    setShowForm(true);
    // Scroll to form after a small delay to allow animation
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  return (
    <>
      
    
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      
      <main className="flex-grow">
        <Hero onTryItOut={handleTryItOut} />
        
        {showForm && (
          <div 
            ref={formRef}
            className="py-16 px-4 bg-gradient-to-b from-gray-800 to-gray-900"
          >
            <ClassificationForm />
          </div>
        )}
        
        <section id="about" className="py-16 px-4 bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">About Our Technology</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Our news classification system utilizes advanced machine learning algorithms to analyze
              and categorize news articles based on their content. By examining both the title and
              body of an article, our system can accurately determine the most appropriate category
              for any piece of news.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Whether you're a journalist, researcher, or just curious about news categorization,
              our tool provides instant, accurate classification to help you understand and organize
              information more effectively.
            </p>
          </div>
        </section>
        
        <section id="contact" className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Contact Us</h2>
            <p className="text-gray-300 mb-8">
              Have questions about our news classification technology or need assistance?
              We're here to help!
            </p>
            <a 
              href="mailto:contact@newsclassifier.ai"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
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
