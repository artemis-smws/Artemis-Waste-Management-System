import {
  Globe,
  Smartphone,
  Cpu,
  BarChart2,
  Map as MapIcon,
  FileText,
  Bell,
  MapPin,
  BatteryCharging,
  Languages,
  Moon,
  Users,
} from "lucide-react";

const products = [
  {
    icon: Globe,
    label: "Web Platform",
    tagline: "Central command for admins and stakeholders.",
    image: "./assets/img/dashboard-card-img.png",
    color: "#216604",
    lightBg: "bg-[#f0f7ec]",
    features: [
      { icon: BarChart2, text: "Dashboard with data visualization" },
      { icon: MapIcon, text: "Map view for bin monitoring" },
      { icon: FileText, text: "On-demand report generation" },
      { icon: Users, text: "Admin controls and access management" },
    ],
  },
  {
    icon: Smartphone,
    label: "Mobile App",
    tagline: "Field-friendly monitoring and data input on the go.",
    image: "./assets/img/mobile-card-img.png",
    color: "#3b82f6",
    lightBg: "bg-[#eff6ff]",
    features: [
      { icon: MapIcon, text: "Live map view of all bins" },
      { icon: Bell, text: "Mobile notifications for full bins" },
      { icon: Languages, text: "English & Tagalog support" },
      { icon: Moon, text: "Light and dark mode" },
    ],
  },
  {
    icon: Cpu,
    label: "Smart Trash Bin",
    tagline: "IoT-enabled bins that report their own status.",
    image: "./assets/img/iot-card-img.png",
    color: "#f59e0b",
    lightBg: "bg-[#fffbeb]",
    features: [
      { icon: BarChart2, text: "Real-time fill level detection" },
      { icon: MapPin, text: "Built-in GPS tracking" },
      { icon: BatteryCharging, text: "Solar-powered with battery backup" },
      { icon: Bell, text: "Instant alerts when bins need collection" },
    ],
  },
];

export default function EcosystemSection() {
  return (
    <section id="ecosystem" className="py-24 px-6 bg-[#f8f9f6]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 space-y-5">
          <div className="flex items-center justify-center gap-3">
            <span className="block w-8 h-px bg-[#216604]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#216604]">
              The Ecosystem
            </span>
            <span className="block w-8 h-px bg-[#216604]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#171717] leading-tight">
            One platform,{" "}
            <span className="text-[#216604]">three connected products</span>
          </h2>
          <p className="text-[#6b7280] text-lg max-w-2xl mx-auto leading-relaxed">
            Artemis connects your web dashboard, mobile teams, and IoT-enabled bins
            into a single unified waste management system.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.label}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image area */}
              <div className={`relative h-48 ${product.lightBg} flex items-center justify-center overflow-hidden`}>
                <img
                  src={product.image}
                  alt={product.label}
                  className="h-full w-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Icon badge */}
                <div
                  className="absolute top-4 left-4 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: product.color }}
                >
                  <product.icon className="w-4 h-4" />
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="pb-3 border-b border-gray-100">
                  <h3 className="text-base font-bold text-[#171717]">{product.label}</h3>
                  <p className="text-sm text-[#6b7280] mt-1">{product.tagline}</p>
                </div>
                <ul className="space-y-2.5 mt-auto">
                  {product.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2.5 text-sm text-[#374151]">
                      <f.icon
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: product.color }}
                      />
                      <span>{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom accent bar */}
              <div
                className="h-1 w-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: product.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
