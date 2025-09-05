import React from 'react';

const Docs: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
      <p className="text-gray-300 mb-4">Explore the MGZon Chatbot documentation for developers and users.</p>
      <a href="/swagger" className="bg-blue-600 text-white px-4 py-2 rounded">View API Docs</a>
    </div>
  );
};

export default Docs;
