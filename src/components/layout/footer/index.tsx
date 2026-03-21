export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#040e03] border-t border-white/8 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-2">
            <img
              src="./assets/logo/artemis-brand.png"
              className="h-8 w-auto"
              alt="Artemis"
            />
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              Artemis is a smart waste management platform powering the next generation
              of waste infrastructure through real-time data, AI, and IoT.
            </p>
            {/* Partner logos */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2.5">
                <img
                  src="./assets/logo/bsu_logo.png"
                  className="w-8 h-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-80 transition-all"
                  alt="Batangas State University"
                />
                <span className="text-[10px] uppercase font-bold tracking-tight text-gray-600 leading-tight">
                  BatStateU<br />Main Campus
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <img
                  src="./assets/logo/emu_logo.png"
                  className="w-8 h-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-80 transition-all"
                  alt="EMU"
                />
                <span className="text-[10px] uppercase font-bold tracking-tight text-gray-600 leading-tight">
                  Environmental<br />Management Unit
                </span>
              </div>
            </div>
          </div>

          {/* Platform links */}
          <div className="space-y-5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Platform</h4>
            <ul className="space-y-3">
              {[
                { label: "Features", href: "#features" },
                { label: "Ecosystem", href: "#ecosystem" },
                { label: "Who It's For", href: "#market" },
                { label: "Pricing & Pilot", href: "#offer" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-gray-500 hover:text-[#8ecb6a] transition-colors no-underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className="space-y-5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "Team", href: "#team" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
                { label: "Login", href: "/login" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-gray-500 hover:text-[#8ecb6a] transition-colors no-underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © {currentYear} Artemis Waste Management System. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors no-underline">Privacy Policy</a>
            <a href="/terms" className="text-xs text-gray-600 hover:text-gray-400 transition-colors no-underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
