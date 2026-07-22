'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import Image from 'next/image';

// ─── Intersection Observer Hook ─────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function FadeIn({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const { ref, isVisible } = useInView(0.1);
  const transforms: Record<string, string> = {
    up: 'translateY(32px)',
    down: 'translateY(-32px)',
    left: 'translateX(32px)',
    right: 'translateX(-32px)',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) translateX(0)' : transforms[direction],
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Plans', href: '#plans' },
  { label: 'About', href: '#why-us' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#footer' },
];

const INVESTMENT_PLANS = [
  {
    name: 'Basic',
    image: '/images/model-y.jpg',
    priceRange: '$200 – $4,999',
    dailyReturn: '0.5%',
    duration: '30 Days',
    premium: false,
  },
  {
    name: 'Silver',
    image: '/images/model-x.jpg',
    priceRange: '$5,000 – $24,999',
    dailyReturn: '1.0%',
    duration: '45 Days',
    premium: false,
  },
  {
    name: 'Gold',
    image: '/images/model-3.jpg',
    priceRange: '$25,000 – $99,999',
    dailyReturn: '1.5%',
    duration: '60 Days',
    premium: false,
  },
  {
    name: 'Platinum',
    image: '/images/model-s.jpg',
    priceRange: '$100,000+',
    dailyReturn: '2.0%',
    duration: '90 Days',
    premium: true,
  },
];

const FEATURES = [
  {
    title: 'Guaranteed Returns',
    description: 'Earn consistent daily returns on every investment plan, paid directly to your account balance.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: 'Bank-Grade Security',
    description: 'Military-grade AES-256 encryption and multi-layer security protocols protect every transaction.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: 'Crypto Payments',
    description: 'Seamless deposits and withdrawals via Bitcoin, Ethereum, and USDT with instant confirmation.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
      </svg>
    ),
  },
  {
    title: 'Instant Withdrawals',
    description: 'Request withdrawals at any time. Processing completes within 24–48 hours directly to your wallet.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    title: 'Referral Rewards',
    description: 'Earn a 10% commission on every deposit made by your direct referrals. No limits on earnings.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: '24/7 Support',
    description: 'Dedicated support team available around the clock via live chat, email, and support tickets.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Create Your Account',
    description: 'Sign up in under 2 minutes and complete identity verification to get started.',
  },
  {
    number: '02',
    title: 'Choose Your Plan',
    description: 'Select from our range of premium investment tiers that match your financial goals.',
  },
  {
    number: '03',
    title: 'Start Earning',
    description: 'Deposit funds and watch your daily returns accumulate in real-time on your dashboard.',
  },
];

const TESTIMONIALS = [
  {
    quote: "The daily returns are exactly as advertised. I've been investing for 6 months and the platform has been incredibly reliable. Withdrawals process without any issues.",
    name: 'Michael R.',
    role: 'Verified Investor',
    stars: 5,
  },
  {
    quote: "Customer support is outstanding. Any questions I had were answered within minutes. The KYC process was smooth and the dashboard is easy to navigate.",
    name: 'Sarah K.',
    role: 'Premium Investor',
    stars: 5,
  },
  {
    quote: "I started with the Basic plan and upgraded to Gold within a month. The returns speak for themselves. This is the most transparent platform I've used.",
    name: 'David L.',
    role: 'Active Investor',
    stars: 5,
  },
];

const FAQ_ITEMS = [
  {
    question: 'How do I get started with TeslaPrimeCapital?',
    answer: 'Creating an account takes less than 2 minutes. Click "Get Started" on our homepage, provide your email and set a password, complete the KYC verification, then choose an investment plan and fund your account using crypto or bank transfer.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Bitcoin (BTC), Ethereum (ETH), and USDT (TRC20/ERC20) for deposits and withdrawals. All transactions are processed on-chain with confirmation typically completing within 10–30 minutes.',
  },
  {
    question: 'How are daily returns calculated and paid?',
    answer: 'Daily returns are calculated as a fixed percentage of your active investment balance at 00:00 UTC each day. Returns are credited directly to your account balance and available for withdrawal or reinvestment.',
  },
  {
    question: 'What is the withdrawal process and fee?',
    answer: 'Withdrawals can be requested from your dashboard at any time. Processing takes 24–48 hours. Withdrawal fees vary by plan tier: Basic 2%, Silver 1.5%, Gold 1%, and Platinum 0.5%.',
  },
  {
    question: 'Is my investment secure on this platform?',
    answer: 'All funds are protected by AES-256 encryption, multi-signature cold wallet storage, and real-time monitoring. We maintain full reserves and undergo regular third-party security audits.',
  },
  {
    question: 'How does the referral program work?',
    answer: 'Share your unique referral link with others. When they register and make a deposit, you earn a 10% commission on their deposit amount. There is no cap on referral earnings, and commissions are paid instantly.',
  },
];

const STATS = [
  { value: '$10,250,000+', label: 'Total Investments' },
  { value: '15,847', label: 'Active Investors' },
  { value: '$2,450,000+', label: 'Total Returns Paid' },
  { value: '4.9/5', label: 'User Rating' },
];

const FOOTER_LINKS = {
  Company: ['About Us', 'Careers', 'Press', 'Blog'],
  Investment: ['Plans', 'Pricing', 'Returns Calculator', 'Risk Disclosure'],
  Support: ['Help Center', 'Live Chat', 'Email Support', 'FAQ'],
  Legal: ['Terms of Service', 'Privacy Policy', 'AML Policy', 'Cookie Policy'],
};

// ─── FAQ Accordion Item ─────────────────────────────────────────────────────
function FaqItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left hover:text-red-700 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-[15px] font-medium text-gray-900 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 pb-5' : 'max-h-0'}`}
      >
        <p className="text-sm leading-relaxed text-gray-500">{answer}</p>
      </div>
    </div>
  );
}

// ─── Star Rating ────────────────────────────────────────────────────────────
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-amber-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ── NAVBAR ────────────────────────────────────────────────────────── */}
      <nav
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b transition-shadow duration-300 ${
          scrolled ? 'border-gray-200 shadow-sm' : 'border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-bold text-lg tracking-tight text-gray-900">TESLA</span>
                <span className="text-lg font-light tracking-tight text-gray-900">PrimeCapital</span>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-red-700 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 transition-colors"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="text-sm font-medium text-white bg-red-700 hover:bg-red-800 px-5 py-2.5 rounded-lg transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-red-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-100 space-y-2">
                <a
                  href="/login"
                  className="block text-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="block text-center px-3 py-2.5 text-sm font-medium text-white bg-red-700 hover:bg-red-800 rounded-lg transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative bg-gray-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cybertruck.jpg"
            alt="Tesla Cybertruck"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-gray-950/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <FadeIn delay={0}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                Drive Your Investments Forward
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl">
                Premium managed investment plans backed by Tesla&apos;s innovation. Earn guaranteed daily returns with institutional-grade security.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/register"
                  className="inline-flex items-center px-7 py-3.5 bg-red-700 hover:bg-red-800 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Start Investing
                </a>
                <a
                  href="#plans"
                  className="inline-flex items-center px-7 py-3.5 border border-white/30 hover:border-white/60 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Learn More
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.45}>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
                {[
                  { value: '$10M+', label: 'Assets Managed' },
                  { value: '15,000+', label: 'Investors' },
                  { value: '99.9%', label: 'Uptime' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span className="text-sm text-gray-400">
                      <span className="text-white font-semibold">{item.value}</span>{' '}
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── INVESTMENT PLANS ──────────────────────────────────────────────── */}
      <section id="plans" className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Investment Plans
              </h2>
              <p className="mt-4 text-gray-500 text-lg">
                Choose the plan that fits your investment goals. All plans offer guaranteed daily returns with full capital protection.
              </p>
            </div>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INVESTMENT_PLANS.map((plan, idx) => (
              <FadeIn key={plan.name} delay={idx * 0.1}>
                <div
                  className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full ${
                    plan.premium ? 'ring-2 ring-red-700 relative' : 'border border-gray-200'
                  }`}
                >
                  {plan.premium && (
                    <div className="absolute top-4 right-4 z-10 bg-red-700 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      Popular
                    </div>
                  )}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={plan.image}
                      alt={`Tesla ${plan.name === 'Basic' ? 'Model Y' : plan.name === 'Silver' ? 'Model X' : plan.name === 'Gold' ? 'Model 3' : 'Model S'}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="mt-1 text-sm text-gray-400">{plan.priceRange}</p>
                    <div className="mt-4 space-y-2.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Daily Returns</span>
                        <span className="text-sm font-bold text-red-700">{plan.dailyReturn}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Duration</span>
                        <span className="text-sm font-semibold text-gray-900">{plan.duration}</span>
                      </div>
                    </div>
                    <a
                      href="/register"
                      className={`mt-5 block text-center text-sm font-semibold py-3 rounded-lg transition-colors ${
                        plan.premium
                          ? 'bg-red-700 hover:bg-red-800 text-white'
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────────── */}
      <section id="why-us" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Why TeslaPrimeCapital?
              </h2>
              <p className="mt-4 text-gray-500 text-lg">
                Built for serious investors who expect more from their investment platform.
              </p>
            </div>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, idx) => (
              <FadeIn key={feature.title} delay={idx * 0.08}>
                <div className="p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-300 h-full">
                  <div className="w-11 h-11 rounded-xl bg-red-50 text-red-700 flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                How It Works
              </h2>
              <p className="mt-4 text-gray-500 text-lg">
                Start earning in three simple steps. No complex setup required.
              </p>
            </div>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-14 left-[20%] right-[20%] h-px bg-gray-200" />

            {STEPS.map((step, idx) => (
              <FadeIn key={step.number} delay={idx * 0.15}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 w-28 h-14 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center">
                    <span className="text-2xl font-bold text-red-700">{step.number}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 max-w-xs leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS / TRUST BANNER ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {STATS.map((stat, idx) => (
              <FadeIn key={stat.label} delay={idx * 0.1}>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
                  <p className="mt-2 text-sm text-gray-500 font-medium">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Trusted by Thousands
              </h2>
              <p className="mt-4 text-gray-500 text-lg">
                Real feedback from verified investors on our platform.
              </p>
            </div>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <FadeIn key={t.name} delay={idx * 0.12}>
                <div className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition-shadow duration-300 h-full flex flex-col">
                  <svg className="w-8 h-8 text-red-700 opacity-30 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="mt-4 text-sm text-gray-600 leading-relaxed flex-1">{t.quote}</p>
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                        <p className="text-xs text-gray-400">{t.role}</p>
                      </div>
                      <StarRating count={t.stars} />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ───────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-gray-500 text-lg">
                Everything you need to know about investing with TeslaPrimeCapital.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-12 bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
              {FAQ_ITEMS.map((item, idx) => (
                <FaqItem
                  key={idx}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFaq === idx}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────────────────────── */}
      <section className="bg-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Ready to Start Earning?
            </h2>
            <p className="mt-5 text-lg text-red-100 max-w-xl mx-auto">
              Join over 15,000 investors already earning daily returns on TeslaPrimeCapital.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/register"
                className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 text-sm font-bold rounded-lg transition-colors"
              >
                Get Started Now
              </a>
              <a
                href="#footer"
                className="text-sm font-medium text-white/80 hover:text-white underline underline-offset-4 transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer id="footer" className="bg-gray-950 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <div className="flex items-baseline">
                  <span className="font-bold text-base tracking-tight text-white">TESLA</span>
                  <span className="text-base font-light tracking-tight text-white">PrimeCapital</span>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                Premium managed investment platform offering guaranteed daily returns with institutional-grade security.
              </p>
              {/* Social Icons */}
              <div className="mt-6 flex items-center gap-3">
                {/* X / Twitter */}
                <a href="#" className="w-9 h-9 rounded-lg bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors" aria-label="Twitter">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="w-9 h-9 rounded-lg bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                {/* Telegram */}
                <a href="#" className="w-9 h-9 rounded-lg bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors" aria-label="Telegram">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider">{heading}</h4>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">
              © 2024 TeslaPrimeCapital. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}