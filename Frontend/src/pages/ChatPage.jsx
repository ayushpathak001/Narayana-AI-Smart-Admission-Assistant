import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';
import { useChat } from '../hooks/useChat';

export default function ChatPage() {
  const chat = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handledRef = useRef(false);
  const { sendMessage } = chat;

  // A feature card on the home page can pass a starter question.
  useEffect(() => {
    const question = location.state?.question;
    if (question && !handledRef.current) {
      handledRef.current = true;
      sendMessage(question);
      navigate('/chat', { replace: true, state: null });
    }
  }, [location.state, navigate, sendMessage]);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="flex h-dvh overflow-hidden">
      <ChatSidebar open={sidebarOpen} onClose={closeSidebar} onNewChat={chat.newChat} messages={chat.messages} loading={chat.loading} />
      <ChatWindow chat={chat} onOpenSidebar={() => setSidebarOpen(true)} />
    </div>
  );
}
