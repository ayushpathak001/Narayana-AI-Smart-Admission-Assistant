import api from '../config/api';

export class ChatError extends Error {
  constructor(message, kind = 'unknown', status) {
    super(message);
    this.name = 'ChatError';
    this.kind = kind; // network | timeout | client | server | empty | unknown
    this.status = status;
  }
}

function toChatError(error) {
  if (error instanceof ChatError) return error;
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return new ChatError('The assistant is taking longer than usual to respond. Please try again.', 'timeout');
  }
  if (!error.response) {
    return new ChatError("I'm having trouble connecting right now. Please try again in a moment.", 'network');
  }
  const { status } = error.response;
  if (status === 400 || status === 422) {
    return new ChatError("I couldn't process that message. Please rephrase it and try again.", 'client', status);
  }
  if (status === 429) {
    return new ChatError('Too many requests right now. Please wait a few seconds and try again.', 'client', status);
  }
  if (status >= 500) {
    return new ChatError('Something went wrong on the server. Please try again in a moment.', 'server', status);
  }
  return new ChatError('Something unexpected happened. Please try again.', 'unknown', status);
}

export const chatService = {
  /** POST /chat -> { sessionId, response } */
  async sendMessage(message, sessionId) {
    try {
      const { data } = await api.post('/chat', { message, session_id: sessionId ?? null });
      const text = typeof data?.response === 'string' ? data.response.trim() : '';
      if (!text) {
        throw new ChatError('The assistant returned an empty answer. Please try asking again.', 'empty');
      }
      return { sessionId: data.session_id ?? null, response: text };
    } catch (error) {
      throw toChatError(error);
    }
  },

  /** DELETE /chat/{session_id}. A 404 means it is already gone, which is fine. */
  async clearSession(sessionId) {
    try {
      await api.delete(`/chat/${encodeURIComponent(sessionId)}`);
    } catch (error) {
      if (error.response?.status === 404) return;
      throw toChatError(error);
    }
  },

  /** GET /health -> true only if the backend reports "healthy". */
  async checkHealth() {
    try {
      const { data } = await api.get('/health', { timeout: 5000 });
      return data?.status === 'healthy';
    } catch {
      return false;
    }
  },
};
