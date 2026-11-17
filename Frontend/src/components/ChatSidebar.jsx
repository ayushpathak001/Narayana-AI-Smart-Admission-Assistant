import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Info, MessageSquare, Plus, Trash2, X } from 'lucide-react';
import logo from '../assets/ncet-logo.jpeg';
import { SITE } from '../config/site';

export default function ChatSidebar({ open, onClose, onNewChat, messages, loading }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const firstUser = messages.find((m) => m.role === 'user');
  const title = firstUser ? firstUser.content : 'New conversation';
  const hasMessages = messages.length > 0;

  const handleNew = () => {
    onNewChat();
    onClose();
  };

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-navy/60 lg:hidden" onClick={onClose} aria-hidden />}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-navy text-white transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Chat sidebar"
      >
        <div className="flex items-center gap-3 border-b border-white/10 p-4">
          <img src={logo} alt="NCET logo" className="h-12 w-12 shrink-0 rounded-full border-2 border-gold object-cover" />
          <p className="flex-1 font-display text-base font-semibold leading-tight">{SITE.name}</p>
          <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-white/10 lg:hidden" aria-label="Close sidebar">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto p-4">
          <button type="button" onClick={handleNew} disabled={loading} className="btn-gold w-full disabled:opacity-60">
            <Plus size={18} aria-hidden /> New Chat
          </button>

          <div>
            <p className="mb-2 text-sm font-semibold text-gold">Current conversation</p>
            <div className="flex items-start gap-2.5 rounded-xl bg-white/10 p-3">
              <MessageSquare size={17} className="mt-0.5 shrink-0 text-gold" aria-hidden />
              <div className="min-w-0">
                <p className="line-clamp-2 break-words text-sm">{title}</p>
                <p className="mt-0.5 text-xs text-white/60">
                  {hasMessages ? `${messages.length} message${messages.length === 1 ? '' : 's'}` : 'No messages yet'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleNew}
              disabled={!hasMessages || loading}
              className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/85 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 size={16} aria-hidden /> Clear conversation
            </button>
          </div>

          <div className="rounded-xl border border-white/15 p-3 text-sm leading-relaxed text-white/80">
            <p className="mb-1.5 flex items-center gap-2 font-semibold text-gold">
              <Info size={16} aria-hidden /> About this assistant
            </p>
            <p>
              Answers are retrieved from NCET's admission knowledge base. Your conversation is saved on this device
              only; earlier chats can't be browsed from the server.
            </p>
          </div>
        </div>

        <div className="mt-auto border-t border-white/10 p-4">
          <Link to="/" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/85 hover:bg-white/10">
            <Home size={16} aria-hidden /> Back to website
          </Link>
        </div>
      </aside>
    </>
  );
}
