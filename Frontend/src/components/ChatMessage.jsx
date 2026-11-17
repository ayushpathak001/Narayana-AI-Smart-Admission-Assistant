import { memo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AlertCircle, Check, Copy, RotateCw } from 'lucide-react';
import Avatar from './Avatar';

const markdownComponents = {
  a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
  table: ({ node, ...props }) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
};

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
}

function ChatMessage({ message, onRetry, disabled }) {
  const [copied, setCopied] = useState(false);

  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-royal px-4 py-2.5 text-white shadow-soft sm:max-w-[75%]">
          {message.content}
        </div>
      </div>
    );
  }

  if (message.isError) {
    return (
      <div className="flex items-end gap-2.5">
        <Avatar />
        <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-red-200 bg-red-50 px-4 py-3 text-red-900 sm:max-w-[75%]" role="alert">
          <p className="flex items-start gap-2">
            <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden />
            <span>{message.content}</span>
          </p>
          {message.retryText && (
            <button
              type="button"
              onClick={() => onRetry(message.retryText)}
              disabled={disabled}
              className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-red-800 shadow-soft hover:bg-red-100 disabled:opacity-50"
            >
              <RotateCw size={14} aria-hidden /> Try again
            </button>
          )}
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    await copyText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-end gap-2.5">
      <Avatar />
      <div className="min-w-0 max-w-[85%] sm:max-w-[75%]">
        <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-soft">
          <div className="md">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-ink/60 hover:bg-white hover:text-royal"
          aria-label="Copy response"
        >
          {copied ? <Check size={14} className="text-leaf" aria-hidden /> : <Copy size={14} aria-hidden />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

export default memo(ChatMessage);
