import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

const Chat: React.FC = () => {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [conversationTitle, setConversationTitle] = useState('MGZon AI Assistant');
  const [file, setFile] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    // Fetch conversations
    fetch('/api/conversations', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then((data) => setConversations(data));

    if (conversationId) {
      fetch(`/api/conversations/${conversationId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setConversationTitle(data.conversation_title);
          // Fetch messages if needed
        });
    }
  }, [conversationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !file && !audio) return;

    const formData = new FormData();
    formData.append('message', input);
    if (file) formData.append('file', file);
    if (audio) formData.append('audio', audio);

    try {
      const endpoint = file ? '/api/image-analysis' : audio ? '/api/audio-transcription' : '/api/chat';
      const response = await fetch(endpoint, {
        method: 'POST',
        body: file || audio ? formData : JSON.stringify({
          message: input,
          history: messages,
          system_prompt: 'You are a helpful AI assistant.',
          temperature: 0.7,
          max_new_tokens: 2048,
          output_format: 'text',
        }),
        headers: file || audio ? {} : { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setMessages([...messages, { role: 'user', content: input }, { role: 'assistant', content: data.response || data.transcription || data.image_analysis }]);
      setInput('');
      setFile(null);
      setAudio(null);
    } catch (error) {
      console.error('Error:', error);
      setMessages([...messages, { role: 'user', content: input }, { role: 'assistant', content: 'Error occurred.' }]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setAudio(e.target.files[0]);
  };

  const createNewConversation = async () => {
    try {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title: 'New Conversation' }),
      });
      const data = await response.json();
      setConversations([...conversations, data]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="chat-header p-3 flex justify-between items-center">
        <div className="chat-title text-xl font-semibold text-white">{conversationTitle}</div>
        <button className="icon-btn" aria-label="Clear All Messages">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          </svg>
        </button>
      </header>
      <main className="flex-1 flex flex-col">
        <div className="md:hidden fixed top-1/2 left-4 z-50 animate-pulse">
          <img src="/static/images/swipe-hint.svg" alt="Swipe to open sidebar" className="w-8 h-8" />
        </div>
        <div className="flex justify-between items-center px-2 mb-2">
          <h3 className="text-sm font-semibold text-white">Conversations</h3>
          <button onClick={createNewConversation} className="text-white hover:bg-gray-700 p-1 rounded" title="New Conversation">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <ul className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
          {conversations.map((conv) => (
            <li key={conv.conversation_id}>
              <a href={`/chat/${conv.conversation_id}`} className="text-white hover:bg-gray-700 p-2 rounded">
                {conv.title}
              </a>
            </li>
          ))}
        </ul>
        <div id="initialContent" className="flex flex-col items-center justify-center text-center h-full">
          <div className="title mb-4 gradient-text text-3xl font-bold">
            How can I help you today?
          </div>
          <p className="system text-gray-300 mb-4">
            A versatile chatbot powered by DeepSeek, GPT-OSS, CLIP, Whisper, and TTS.<br />
            Type your query, upload images/files, or hold the send button to record audio!
          </p>
          <div className="prompts w-full max-w-md mx-auto grid gap-2">
            <div className="prompt-item" onClick={() => setInput("What's the capital of France?")}>
              <span>What's the capital of France?</span>
            </div>
            <div className="prompt-item" onClick={() => setInput("Generate a Python script for a simple web server")}>
              <span>Generate a Python script for a simple web server</span>
            </div>
            <div className="prompt-item" onClick={() => setInput("Analyze this image for me")}>
              <span>Analyze this image for me</span>
            </div>
            <div className="prompt-item" onClick={() => setInput("Convert this text to audio")}>
              <span>Convert this text to audio</span>
            </div>
          </div>
        </div>
        <div id="chatArea" className="flex-1">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${msg.role === 'user' ? 'user' : 'assistant'}`}
              dangerouslySetInnerHTML={{ __html: marked(msg.content) }}
            />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex p-4">
          <div id="inputContainer" className="w-full">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
            <div id="rightIconGroup" className="flex gap-2">
              <button type="button" className="icon-btn">
                <input type="file" id="fileInput" accept="image/*,.mp3,.wav" style={{ display: 'none' }} onChange={handleFileChange} />
                <label htmlFor="fileInput">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                  </svg>
                </label>
              </button>
              <button type="button" className="icon-btn">
                <input type="file" id="audioInput" accept="audio/*" style={{ display: 'none' }} onChange={handleAudioChange} />
                <label htmlFor="audioInput">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <path d="M12 19v4" />
                  </svg>
                </label>
              </button>
              <button type="submit" className="icon-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7M3 12h11" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Chat;
