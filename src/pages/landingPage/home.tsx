export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#071205]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/img/bg-img.png"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        {/* Gradient overlay — darker at top, fades to solid at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071205]/60 via-[#071205]/40 to-[#071205]" />
      </div>

      {/* Decorative leaf-shape blobs */}
      <div className="absolute top-24 right-[8%] w-72 h-72 rounded-full bg-[#216604]/15 blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-32 left-[5%] w-56 h-56 rounded-full bg-[#8ecb6a]/10 blur-[80px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/2 w-96 h-96 rounded-full bg-[#216604]/8 blur-[120px] pointer-events-none z-0 -translate-x-1/2" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center pt-28 pb-10">
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Text side */}
          <div className="space-y-8">
            {/* Eyebrow label */}
            <div className="flex items-center gap-3">
              <span className="block w-8 h-px bg-[#8ecb6a]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8ecb6a]">
                Smart Waste Infrastructure
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-extrabold text-white leading-[1.1] tracking-tight">
              Smart waste management for{" "}
              <span className="text-[#8ecb6a] relative">
                institutions.
                {/* Decorative underline */}
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0 5 Q50 0 100 5 Q150 10 200 5" stroke="#216604" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="text-gray-300/90 text-lg leading-relaxed max-w-xl">
              Artemis helps teams monitor bin capacity in real time, automate compliance
              reporting, and optimize collection — powered by web, mobile, and IoT-enabled
              smart bins.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#216604] hover:bg-[#62A944] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-xl shadow-[#216604]/30 no-underline text-base"
              >
                Book a Demo
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#ecosystem"
                className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 text-white font-bold px-8 py-4 rounded-xl border border-white/15 transition-all duration-200 backdrop-blur-sm no-underline text-base"
              >
                Explore Platform
              </a>
            </div>

            {/* Trust line */}
            <p className="text-xs text-white/30 font-medium tracking-wide pt-1">
              Deployed at Batangas State University · Backed by real operations data
            </p>
          </div>

          {/* Visual side */}
          <div className="relative hidden lg:block">
            {/* Dashboard mockup */}
            <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-2 rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src="./assets/img/dashboard-card-img.png"
                alt="Artemis Dashboard"
                className="rounded-xl w-full"
              />
            </div>
            {/* Map card float */}
            <div className="absolute -bottom-8 -left-8 z-20 bg-[#0f2b0c] border border-white/10 rounded-2xl shadow-2xl p-2 w-60 -rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="./assets/img/map-card-img.png"
                alt="Artemis Maps"
                className="rounded-xl w-full"
              />
            </div>
            {/* Glow */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#216604]/25 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#3b82f6]/10 rounded-full blur-[80px] -z-10 animate-pulse delay-700" />
          </div>
        </div>
      </div>

      {/* Stats bar pinned at bottom of hero */}
      <div className="relative z-10 border-t border-white/10 bg-white/4 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-3 divide-x divide-white/10">
          <div className="flex flex-col items-center gap-1 px-4">
            <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">Web</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#8ecb6a]">Platform</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-4">
            <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">Mobile</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#8ecb6a]">Access</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-4">
            <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">IoT</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#8ecb6a]">Sensors</span>
          </div>
        </div>
      </div>
    </div>
  );
}
