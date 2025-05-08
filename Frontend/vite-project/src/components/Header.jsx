import React from 'react'
import { Newspaper } from 'lucide-react';

const Header = () => {
    return (
      <header className="bg-gray-900 py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Newspaper className="h-8 w-8 text-blue-400" />
            <h1 className="text-xl font-bold text-white">NewsClassifier</h1>
          </div>
          
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">About</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  };

export default Header
