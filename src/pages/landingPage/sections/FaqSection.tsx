import { useState } from "react";
import { BsPlus, BsDash } from "react-icons/bs";

const faqs = [
  {
    q: "What is Artemis?",
    a: "Artemis is a smart waste management platform that combines a web dashboard, mobile app, and IoT-enabled smart trash bins to help organizations monitor waste, automate reporting, and improve collection efficiency.",
  },
  {
    q: "Who is Artemis designed for?",
    a: "Artemis is designed for universities, schools, commercial establishments, institutions, and local government units — primarily in the Philippines, with a broader Asia-Pacific opportunity.",
  },
  {
    q: "Does Artemis require hardware from the start?",
    a: "No. Organizations can start with the software platform alone — sign up, access the web and mobile app, and begin logging waste data immediately. IoT smart bins can be added as part of a later hardware rollout.",
  },
  {
    q: "What makes Artemis different from other waste management tools?",
    a: "Artemis offers lower-cost adoption, mobile data input, AI-powered reporting and forecasting, in-house collection route optimization, and seamless data streams — all in one integrated platform.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. Organizations get a one-month free trial. There is also a freemium tier for individual access to web and mobile features, so you can explore Artemis before committing.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 bg-[#f8f9f6]">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14 space-y-5">
          <div className="flex items-center justify-center gap-3">
            <span className="block w-8 h-px bg-[#216604]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#216604]">
              FAQ
            </span>
            <span className="block w-8 h-px bg-[#216604]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#171717] leading-tight">
            Common questions about Artemis
          </h2>
          <p className="text-[#6b7280] text-base">
            Everything you need to know before getting started.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? "border-[#216604]/30 bg-white shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
                >
                  <span className={`font-semibold text-sm leading-relaxed transition-colors duration-200 ${isOpen ? "text-[#216604]" : "text-[#171717] group-hover:text-[#216604]"}`}>
                    {faq.q}
                  </span>
                  <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isOpen
                      ? "bg-[#216604] text-white"
                      : "bg-gray-100 text-[#6b7280] group-hover:bg-[#216604]/10 group-hover:text-[#216604]"
                  }`}>
                    {isOpen ? <BsDash className="w-4 h-4" /> : <BsPlus className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5">
                    <div className="h-px bg-[#216604]/10 mb-4" />
                    <p className="text-sm text-[#6b7280] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom nudge */}
        <div className="mt-10 text-center">
          <p className="text-sm text-[#6b7280]">
            Still have questions?{" "}
            <a href="#contact" className="text-[#216604] font-semibold hover:underline">
              Reach out to our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
