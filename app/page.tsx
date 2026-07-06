"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Users,
  Shield,
  Zap,
  Building2,
  Wrench,
  Home as HomeIcon,
  Lightbulb,
  ChevronRight,
  ChevronDown,
  Check,
  Star,
  Network,
  BarChart3,
  MessageSquare,
  DollarSign,
  Play,
  Hammer,
  ShieldCheck,
  BadgeCheck,
  CircleDollarSign,
  AlertTriangle,
  Repeat,
  Lock,
  UserCheck,
  ArrowRightLeft,
  Plug,
  HandshakeIcon,
} from "lucide-react";

/* ── Animated counter ── */
function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ── Constellation background ── */
function NetworkAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none">
        {[
          { cx: 150, cy: 120, delay: 0 }, { cx: 350, cy: 80, delay: 0.5 },
          { cx: 550, cy: 200, delay: 1 }, { cx: 750, cy: 100, delay: 1.5 },
          { cx: 950, cy: 180, delay: 2 }, { cx: 200, cy: 350, delay: 0.8 },
          { cx: 450, cy: 400, delay: 1.2 }, { cx: 700, cy: 350, delay: 1.8 },
          { cx: 900, cy: 420, delay: 0.3 }, { cx: 1050, cy: 300, delay: 1.6 },
          { cx: 100, cy: 500, delay: 2.2 }, { cx: 600, cy: 520, delay: 0.7 },
        ].map((node, i) => (
          <g key={i}>
            <circle cx={node.cx} cy={node.cy} r="4" fill="#00d4aa" opacity="0.8">
              <animate attributeName="r" values="3;6;3" dur="3s" begin={`${node.delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" begin={`${node.delay}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        {[
          { x1: 150, y1: 120, x2: 350, y2: 80 }, { x1: 350, y1: 80, x2: 550, y2: 200 },
          { x1: 550, y1: 200, x2: 750, y2: 100 }, { x1: 750, y1: 100, x2: 950, y2: 180 },
          { x1: 200, y1: 350, x2: 450, y2: 400 }, { x1: 450, y1: 400, x2: 700, y2: 350 },
          { x1: 700, y1: 350, x2: 900, y2: 420 }, { x1: 550, y1: 200, x2: 450, y2: 400 },
          { x1: 750, y1: 100, x2: 700, y2: 350 }, { x1: 950, y1: 180, x2: 1050, y2: 300 },
          { x1: 1050, y1: 300, x2: 900, y2: 420 }, { x1: 200, y1: 350, x2: 150, y2: 120 },
          { x1: 100, y1: 500, x2: 200, y2: 350 }, { x1: 600, y1: 520, x2: 450, y2: 400 },
          { x1: 600, y1: 520, x2: 700, y2: 350 },
        ].map((line, i) => (
          <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="url(#lineGradient)" strokeWidth="1" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${4 + i * 0.3}s`} repeatCount="indefinite" />
          </line>
        ))}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4aa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const INDUSTRIES = [
  "AV Integrators", "Plumbers", "Electricians", "Real Estate Agents",
  "House Flippers", "Architects", "Home Builders", "HVAC Contractors",
  "Restaurant Supply", "Tile & Flooring", "Roofing", "Landscapers", "Other",
];

/* ── Wordmark ── */
function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <ShieldCheck className="w-[1.1em] h-[1.1em] text-[#00d4aa] shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display font-extrabold tracking-tight text-gradient">Vouch</span>
        <span className="text-[9px] font-semibold tracking-widest uppercase text-[#8b9bb4] mt-0.5 whitespace-nowrap">
          by Revenue Engine
        </span>
      </span>
    </span>
  );
}

/* ── Main page ── */
export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [company, setCompany] = useState(""); // honeypot — left blank by real users
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !industry || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, industry, company }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setIndustry("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-[#f0f4f8]">

      {/* ── NAVBAR ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a1628]/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}>
        <nav className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <Logo className="text-xl md:text-2xl" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["how-it-works","vetting","integrations","flippers","pricing"].map(id => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-sm text-[#8b9bb4] hover:text-white transition-colors capitalize">
                {id.replace(/-/g," ")}
              </button>
            ))}
          </div>
          <button
            className="hidden md:inline-flex items-center px-5 py-2 rounded-lg bg-[#00d4aa] hover:bg-[#00b894] text-[#0a1628] font-semibold text-sm transition-all duration-200 active:scale-[0.97]"
            onClick={() => scrollTo("waitlist")}>
            Apply Now
          </button>
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#8b9bb4] hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}>
            <div className={`w-5 h-0.5 bg-current mb-1 transition-transform duration-200 ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <div className={`w-5 h-0.5 bg-current mb-1 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </nav>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0a1628]/95 backdrop-blur-xl border-t border-white/5 px-4 py-4 flex flex-col gap-4 shadow-2xl">
            {["how-it-works","vetting","integrations","flippers","pricing"].map(id => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-sm text-[#8b9bb4] hover:text-white transition-colors capitalize text-left">
                {id.replace(/-/g," ")}
              </button>
            ))}
            <button onClick={() => scrollTo("waitlist")}
              className="w-full py-2.5 rounded-lg bg-[#00d4aa] text-[#0a1628] font-semibold text-sm">
              Apply Now
            </button>
          </div>
        )}
      </header>

      {/* Backdrop scrim for mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <NetworkAnimation />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/50 via-[#0a1628]/80 to-[#0a1628]" />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20 mb-6">
                <Lock className="w-3.5 h-3.5" />
                Invite-Only Network for Vetted Trade Professionals
              </span>
            </motion.div>

            <motion.h1
              className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}>
              Send a referral. Get paid.{" "}
              <span className="text-gradient">That simple.</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-[#8b9bb4] max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}>
              Vouch is the exclusive referral network where vetted local trades —
              plumbers, electricians, AV integrators, builders, and more — exchange
              qualified leads and earn referral fees automatically.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}>
              <button
                onClick={() => scrollTo("waitlist")}
                className="flex items-center gap-2 px-8 h-12 rounded-lg bg-[#00d4aa] hover:bg-[#00b894] text-[#0a1628] font-bold text-base glow-teal transition-all duration-200 active:scale-[0.97]">
                Apply for Early Access <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("how-it-works")}
                className="flex items-center gap-2 px-8 h-12 rounded-lg border border-[#2a3a5c] text-[#8b9bb4] hover:text-white hover:border-[#3b82f6]/50 transition-all duration-200">
                See How It Works
              </button>
            </motion.div>

            <motion.div
              className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#8b9bb4]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a2744] to-[#2a3a5c] border-2 border-[#0a1628] flex items-center justify-center">
                      <Users className="w-3.5 h-3.5 text-[#00d4aa]" />
                    </div>
                  ))}
                </div>
                <span>75+ businesses on the waitlist</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-[#2a3a5c]" />
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00d4aa]" />
                <span>Licensed &amp; insured members only</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <section id="video" className="py-20">
        <div className="container">
          <motion.div className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">See how it works in 60 seconds</h2>
            <p className="text-[#8b9bb4] text-lg max-w-2xl mx-auto">
              Watch how vetted trade partners use Vouch to build profitable referral relationships.
            </p>
          </motion.div>

          <motion.div className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#2a3a5c]/50 bg-[#1a2744]/50">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[#00d4aa]/20 border-2 border-[#00d4aa]/40 flex items-center justify-center">
                  <Play className="w-8 h-8 text-[#00d4aa] ml-1" />
                </div>
                <p className="text-[#8b9bb4] text-sm">Video coming soon</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1e36]/50 to-transparent" />
        <div className="container relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20 mb-4">
              Dead Simple
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">The referral loop that pays you</h2>
            <p className="text-[#8b9bb4] text-lg max-w-2xl mx-auto">
              No complicated setup. No weekly meetings. Just send referrals, receive referrals, and get paid.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { step: "01", icon: <ArrowRightLeft className="w-6 h-6" />, title: "Send a Referral", description: "Your client needs a plumber? A roofer? Send their name to a vetted partner in the network with one tap." },
                { step: "02", icon: <HandshakeIcon className="w-6 h-6" />, title: "Partner Closes", description: "Your partner follows up, does great work, and closes the job. Both of you track progress in real-time." },
                { step: "03", icon: <DollarSign className="w-6 h-6" />, title: "You Get Paid", description: "Referral fee is calculated automatically and paid out. No invoicing, no chasing. Just revenue." },
              ].map((item, i) => (
                <motion.div key={i} className="text-center"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#00d4aa]/20 to-[#3b82f6]/20 border border-[#00d4aa]/30 mb-4 text-[#00d4aa]">
                    {item.icon}
                  </div>
                  <div className="text-xs font-semibold text-[#00d4aa] tracking-widest uppercase mb-2">Step {item.step}</div>
                  <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#8b9bb4] text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="p-6 rounded-2xl bg-gradient-to-r from-[#00d4aa]/5 to-[#3b82f6]/5 border border-[#00d4aa]/20 text-center"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-lg font-medium">
                <span className="text-[#00d4aa]">Referring partner:</span> Send a name, get paid when it closes.{" "}
                <span className="text-[#3b82f6]">Receiving partner:</span> Get pre-qualified leads from trusted pros. No ad spend.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VETTING ── */}
      <section id="vetting" className="py-24">
        <div className="container">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20 mb-4">
              <Shield className="w-3.5 h-3.5" /> Vetted Members Only
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              This isn&apos;t Thumbtack. It&apos;s a private network.
            </h2>
            <p className="text-[#8b9bb4] text-lg max-w-2xl mx-auto">
              Every member passes our vetting process before they can send or receive a single referral. This protects your reputation and ensures every lead goes to a pro who delivers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div className="space-y-6"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              {[
                { icon: <BadgeCheck className="w-5 h-5" />, title: "License Verification", description: "We verify active state and local trade licenses before granting network access." },
                { icon: <Shield className="w-5 h-5" />, title: "Insurance Confirmation", description: "General liability and workers' comp verified. No coverage gaps allowed." },
                { icon: <UserCheck className="w-5 h-5" />, title: "Professional References", description: "Minimum 3 references from other trade professionals — not homeowner reviews." },
                { icon: <Star className="w-5 h-5" />, title: "Ongoing Quality Standards", description: "Members maintain a minimum rating from partners. Fall below? You're out." },
                { icon: <Lock className="w-5 h-5" />, title: "Invite & Application Only", description: "No open signups. Apply or get invited by an existing member to join." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center text-[#00d4aa]">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-base mb-1">{item.title}</h3>
                    <p className="text-[#8b9bb4] text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div className="p-8 rounded-2xl bg-[#1a2744]/60 border border-[#2a3a5c]/50"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="font-display font-bold text-xl mb-6">Why exclusivity matters</h3>
              <div className="space-y-5">
                {[
                  { for: "For referring partners", benefit: "You never risk your reputation sending a client to someone who won't deliver." },
                  { for: "For receiving partners", benefit: "Every lead comes from a trusted pro — not a random internet form. Conversion rates skyrocket." },
                  { for: "For clients", benefit: "They get referred to verified, insured professionals. No more gambling on contractors." },
                  { for: "For the network", benefit: "Quality begets quality. The best contractors attract the best partners, creating a flywheel of trust." },
                ].map((item, i) => (
                  <div key={i} className="pb-4 border-b border-[#2a3a5c]/30 last:border-0 last:pb-0">
                    <div className="text-xs font-semibold text-[#00d4aa] uppercase tracking-wider mb-1">{item.for}</div>
                    <p className="text-sm text-[#f0f4f8] leading-relaxed">{item.benefit}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS ── */}
      <section id="integrations" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1e36]/40 to-transparent" />
        <div className="container relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20 mb-4">
              <Plug className="w-3.5 h-3.5" /> Works Where You Work
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Plugs into your existing workflow</h2>
            <p className="text-[#8b9bb4] text-lg max-w-2xl mx-auto">
              Referral leads flow directly into the tools you already use. No double-entry. No switching platforms. Just leads appearing in your pipeline.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {[
                { name: "Go High Level", category: "CRM & Marketing" },
                { name: "Jobber", category: "Field Service" },
                { name: "Housecall Pro", category: "Field Service" },
                { name: "ServiceTitan", category: "Field Service" },
                { name: "Facebook Groups", category: "Social & Community" },
                { name: "Salesforce", category: "CRM" },
                { name: "HubSpot", category: "CRM & Marketing" },
                { name: "QuickBooks", category: "Accounting" },
                { name: "Zapier", category: "Automation" },
                { name: "Google Calendar", category: "Scheduling" },
                { name: "Stripe", category: "Payments" },
                { name: "Slack", category: "Communication" },
              ].map((integration, i) => (
                <motion.div key={i}
                  className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl bg-[#1a2744]/40 border border-[#2a3a5c]/40 hover:border-[#00d4aa]/20 hover:bg-[#1a2744]/60 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}>
                  <div className="w-10 h-10 rounded-lg bg-[#2a3a5c]/50 flex items-center justify-center">
                    <Plug className="w-5 h-5 text-[#8b9bb4]" />
                  </div>
                  <span className="text-sm font-medium text-center">{integration.name}</span>
                  <span className="text-xs text-[#4a5568]">{integration.category}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <ArrowRightLeft className="w-5 h-5" />, title: "Auto-Sync Leads", description: "Referrals land directly in your CRM pipeline. No manual entry, no missed leads." },
                { icon: <MessageSquare className="w-5 h-5" />, title: "Facebook Group Posting", description: "Share your verified status and available services to local trade groups automatically." },
                { icon: <BarChart3 className="w-5 h-5" />, title: "Revenue Attribution", description: "Track which referral partners generate the most revenue — right inside your existing dashboard." },
              ].map((item, i) => (
                <motion.div key={i} className="p-5 rounded-xl bg-[#1a2744]/30 border border-[#2a3a5c]/30"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center text-[#3b82f6] mb-3">
                    {item.icon}
                  </div>
                  <h3 className="font-display font-semibold text-base mb-1">{item.title}</h3>
                  <p className="text-[#8b9bb4] text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOUSE FLIPPERS ── */}
      <section id="flippers" className="py-24">
        <div className="container">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20 mb-4">
              <Hammer className="w-3.5 h-3.5" /> Use Case: House Flippers
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">The house flipper&apos;s secret weapon</h2>
            <p className="text-[#8b9bb4] text-lg max-w-2xl mx-auto">
              Flippers need reliable, licensed, and fairly-priced contractors across a dozen trades for every single project. Vouch becomes their vetted contractor rolodex.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            <motion.div className="p-8 rounded-2xl bg-[#1a2744]/50 border border-[#2a3a5c]/50"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#ef4444]/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
                </div>
                <h3 className="font-display font-bold text-lg">The Flipper&apos;s Nightmare</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Unlicensed contractors who disappear mid-job",
                  "No way to verify insurance or credentials upfront",
                  "Wildly inconsistent pricing with no market benchmarks",
                  "Scammy subs who cut corners on tile, roofing, or foundation work",
                  "Starting from scratch finding new trades in each market",
                ].map((pain, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#8b9bb4]">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#ef4444]/10 flex items-center justify-center mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                    </span>
                    {pain}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="p-8 rounded-2xl bg-[#1a2744]/50 border border-[#00d4aa]/20"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#00d4aa]" />
                </div>
                <h3 className="font-display font-bold text-lg">The Vouch Solution</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { icon: <BadgeCheck className="w-4 h-4" />, text: "Every contractor is verified — licensed, insured, and rated by other pros" },
                  { icon: <CircleDollarSign className="w-4 h-4" />, text: "Transparent pricing benchmarks so you know you're getting fair rates" },
                  { icon: <Repeat className="w-4 h-4" />, text: "Build a go-to crew across tile, flooring, roofing, HVAC, plumbing, and more" },
                  { icon: <Star className="w-4 h-4" />, text: "Professional ratings from other flippers and GCs — not random homeowner reviews" },
                  { icon: <Network className="w-4 h-4" />, text: "Take your trusted network with you to any market you flip in" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#f0f4f8]">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#00d4aa]/20 flex items-center justify-center mt-0.5 text-[#00d4aa]">
                      {item.icon}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div className="mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-center text-sm text-[#8b9bb4] mb-4 font-medium uppercase tracking-wider">
              Trades every flipper needs on speed dial
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Tile Installer","Flooring","Roofing","Windows","Plumber","Landscaper","Foundation","HVAC","Electrician","Painter","Drywall","Cabinetry"].map((trade, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#1a2744] border border-[#2a3a5c]/50 text-[#8b9bb4] hover:border-[#00d4aa]/30 hover:text-[#00d4aa] transition-all duration-200 cursor-default">
                  {trade}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARKET STATS ── */}
      <section id="market" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/5 via-[#0d1e36] to-[#3b82f6]/5" />
        <div className="container relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20 mb-4">
              Market Opportunity
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">A $1.17B market with no clear leader</h2>
            <p className="text-[#8b9bb4] text-lg max-w-2xl mx-auto">
              The referral marketing software market is projected to reach $1.17 billion by 2034, growing at 12.3% CAGR. Yet no platform owns the B2B local trade referral space.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: 83, suffix: "%", label: "of customers willing to refer", sublabel: "but only 29% actually do" },
              { value: 3, suffix: "x", label: "higher conversion rate", sublabel: "on referred leads vs. cold" },
              { value: 65, suffix: "%", label: "of service revenue", sublabel: "comes from referrals" },
              { value: 30, suffix: "%", label: "better conversion", sublabel: "than other marketing channels" },
            ].map((stat, i) => (
              <motion.div key={i}
                className="text-center p-6 rounded-xl bg-[#1a2744]/40 border border-[#2a3a5c]/40 hover:border-[#00d4aa]/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="font-display font-extrabold text-4xl md:text-5xl text-[#00d4aa] mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-medium text-sm mb-1">{stat.label}</div>
                <div className="text-xs text-[#8b9bb4]">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="py-24">
        <div className="container">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Built for every trade that thrives on partnerships
            </h2>
            <p className="text-[#8b9bb4] text-lg max-w-2xl mx-auto">
              Any business that serves homeowners, property managers, or commercial clients can benefit from cross-trade referrals.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: <Lightbulb className="w-6 h-6" />, name: "AV Integrators", color: "from-[#00d4aa] to-[#00b894]" },
              { icon: <Wrench className="w-6 h-6" />, name: "Plumbers", color: "from-[#3b82f6] to-[#2563eb]" },
              { icon: <Zap className="w-6 h-6" />, name: "Electricians", color: "from-[#f59e0b] to-[#d97706]" },
              { icon: <HomeIcon className="w-6 h-6" />, name: "Real Estate Agents", color: "from-[#8b5cf6] to-[#7c3aed]" },
              { icon: <Hammer className="w-6 h-6" />, name: "House Flippers", color: "from-[#ef4444] to-[#dc2626]" },
              { icon: <Building2 className="w-6 h-6" />, name: "Architects", color: "from-[#ec4899] to-[#db2777]" },
              { icon: <Building2 className="w-6 h-6" />, name: "Home Builders", color: "from-[#06b6d4] to-[#0891b2]" },
              { icon: <Wrench className="w-6 h-6" />, name: "HVAC Contractors", color: "from-[#10b981] to-[#059669]" },
              { icon: <Building2 className="w-6 h-6" />, name: "Restaurant Supply", color: "from-[#f97316] to-[#ea580c]" },
              { icon: <Wrench className="w-6 h-6" />, name: "Tile & Flooring", color: "from-[#a855f7] to-[#9333ea]" },
              { icon: <Building2 className="w-6 h-6" />, name: "Roofing", color: "from-[#64748b] to-[#475569]" },
              { icon: <Wrench className="w-6 h-6" />, name: "Landscapers", color: "from-[#22c55e] to-[#16a34a]" },
            ].map((industry, i) => (
              <motion.div key={i}
                className="flex flex-col items-center gap-3 p-5 rounded-xl bg-[#1a2744]/30 border border-[#2a3a5c]/30 hover:border-[#00d4aa]/20 hover:bg-[#1a2744]/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center text-white shadow-lg`}>
                  {industry.icon}
                </div>
                <span className="text-sm font-medium text-center">{industry.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1e36]/40 to-transparent" />
        <div className="container relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20 mb-4">
              Simple Pricing
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Plans that scale with your network</h2>
            <p className="text-[#8b9bb4] text-lg max-w-2xl mx-auto">
              Start free. Upgrade when your referral partnerships start generating serious revenue.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter */}
            <motion.div className="relative p-8 rounded-2xl bg-[#1a2744]/50 border border-[#2a3a5c]/50 hover:border-[#2a3a5c] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="mb-6">
                <h3 className="font-display font-bold text-xl mb-1">Starter</h3>
                <p className="text-sm text-[#8b9bb4]">Get your feet wet</p>
              </div>
              <div className="mb-6">
                <span className="font-display font-extrabold text-4xl">$0</span>
                <span className="text-[#8b9bb4] text-sm">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["Up to 3 active trade partners","Basic partner matching","Manual referral tracking","In-app messaging","Community access"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-[#8b9bb4]">
                    <Check className="w-4 h-4 text-[#00d4aa] shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo("waitlist")}
                className="w-full h-11 rounded-lg border border-[#2a3a5c] text-[#8b9bb4] hover:text-white hover:border-[#00d4aa]/50 transition-all duration-200 active:scale-[0.97] font-medium text-sm">
                Join Free
              </button>
            </motion.div>

            {/* Pro */}
            <motion.div className="relative p-8 rounded-2xl bg-[#1a2744]/70 border border-[#00d4aa]/30 hover:border-[#00d4aa]/50 transition-all duration-300 glow-teal-sm"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-[#00d4aa] text-[#0a1628]">Most Popular</span>
              </div>
              <div className="mb-6">
                <h3 className="font-display font-bold text-xl mb-1">Pro</h3>
                <p className="text-sm text-[#8b9bb4]">For serious growth</p>
              </div>
              <div className="mb-6">
                <span className="font-display font-extrabold text-4xl">$79</span>
                <span className="text-[#8b9bb4] text-sm">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["Unlimited trade partners","AI-powered smart matching","Automated referral tracking","Referral fee management","ROI dashboard & analytics","CRM integrations (GHL, Jobber, etc.)","Verified business badge"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-[#f0f4f8]">
                    <Check className="w-4 h-4 text-[#00d4aa] shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo("waitlist")}
                className="w-full h-11 rounded-lg bg-[#00d4aa] hover:bg-[#00b894] text-[#0a1628] font-bold transition-all duration-200 active:scale-[0.97] text-sm">
                Apply for Access
              </button>
            </motion.div>

            {/* Enterprise */}
            <motion.div className="relative p-8 rounded-2xl bg-[#1a2744]/50 border border-[#2a3a5c]/50 hover:border-[#2a3a5c] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="mb-6">
                <h3 className="font-display font-bold text-xl mb-1">Enterprise</h3>
                <p className="text-sm text-[#8b9bb4]">For multi-location teams</p>
              </div>
              <div className="mb-6">
                <span className="font-display font-extrabold text-4xl">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["Everything in Pro","Multi-location management","Team accounts & permissions","Automated payout processing","White-label partner portal","Dedicated account manager","Custom API integrations","SLA & priority support"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-[#8b9bb4]">
                    <Check className="w-4 h-4 text-[#00d4aa] shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo("waitlist")}
                className="w-full h-11 rounded-lg border border-[#2a3a5c] text-[#8b9bb4] hover:text-white hover:border-[#3b82f6]/50 transition-all duration-200 active:scale-[0.97] font-medium text-sm">
                Contact Sales
              </button>
            </motion.div>
          </div>

          <motion.p className="text-center text-sm text-[#4a5568] mt-8"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            All plans include a 14-day free trial. No credit card required to start.
          </motion.p>
        </div>
      </section>

      {/* ── WAITLIST CTA ── */}
      <section id="waitlist" className="py-24">
        <div className="container">
          <motion.div className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="p-10 rounded-2xl bg-gradient-to-b from-[#1a2744] to-[#0f1e36] border border-[#2a3a5c]/50 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#00d4aa]/10 blur-3xl rounded-full" />
              <div className="relative z-10">
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Ready to join the network?</h2>
                <p className="text-[#8b9bb4] text-lg mb-8">
                  Apply for early access. Spots are limited — we&apos;re onboarding vetted professionals market by market. Early members lock in lifetime preferred rates.
                </p>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xl mx-auto text-left">
                    <input
                      type="text"
                      name="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-12 px-4 rounded-lg bg-[#0a1628] border border-[#2a3a5c] text-white placeholder:text-[#4a5568] focus:outline-none focus:border-[#00d4aa] focus:ring-2 focus:ring-[#00d4aa]/20 text-sm"
                      />
                      <input
                        type="email"
                        placeholder="Business email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 px-4 rounded-lg bg-[#0a1628] border border-[#2a3a5c] text-white placeholder:text-[#4a5568] focus:outline-none focus:border-[#00d4aa] focus:ring-2 focus:ring-[#00d4aa]/20 text-sm"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="h-12 px-4 rounded-lg bg-[#0a1628] border border-[#2a3a5c] text-white placeholder:text-[#4a5568] focus:outline-none focus:border-[#00d4aa] focus:ring-2 focus:ring-[#00d4aa]/20 text-sm"
                      />
                      <div className="relative">
                        <select
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          required
                          className="w-full h-12 pl-4 pr-10 rounded-lg bg-[#0a1628] border border-[#2a3a5c] text-white focus:outline-none focus:border-[#00d4aa] focus:ring-2 focus:ring-[#00d4aa]/20 text-sm appearance-none disabled:opacity-60"
                        >
                          <option value="" disabled>Select your industry</option>
                          {INDUSTRIES.map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#8b9bb4] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <button type="submit" disabled={submitting}
                      className="flex items-center justify-center gap-1.5 h-12 px-6 rounded-lg bg-[#00d4aa] hover:bg-[#00b894] text-[#0a1628] font-bold whitespace-nowrap transition-all duration-200 active:scale-[0.97] text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                      {submitting ? "Submitting..." : <>Apply Now <ChevronRight className="w-4 h-4" /></>}
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20">
                    <Check className="w-5 h-5 text-[#00d4aa]" />
                    <span className="text-[#00d4aa] font-medium">
                      Application received! We&apos;ll review and be in touch within 48 hours.
                    </span>
                  </div>
                )}

                {error && (
                  <p className="text-sm text-[#ef4444] mt-3" role="alert">{error}</p>
                )}

                <p className="text-xs text-[#4a5568] mt-4">No spam. No credit card required. Vetted professionals only.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 border-t border-[#2a3a5c]/30">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo className="text-xl" />
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#8b9bb4]">
              {["how-it-works","vetting","integrations","flippers","pricing"].map(id => (
                <button key={id} onClick={() => scrollTo(id)} className="hover:text-white transition-colors capitalize">
                  {id.replace(/-/g," ")}
                </button>
              ))}
            </div>
            <div className="text-sm text-[#4a5568]">&copy; 2026 Revenue Engine. All rights reserved.</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
