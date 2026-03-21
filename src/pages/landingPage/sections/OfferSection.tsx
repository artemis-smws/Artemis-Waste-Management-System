const steps = [
  {
    number: "01",
    title: "Start with Software",
    description:
      "Sign up and get immediate access to the Artemis web platform and mobile app. Begin monitoring and logging waste data from day one — no hardware required.",
    badge: "Freemium available",
    numberBg: "bg-[#216604]",
    badgeClass: "text-[#216604] bg-[#216604]/10",
    lineBg: "bg-[#216604]/30",
  },
  {
    number: "02",
    title: "Add Smart Bins",
    description:
      "Deploy IoT-enabled Artemis smart bins across your facility. We provide installation support and hardware integration into your existing Artemis account.",
    badge: "Hardware + Installation",
    numberBg: "bg-[#3b82f6]",
    badgeClass: "text-[#3b82f6] bg-[#3b82f6]/10",
    lineBg: "bg-[#3b82f6]/30",
  },
  {
    number: "03",
    title: "Unlock Premium Intelligence",
    description:
      "Activate advanced capabilities: AI-powered waste forecasting, automated report generation, in-house route optimization, and API access for custom integrations.",
    badge: "Premium subscription",
    numberBg: "bg-amber-500",
    badgeClass: "text-amber-600 bg-amber-500/10",
    lineBg: "bg-amber-500/30",
  },
  {
    number: "04",
    title: "Onboarding & Ongoing Support",
    description:
      "Our team provides custom engineering support, hands-on onboarding, staff training, and continuous technical assistance to ensure smooth operations.",
    badge: "Professional services",
    numberBg: "bg-emerald-500",
    badgeClass: "text-emerald-600 bg-emerald-500/10",
    lineBg: "bg-emerald-500/30",
  },
];

export default function OfferSection() {
  return (
    <section id="offer" className="py-24 px-6 bg-[#f8f9f6]">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 space-y-5">
          <div className="flex items-center justify-center gap-3">
            <span className="block w-8 h-px bg-[#216604]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#216604]">
              How to Get Started
            </span>
            <span className="block w-8 h-px bg-[#216604]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#171717] leading-tight">
            Adopt Artemis at your own{" "}
            <span className="text-[#216604]">pace</span>
          </h2>
          <p className="text-[#6b7280] text-lg max-w-2xl mx-auto leading-relaxed">
            Start with software and scale to full IoT deployment whenever you're ready.
            Artemis is designed for flexible, phased adoption.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-5">
          {steps.map((step) => (
            <div key={step.number} className="group flex items-stretch gap-5">
              {/* Left: number + connector line */}
              <div className="flex flex-col items-center shrink-0">
                <div className={`w-11 h-11 rounded-full ${step.numberBg} text-white flex items-center justify-center font-mono font-bold text-sm shadow-md`}>
                  {step.number}
                </div>
                <div className={`flex-1 w-0.5 mt-2 ${step.lineBg} rounded-full`} />
              </div>

              {/* Right: card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 flex-1 shadow-sm group-hover:shadow-md transition-shadow duration-200 mb-5 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-bold text-[#171717]">{step.title}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${step.badgeClass}`}>
                    {step.badge}
                  </span>
                </div>
                <p className="text-sm text-[#6b7280] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-[#6b7280] mb-5 text-sm">
            Ready to bring Artemis to your organization?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#216604] hover:bg-[#62A944] text-white font-bold px-9 py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-[#216604]/20 no-underline"
          >
            Request a Demo
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
