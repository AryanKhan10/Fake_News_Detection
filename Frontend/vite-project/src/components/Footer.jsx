import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">NewsClassifier</h3>
            <p className="mb-4">
              Using advanced machine learning to classify news articles accurately and efficiently.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Learn More</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">How It Works</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">API Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Research Paper</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">Have questions or feedback?</p>
            <a href="mailto:info@newsclassifier.ai" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
              cs.aryan.uet@gmail.com
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} NewsClassifier. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;