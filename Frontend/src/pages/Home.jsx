import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureCards from '../components/FeatureCards';
import Footer from '../components/Footer';
import logo from '../assets/ncet-logo.jpeg';
import { SITE } from '../config/site';

function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-white">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[auto_1fr]">
        <img src={logo} alt="NCET logo" className="mx-auto h-40 w-40 rounded-full object-cover shadow-card sm:h-48 sm:w-48" />
        <div>
          <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">About NCET</h2>
          <p className="mt-1 font-medium text-royal">
            {SITE.college}, {SITE.city}
          </p>
          <p className="mt-4 max-w-prose leading-relaxed text-ink/80">
            The NCET Smart Admission Assistant is a virtual counsellor for students and parents. It looks up answers in
            the college's admission knowledge base, so replies reflect the information NCET has provided.
          </p>
          <p className="mt-3 max-w-prose leading-relaxed text-ink/80">
            For decisions that involve fees or deadlines, confirm the details with the admission office.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0 });
  }, [hash, key]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureCards />
        <About />
      </main>
      <Footer />
    </>
  );
}
