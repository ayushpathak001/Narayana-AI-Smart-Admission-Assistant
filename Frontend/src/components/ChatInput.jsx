import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { MAX_MESSAGE_LENGTH } from '../config/site';

const COUNTER_THRESHOLD = Math.floor(MAX_MESSAGE_LENGTH * 0.8);

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const ref = useRef(null);

  // Auto-resize up to ~6 lines
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  const canSend = value.trim().length > 0 && !disabled;

  const submit = () => {
    if (!canSend) return;
    onSend(value);
    setValue('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="border-t border-slate-200 bg-white px-3 pb-3 pt-3 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end gap-2 rounded-3xl border border-slate-300 bg-mist px-4 py-2 focus-within:border-royal focus-within:ring-2 focus-within:ring-royal/20">
          <textarea
            ref={ref}
            rows={1}
            value={value}
            maxLength={MAX_MESSAGE_LENGTH}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask anything about NCET admissions..."
            aria-label="Message"
            className="max-h-40 min-h-[2.5rem] flex-1 resize-none bg-transparent py-2 text-base text-ink outline-none placeholder:text-ink/45"
          />
          <button
            type="button"
            onClick={submit}
            disabled={!canSend}
            aria-label="Send message"
            className="mb-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-royal text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <Send size={18} aria-hidden />
          </button>
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-3 px-2 text-xs text-ink/55">
          <span>Answers come from NCET's knowledge base. Confirm fees and deadlines with the admission office.</span>
          {value.length >= COUNTER_THRESHOLD && (
            <span className={value.length >= MAX_MESSAGE_LENGTH ? 'font-semibold text-red-600' : ''}>
              {value.length}/{MAX_MESSAGE_LENGTH}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
