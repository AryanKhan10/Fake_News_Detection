import React, { useState } from 'react';
import { ArrowRight, Bot, BookOpen, PieChart } from 'lucide-react';

const Hero = ({ onTryItOut }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <section id="home" className="pt-24 pb-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 animate-fadeIn">
            News Classification AI
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 animate-fadeInDelayed">
            Instantly categorize news articles using advanced machine learning algorithms.
            Our system analyzes content and provides accurate classification in seconds.
          </p>
          <button 
            onClick={onTryItOut}
            className="group relative inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Try It Out
            <ArrowRight className={`ml-2 h-5 w-5 transform transition-transform duration-300 ${isHovering ? 'translate-x-1' : ''}`} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeInDelayed">
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl hover:border-blue-500 transition-all duration-300 shadow-md">
            <div className="bg-blue-600/20 p-3 rounded-lg w-fit mb-4">
              <Bot className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Machine Learning</h3>
            <p className="text-gray-400">
              Our system uses state-of-the-art machine learning algorithms to analyze and classify news content with high accuracy.
            </p>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl hover:border-blue-500 transition-all duration-300 shadow-md">
            <div className="bg-blue-600/20 p-3 rounded-lg w-fit mb-4">
              <BookOpen className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Content Analysis</h3>
            <p className="text-gray-400">
              Advanced natural language processing extracts key information from both titles and article content.
            </p>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl hover:border-blue-500 transition-all duration-300 shadow-md">
            <div className="bg-blue-600/20 p-3 rounded-lg w-fit mb-4">
              <PieChart className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Instant Results</h3>
            <p className="text-gray-400">
              Get classification results in seconds, helping you organize and understand news content efficiently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;