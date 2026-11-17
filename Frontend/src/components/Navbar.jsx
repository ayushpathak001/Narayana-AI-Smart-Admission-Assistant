import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MessageCircle, X } from 'lucide-react';
import logo from '../assets/ncet-logo.jpeg';
import { SITE } from '../config/site';

const links = [
  { label: 'Home', to: { pathname: '/' } },
  { label: 'About NCET', to: { pathname: '/', hash: '#about' } },
  { label: 'Admission Help', to: { pathname: '/', hash: '#help' } },
  { label: 'Contact', to: { pathname: '/', hash: '#contact' } },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6" aria-label="Main">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="NCET logo" className="h-11 w-11 shrink-0 rounded-full object-cover" />
          <span className="truncate font-display text-base font-semibold text-navy sm:text-lg">{SITE.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link to={l.to} className="rounded-full px-4 py-2 text-sm font-medium text-ink transition hover:bg-mist hover:text-royal">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link to="/chat" className="btn-gold !px-4 !py-2.5">
            <MessageCircle size={16} aria-hidden /> Ask AI Assistant
          </Link>
          <button
            type="button"
            className="rounded-full p-2.5 text-navy hover:bg-mist lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-slate-200 bg-white px-4 py-2 lg:hidden">
          {links.map((l) => (
            <li key={l.label}>
              <Link to={l.to} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-medium text-ink hover:bg-mist">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
