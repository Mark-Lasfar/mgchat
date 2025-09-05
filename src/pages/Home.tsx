import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Welcome to MGZon Chatbot</h1>
      <p className="text-gray-300 mb-4">Your AI-powered assistant for coding, analysis, and e-commerce queries.</p>
      <a href="/chat" className="bg-blue-600 text-white px-4 py-2 rounded">Start Chatting</a>
    </div>
  );
};

export default Home;
