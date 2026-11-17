import logo from '../assets/ncet-logo.jpeg';

export default function Avatar({ className = 'h-9 w-9' }) {
  return <img src={logo} alt="" className={`${className} shrink-0 rounded-full border border-gold/70 bg-white object-cover`} />;
}
