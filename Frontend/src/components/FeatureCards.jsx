import { Link } from 'react-router-dom';
import { BookOpen, Building2, ClipboardList, ListChecks } from 'lucide-react';

const features = [
  { icon: BookOpen, title: 'Courses & Programs', text: 'Explore available academic programs.', question: 'What courses are available at NCET?' },
  { icon: ClipboardList, title: 'Admission Process', text: 'Understand the admission procedure.', question: 'What is the admission process?' },
  { icon: ListChecks, title: 'Eligibility Criteria', text: 'Check admission requirements.', question: 'What are the eligibility criteria?' },
  { icon: Building2, title: 'Fees & Facilities', text: 'Get information about fees and campus facilities.', question: 'Tell me about the fee structure and campus facilities.' },
];

export default function FeatureCards() {
  return (
    <section id="help" className="scroll-mt-24 bg-mist">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">What would you like to know?</h2>
        <p className="mt-2 max-w-2xl text-ink/70">Pick a topic and the assistant will start the conversation for you.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text, question }) => (
            <Link
              key={title}
              to="/chat"
              state={{ question }}
              className="group rounded-2xl border-t-4 border-gold bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                <Icon size={24} aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
