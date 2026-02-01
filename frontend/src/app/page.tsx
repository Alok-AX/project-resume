const features = [
  {
    title: "Smart CV Builder",
    description: "Access auto-formatting templates that look professional, pass automated screening, and highlight your best skills.",
    icon: "builder",
  },
  {
    title: "AI Cover Letter",
    description: "Generate tailored cover letters based on specific job descriptions in seconds. No more generic copy-pasting.",
    icon: "letter",
  },
  {
    title: "ATS Score Check",
    description: "Analyze your resume against job posts to beat the hiring bots. Get actionable insights to improve your rate.",
    icon: "check",
  },
  {
    title: "AI Writing Assistant",
    description: "Generate professional bullet points and experience descriptions instantly.",
    icon: "pen",
  },
  {
    title: "ATS-Friendly Templates",
    description: "Designs that are optimized to pass the ATS bots while looking professional.",
    icon: "template",
  },
  {
    title: "24/7 WhatsApp Support",
    description: "Chat with real career experts via WhatsApp for instant feedback when you need it.",
    icon: "support",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Upload or Input Data",
    description: "Upload your old CV or start with a blank template. Our AI extracts your data.",
    icon: "upload",
  },
  {
    step: "2",
    title: "Customize Design",
    description: "Choose from 50+ pro-designed templates. Adjust colors and layout to match.",
    icon: "palette",
  },
  {
    step: "3",
    title: "Download & Apply",
    description: "Export as PDF or share a link. Track your applications with our built-in tracker.",
    icon: "download",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    popular: false,
    features: [
      "1 Resume Template",
      "Basic Export (PDF)",
      "No ATS Scoring",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$12",
    period: "/mo",
    popular: true,
    features: [
      "Unlimited Templates",
      "AI Content Suggestions",
      "Unlimited ATS Checks",
      "AI Cover Letter Generator",
    ],
    cta: "Upgrade to Pro",
  },
  {
    name: "Expert",
    price: "$25",
    period: "/mo",
    popular: false,
    features: [
      "Everything in Pro",
      "Priority Support",
      "Human HR Review via WhatsApp",
    ],
    cta: "Contact Sales",
  },
];

const whyChoose = [
  {
    title: "AI Writing Assistant",
    description: "Generate professional content in seconds based on your role and experiences.",
    icon: "pen",
  },
  {
    title: "ATS-Friendly Templates",
    description: "Designs that are optimized to pass the ATS bots while looking professional.",
    icon: "template",
  },
  {
    title: "24/7 WhatsApp Support",
    description: "Chat with real career experts when you need them. Priority response within 24 hours.",
    icon: "support",
  },
  {
    title: "Cover Letter Gen",
    description: "Generate tailored cover letters for every application you send.",
    icon: "letter",
  },
];

type IconName = "upload" | "spark" | "download" | "pen" | "gauge" | "chat" | "letter" | "globe" | "track" | "builder" | "check" | "template" | "palette" | "support" | "letter";

function Icon({ name }: { name: IconName }) {
  const commonLight = "h-6 w-6 text-[#1a47e8]";
  const commonDark = "h-6 w-6 text-[#3b82f6]";

  switch (name) {
    case "upload":
      return (
        <svg className={commonLight} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 16V4" strokeLinecap="round" />
          <path d="M7 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 16v3h14v-3" strokeLinecap="round" />
        </svg>
      );
    case "builder":
      return (
        <svg className={commonLight} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 11l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "template":
      return (
        <svg className={commonLight} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M3 15h18" strokeLinecap="round" />
        </svg>
      );
    case "check":
      return (
        <svg className={commonLight} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "letter":
      return (
        <svg className={commonLight} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M4 8l8 5 8-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pen":
      return (
        <svg className={commonLight} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 20l4.5-1 9-9.5a2.5 2.5 0 10-3.5-3.5L5 15.5z" strokeLinejoin="round" />
          <path d="M13.5 6.5l4 4" strokeLinecap="round" />
        </svg>
      );
    case "support":
      return (
        <svg className={commonLight} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 17l-2 3V6a2 2 0 012-2h12a2 2 0 012 2v11a2 2 0 01-2 2H8z" strokeLinejoin="round" />
        </svg>
      );
    case "palette":
      return (
        <svg className={commonLight} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <circle cx="8" cy="9" r="1.5" fill="currentColor" />
          <circle cx="16" cy="9" r="1.5" fill="currentColor" />
          <circle cx="12" cy="15" r="1.5" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-800/80 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
      <span className="h-2 w-2 rounded-full bg-[#1a47e8]" />
      {label}
    </span>
  );
}

export default function Home() {
  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 py-6">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#1a47e8] text-white font-semibold text-sm">C</span>
            <span className="text-lg font-bold">CareerPad</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-300 md:flex">
            <a className="hover:text-slate-900 dark:hover:text-white" href="#features">Features</a>
            <a className="hover:text-slate-900 dark:hover:text-white" href="#pricing">Pricing</a>
            <a className="hover:text-slate-900 dark:hover:text-white" href="#templates">Templates</a>
          </nav>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <button className="rounded-full px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Login</button>
            <button className="rounded-full bg-[#1a47e8] px-5 py-2 text-white shadow-sm transition hover:bg-[#0f32b8]">Get Started</button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="grid gap-8 overflow-hidden rounded-3xl bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 px-6 sm:px-8 py-12 lg:grid-cols-2 lg:items-center lg:gap-12 mb-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 px-4 py-1 text-xs font-semibold text-[#1a47e8]">
              <span className="h-2 w-2 rounded-full bg-[#1a47e8]" />
              AI-POWERED CAREER GROWTH
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] dark:text-white">
              Land Your Dream Job with <span className="text-[#1a47e8]">Smart AI Tools</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
              Join 30,000+ professionals who accelerated their careers. Create ATS-friendly resumes, generate tailored cover letters, and get hired faster.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button className="rounded-full bg-[#1a47e8] hover:bg-[#0f32b8] px-6 py-3 text-sm font-semibold text-white shadow-sm transition">
                Build my CV Now
              </button>
              <button className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition hover:border-slate-300 dark:hover:border-slate-600">
                ▶ Watch Demo
              </button>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-4">
              <div className="flex -space-x-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-linear-to-br from-blue-400 to-blue-600 text-white text-xs font-bold">A</span>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-linear-to-br from-green-400 to-green-600 text-white text-xs font-bold">B</span>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-linear-to-br from-purple-400 to-purple-600 text-white text-xs font-bold">C</span>
              </div>
              <span>Trusted by professionals from Google, Amazon, & Meta</span>
            </div>
          </div>

          <div className="relative h-full min-h-75">
            <div className="relative mx-auto rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-4 shadow-xl">
              <div className="aspect-video rounded-xl bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">💼</div>
                  <p className="text-sm">CV Preview</p>
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 rounded-xl bg-white dark:bg-slate-950 shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 p-3 w-32">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">92%</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">ATS Score: 98/100</p>
                </div>
              </div>
              <div className="absolute -left-4 -top-4 rounded-full bg-white dark:bg-slate-950 shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 p-2 flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                Aisk Sharma
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 space-y-8" id="features">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Powerful Features for Job Seekers</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Our AI-powered tools help you beat the ATS and impress recruiters instantly.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-[#1a47e8]">
                  <Icon name={feature.icon as IconName} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-12 space-y-8 bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-3xl px-6 sm:px-8 -mx-4 sm:-mx-6 lg:-mx-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Why Choose CareerPad?</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Everything you need to land your next job, optimized for the modern recruitment process and dark mode lovers.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-[#1a47e8]">
                  <Icon name={item.icon as IconName} />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 space-y-8 mb-12" id="how">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">How it Works</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Get from zero to hero in three simple steps. No design skills required.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div key={item.title} className="relative text-center">
                <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-950/30 text-[#1a47e8]">
                  <Icon name={item.icon as IconName} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12 space-y-8 mb-12" id="pricing">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Choose Your Plan</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Simple pricing to accelerate your career.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border transition ${
                  plan.popular
                    ? 'border-[#1a47e8] bg-linear-to-b from-slate-50 dark:from-slate-900 to-white dark:to-slate-950 ring-2 ring-[#1a47e8] shadow-lg scale-105 md:scale-100'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#1a47e8] px-4 py-1 text-xs font-bold text-white">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{plan.name}</p>
                    <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
                      {plan.price}
                      <span className="text-sm text-slate-600 dark:text-slate-400">{plan.period}</span>
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="h-2 w-2 rounded-full bg-[#1a47e8]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full rounded-lg py-3 font-semibold transition ${
                      plan.popular
                        ? 'bg-[#1a47e8] text-white hover:bg-[#0f32b8]'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 rounded-3xl bg-linear-to-b from-[#1a47e8] to-[#0f32b8] px-6 sm:px-8 text-center text-white mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold mb-3">Ready to land your dream job?</h3>
          <p className="mx-auto max-w-xl text-white/90 mb-6">
            Join thousands of professionals who have upgraded their careers with CareerPad.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button className="rounded-lg bg-white text-[#1a47e8] px-6 py-3 font-semibold hover:bg-slate-100 transition">
              Get Started Free
            </button>
            <button className="rounded-lg border border-white/30 text-white px-6 py-3 font-semibold hover:bg-white/10 transition">
              💬 Chat with Sales
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#1a47e8] text-white font-semibold text-sm">C</span>
                CareerPad
              </div>
              <p className="max-w-xs text-sm text-slate-600 dark:text-slate-400">The smartest AI resume builder for modern professionals.</p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-8 text-sm sm:grid-cols-3">
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 dark:text-white">Product</h4>
                <div className="space-y-2 text-slate-600 dark:text-slate-400">
                  <a className="block hover:text-slate-900 dark:hover:text-white" href="#features">Features</a>
                  <a className="block hover:text-slate-900 dark:hover:text-white" href="#pricing">Pricing</a>
                  <a className="block hover:text-slate-900 dark:hover:text-white" href="#">Templates</a>
                  <a className="block hover:text-slate-900 dark:hover:text-white" href="#">Blog</a>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 dark:text-white">Resources</h4>
                <div className="space-y-2 text-slate-600 dark:text-slate-400">
                  <a className="block hover:text-slate-900 dark:hover:text-white" href="#">Resume Examples</a>
                  <a className="block hover:text-slate-900 dark:hover:text-white" href="#">Career Advice</a>
                  <a className="block hover:text-slate-900 dark:hover:text-white" href="#">Help Center</a>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 dark:text-white">Legal</h4>
                <div className="space-y-2 text-slate-600 dark:text-slate-400">
                  <a className="block hover:text-slate-900 dark:hover:text-white" href="#">Privacy Policy</a>
                  <a className="block hover:text-slate-900 dark:hover:text-white" href="#">Terms of Service</a>
                  <a className="block hover:text-slate-900 dark:hover:text-white" href="#">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            © 2025 CareerPad Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
