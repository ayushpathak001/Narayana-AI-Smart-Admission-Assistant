import { useCallback, useEffect, useRef, useState } from 'react';
import { chatService } from '../services/chatService';
import { MAX_MESSAGE_LENGTH } from '../config/site';

const SESSION_KEY = 'ncet_session_id';
const MESSAGES_KEY = 'ncet_messages';
const HEALTH_INTERVAL_MS = 30000;
const MAX_STORED_MESSAGES = 100;

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode, quota) - chat still works in memory */
  }
};

const makeId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function useChat() {
  const [messages, setMessages] = useState(() => {
    const stored = load(MESSAGES_KEY, []);
    return Array.isArray(stored) ? stored : [];
  });
  const [sessionId, setSessionIdState] = useState(() => load(SESSION_KEY, null));
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('checking'); // checking | online | offline
  const [notice, setNotice] = useState(null);

  const sessionRef = useRef(sessionId);
  const loadingRef = useRef(false);

  const setSession = useCallback((id) => {
    sessionRef.current = id;
    setSessionIdState(id);
    save(SESSION_KEY, id);
  }, []);

  // Frontend-side persistence only (the backend offers no history endpoint).
  useEffect(() => {
    save(MESSAGES_KEY, messages.filter((m) => !m.isError).slice(-MAX_STORED_MESSAGES));
  }, [messages]);

  const checkHealth = useCallback(async () => {
    const ok = await chatService.checkHealth();
    setStatus(ok ? 'online' : 'offline');
    return ok;
  }, []);

  useEffect(() => {
    checkHealth();
    const timer = setInterval(checkHealth, HEALTH_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [checkHealth]);

  const submit = useCallback(
    async (text, { appendUser }) => {
      loadingRef.current = true;
      setLoading(true);
      setNotice(null);
      setMessages((prev) => {
        const base = prev.filter((m) => !m.isError);
        return appendUser ? [...base, { id: makeId(), role: 'user', content: text, createdAt: Date.now() }] : base;
      });

      try {
        const { sessionId: newId, response } = await chatService.sendMessage(text, sessionRef.current);
        if (newId) setSession(newId); // always keep the backend's session id
        setMessages((prev) => [...prev, { id: makeId(), role: 'assistant', content: response, createdAt: Date.now() }]);
        setStatus('online');
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: 'assistant',
            content: err.message || "I'm having trouble connecting right now. Please try again in a moment.",
            isError: true,
            retryText: text,
            createdAt: Date.now(),
          },
        ]);
        if (err.kind === 'network' || err.kind === 'timeout') setStatus('offline');
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [setSession]
  );

  const sendMessage = useCallback(
    async (raw) => {
      const text = String(raw ?? '').trim().slice(0, MAX_MESSAGE_LENGTH);
      if (!text || loadingRef.current) return;
      await submit(text, { appendUser: true });
    },
    [submit]
  );

  const retry = useCallback(
    async (text) => {
      if (!text || loadingRef.current) return;
      await submit(text, { appendUser: false });
    },
    [submit]
  );

  const newChat = useCallback(async () => {
    if (loadingRef.current) return;
    const oldId = sessionRef.current;
    setMessages([]);
    setSession(null);
    setNotice(null);
    if (oldId) {
      try {
        await chatService.clearSession(oldId);
      } catch {
        setNotice('Your chat was cleared on this device, but the server could not confirm the old session was deleted.');
      }
    }
  }, [setSession]);

  const dismissNotice = useCallback(() => setNotice(null), []);

  return { messages, sessionId, loading, status, notice, dismissNotice, sendMessage, retry, newChat, recheck: checkHealth };
}
