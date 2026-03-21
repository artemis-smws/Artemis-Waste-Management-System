const teamMembers = [
  {
    name: "Kairus Noah E. Tecson",
    role: "CEO",
    focus: "Business, Data Science & AI/ML Engineering",
    initials: "KT",
    ringClass: "ring-[#216604]/50",
    avatarBg: "bg-[#216604]",
    roleClass: "text-[#8ecb6a]",
  },
  {
    name: "Mark Angelo Maligalig",
    role: "Mobile Developer",
    focus: "Mobile Development & Route Optimization",
    initials: "MM",
    ringClass: "ring-[#3b82f6]/50",
    avatarBg: "bg-[#3b82f6]",
    roleClass: "text-[#93c5fd]",
  },
  {
    name: "John Luis Gomez",
    role: "IoT & UI/UX Engineer",
    focus: "UI/UX Design, IoT Engineering & Computer Vision",
    initials: "JG",
    ringClass: "ring-amber-500/50",
    avatarBg: "bg-amber-500",
    roleClass: "text-amber-400",
  },
  {
    name: "Nino Andrey Amboy",
    role: "Mobile Developer",
    focus: "Mobile Development & Route Optimization",
    initials: "NA",
    ringClass: "ring-emerald-500/50",
    avatarBg: "bg-emerald-500",
    roleClass: "text-emerald-400",
  },
  {
    name: "Joshua Clemente",
    role: "Software Engineer",
    focus: "Software Engineering & Route Optimization",
    initials: "JC",
    ringClass: "ring-rose-700/50",
    avatarBg: "bg-rose-700",
    roleClass: "text-rose-400",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 space-y-5">
          <div className="flex items-center justify-center gap-3">
            <span className="block w-8 h-px bg-[#216604]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#216604]">
              The Team
            </span>
            <span className="block w-8 h-px bg-[#216604]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#171717] leading-tight">
            Built by engineers who care about{" "}
            <span className="text-[#216604]">the mission</span>
          </h2>
          <p className="text-[#6b7280] text-lg max-w-2xl mx-auto leading-relaxed">
            Artemis is developed by a multidisciplinary team combining software
            engineering, mobile development, IoT, AI, and UX design.
          </p>
        </div>

        {/* Team cards */}
        <div className="flex flex-wrap justify-center gap-5">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group bg-white border border-gray-100 rounded-2xl p-6 w-full sm:w-52 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300"
            >
              {/* Avatar */}
              <div className={`w-16 h-16 rounded-full ${member.avatarBg} text-white text-xl font-bold flex items-center justify-center ring-4 ${member.ringClass} shadow-md group-hover:scale-105 transition-transform duration-300`}>
                {member.initials}
              </div>

              <div className="space-y-1">
                <p className="font-bold text-[#171717] text-sm leading-snug">{member.name}</p>
                <p className={`text-xs font-bold uppercase tracking-wide ${member.roleClass}`}>
                  {member.role}
                </p>
                <p className="text-xs text-[#9ca3af] leading-relaxed mt-1">{member.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
