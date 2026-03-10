# Artemis Waste Management System - Agent Instructions

This document provides context and instructions for AI coding agents (specifically Gemini) working on the Artemis Waste Management System. It strictly follows the `AGENT.md` format standards for prompt engineering.

## 🤖 Agent Persona

You are an expert full-stack developer with deep knowledge of React, TypeScript, Vite, and Firebase. You specialize in building scalable, responsive, and data-driven web dashboards (especially IoT integrations). You are meticulous about clean code, strong typing, and modern UI/UX practices.

## 📋 Project Overview

Artemis is a cutting-edge smart waste management solution leveraging data, AI, and IoT. It comprises:
1. **Web Dashboard**: For waste management professionals to monitor and analyze data.
2. **Mobile App**: For individuals to interact with the system.
3. **IoT Trashbins**: Smart bins that collect and transmit real-time waste level data.

This specific repository contains the **Web Dashboard** built with React.

## 🛠 Tech Stack

*   **Core**: React 19, TypeScript, Vite
*   **Backend/BaaS**: Firebase (Auth, Firestore, Hosting)
*   **Styling**: Tailwind CSS v4 (via `@theme` block in `src/theme.css`)
*   **UI Components**: Radix UI primitives (via shadcn/ui patterns)
*   **Maps**: React-Leaflet (bin location markers colored by fill level)
*   **Data Visualization**: Recharts (`AreaChart`, `BarChart`, `PieChart` with `ResponsiveContainer`)
*   **Icons**: `react-icons` (bs, fa) + `lucide-react`
*   **State Management**: React hooks + `react-firebase-hooks`
*   **Routing**: React Router DOM

## ⚙️ Setup & Commands

*   **Install Dependencies**: `npm install`
*   **Run Development Server**: `npm run dev`
*   **Build for Production**: `npm run build`
*   **Run Firebase Emulators**: `npm run emulator`
*   **Deploy**: `npm run deploy`

## 📐 Code Style & Conventions

*   **Language**: Use TypeScript (`.ts`, `.tsx`). Ensure strict typing and avoid `any` wherever possible.
*   **Architecture**: Use functional React components and React Hooks. Maintain modularity.
*   **Styling**: Use Tailwind CSS utility classes. Reference `src/theme.css` `@theme` tokens via `var()` or Tailwind's `text-[#hex]` / `bg-[#hex]` syntax. Never use inline styles for themeable values.
*   **State Management**: Favor React's built-in hooks (`useState`, `useContext`, `useEffect`) and Firebase hooks (`react-firebase-hooks`).

## 🧪 Testing and Verification

*   Check that the local dev server runs cleanly using `npm run dev`.
*   Verify that TypeScript builds successfully using `npm run build`.
*   Ensure that any new interactive elements (e.g., Maps, Charts) render correctly and do not throw console errors.

## 🚧 Boundaries & Rules

*   **Ask First**: Always ask for clarification if a task requirement is ambiguous, especially regarding database schemas for IoT data.
*   **Never Do**: Do NOT execute `npm run deploy` unless explicitly instructed by the user. Do NOT modify the core `firebase.json` or Firebase project configs without approval.
*   **Always Do**: Refer to existing code patterns when creating new components to maintain the Artemis web ecosystem's consistency. Write self-documenting code with clear variable names.

## Design System

> **Source of truth**: All CSS tokens are defined in `src/theme.css` inside the `@theme` block.
> This JSON describes how those tokens map to design intent and component usage.

```json
{
  "designSystem": {
    "name": "Artemis Design System",
    "version": "2.0.0",
    "philosophy": {
      "theme": "IoT Operations Dashboard — data-dense, real-time monitoring UI for waste management professionals",
      "coreEmotions": ["Environmental Stewardship", "Operational Clarity", "Real-time Awareness", "Reliability", "Precision"],
      "inspiration": "shadcn/ui component primitives with an eco-tech, dark-surface aesthetic",
      "complianceFocus": "Accessibility WCAG 2.1 AA, data readability for operational decisions, mobile-responsive for field use"
    },
    "branding": {
      "logo": {
        "asset": "public/assets/logo/artemis-brand1.png",
        "placement": "Top of sidebar, full-width with 90% max-width",
        "link": "Clicking logo navigates to /dashboard with page reload"
      },
      "colors": {
        "primaryBrand": {
          "name": "Forest Green",
          "comment": "Reflects environmental mission and eco-tech identity",
          "tokens": {
            "darkest":  "#0b1a09",
            "dark":     "#132611",
            "base":     "#216604",
            "mid":      "#426E2D",
            "light":    "#62A944",
            "lighter":  "#8ecb6a",
            "glass":    "#216604aa"
          },
          "tailwindEquivalents": {
            "base":     "bg-[#216604]",
            "light":    "bg-[#62A944]",
            "hover":    "hover:bg-[#62A944]"
          },
          "usage": "Sidebar background, primary action buttons, active nav states, chart primary series, brand identity"
        },
        "surfaces": {
          "comment": "Light-mode app; dark surfaces reserved for sidebar and modal overlays",
          "appBackground":    "#f1f1f1",
          "cardSurface":      "#ffffff",
          "darkSurface":      "#1e1e1e",
          "darkMuted":        "#2a2a2a",
          "overlay":          "rgba(0,0,0,0.45)",
          "border":           "#2f2f2f"
        },
        "text": {
          "base":     "#171717",
          "muted":    "#6b7280",
          "subtle":   "#9ca3af",
          "inverse":  "#ffffff"
        },
        "semantic": {
          "danger":        "#7a0000",
          "dangerLight":   "#a21111",
          "dangerBright":  "#ef4444",
          "warning":       "#f59e0b",
          "warningLight":  "#fcd34d",
          "success":       "#00cb6a",
          "successDark":   "#009e52",
          "info":          "#3b82f6",
          "infoLight":     "#93c5fd"
        },
        "iotBinFillLevels": {
          "comment": "Critical domain-specific palette — used in bin status badges, map markers, chart thresholds",
          "low":    { "range": "0–39%",   "color": "#00cb6a", "label": "Normal",   "tailwind": "text-[#00cb6a] bg-[#00cb6a]/10" },
          "mid":    { "range": "40–74%",  "color": "#f59e0b", "label": "Moderate", "tailwind": "text-amber-500 bg-amber-500/10" },
          "high":   { "range": "75–100%", "color": "#ef4444", "label": "Critical", "tailwind": "text-red-500 bg-red-500/10" }
        },
        "themeTokens": {
          "comment": "CSS custom properties defined in src/theme.css @theme block — use var() in components",
          "--color-primary":        "#216604",
          "--color-primary-light":  "#62A944",
          "--color-primary-glass":  "#216604aa",
          "--color-light":          "#f1f1f1",
          "--color-surface":        "#1e1e1e",
          "--color-border":         "#2f2f2f",
          "--color-danger":         "#7a0000",
          "--color-warning":        "#f59e0b",
          "--color-success":        "#00cb6a",
          "--color-level-low":      "#00cb6a",
          "--color-level-mid":      "#f59e0b",
          "--color-level-high":     "#ef4444",
          "--color-text-base":      "#171717",
          "--color-text-muted":     "#6b7280",
          "--color-text-inverse":   "#ffffff"
        }
      }
    },
    "typography": {
      "fonts": {
        "sans": "Inter, ui-sans-serif, system-ui, -apple-system",
        "mono": "JetBrains Mono, ui-monospace, SFMono-Regular",
        "comment": "Mono used for data values, bin IDs, sensor readings, timestamps"
      },
      "baseFontSize": "16px",
      "scale": {
        "xs":   "0.75rem",
        "sm":   "0.875rem",
        "base": "1rem",
        "lg":   "1.125rem",
        "xl":   "1.25rem",
        "2xl":  "1.5rem",
        "3xl":  "1.875rem",
        "4xl":  "2.25rem"
      },
      "headings": {
        "pageTitle":    "text-3xl font-bold tracking-tight text-[#171717]",
        "sectionTitle": "text-2xl font-bold tracking-tight text-[#171717]",
        "cardTitle":    "text-lg font-semibold tracking-tight text-[#171717]",
        "sidebarLabel": "text-xs font-semibold uppercase tracking-wider text-[#9ca3af]"
      },
      "body": {
        "primary":   "text-sm leading-relaxed text-[#171717]",
        "secondary": "text-sm text-[#6b7280]",
        "subtle":    "text-xs text-[#9ca3af]",
        "dataValue": "font-mono text-sm font-medium",
        "metric":    "text-3xl font-bold font-mono"
      }
    },
    "layout": {
      "sidebar": {
        "width":       "280px",
        "background":  "var(--color-primary)",
        "textColor":   "var(--color-text-inverse)",
        "padding":     "py-8 px-2",
        "navItemStyle": "flex items-center gap-4 px-3 py-3 text-white font-light rounded-md hover:bg-[#a21111] transition-colors",
        "signOutButton": "bg-[#a21111] hover:bg-red-800 text-white rounded-md"
      },
      "navbar": {
        "height": "64px"
      },
      "spacing": {
        "sidebarWidth": "var(--spacing-sidebar)",
        "navbarHeight": "var(--spacing-navbar)"
      }
    },
    "radii": {
      "sm":   "0.25rem",
      "md":   "0.5rem",
      "lg":   "0.75rem",
      "xl":   "1rem",
      "2xl":  "1.5rem",
      "full": "9999px"
    },
    "shadows": {
      "card":  "0 2px 8px rgba(0,0,0,0.12)",
      "panel": "0 4px 20px rgba(0,0,0,0.18)",
      "focus": "0 0 0 3px rgba(98,169,68,0.45)"
    },
    "transitions": {
      "fast": "150ms ease",
      "base": "250ms ease",
      "slow": "400ms ease"
    },
    "zIndex": {
      "base":    0,
      "raised":  10,
      "overlay": 100,
      "modal":   200,
      "toast":   300,
      "tooltip": 400
    },
    "components": {
      "library": "Radix UI primitives via shadcn/ui",
      "stylingEngine": "Tailwind CSS v4 with clsx & tailwind-merge",
      "icons": "react-icons (bs, fa variants) + lucide-react — standard size w-4 h-4",
      "maps": "react-leaflet — bin location markers colored by fill level",
      "charts": "recharts (ResponsiveContainer, AreaChart, BarChart, PieChart) — primary series uses brand green #216604",
      "keyComponents": {
        "DataCard": {
          "usage": "KPI summary tiles on the dashboard (total waste, averages, highest/lowest)",
          "styling": "bg-white border border-gray-200 rounded-lg shadow-sm p-5",
          "dataDisplay": "Metric value in font-mono text-3xl font-bold; label in text-sm text-gray-500"
        },
        "ChartCard": {
          "usage": "Wraps recharts charts with a header and optional filter/date dropdown",
          "styling": "bg-white rounded-lg shadow-sm border border-gray-200 p-5",
          "structure": "CardHeader (title + DropdownFilter) | CardContent (ResponsiveContainer)"
        },
        "BinLevelBadge": {
          "usage": "Indicates real-time fill level of IoT trashbins on the Bins page and map markers",
          "variants": {
            "low":  "bg-[#00cb6a]/10 text-[#00cb6a] border border-[#00cb6a]/30",
            "mid":  "bg-amber-500/10 text-amber-600 border border-amber-500/30",
            "high": "bg-red-500/10 text-red-600 border border-red-500/30"
          },
          "styling": "rounded-full px-2.5 py-0.5 text-xs font-medium"
        },
        "Sidebar": {
          "usage": "Primary navigation — always visible on authenticated dashboard pages",
          "background": "bg-[#216604]",
          "navLinks": "text-white hover:bg-[#a21111] rounded-md transition-colors",
          "signOut": "bg-[#a21111] hover:bg-red-800 rounded-md text-white"
        },
        "OverviewCard": {
          "usage": "Top-of-dashboard summary strip showing Highest / Lowest / Average waste",
          "styling": "bg-white border border-gray-200 rounded-lg shadow-sm py-8 flex gap-24 justify-center",
          "metricColors": {
            "highest": "text-red-600",
            "lowest":  "text-emerald-600",
            "average": "text-gray-500"
          }
        },
        "DropdownFilter": {
          "usage": "Campus / building / category filter selector in chart headers",
          "styling": "Radix Select primitive, rounded-md border-gray-200, text-sm"
        },
        "MapView": {
          "usage": "Leaflet map showing IoT bin locations, colored by fill-level status",
          "markerColors": "Matches iotBinFillLevels palette (green/amber/red)"
        },
        "Table": {
          "usage": "Historical waste records, bin data lists, building leaderboards",
          "styling": "Sticky thead, row hover bg-gray-50, consistent px-4 py-3 cell padding, text-sm"
        },
        "Button": {
          "variants": {
            "primary":   "bg-[#216604] hover:bg-[#62A944] text-white rounded-md transition-colors",
            "danger":    "bg-[#a21111] hover:bg-red-800 text-white rounded-md",
            "outline":   "border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md",
            "ghost":     "hover:bg-gray-100 text-gray-700 rounded-md"
          }
        }
      }
    }
  }
}
```