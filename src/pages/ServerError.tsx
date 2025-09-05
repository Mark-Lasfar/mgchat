import React from 'react';

const ServerError: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-white mb-4">500 - Server Error</h1>
      <p className="text-gray-300 mb-4">Something went wrong on our end. Please try again later.</p>
      <a href="/" className="bg-blue-600 text-white px-4 py-2 rounded">Go to Home</a>
    </div>
  );
};

export default ServerError;
