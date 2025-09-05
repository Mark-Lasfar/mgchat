import React, { useState } from 'react';

const SettingsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [displayName, setDisplayName] = useState('');
  const [preferredModel, setPreferredModel] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [education, setEducation] = useState('');
  const [interests, setInterests] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [conversationStyle, setConversationStyle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          display_name: displayName,
          preferred_model: preferredModel,
          job_title: jobTitle,
          education,
          interests,
          additional_info: additionalInfo,
          conversation_style: conversationStyle,
        }),
      });
      if (response.ok) {
        onClose();
      } else {
        alert('Failed to update settings');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">User Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="display_name" className="block text-sm text-gray-300">Display Name</label>
            <input
              type="text"
              id="display_name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div>
            <label htmlFor="preferred_model" className="block text-sm text-gray-300">Preferred Model</label>
            <select
              id="preferred_model"
              value={preferredModel}
              onChange={(e) => setPreferredModel(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
            >
              <option value="">Default</option>
              <option value="advanced">Advanced (High-performance)</option>
              <option value="standard">Standard (Balanced)</option>
              <option value="light">Light (Quick)</option>
            </select>
          </div>
          <div>
            <label htmlFor="job_title" className="block text-sm text-gray-300">Job Title</label>
            <input
              type="text"
              id="job_title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div>
            <label htmlFor="education" className="block text-sm text-gray-300">Education</label>
            <input
              type="text"
              id="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div>
            <label htmlFor="interests" className="block text-sm text-gray-300">Interests</label>
            <textarea
              id="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div>
            <label htmlFor="additional_info" className="block text-sm text-gray-300">Additional Info</label>
            <textarea
              id="additional_info"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div>
            <label htmlFor="conversation_style" className="block text-sm text-gray-300">Conversation Style</label>
            <select
              id="conversation_style"
              value={conversationStyle}
              onChange={(e) => setConversationStyle(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
            >
              <option value="default">Default</option>
              <option value="concise">Concise</option>
              <option value="analytical">Analytical</option>
              <option value="creative">Creative</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;
