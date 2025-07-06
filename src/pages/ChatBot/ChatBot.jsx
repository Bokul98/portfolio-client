import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BsChatLeftDots, BsPencilSquare, BsTrash } from 'react-icons/bs';
import { IoSendSharp, IoAddCircle } from 'react-icons/io5';
import { MdContentCopy, MdOutlineChatBubbleOutline } from 'react-icons/md';
import { RiRobot2Line } from 'react-icons/ri';
import { FaRegTrashAlt } from 'react-icons/fa';

const API_KEY = 'AIzaSyDO7N9huMXi1BHPO3Km7I-pLVLAjm4uORE';

const genAI = new GoogleGenerativeAI(API_KEY);

const ChatBot = () => {
  // Chat sessions state
  const [chatSessions, setChatSessions] = useState(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    return savedSessions ? JSON.parse(savedSessions) : [{
      id: 'default',
      name: 'New Chat',
      messages: []
    }];
  });
  const [currentSessionId, setCurrentSessionId] = useState(() => {
    return localStorage.getItem('currentSessionId') || 'default';
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newChatName, setNewChatName] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get current chat session
  const currentSession = chatSessions.find(session => session.id === currentSessionId) || chatSessions[0];
  const messages = currentSession.messages;

  // Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
  }, [chatSessions]);

  // Save current session ID
  useEffect(() => {
    localStorage.setItem('currentSessionId', currentSessionId);
  }, [currentSessionId]);

  const createNewChat = () => {
    const newSession = {
      id: Date.now().toString(),
      name: 'New Chat',
      messages: []
    };
    setChatSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
  };

  const deleteChat = (sessionId) => {
    if (chatSessions.length === 1) {
      // If this is the last chat, create a new empty one
      createNewChat();
    } else if (sessionId === currentSessionId) {
      // If deleting current chat, switch to another one
      const index = chatSessions.findIndex(s => s.id === sessionId);
      const newIndex = index > 0 ? index - 1 : index + 1;
      setCurrentSessionId(chatSessions[newIndex].id);
    }
    setChatSessions(prev => prev.filter(session => session.id !== sessionId));
  };

  const updateChatName = (sessionId, newName) => {
    setChatSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, name: newName || 'New Chat' }
        : session
    ));
    setIsEditingName(false);
  };

  const clearHistory = () => {
    setChatSessions(prev => prev.map(session => 
      session.id === currentSessionId 
        ? { ...session, messages: [] }
        : session
    ));
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);
    const userMessage = { 
      role: 'user', 
      content: input,
      timestamp: new Date().toISOString()
    };

    // Update messages in the current session
    setChatSessions(prev => prev.map(session => 
      session.id === currentSessionId
        ? { ...session, messages: [...session.messages, userMessage] }
        : session
    ));
    setInput("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      
      const chat = model.startChat({
        history: messages.map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }))
      });

      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      setChatSessions(prev => prev.map(session => 
        session.id === currentSessionId
          ? { 
              ...session, 
              messages: [...session.messages, { 
                role: 'assistant', 
                content: text,
                timestamp: new Date().toISOString()
              }]
            }
          : session
      ));
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to get response from AI. Please try again.');
      setChatSessions(prev => prev.map(session => 
        session.id === currentSessionId
          ? { 
              ...session, 
              messages: [...session.messages, { 
                role: 'assistant', 
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date().toISOString()
              }]
            }
          : session
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8 text-[#00F050] flex items-center justify-center gap-2">
          <RiRobot2Line className="text-3xl sm:text-4xl" />
          Chat with Bokul AI
        </h2>
        
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden mb-4 pt-6">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full bg-gray-800 text-[#00F050] px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <MdOutlineChatBubbleOutline className="text-xl" />
            {isSidebarOpen ? 'Hide Chats' : 'Show Chats'}
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 relative">
          {/* Sidebar with chat sessions */}
          <div className={`
            ${isSidebarOpen ? 'block' : 'hidden'} lg:block
            lg:col-span-1 
            bg-gray-800 rounded-lg p-4 
            fixed lg:relative 
            top-0 left-0 
            w-full lg:w-auto 
            h-screen lg:h-[600px] 
            z-50 lg:z-auto
            overflow-y-auto
            lg:translate-x-0
            transition-transform duration-300
          `}>
            <div className="flex justify-between items-center lg:hidden mb-4">
              <h3 className="text-xl font-semibold text-[#00F050]">Your Chats</h3>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <button
              onClick={createNewChat}
              className="w-full bg-[#00F050] text-black px-4 py-2 rounded-lg mb-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <IoAddCircle className="text-xl" />
              New Chat
            </button>
            
            <div className="space-y-2">
              {chatSessions.map(session => (
                <div 
                  key={session.id}
                  className={`p-2 rounded-lg cursor-pointer group relative flex items-center ${
                    session.id === currentSessionId 
                      ? 'bg-gray-700' 
                      : 'hover:bg-gray-700/50'
                  }`}
                  onClick={() => {
                    setCurrentSessionId(session.id);
                    setIsSidebarOpen(false);
                  }}
                >
                  <MdOutlineChatBubbleOutline className="text-[#00F050] mr-2 flex-shrink-0" />
                  {isEditingName && session.id === currentSessionId ? (
                    <input
                      type="text"
                      value={newChatName}
                      onChange={(e) => setNewChatName(e.target.value)}
                      onBlur={() => updateChatName(session.id, newChatName)}
                      onKeyDown={(e) => e.key === 'Enter' && updateChatName(session.id, newChatName)}
                      className="w-full bg-gray-600 text-white px-2 py-1 rounded"
                      autoFocus
                    />
                  ) : (
                    <>
                      <span className="text-white truncate block flex-1">{session.name}</span>
                      {session.id === currentSessionId && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setNewChatName(session.name);
                              setIsEditingName(true);
                            }}
                            className="text-gray-400 hover:text-white p-1"
                          >
                            <BsPencilSquare />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteChat(session.id);
                            }}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <BsTrash />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main chat area */}
          <div className="lg:col-span-3 w-full">
            <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 backdrop-blur-sm bg-opacity-30 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-[#00F050] flex items-center gap-2">
                  <BsChatLeftDots />
                  <span className="truncate">{currentSession.name}</span>
                </h3>
                <button
                  onClick={clearHistory}
                  className="bg-red-500/20 text-red-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  <FaRegTrashAlt />
                  <span className="hidden sm:inline">Clear History</span>
                </button>
              </div>
              <div className="h-[350px] sm:h-[400px] overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[90%] sm:max-w-[80%] p-3 rounded-lg relative group ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-[#00F050] to-emerald-400 text-black'
                          : 'bg-gray-700 text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm sm:text-base">{msg.content}</p>
                      <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                        <span>{formatTimestamp(msg.timestamp)}</span>
                        <button
                          onClick={() => copyToClipboard(msg.content, idx)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                        >
                          <MdContentCopy className="text-base" />
                          <span className="hidden sm:inline">{copiedIndex === idx ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-white p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#00F050] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-[#00F050] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-[#00F050] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="flex justify-center">
                    <div className="bg-red-500/20 text-red-200 p-3 rounded-lg">
                      <p className="text-sm sm:text-base">{error}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 bg-gray-700 text-white rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00F050] disabled:opacity-50"
                    maxLength={1000}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-[#00F050] to-emerald-400 text-black px-4 sm:px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2 text-sm sm:text-base"
                  >
                    {isLoading ? (
                      'Sending...'
                    ) : (
                      <>
                        <IoSendSharp />
                        <span className="hidden sm:inline">Send</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-right text-xs text-gray-400">
                  {input.length}/1000 characters
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;