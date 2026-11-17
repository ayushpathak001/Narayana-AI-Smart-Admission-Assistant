import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import logo from '../assets/ncet-logo.jpeg';
import { SITE } from '../config/site';

export default function Footer() {
  const { phone, email, address } = SITE.contact;
  const hasContact = phone || email || address;

  return (
    <footer id="contact" className="scroll-mt-24 bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="flex items-start gap-3">
          <img src={logo} alt="" className="h-14 w-14 rounded-full border-2 border-gold object-cover" />
          <div>
            <p className="font-display text-lg font-semibold">{SITE.name}</p>
            <p className="mt-1 text-sm text-white/70">
              {SITE.college}, {SITE.city}
            </p>
          </div>
        </div>

        <div>
          <p className="font-display font-semibold text-gold">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to={{ pathname: '/', hash: '#about' }} className="hover:text-gold">About NCET</Link></li>
            <li><Link to="/chat" className="hover:text-gold">Ask AI Assistant</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display font-semibold text-gold">Contact</p>
          {hasContact ? (
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {phone && <li className="flex items-center gap-2"><Phone size={15} aria-hidden /> {phone}</li>}
              {email && <li className="flex items-center gap-2"><Mail size={15} aria-hidden /> {email}</li>}
              {address && <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0" aria-hidden /> {address}</li>}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-white/80">Ask the AI Assistant for the admission office's contact details.</p>
          )}
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60">
        &copy; {new Date().getFullYear()} {SITE.college}. All rights reserved.
      </div>
    </footer>
  );
}
