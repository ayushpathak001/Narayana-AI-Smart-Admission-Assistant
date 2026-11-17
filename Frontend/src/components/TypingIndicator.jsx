import Avatar from './Avatar';

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5" aria-live="polite">
      <Avatar />
      <div className="flex items-center gap-3 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-soft">
        <span className="flex items-center gap-1" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 animate-dot rounded-full bg-royal" style={{ animationDelay: `${i * 0.18}s` }} />
          ))}
        </span>
        <span className="text-sm text-ink/70">NCET Assistant is thinking...</span>
      </div>
    </div>
  );
}
