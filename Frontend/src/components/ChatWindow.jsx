import { useEffect, useRef } from 'react';
import { Menu, Plus, X } from 'lucide-react';
import Avatar from './Avatar';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ConnectionStatus from './ConnectionStatus';
import TypingIndicator from './TypingIndicator';
import logo from '../assets/ncet-logo.jpeg';
import { SITE, SUGGESTED_QUESTIONS, WELCOME_MESSAGE } from '../config/site';

export default function ChatWindow({ chat, onOpenSidebar }) {
  const { messages, loading, status, notice, dismissNotice, sendMessage, retry, newChat, recheck } = chat;
  const scrollRef = useRef(null);
  const isEmpty = messages.length === 0;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages.length, loading]);

  return (
    <section className="flex h-dvh min-w-0 flex-1 flex-col bg-mist">
      <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-3 py-3 sm:px-6">
        <button type="button" onClick={onOpenSidebar} className="rounded-full p-2.5 text-navy hover:bg-mist lg:hidden" aria-label="Open sidebar">
          <Menu size={22} />
        </button>
        <img src={logo} alt="NCET logo" className="h-11 w-11 shrink-0 rounded-full border border-gold object-cover" />
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-base font-semibold text-navy sm:text-lg">{SITE.name}</h1>
          <p className="truncate text-xs text-ink/65 sm:text-sm">Your Virtual Admission Counsellor</p>
        </div>
        <ConnectionStatus status={status} onClick={recheck} />
        <button
          type="button"
          onClick={newChat}
          disabled={loading || isEmpty}
          className="rounded-full p-2.5 text-navy hover:bg-mist disabled:opacity-40 lg:hidden"
          aria-label="New chat"
        >
          <Plus size={22} />
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl space-y-5 px-3 py-6 sm:px-6">
          {isEmpty ? (
            <div className="space-y-4">
              <div className="flex items-end gap-2.5">
                <Avatar />
                <div className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 leading-relaxed shadow-soft sm:max-w-[75%]">
                  {WELCOME_MESSAGE}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pl-0 sm:pl-[3.1rem]">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => sendMessage(q)}
                    disabled={loading}
                    className="rounded-full border border-royal/30 bg-white px-4 py-2.5 text-left text-sm font-medium text-royal transition hover:border-royal hover:bg-royal hover:text-white disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m) => <ChatMessage key={m.id} message={m} onRetry={retry} disabled={loading} />)
          )}
          {loading && <TypingIndicator />}
        </div>
      </div>

      {notice && (
        <div className="mx-auto mb-2 flex w-full max-w-3xl items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-amber-900" role="status">
          <span className="flex-1">{notice}</span>
          <button type="button" onClick={dismissNotice} aria-label="Dismiss message" className="rounded-full p-0.5 hover:bg-amber-100">
            <X size={16} />
          </button>
        </div>
      )}

      <ChatInput onSend={sendMessage} disabled={loading} />
    </section>
  );
}
