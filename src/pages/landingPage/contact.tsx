import Footer from "../../components/layout/footer";
import { BsEnvelope, BsPhone, BsGeoAlt } from "react-icons/bs";

export default function Contact() {
  return (
    <div id="contact" className="bg-[#071205]">
      {/* Contact section */}
      <section id="contact-form" className="relative overflow-hidden py-24 px-6">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8ecb6a]/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#216604]/15 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <span className="block w-8 h-px bg-[#8ecb6a]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8ecb6a]">
                Get Started
              </span>
              <span className="block w-8 h-px bg-[#8ecb6a]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Bring smart waste infrastructure<br className="hidden md:block" /> to your organization.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Pilot Artemis in your campus, institution, or commercial site.
              Join the organizations powering the next generation of waste infrastructure.
            </p>
          </div>

          {/* Info + Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left info */}
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="block w-8 h-px bg-[#8ecb6a]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8ecb6a]">
                    Get In Touch
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Have questions?<br />
                  <span className="text-[#8ecb6a]">Reach out to our team.</span>
                </h2>
                <p className="text-gray-400 text-base leading-relaxed max-w-md">
                  We're here to help you implement smarter waste management solutions
                  for your organization or community.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  { icon: BsEnvelope, label: "Email Us", value: "support@artemissmws.com" },
                  { icon: BsPhone, label: "Call Us", value: "+63 900 000 0000" },
                  { icon: BsGeoAlt, label: "Visit Us", value: "Quezon City, Philippines" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-white/6 border border-white/10 rounded-xl flex items-center justify-center text-[#8ecb6a] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</p>
                      <p className="text-sm font-semibold text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#faq"
                  className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 text-white font-bold px-8 py-4 rounded-xl border border-white/15 transition-all duration-200 no-underline"
                >
                  Read FAQ
                </a>
              </div>
            </div>

            {/* Right form */}
            <form className="bg-white/4 border border-white/10 rounded-2xl p-8 flex flex-col gap-5 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="first-name" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">First Name</label>
                <input
                  id="first-name"
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-[#216604]/40 focus:border-[#216604]/60 outline-none transition-all text-sm"
                  placeholder="John"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="last-name" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                <input
                  id="last-name"
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-[#216604]/40 focus:border-[#216604]/60 outline-none transition-all text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-[#216604]/40 focus:border-[#216604]/60 outline-none transition-all text-sm"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-[#216604]/40 focus:border-[#216604]/60 outline-none transition-all resize-none text-sm"
                placeholder="Tell us about your organization..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#216604] hover:bg-[#62A944] text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#216604]/20 mt-1"
            >
              Send Message
            </button>
          </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
