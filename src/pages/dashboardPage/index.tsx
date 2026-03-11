import WasteGenerated from "./components/wasteGenerated";
import PercentagePerCampus from "./components/percentagePerCampus";
import Sidebar from "../../components/layout/sidebar";
import { useState, useEffect } from "react";
import AdminChartCard from "./components/adminChartCard";
import WasteComposition from "./components/wasteComposition";
import WasteGenerationBuilding from "./components/wasteGenerationBuilding";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../services/firebase";
import DashboardPrint from "./components/printDashboard";
import OverviewCard from "./components/overviewCard";
import LoadingPage from "../../components/loadingPage";
import { WasteDataContext } from "../../context/wasteDataContext";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BsPrinter, BsChevronDown, BsClock } from "react-icons/bs";
import useFetch from "../../hooks/useFetch";
import calculateTotal from "./utils/calculateTotal";

// ─── Types ────────────────────────────────────────────────────────────────────
type TimeFilter = {
  label: string;
  endpoint: string;
  name: string;
};

const TIME_FILTERS: TimeFilter[] = [
  { label: "Latest (7 days)",  endpoint: "waste/latest/7days",   name: "7days"   },
  { label: "Last 30 days",     endpoint: "waste/latest/30days",  name: "30days"  },
  { label: "Last 90 days",     endpoint: "waste/latest/90days",  name: "90days"  },
  { label: "Last 365 days",    endpoint: "waste/latest/365days", name: "365days" },
];

// ─── Waste-type summary tile ──────────────────────────────────────────────────
interface WasteTileProps {
  label: string;
  value: number;
  color: string;
  bgColor: string;
  dotColor: string;
}

function WasteTile({ label, value, color, bgColor, dotColor }: WasteTileProps) {
  return (
    <div
      className="group flex flex-col items-center justify-center gap-0.5 rounded-lg py-3 px-2 border hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default"
      style={{ backgroundColor: bgColor, borderColor: dotColor + "33" }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="w-2 h-2 rounded-full inline-block group-hover:scale-125 transition-transform duration-300" style={{ backgroundColor: dotColor }} />
        <span className="text-xs font-medium text-gray-500">{label}</span>
      </div>
      <span className="text-xl font-bold font-mono group-hover:scale-105 transition-transform duration-300" style={{ color }}>
        {value} kg
      </span>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [wasteData, setWasteData] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);
  const [isPrinting, setIsPrinting] = useState(false);
  const [activeFilter, setActiveFilter] = useState(TIME_FILTERS[0]);

  const [user] = useAuthState(auth);
  const username = user?.displayName ?? "Admin";

  const handlePrint = () => {
    setIsPrinting(true);
    document.body.style.overflowY = "hidden";
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500);
  };

  const handleFilterSelect = (filter: TimeFilter) => {
    setLoading(true);
    setActiveFilter(filter);
    useFetch(filter.endpoint, filter.name)
      .then((res: any) => setWasteData(res))
      .finally(() => setLoading(false))
      .catch((e: unknown) => { e instanceof Error && console.error(e.message); });
  };

  useEffect(() => {
    useFetch("waste/latest/7days", "7days")
      .then((res: any) => setWasteData(res))
      .finally(() => setLoading(false))
      .catch((e: unknown) => { e instanceof Error && console.error(e.message); });
  }, []);

  const totals = calculateTotal(wasteData);

  return (
    <WasteDataContext.Provider value={wasteData}>
      {loading ? (
        <LoadingPage />
      ) : (
        <div id="dashboard">
          {/* ── App shell ─────────────────────────────────────────────── */}
          <div className="flex hide-dashboard">
            {/* Sidebar */}
            <div className="hide-dashboard">
              <Sidebar />
            </div>

            {/* Main content area */}
            <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden border-l border-gray-200">

              {/* ── Top navbar ──────────────────────────────────────── */}
              <header className="flex items-center justify-between px-6 py-0 bg-white/80 backdrop-blur-md border-b border-gray-200/75 shadow-sm shrink-0 h-16 sticky top-0 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-[#216604]" />
                  <h1 className="text-xl font-bold text-[#171717] tracking-tight m-0">Dashboard</h1>
                </div>

                <div className="flex items-center gap-3">
                  {/* User chip */}
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#216604] flex items-center justify-center text-white text-xs font-bold">
                      {username.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{username}</span>
                  </div>

                  {/* Print button */}
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#216604] border border-[#216604]/40 bg-[#216604]/5 rounded-full hover:bg-[#216604]/10 transition-colors"
                  >
                    <BsPrinter className="w-4 h-4" />
                    Print
                  </button>
                </div>
              </header>

              {/* ── Page body ───────────────────────────────────────── */}
              <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#f1f1f1] to-gray-200/50 px-6 pt-6 pb-10">

                {/* KPI Overview Strip */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
                  <OverviewCard />
                </div>

                {/* ── Section: Waste Generated ───────────────────────── */}
                <section className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" style={{ animationDelay: '150ms' }}>
                  {/* Section header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-5 rounded-full bg-[#216604] inline-block" />
                      <h2 className="text-lg font-semibold text-[#171717] m-0 tracking-tight">
                        Waste Generated
                      </h2>
                    </div>

                    {/* Radix time-range filter */}
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button
                          id="time-filter-trigger"
                          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-gray-700 focus:outline-none"
                        >
                          <BsClock className="w-3.5 h-3.5 text-gray-400" />
                          {activeFilter.label}
                          <BsChevronDown className="w-3 h-3 text-gray-400" />
                        </button>
                      </DropdownMenu.Trigger>

                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          sideOffset={6}
                          align="end"
                          className="min-w-[170px] bg-white rounded-xl border border-gray-200 shadow-lg p-1 z-50 animate-in fade-in-0 zoom-in-95"
                        >
                          {TIME_FILTERS.map((filter) => (
                            <DropdownMenu.Item
                              key={filter.name}
                              className={`flex items-center px-3 py-2 text-sm rounded-lg cursor-pointer outline-none transition-colors ${
                                activeFilter.name === filter.name
                                  ? "bg-[#216604]/10 text-[#216604] font-medium"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                              onSelect={() => handleFilterSelect(filter)}
                            >
                              {filter.label}
                            </DropdownMenu.Item>
                          ))}
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </div>

                  {/* Chart row 1 — Area chart + Donut + waste totals */}
                  <div className="flex gap-5 w-full">
                    {/* Area chart (Overall Weight) */}
                    <div className="flex-[3] min-w-0 flex">
                      <AdminChartCard
                        maxHeight="100%"
                        height="100%"
                        header="Overall Weight Over Time"
                      >
                        <WasteGenerated />
                      </AdminChartCard>
                    </div>

                    {/* Donut + waste category tiles */}
                    <div className="flex-[2] min-w-0 flex flex-col gap-4">
                      {/* Donut chart */}
                      <AdminChartCard
                        header="Waste Composition"
                      >
                        <WasteComposition />
                      </AdminChartCard>

                      {/* Waste category tiles */}
                      <div className="grid grid-cols-2 gap-3">
                        <WasteTile
                          label="Biodegradable"
                          value={totals.total_biodegradable}
                          color="#009e52"
                          bgColor="#f0fdf4"
                          dotColor="#00cb6a"
                        />
                        <WasteTile
                          label="Residual"
                          value={totals.total_residual}
                          color="#374151"
                          bgColor="#f9fafb"
                          dotColor="#6b7280"
                        />
                        <WasteTile
                          label="Recyclable"
                          value={totals.total_recyclable}
                          color="#1d4ed8"
                          bgColor="#eff6ff"
                          dotColor="#3b82f6"
                        />
                        <WasteTile
                          label="Infectious"
                          value={totals.total_infectious}
                          color="#b91c1c"
                          bgColor="#fef2f2"
                          dotColor="#ef4444"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* ── Section: Per Building ──────────────────────────── */}
                <section className="flex flex-col w-full mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" style={{ animationDelay: '300ms' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1 h-5 rounded-full bg-[#216604] inline-block" />
                    <h2 className="text-lg font-semibold text-[#171717] m-0 tracking-tight">
                      Waste Generation per Building
                    </h2>
                  </div>
                  <AdminChartCard
                    width="100%"
                    header="Cumulative Waste by Building"
                    maxHeight="430px"
                    height="430px"
                  >
                    <WasteGenerationBuilding />
                  </AdminChartCard>
                </section>

                {/* Bottom spacer */}
                <div className="h-6" />
              </main>
            </div>
          </div>

          {/* Print overlay */}
          {isPrinting && <DashboardPrint />}
        </div>
      )}
    </WasteDataContext.Provider>
  );
}

