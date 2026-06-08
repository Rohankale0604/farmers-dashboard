import { useState, useEffect, useRef } from "react";
// Farmers brand colors from logo
const C = {
  farmBlue: "#1B3A8C",
  farmRed: "#B01E23",
  farmCrimson: "#8B0F13",
  gold: "#C8922A",
  goldLight: "#E8B84B",
  cream: "#F8F5EE",
  slate: "#F0EDE6",
  darkBg: "#0C1829",
  midBg: "#122040",
  cardBg: "#162950",
  border: "rgba(200,146,42,0.2)",
  borderBlue: "rgba(27,58,140,0.4)",
  white: "#FFFFFF",
  white80: "rgba(255,255,255,0.8)",
  white50: "rgba(255,255,255,0.5)",
  white15: "rgba(255,255,255,0.08)",
};
// SVG Farmers-style shield logo (recreated from brand)
function FarmersLogo({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {/* Blue dome */}
      <path
        d="M50 8 C25 8 8 28 8 50 L92 50 C92 28 75 8 50 8Z"
        fill={C.farmBlue}
      />
      {/* Light blue segments */}
      <path d="M30 50 L20 30 L40 42Z" fill="#4A6FC4" opacity="0.7" />
      <path d="M70 50 L80 30 L60 42Z" fill="#4A6FC4" opacity="0.7" />
      {/* White star burst */}
      <polygon
        points="50,18 53,30 62,24 56,34 68,34 58,40 65,50 50,44 35,50 42,40 32,34 44,34 38,24 47,30"
        fill="white"
      />
      {/* Shield */}
      <path
        d="M38 52 L38 72 Q38 80 50 85 Q62 80 62 72 L62 52Z"
        fill={C.farmRed}
      />
      <path d="M38 52 L50 52 L50 85 Q38 80 38 72Z" fill={C.farmCrimson} />
      {/* Bottom line */}
      <rect x="8" y="50" width="84" height="3" fill={C.farmBlue} />
    </svg>
  );
}
// Animated counter hook
function useCounter(target, duration = 1500, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}
const kpiData = [
  {
    label: "Combined Ratio",
    raw: 92.4,
    display: "92.4%",
    sub: "▼ 3.6 pts vs Prior Year",
    good: true,
    suffix: "%",
  },
  {
    label: "Loss Ratio",
    raw: 61.3,
    display: "61.3%",
    sub: "▼ 3.1 pts vs Prior Year",
    good: true,
    suffix: "%",
  },
  {
    label: "Expense Ratio",
    raw: 31.1,
    display: "31.1%",
    sub: "▼ 4.6 pts vs Prior Year",
    good: true,
    suffix: "%",
  },
  {
    label: "Gross Written Premium",
    raw: 5.4,
    display: "$5.4B",
    sub: "▲ 7.2% vs Prior Year",
    good: true,
    suffix: "B",
  },
  {
    label: "Retention Rate",
    raw: 88.7,
    display: "88.7%",
    sub: "▲ 1.8 pts vs Prior Year",
    good: true,
    suffix: "%",
  },
];
const monthData = [
  { m: "J", v: 91.2 },
  { m: "F", v: 93.4 },
  { m: "M", v: 89.8 },
  { m: "A", v: 95.1 },
  { m: "M", v: 88.2 },
  { m: "J", v: 92.4 },
  { m: "J", v: 90.1 },
  { m: "A", v: 92.9 },
  { m: "S", v: 87.4 },
  { m: "O", v: 92.4 },
  { m: "N", v: 86.1 },
  { m: "D", v: 88.7 },
];
const lobRows = [
  {
    name: "Auto Insurance",
    gwp: "$2.72B",
    lr: "63.2%",
    cr: "91.8%",
    ret: "89.2%",
    status: "good",
    trend: [60, 65, 58, 70, 62, 68, 72, 65],
  },
  {
    name: "Homeowners",
    gwp: "$1.62B",
    lr: "58.7%",
    cr: "88.3%",
    ret: "91.5%",
    status: "good",
    trend: [72, 68, 75, 70, 80, 74, 78, 82],
  },
  {
    name: "Specialty Lines",
    gwp: "$648M",
    lr: "67.4%",
    cr: "97.2%",
    ret: "85.1%",
    status: "warn",
    trend: [55, 60, 58, 65, 62, 70, 66, 68],
  },
  {
    name: "Bristol West",
    gwp: "$432M",
    lr: "72.1%",
    cr: "103.4%",
    ret: "78.3%",
    status: "bad",
    trend: [80, 85, 88, 82, 90, 86, 92, 88],
  },
  {
    name: "Business Ins.",
    gwp: "$318M",
    lr: "60.5%",
    cr: "90.1%",
    ret: "87.6%",
    status: "good",
    trend: [65, 62, 68, 64, 70, 67, 72, 69],
  },
];
const navItems = [
  { id: "overview", icon: "⬡", label: "Overview" },
  { id: "profitability", icon: "◈", label: "Profitability" },
  { id: "growth", icon: "▲", label: "Growth & GWP" },
  { id: "retention", icon: "↻", label: "Retention" },
  { id: "exposure", icon: "⚡", label: "CAT Exposure" },
  { id: "lob", icon: "≡", label: "LOB Breakdown" },
  { id: "state", icon: "⊕", label: "State View" },
];
const buList = [
  "All Units",
  "PL Finance",
  "Bristol West",
  "Business Ins.",
  "Distribution",
  "Specialty",
];
function MiniSparkline({ data, color }) {
  const max = Math.max(...data),
    min = Math.min(...data);
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 80;
      const y = 20 - ((v - min) / (max - min || 1)) * 18;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width="80" height="24" viewBox="0 0 80 24">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle
        cx={pts.split(" ").pop().split(",")[0]}
        cy={pts.split(" ").pop().split(",")[1]}
        r="2.5"
        fill={color}
      />
    </svg>
  );
}
function BarChartViz() {
  const max = 100;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 5,
        height: 120,
        padding: "0 4px 20px",
      }}
    >
      {monthData.map((d, i) => {
        const pct = (d.v / max) * 100;
        const clr = d.v > 93 ? C.farmRed : d.v > 91 ? C.gold : "#2ECC71";
        return (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              justifyContent: "flex-end",
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: 8,
                color: C.white50,
                marginBottom: 2,
                fontWeight: 600,
              }}
            >
              {d.v}
            </div>
            <div
              style={{
                width: "100%",
                height: `${pct}%`,
                background: `linear-gradient(180deg, ${clr}EE 0%, ${clr}55 100%)`,
                borderRadius: "3px 3px 0 0",
                border: `1px solid ${clr}44`,
                position: "relative",
                transition: "height 0.5s ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: clr,
                  borderRadius: "2px 2px 0 0",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                fontSize: 9,
                color: C.white50,
                fontWeight: 700,
              }}
            >
              {d.m}
            </div>
          </div>
        );
      })}
    </div>
  );
}
function DonutChart() {
  const segments = [
    { label: "Auto", pct: 50, color: C.farmBlue },
    { label: "Home", pct: 30, color: C.goldLight },
    { label: "Specialty", pct: 12, color: "#2ECC71" },
    { label: "Bristol", pct: 5, color: C.farmRed },
    { label: "Other", pct: 3, color: "#9B59B6" },
  ];
  const r = 38,
    cx = 50,
    cy = 50;
  const circ = 2 * Math.PI * r;
  let cumulative = 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <svg width={110} height={110} viewBox="0 0 100 100">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={C.midBg}
          strokeWidth="18"
        />
        {segments.map((seg, i) => {
          const dashLen = (seg.pct / 100) * circ;
          const offset = -(cumulative / 100) * circ;
          cumulative += seg.pct;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="18"
              strokeDasharray={`${dashLen} ${circ}`}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          );
        })}
        <text
          x="50"
          y="44"
          textAnchor="middle"
          fill="white"
          fontSize="11"
          fontWeight="800"
          fontFamily="Georgia"
        >
          $5.4B
        </text>
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fill={C.gold}
          fontSize="7"
          fontWeight="600"
          letterSpacing="1"
        >
          GWP
        </text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {segments.map((s) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: s.color,
                flexShrink: 0,
              }}
            />
            <span style={{ color: C.white80 }}>{s.label}</span>
            <span
              style={{
                color: "white",
                fontWeight: 700,
                marginLeft: "auto",
                paddingLeft: 12,
              }}
            >
              {s.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
function StatusPill({ status, text }) {
  const cfg = {
    good: {
      bg: "rgba(46,204,113,0.15)",
      color: "#2ECC71",
      border: "rgba(46,204,113,0.3)",
    },
    warn: {
      bg: "rgba(200,146,42,0.15)",
      color: C.goldLight,
      border: "rgba(200,146,42,0.3)",
    },
    bad: {
      bg: "rgba(176,30,35,0.2)",
      color: "#FF6B6B",
      border: "rgba(176,30,35,0.3)",
    },
  };
  const s = cfg[status];
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 700,
      }}
    >
      {text}
    </span>
  );
}
function Card({ title, subtitle, children, style = {} }) {
  return (
    <div
      style={{
        background: `linear-gradient(145deg, ${C.cardBg} 0%, ${C.midBg} 100%)`,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          padding: "14px 18px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 12,
              color: C.white80,
              textTransform: "uppercase",
              letterSpacing: 1.2,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 10, color: C.white50, marginTop: 2 }}>
              {subtitle}
            </div>
          )}
        </div>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: C.gold,
            boxShadow: `0 0 8px ${C.gold}`,
          }}
        />
      </div>
      <div style={{ padding: 18 }}>{children}</div>
    </div>
  );
}
export default function App() {
  const [activePage, setActivePage] = useState("landing");
  const [activeNav, setActiveNav] = useState("overview");
  const [activeBU, setActiveBU] = useState("All Units");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
        background: C.darkBg,
        color: "white",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: `
radial-gradient(ellipse at 20% 20%, rgba(27,58,140,0.15) 0%, transparent 50%),
radial-gradient(ellipse at 80% 80%, rgba(176,30,35,0.08) 0%, transparent 50%),
radial-gradient(ellipse at 50% 50%, rgba(200,146,42,0.04) 0%, transparent 70%)
`,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ─── TOP NAVBAR ─── */}
        <div
          style={{
            background: `linear-gradient(90deg, ${C.darkBg} 0%, ${C.midBg} 50%, ${C.darkBg} 100%)`,
            borderBottom: `1px solid ${C.border}`,
            padding: "0 28px",
          }}
        >
          {/* Logo & Title Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 0 12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <FarmersLogo size={54} />
              <div>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: C.gold,
                    textTransform: "uppercase",
                    letterSpacing: 3,
                    marginBottom: 3,
                  }}
                >
                  Business Intelligence Hub
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "white",
                    letterSpacing: 0.5,
                    lineHeight: 1,
                  }}
                >
                  PPM Executive Dashboards
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: C.white50,
                    marginTop: 3,
                    letterSpacing: 0.5,
                  }}
                >
                  Enterprise Performance Intelligence Platform
                </div>
              </div>
            </div>
            {/* Right: status + refresh */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 6,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  color: C.white50,
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#2ECC71",
                    boxShadow: "0 0 8px #2ECC71",
                  }}
                />
                Live Data &nbsp;|&nbsp; Last Refreshed: Jun 08, 2026 — 09:00 AM
                PT
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {["📥 Export", "🖨 Print", "⚙ Settings"].map((btn) => (
                  <button
                    key={btn}
                    style={{
                      fontSize: 10,
                      padding: "4px 12px",
                      borderRadius: 6,
                      border: `1px solid ${C.border}`,
                      background: C.white15,
                      color: C.white80,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Page tabs */}
          <div style={{ display: "flex", gap: 0, marginBottom: -1 }}>
            {[
              ["landing", "🏠 Landing Page"],
              ["exec", "📊 Executive Dashboard"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActivePage(id)}
                style={{
                  padding: "10px 28px",
                  background: activePage === id ? C.midBg : "transparent",
                  border: `1px solid ${
                    activePage === id ? C.border : "transparent"
                  }`,
                  borderBottom:
                    activePage === id
                      ? `2px solid ${C.gold}`
                      : "1px solid transparent",
                  borderRadius: "8px 8px 0 0",
                  color: activePage === id ? "white" : C.white50,
                  fontWeight: activePage === id ? 700 : 500,
                  fontSize: 13,
                  cursor: "pointer",
                  letterSpacing: 0.3,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        {/* ─── BU FILTER + KPI STRIP ─── */}
        <div
          style={{
            background: C.midBg,
            borderBottom: `1px solid ${C.border}`,
            padding: "12px 28px",
          }}
        >
          {/* BU Tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: C.gold,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginRight: 4,
              }}
            >
              Filter by Unit:
            </span>
            {buList.map((bu) => (
              <button
                key={bu}
                onClick={() => setActiveBU(bu)}
                style={{
                  padding: "5px 16px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  border: `1px solid ${activeBU === bu ? C.gold : C.border}`,
                  background:
                    activeBU === bu
                      ? `linear-gradient(135deg, ${C.farmBlue}, ${C.farmRed})`
                      : C.white15,
                  color: activeBU === bu ? "white" : C.white80,
                  boxShadow:
                    activeBU === bu ? `0 0 12px rgba(200,146,42,0.3)` : "none",
                }}
              >
                {bu}
              </button>
            ))}
          </div>
          {/* KPI Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12,
            }}
          >
            {kpiData.map((k, i) => (
              <div
                key={i}
                style={{
                  background: `linear-gradient(145deg, ${C.cardBg}, ${C.darkBg})`,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  padding: "12px 16px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 3,
                    height: "100%",
                    background: k.good ? "#2ECC71" : C.farmRed,
                    borderRadius: "0 2px 2px 0",
                  }}
                />
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: C.gold,
                    textTransform: "uppercase",
                    letterSpacing: 1.2,
                    marginBottom: 4,
                  }}
                >
                  {k.label}
                </div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: "white",
                    lineHeight: 1,
                    letterSpacing: -0.5,
                  }}
                >
                  {k.display}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: k.good ? "#2ECC71" : C.farmRed,
                    marginTop: 5,
                    fontWeight: 600,
                  }}
                >
                  {k.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ─── LANDING PAGE ─── */}
        {activePage === "landing" && (
          <div style={{ padding: "28px 28px 40px" }}>
            {/* Hero banner */}
            <div
              style={{
                background: `linear-gradient(135deg, ${C.farmBlue} 0%, #0C1829 40%, ${C.farmRed}33 100%)`,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: "32px 40px",
                marginBottom: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative circles */}
              <div
                style={{
                  position: "absolute",
                  right: -60,
                  top: -60,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  border: `1px solid ${C.border}`,
                  opacity: 0.4,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: -20,
                  top: -20,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  border: `1px solid ${C.border}`,
                  opacity: 0.3,
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: C.gold,
                    textTransform: "uppercase",
                    letterSpacing: 3,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  Welcome to the Enterprise Hub
                </div>
                <div
                  style={{
                    fontSize: 34,
                    fontWeight: 800,
                    color: "white",
                    lineHeight: 1.1,
                    marginBottom: 10,
                  }}
                >
                  Business Intelligence
                  <br />
                  <span style={{ color: C.goldLight }}>Command Center</span>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: C.white80,
                    maxWidth: 480,
                    lineHeight: 1.6,
                  }}
                >
                  Unified performance intelligence across all business units —
                  designed for executive decision-making with real-time data,
                  predictive insights, and actionable analytics.
                </div>
              </div>
              <div style={{ display: "flex", gap: 28, flexShrink: 0 }}>
                {[
                  ["10", "Dashboards"],
                  ["150+", "KPIs Tracked"],
                  ["149", "Total Reports"],
                  ["31", "FLP Reports"],
                ].map(([n, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 32,
                        fontWeight: 800,
                        color: C.goldLight,
                      }}
                    >
                      {n}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: C.white50,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Section cards grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                marginBottom: 16,
              }}
            >
              {/* UW Performance */}
              <div
                style={{
                  background: `linear-gradient(145deg, ${C.cardBg}, ${C.midBg})`,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: `linear-gradient(90deg, ${C.farmBlue}AA, transparent)`,
                    padding: "16px 20px",
                    borderBottom: `1px solid ${C.border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 9,
                        color: C.gold,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        fontWeight: 700,
                      }}
                    >
                      Section 01
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "white",
                        marginTop: 2,
                      }}
                    >
                      UW Performance & Financial Results
                    </div>
                  </div>
                  <div
                    style={{
                      background: C.farmBlue,
                      color: "white",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 20,
                    }}
                  >
                    5 Reports
                  </div>
                </div>
                <div style={{ padding: "12px 0" }}>
                  {[
                    "PL Finance",
                    "Bristol West",
                    "Business Insurance",
                    "Specialty",
                    "Corporate PPM",
                  ].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 20px",
                        borderBottom: `1px solid ${C.white15}`,
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: C.gold,
                          }}
                        />
                        <span style={{ fontSize: 13, color: C.white80 }}>
                          {item}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          color: C.farmBlue,
                          background: "rgba(27,58,140,0.2)",
                          padding: "2px 10px",
                          borderRadius: 10,
                          fontWeight: 600,
                        }}
                      >
                        UW Dashboard
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Loss, Risk */}
              <div
                style={{
                  background: `linear-gradient(145deg, ${C.cardBg}, ${C.midBg})`,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: `linear-gradient(90deg, ${C.farmRed}55, transparent)`,
                    padding: "16px 20px",
                    borderBottom: `1px solid ${C.border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 9,
                        color: C.gold,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        fontWeight: 700,
                      }}
                    >
                      Section 02
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "white",
                        marginTop: 2,
                      }}
                    >
                      Loss, Risk & Actuarial Analytics
                    </div>
                  </div>
                  <div
                    style={{
                      background: C.farmRed,
                      color: "white",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 20,
                    }}
                  >
                    3 Reports
                  </div>
                </div>
                <div style={{ padding: "12px 0" }}>
                  {["PL Finance", "Business Insurance", "Specialty"].map(
                    (item) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 20px",
                          borderBottom: `1px solid ${C.white15}`,
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <div
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: C.farmRed,
                            }}
                          />
                          <span style={{ fontSize: 13, color: C.white80 }}>
                            {item}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: 10,
                            color: "#FF6B6B",
                            background: "rgba(176,30,35,0.2)",
                            padding: "2px 10px",
                            borderRadius: 10,
                            fontWeight: 600,
                          }}
                        >
                          Loss & Risk
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
              {/* Survival Retention */}
              <div
                style={{
                  background: `linear-gradient(145deg, ${C.cardBg}, ${C.midBg})`,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(46,204,113,0.2), transparent)",
                    padding: "16px 20px",
                    borderBottom: `1px solid ${C.border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 9,
                        color: C.gold,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        fontWeight: 700,
                      }}
                    >
                      Section 03
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "white",
                        marginTop: 2,
                      }}
                    >
                      Survival & Retention
                    </div>
                  </div>
                  <div
                    style={{
                      background: "#27AE60",
                      color: "white",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 20,
                    }}
                  >
                    3 Reports
                  </div>
                </div>
                <div style={{ padding: "12px 0" }}>
                  {["PL Finance", "Bristol West", "Specialty"].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 20px",
                        borderBottom: `1px solid ${C.white15}`,
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#27AE60",
                          }}
                        />
                        <span style={{ fontSize: 13, color: C.white80 }}>
                          {item}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          color: "#2ECC71",
                          background: "rgba(46,204,113,0.15)",
                          padding: "2px 10px",
                          borderRadius: 10,
                          fontWeight: 600,
                        }}
                      >
                        Retention
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Bottom row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {/* Expense */}
              <div
                style={{
                  background: `linear-gradient(145deg, ${C.cardBg}, ${C.midBg})`,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: `linear-gradient(90deg, ${C.gold}22, transparent)`,
                    padding: "16px 20px",
                    borderBottom: `1px solid ${C.border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 9,
                        color: C.gold,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        fontWeight: 700,
                      }}
                    >
                      Section 04
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "white",
                        marginTop: 2,
                      }}
                    >
                      Expense Management
                    </div>
                  </div>
                  <div
                    style={{
                      background: C.gold,
                      color: "#111",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 20,
                    }}
                  >
                    2 Reports
                  </div>
                </div>
                <div style={{ padding: "12px 0" }}>
                  {[
                    "Corporate Finance — Expense Analytics",
                    "Business Insurance — Expense Analytics",
                  ].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 20px",
                        borderBottom: `1px solid ${C.white15}`,
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: C.gold,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: 13, color: C.white80 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Distribution */}
              <div
                style={{
                  background: `linear-gradient(145deg, ${C.cardBg}, ${C.midBg})`,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(45,156,219,0.2), transparent)",
                    padding: "16px 20px",
                    borderBottom: `1px solid ${C.border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 9,
                        color: C.gold,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        fontWeight: 700,
                      }}
                    >
                      Section 05
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "white",
                        marginTop: 2,
                      }}
                    >
                      Distribution & Agency
                    </div>
                  </div>
                  <div
                    style={{
                      background: "#2D9CDB",
                      color: "white",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 20,
                    }}
                  >
                    4 Reports
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    padding: "12px 0",
                  }}
                >
                  {[
                    "Agency Performance",
                    "Distribution Hub",
                    "Affinity & Groups",
                    "Regional View",
                  ].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 20px",
                        borderBottom: `1px solid ${C.white15}`,
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#2D9CDB",
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: 12, color: C.white80 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ─── EXEC DASHBOARD ─── */}
        {activePage === "exec" && (
          <div style={{ display: "flex", minHeight: "70vh" }}>
            {/* Sidebar */}
            <div
              style={{
                width: 200,
                background: C.darkBg,
                borderRight: `1px solid ${C.border}`,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  padding: "20px 16px 8px",
                  fontSize: 9,
                  fontWeight: 700,
                  color: C.gold,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                Navigation
              </div>
              {navItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 20px",
                    cursor: "pointer",
                    background:
                      activeNav === item.id
                        ? `linear-gradient(90deg, ${C.farmBlue}33, transparent)`
                        : "transparent",
                    borderLeft: `3px solid ${
                      activeNav === item.id ? C.gold : "transparent"
                    }`,
                    color: activeNav === item.id ? "white" : C.white50,
                    fontWeight: activeNav === item.id ? 700 : 400,
                    fontSize: 13,
                    transition: "all 0.15s",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: activeNav === item.id ? C.gold : C.white50,
                    }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </div>
              ))}
              <div
                style={{
                  margin: "20px 16px 0",
                  padding: "16px",
                  background: `linear-gradient(135deg, ${C.farmBlue}33, ${C.farmRed}22)`,
                  borderRadius: 10,
                  border: `1px solid ${C.border}`,
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: C.gold,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontWeight: 700,
                  }}
                >
                  Data Quality
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "white",
                    marginTop: 2,
                  }}
                >
                  98.6%
                </div>
                <div style={{ fontSize: 10, color: "#2ECC71", marginTop: 2 }}>
                  ● Excellent
                </div>
              </div>
            </div>
            {/* Main area */}
            <div style={{ flex: 1, padding: 24, overflow: "auto" }}>
              <div
                style={{
                  fontSize: 11,
                  color: C.gold,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                {navItems.find((n) => n.id === activeNav)?.icon} &nbsp;
                Executive View
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "white",
                  marginBottom: 20,
                  borderBottom: `1px solid ${C.border}`,
                  paddingBottom: 12,
                }}
              >
                {navItems.find((n) => n.id === activeNav)?.label}
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: C.white50,
                    marginLeft: 16,
                  }}
                >
                  YTD 2025 — {activeBU}
                </span>
              </div>
              {/* Charts Row 1 */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.3fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <Card
                  title="Combined Ratio by Month"
                  subtitle="All LOBs — 2025 Actuals"
                >
                  <BarChartViz />
                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      marginTop: 8,
                      fontSize: 10,
                    }}
                  >
                    <span style={{ color: "#2ECC71" }}>■ Below 91% — Good</span>
                    <span style={{ color: C.goldLight }}>■ 91–93% — Watch</span>
                    <span style={{ color: C.farmRed }}>
                      ■ Above 93% — Alert
                    </span>
                  </div>
                </Card>
                <Card title="GWP Premium Mix" subtitle="By Line of Business">
                  <DonutChart />
                </Card>
              </div>
              {/* LOB Table */}
              <Card
                title="LOB Performance Summary"
                subtitle="Year-to-Date 2025 | All Business Units"
                style={{ marginBottom: 16 }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: 13,
                    }}
                  >
                    <thead>
                      <tr>
                        {[
                          "Line of Business",
                          "Gross Written Premium",
                          "Loss Ratio",
                          "Combined Ratio",
                          "Retention Rate",
                          "Trend",
                        ].map((h) => (
                          <th
                            key={h}
                            style={{
                              padding: "10px 14px",
                              textAlign: "left",
                              fontSize: 10,
                              fontWeight: 700,
                              color: C.gold,
                              textTransform: "uppercase",
                              letterSpacing: 0.8,
                              borderBottom: `1px solid ${C.border}`,
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {lobRows.map((row, i) => (
                        <tr
                          key={i}
                          style={{ borderBottom: `1px solid ${C.white15}` }}
                        >
                          <td
                            style={{
                              padding: "12px 14px",
                              fontWeight: 700,
                              color: "white",
                              fontSize: 13,
                            }}
                          >
                            {row.name}
                          </td>
                          <td
                            style={{ padding: "12px 14px", color: C.white80 }}
                          >
                            {row.gwp}
                          </td>
                          <td
                            style={{ padding: "12px 14px", color: C.white80 }}
                          >
                            {row.lr}
                          </td>
                          <td style={{ padding: "12px 14px" }}>
                            <StatusPill status={row.status} text={row.cr} />
                          </td>
                          <td
                            style={{ padding: "12px 14px", color: C.white80 }}
                          >
                            {row.ret}
                          </td>
                          <td style={{ padding: "12px 14px" }}>
                            <MiniSparkline
                              data={row.trend}
                              color={
                                row.status === "good"
                                  ? "#2ECC71"
                                  : row.status === "warn"
                                  ? C.goldLight
                                  : C.farmRed
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              {/* Bottom row mini cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 12,
                }}
              >
                {[
                  {
                    label: "New Policies Written",
                    value: "142,384",
                    change: "+8.3%",
                    good: true,
                  },
                  {
                    label: "Renewal Rate",
                    value: "88.7%",
                    change: "+1.8 pts",
                    good: true,
                  },
                  {
                    label: "Avg Premium / Policy",
                    value: "$1,847",
                    change: "+4.2%",
                    good: true,
                  },
                  {
                    label: "Claims Frequency",
                    value: "6.4%",
                    change: "-0.3 pts",
                    good: true,
                  },
                ].map((m, i) => (
                  <div
                    key={i}
                    style={{
                      background: `linear-gradient(145deg, ${C.cardBg}, ${C.darkBg})`,
                      border: `1px solid ${C.border}`,
                      borderRadius: 10,
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        color: C.gold,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        fontWeight: 700,
                        marginBottom: 6,
                      }}
                    >
                      {m.label}
                    </div>
                    <div
                      style={{ fontSize: 22, fontWeight: 800, color: "white" }}
                    >
                      {m.value}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#2ECC71",
                        fontWeight: 600,
                        marginTop: 4,
                      }}
                    >
                      ▲ {m.change} vs PY
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Footer */}
        <div
          style={{
            background: C.darkBg,
            borderTop: `1px solid ${C.border}`,
            padding: "12px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <FarmersLogo size={24} />
            <span style={{ fontSize: 11, color: C.white50 }}>
              Farmers Insurance Group © 2026 &nbsp;|&nbsp; Business Intelligence
              Hub &nbsp;|&nbsp; PPM Dashboards
            </span>
          </div>
          <span style={{ fontSize: 11, color: C.white50 }}>
            🔒 Confidential — For Internal Executive Use Only
          </span>
        </div>
      </div>
    </div>
  );
}
