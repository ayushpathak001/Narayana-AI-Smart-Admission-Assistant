# NCET Smart Admission Assistant - Frontend

React + Vite + Tailwind CSS frontend for the NCET admission chatbot. It talks to your existing FastAPI backend
(`POST /chat`, `DELETE /chat/{session_id}`, `GET /health`) and does not change the API contract.

## 1. Install
Requires Node.js 18+.

```bash
npm install
```

## 2. Configure the backend URL
```bash
cp .env.example .env      # Windows: copy .env.example .env
```
`.env`:
```
VITE_API_BASE_URL=http://127.0.0.1:8000
```
The URL is read in one place only: `src/config/api.js`.

## 3. Run locally
Start your FastAPI backend first, then:
```bash
npm run dev
```
Open http://localhost:5173. The status dot in the chat header turns green once `/health` reports `healthy`.

## 4. Connect to your deployed backend
1. Set `VITE_API_BASE_URL=https://your-backend.example.com` (no trailing slash). Vite bakes this in at **build time**,
   so on Vercel/Netlify add it as an environment variable and redeploy.
2. Use **https** for the backend if the frontend is on https (browsers block mixed content).
3. Make sure the backend allows your frontend origin in its CORS settings (e.g. `https://your-site.vercel.app`
   and `http://localhost:5173` for development). This is deployment configuration, not an API change.
4. Build: `npm run build` (output in `dist/`). `vercel.json` and `public/_redirects` are included so `/chat` works on refresh.

## How sessions work
- First message is sent with `session_id: null`; the `session_id` in the response is saved in React state and `localStorage`
  (`ncet_session_id`) and reused for every follow-up, including after a page refresh.
- **New Chat** / **Clear conversation** calls `DELETE /chat/{session_id}`, clears messages, removes the stored id, and
  the next message starts a fresh session.
- The conversation is also kept in `localStorage` (`ncet_messages`). This is frontend-side persistence only; the backend
  has no endpoint to list past sessions.

## Structure
```
src/
  assets/       ncet-logo.jpeg, ncet-campus.jpeg
  components/   Navbar, Hero, FeatureCards, Footer, ChatSidebar, ChatWindow, ChatMessage, ChatInput, TypingIndicator, ConnectionStatus, Avatar
  config/       api.js (backend URL + axios), site.js (copy, suggested questions, footer contact details)
  services/     chatService.js (all API calls + error mapping)
  hooks/        useChat.js (session, messages, health polling)
  pages/        Home.jsx, ChatPage.jsx
```
Add your admission office phone/email/address in `src/config/site.js` to show them in the footer.
