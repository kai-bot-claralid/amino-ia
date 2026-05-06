// AminoWeb — shared UI primitives and icons (lucide-style monoline strokes)

const Icon = ({ d, size = 22, color = "currentColor", strokeWidth = 1.8, fill = "none", style, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
       strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {d ? <path d={d}/> : children}
  </svg>
);

// minimal icon set we'll use
const I = {
  home:   (p) => <Icon {...p}><path d="M3 11l9-8 9 8"/><path d="M5 9.5V21h14V9.5"/></Icon>,
  link:   (p) => <Icon {...p}><path d="M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1"/></Icon>,
  bag:    (p) => <Icon {...p}><path d="M5 7h14l-1.2 12.4A2 2 0 0115.8 21H8.2a2 2 0 01-2-1.6L5 7z"/><path d="M9 7V5a3 3 0 016 0v2"/></Icon>,
  doc:    (p) => <Icon {...p}><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6"/></Icon>,
  cal:    (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></Icon>,
  brush:  (p) => <Icon {...p}><path d="M14 4l6 6-9.5 9.5a3.5 3.5 0 01-5-5L14 4z"/><path d="M11 7l6 6"/></Icon>,
  plus:   (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  eye:    (p) => <Icon {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></Icon>,
  eyeOff: (p) => <Icon {...p}><path d="M3 3l18 18"/><path d="M10.6 6.1A11 11 0 0112 6c6.5 0 10 6 10 6a16 16 0 01-3 4M6 8a16 16 0 00-4 4s3.5 7 10 7c1.6 0 3-.3 4.3-.8"/><path d="M9.7 9.7a3 3 0 004.6 4.6"/></Icon>,
  drag:   (p) => <Icon {...p}><circle cx="9" cy="6" r="1.3"/><circle cx="9" cy="12" r="1.3"/><circle cx="9" cy="18" r="1.3"/><circle cx="15" cy="6" r="1.3"/><circle cx="15" cy="12" r="1.3"/><circle cx="15" cy="18" r="1.3"/></Icon>,
  share:  (p) => <Icon {...p}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 11l7.6-4M8.2 13l7.6 4"/></Icon>,
  edit:   (p) => <Icon {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 113 3L7 19l-4 1 1-4 12.5-12.5z"/></Icon>,
  trash:  (p) => <Icon {...p}><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></Icon>,
  chev:   (p) => <Icon {...p}><path d="M9 6l6 6-6 6"/></Icon>,
  arrow:  (p) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Icon>,
  check:  (p) => <Icon {...p}><path d="M5 12l4 4L19 6"/></Icon>,
  bell:   (p) => <Icon {...p}><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9z"/><path d="M10 21a2 2 0 004 0"/></Icon>,
  search: (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></Icon>,
  globe:  (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></Icon>,
  qr:     (p) => <Icon {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 21h3M17 17v4"/></Icon>,
  copy:   (p) => <Icon {...p}><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2h3"/></Icon>,
  pin:    (p) => <Icon {...p}><path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></Icon>,
  back:   (p) => <Icon {...p}><path d="M15 6l-6 6 6 6"/></Icon>,
  more:   (p) => <Icon {...p}><circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/></Icon>,
  whats:  (p) => <Icon {...p}><path d="M21 12a9 9 0 11-3.5-7.1L21 4l-1 4.5A9 9 0 0121 12z"/><path d="M8.5 9.5c.5 3 2.5 5 5.5 5.5l1-1.5 2 1c-.5 1.5-2 2-3.5 1.5-3-1-5-3-6-6-.5-1.5 0-3 1.5-3.5l1 2-1.5 1z"/></Icon>,
  ig:     (p) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.7" fill="currentColor"/></Icon>,
  spark:  (p) => <Icon {...p}><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z"/></Icon>,
  rocket: (p) => <Icon {...p}><path d="M14 4s5 0 6 1c1 1 1 6 1 6l-7 7-3-3 3-11z"/><path d="M9 11l-4 1-2 4 4-2 1-4z"/><circle cx="16" cy="8" r="1.5"/></Icon>,
  user:   (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></Icon>,
  layers: (p) => <Icon {...p}><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5M3 18l9 5 9-5"/></Icon>,
};

// Small chip / pill
const Chip = ({ children, tone = "violet", style }) => {
  const tones = {
    violet: { bg: "var(--aw-violet-50)", fg: "var(--aw-violet-600)" },
    coral:  { bg: "var(--aw-coral-50)",  fg: "#C2410C" },
    ink:    { bg: "#F1ECF9",             fg: "var(--aw-ink-2)" },
    success:{ bg: "#DCFCE7",             fg: "#047857" },
    yellow: { bg: "#FEF3C7",             fg: "#92400E" },
  }[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "3px 9px", borderRadius: 999,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.01em",
      background: tones.bg, color: tones.fg, ...style,
    }}>{children}</span>
  );
};

// Brand wordmark
const Wordmark = ({ size = 18, color }) => (
  <span className="aw-wordmark" style={{ fontSize: size, color: color || "var(--aw-ink)" }}>
    amino<span className="dot" style={{ color: color ? color : "var(--aw-violet)" }}>web</span>
  </span>
);

// Simple round avatar placeholder
const Avatar = ({ size = 44, label = "C" }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: "linear-gradient(135deg, #FFB991, #FF8A5C)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: 800, fontSize: size * 0.42,
    boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.4)",
    flexShrink: 0,
  }}>{label}</div>
);

// Striped image placeholder
const ImgPH = ({ ratio = "16/10", radius = 14, label = "image", style }) => (
  <div className="aw-placeholder" style={{
    aspectRatio: ratio, width: "100%", borderRadius: radius, ...style,
  }}>{label}</div>
);

// Toggle
const Toggle = ({ on, onChange, size = 28 }) => (
  <button
    onClick={() => onChange?.(!on)}
    style={{
      width: size * 1.7, height: size, borderRadius: 999,
      background: on ? "var(--aw-violet)" : "#D9D2E6",
      position: "relative", transition: "all .18s ease",
      flexShrink: 0,
    }}>
    <span style={{
      position: "absolute", top: 2, left: on ? size * 0.78 : 2,
      width: size - 4, height: size - 4, borderRadius: "50%",
      background: "#fff", transition: "all .18s ease",
      boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
    }} />
  </button>
);

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
};

export {  Icon, I, Chip, Wordmark, Avatar, ImgPH, Toggle  };
export { copyToClipboard };
