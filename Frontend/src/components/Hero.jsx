import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import campus from '../assets/ncet-campus.jpeg';
import logo from '../assets/ncet-logo.jpeg';

export default function Hero() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <div>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-navy sm:text-5xl lg:text-[3.4rem]">
            Your Journey Towards a Successful Future Starts Here!
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
            Explore NCET, discover academic opportunities, and get instant answers to all your admission-related
            questions with our AI-powered admission assistant.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/chat" className="btn-gold">
              <MessageCircle size={18} aria-hidden /> Chat with AI Assistant
            </Link>
            <Link to={{ pathname: '/', hash: '#about' }} className="btn-outline">
              Explore NCET
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -bottom-3 -right-3 h-full w-full rounded-[2rem] bg-gold/70" aria-hidden />
          <img
            src={campus}
            alt="The NCET campus building with palm trees and a green lawn"
            className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-card"
            fetchPriority="high"
          />
          <img
            src={logo}
            alt=""
            className="absolute -bottom-6 -left-3 h-20 w-20 rounded-full border-4 border-white bg-white object-cover shadow-card sm:h-24 sm:w-24"
          />
        </div>
      </div>
    </section>
  );
}
