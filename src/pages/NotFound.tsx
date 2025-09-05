import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
      <p className="text-gray-300 mb-4">The page you are looking for does not exist.</p>
      <a href="/" className="bg-blue-600 text-white px-4 py-2 rounded">Go to Home</a>
    </div>
  );
};

export default NotFound;
