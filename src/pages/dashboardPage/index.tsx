import { useState, useEffect, lazy, Suspense } from "react";
import Sidebar from "../../components/layout/sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../services/firebase";
import DashboardPrint from "./components/printDashboard";
import { WasteDataContext } from "../../context/wasteDataContext";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  BsPrinter,
  BsChevronDown,
  BsClock,
  BsSearch,
  BsArrowUpRight,
} from "react-icons/bs";
import useFetch from "../../hooks/useFetch";
import calculateTotal from "./utils/calculateTotal";
import { Skeleton } from "../../components/ui/skeleton";
import "./index.scss";

// ─── Lazy Loaded Components ───────────────────────────────────────────────────
const WasteGenerated = lazy(() => import("./components/wasteGenerated"));
const AdminChartCard = lazy(() => import("./components/adminChartCard"));
const WasteComposition = lazy(() => import("./components/wasteComposition"));
const WasteGenerationBuilding = lazy(
  () => import("./components/wasteGenerationBuilding"),
);
const BinStatusGrid = lazy(() => import("./components/binStatusGrid"));
const WasteDiversionRate = lazy(
  () => import("./components/wasteDiversionRate"),
);
const BinFrequencyChart = lazy(() => import("./components/binFrequencyChart"));
const TopBinsList = lazy(() => import("./components/topBinsList"));
const WasteTrendComparison = lazy(
  () => import("./components/wasteTrendComparison"),
);

// ─── Types ────────────────────────────────────────────────────────────────────
type TimeFilter = {
  label: string;
  endpoint: string;
  name: string;
};

const TIME_FILTERS: TimeFilter[] = [
  { label: "Latest (7 days)", endpoint: "waste/latest/7days", name: "7days" },
  { label: "Last 30 days", endpoint: "waste/latest/30days", name: "30days" },
  { label: "Last 90 days", endpoint: "waste/latest/90days", name: "90days" },
  { label: "Last 365 days", endpoint: "waste/latest/365days", name: "365days" },
];

// ─── Waste-type summary tile ──────────────────────────────────────────────────
type WasteType = "biodegradable" | "residual" | "recyclable" | "infectious";

interface WasteTileProps {
  readonly label: string;
  readonly value: number;
  readonly wasteType: WasteType;
}

function WasteTile({ label, value, wasteType }: WasteTileProps) {
  return (
    <div
      className={`waste-tile waste-tile--${wasteType} group relative flex flex-col justify-center rounded-[24px] py-7 px-7 bg-white border border-gray-100/50 shadow-[0px_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 cursor-default overflow-hidden`}
    >
      <div className="waste-tile__bar absolute left-0 top-6 bottom-6 w-1 rounded-r-full" />
      <div className="waste-tile__dot absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center">
        <BsArrowUpRight className="waste-tile__dot-icon w-3.5 h-3.5" />
      </div>
      <div className="text-[16px] font-medium mb-3 text-gray-500">{label}</div>
      <div className="waste-tile__value text-[44px] leading-tight font-bold tracking-tight mb-4">
        {value.toLocaleString()}{" "}
        <span className="text-[18px] font-medium text-gray-400">kg</span>
      </div>
      <div className="mt-2 flex items-center gap-2.5">
        <span className="waste-tile__chip inline-block w-2 h-2 rounded-full shrink-0" />
        <span className="text-[12px] font-medium text-gray-400">{label}</span>
      </div>
    </div>
  );
}

// ─── Section header helper ────────────────────────────────────────────────────
interface SectionHeaderProps {
  readonly title: string;
  readonly children?: React.ReactNode;
}

function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-[20px] font-bold text-gray-900 m-0 tracking-tight">
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── Skeletons ────────────────────────────────────────────────────────────────
function DashboardSkeleton() {
  return (
    <div className="w-full animate-in fade-in duration-500 flex flex-col gap-6 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="w-full h-32 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="w-full h-96 rounded-2xl" />
      <div className="grid grid-cols-2 gap-6">
        <Skeleton className="w-full h-80 rounded-2xl" />
        <Skeleton className="w-full h-80 rounded-2xl" />
      </div>
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
      .catch((e: unknown) => {
        if (e instanceof Error) console.error(e.message);
      });
  };

  useEffect(() => {
    useFetch("waste/latest/7days", "7days")
      .then((res: any) => setWasteData(res))
      .finally(() => setLoading(false))
      .catch((e: unknown) => {
        if (e instanceof Error) console.error(e.message);
      });
  }, []);

  const totals = calculateTotal(wasteData);

  const TimeRangeFilter = (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          id="time-filter-trigger"
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors text-gray-700 focus:outline-none"
        >
          <BsClock className="w-4 h-4 text-gray-500" />
          {activeFilter.label}
          <BsChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          align="end"
          className="min-w-48 bg-white rounded-xl border border-gray-100 shadow-xl p-1.5 z-50 animate-in fade-in-0 zoom-in-95"
        >
          {TIME_FILTERS.map((filter) => (
            <DropdownMenu.Item
              key={filter.name}
              className={`flex items-center px-4 py-2.5 text-sm rounded-lg cursor-pointer outline-none transition-colors mb-0.5 last:mb-0 ${
                activeFilter.name === filter.name
                  ? "bg-primary text-white font-medium"
                  : "text-gray-700 hover:bg-gray-50 font-medium"
              }`}
              onSelect={() => handleFilterSelect(filter)}
            >
              {filter.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );

  return (
    <WasteDataContext.Provider value={wasteData}>
      <div id="dashboard">
        <div className="flex hide-dashboard bg-[#f8f9fa] min-h-screen">
          <div className="hide-dashboard z-50 sticky top-0 h-screen">
            <Sidebar />
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            {/* Top Header */}
            <header className="flex items-center justify-between px-8 py-0 shrink-0 h-[120px] sticky top-0 z-40 bg-[#f8f9fa]/95 backdrop-blur-md">
              <div className="flex flex-col gap-1">
                <h1 className="text-[32px] font-bold text-gray-900 tracking-tight m-0">
                  Dashboard
                </h1>
                <p className="text-[15px] font-medium text-gray-500 m-0">
                  Plan, prioritize, and optimize your waste operations with
                  ease.
                </p>
              </div>
              <div className="flex items-center gap-5">
                {TimeRangeFilter}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-full shadow-md hover:bg-primary-light transition-all transform hover:-translate-y-px active:translate-y-0"
                >
                  <BsPrinter className="w-4 h-4" />
                  Print Report
                </button>
              </div>
            </header>

            {/* Main Content Body */}
            <main className="flex-1 overflow-y-auto px-8 pb-12 w-full pt-4">
              {loading ? (
                <DashboardSkeleton />
              ) : (
                <Suspense fallback={<DashboardSkeleton />}>
                  <div className="flex flex-col gap-8 max-w-[1600px] mx-auto w-full">
                    {/* ── ROW 1: Top KPI Cards ─── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
                      <WasteTile
                        label="Biodegradable Waste"
                        value={totals.total_biodegradable}
                        wasteType="biodegradable"
                      />
                      <WasteTile
                        label="Residual Waste"
                        value={totals.total_residual}
                        wasteType="residual"
                      />
                      <WasteTile
                        label="Recyclable Waste"
                        value={totals.total_recyclable}
                        wasteType="recyclable"
                      />
                      <WasteTile
                        label="Infectious Waste"
                        value={totals.total_infectious}
                        wasteType="infectious"
                      />
                    </div>

                    {/* ── ROW 2: Primary Full-Width Chart ─────── */}
                    <section className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-100 dash-section-1">
                      <AdminChartCard
                        maxHeight="460px"
                        height="460px"
                        header="Overall Waste Generated"
                      >
                        <WasteGenerated />
                      </AdminChartCard>
                    </section>

                    {/* ── ROW 3: Side-by-Side Splits ──── */}
                    <section className="flex flex-col lg:flex-row gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-200 dash-section-2">
                      <div className="flex-1 min-w-0">
                        <AdminChartCard
                          header="Waste Composition"
                          height="440px"
                          maxHeight="440px"
                        >
                          <WasteComposition />
                        </AdminChartCard>
                      </div>
                      <div className="flex-1 min-w-0">
                        <AdminChartCard
                          header="Waste by Campus Building"
                          height="440px"
                          maxHeight="440px"
                        >
                          <WasteGenerationBuilding />
                        </AdminChartCard>
                      </div>
                    </section>

                    {/* ── ROW 4: Bin Monitoring ────────── */}
                    <section className="flex flex-col lg:flex-row gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-300 dash-section-3">
                      <div className="flex-[3] min-w-0">
                        <AdminChartCard
                          header="Real-time Bin Status"
                          height="520px"
                          maxHeight="520px"
                        >
                          <BinStatusGrid />
                        </AdminChartCard>
                      </div>
                      <div className="flex-[2] min-w-0">
                        <AdminChartCard
                          header="Highest Capacity Bins"
                          height="520px"
                          maxHeight="520px"
                        >
                          <TopBinsList />
                        </AdminChartCard>
                      </div>
                    </section>

                    {/* ── ROW 5: Trends ── */}
                    <section className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-400 dash-section-4">
                      <div className="w-full">
                        <AdminChartCard
                          header="Period Trend Comparison"
                          height="480px"
                          maxHeight="480px"
                        >
                          <WasteTrendComparison />
                        </AdminChartCard>
                      </div>
                    </section>

                    {/* ── ROW 6: Analytics ── */}
                    <section className="flex flex-col lg:flex-row gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-500 dash-section-5">
                      <div className="w-full lg:w-[420px] shrink-0">
                        <AdminChartCard
                          header="Diversion Rate"
                          height="340px"
                          maxHeight="340px"
                        >
                          <WasteDiversionRate />
                        </AdminChartCard>
                      </div>
                      <div className="flex-1 min-w-0">
                        <AdminChartCard
                          header="Collection Frequency"
                          height="340px"
                          maxHeight="340px"
                        >
                          <BinFrequencyChart />
                        </AdminChartCard>
                      </div>
                    </section>

                    <div className="h-4" />
                  </div>
                </Suspense>
              )}
            </main>
          </div>
        </div>

        {isPrinting && <DashboardPrint />}
      </div>
    </WasteDataContext.Provider>
  );
}
