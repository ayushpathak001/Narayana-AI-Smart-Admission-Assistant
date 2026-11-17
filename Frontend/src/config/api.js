import axios from 'axios';

// Single source of truth for the backend URL. Set VITE_API_BASE_URL in .env.
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // RAG + LLM responses can be slow
  headers: { 'Content-Type': 'application/json' },
});

export default api;
