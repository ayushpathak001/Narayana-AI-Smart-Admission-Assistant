const CONFIG = {
  online: { dot: 'bg-leaf', label: 'Backend connected' },
  offline: { dot: 'bg-red-500', label: 'Backend disconnected' },
  checking: { dot: 'bg-amber-400 animate-pulse', label: 'Checking connection...' },
};

export default function ConnectionStatus({ status, onClick }) {
  const { dot, label } = CONFIG[status] ?? CONFIG.checking;
  return (
    <button
      type="button"
      onClick={onClick}
      title="Click to re-check the connection"
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium text-ink/70 hover:bg-mist"
    >
      <span className={`h-2.5 w-2.5 rounded-full ${dot}`} aria-hidden />
      <span role="status">{label}</span>
    </button>
  );
}
