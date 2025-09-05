import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Chat from './pages/Chat';
import Docs from './pages/Docs';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';
import SettingsModal from './components/SettingsModal';
import './css/style.css';
import './css/animation/style.css';
import './css/button.css';
import './css/chat/bubble.css';
import './css/chat/markdown.css';
import './css/chat/style.css';
import './css/header.css';
import './css/icon.css';
import './css/input.css';
import './css/logo.css';
import './css/prompts.css';
import './css/screen/1200.css';
import './css/screen/2000.css';
import './css/screen/320.css';
import './css/screen/360.css';
import './css/screen/3840.css';
import './css/screen/480.css';
import './css/screen/720.css';
import './css/screen/7680.css';
import './css/screen/common.css';
import './css/webkit.css';
import './css/sidebar.css';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSettings = () => setSettingsOpen(!settingsOpen);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-teal-900 to-emerald-900">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 w-64 bg-gray-800/90 backdrop-blur-md transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center">
              <img src="/static/images/mg.svg" alt="MGZon Logo" className="w-10 h-10 mr-2 animate-pulse" />
              <h2 className="text-lg font-bold text-white">MGZon</h2>
            </div>
            <button
              className="md:hidden text-white"
              onClick={toggleSidebar}
              aria-label="Close Sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li><a href="/" className="flex items-center text-white hover:bg-gray-700 p-2 rounded">Home</a></li>
              <li><a href="/about" className="flex items-center text-white hover:bg-gray-700 p-2 rounded">About</a></li>
              <li><a href="/blog" className="flex items-center text-white hover:bg-gray-700 p-2 rounded">Blog</a></li>
              <li><a href="/docs" className="flex items-center text-white hover:bg-gray-700 p-2 rounded">Docs</a></li>
              <li>
                <button
                  onClick={toggleSettings}
                  className="flex items-center text-white hover:bg-gray-700 p-2 rounded w-full text-left"
                >
                  Settings
                </button>
              </li>
              <li><a href="/auth/jwt/logout" className="flex items-center text-white hover:bg-gray-700 p-2 rounded">Logout</a></li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col max-w-screen-xl w-full mx-auto md:ml-64">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:conversationId" element={<Chat />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/500" element={<ServerError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Settings Modal */}
        <SettingsModal isOpen={settingsOpen} onClose={toggleSettings} />
      </div>
    </Router>
  );
};

export default App;
