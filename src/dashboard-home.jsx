import React from 'react';
import { I } from './ui.jsx';

// AminoWeb — Dashboard screens
// All screens render inside a phone frame's content area; a bottom tab bar
// switches between them. Each module screen is the editor for that module.

// =============== Bottom Tab Bar ===============
const TabBar = ({ active, onChange }) => {
  const tabs = [
    { id: "home",   label: "Inicio",   icon: I.home },
    { id: "modules",label: "Módulos",  icon: I.layers },
    { id: "publish",label: "Publicar", icon: I.rocket, primary: true },
    { id: "design", label: "Diseño",   icon: I.brush },
    { id: "me",     label: "Cuenta",   icon: I.user },
  ];
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 40,
      paddingBottom: 24, paddingTop: 8, paddingLeft: 8, paddingRight: 8,
      background: "linear-gradient(to top, #fff 70%, rgba(255,255,255,0))",
    }}>
      <div style={{
        background: "#fff",
        border: "1px solid var(--aw-line)",
        borderRadius: 22,
        padding: "8px 6px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 6px 20px rgba(72,35,23,0.08)",
      }}>
        {tabs.map((t) => {
          const isActive = active === t.id;
          if (t.primary) {
            return (
              <button key={t.id} onClick={() => onChange(t.id)} style={{
                width: 50, height: 50, borderRadius: 16,
                background: "var(--aw-violet)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", boxShadow: "0 6px 14px rgba(72,35,23,0.22)",
                marginTop: -16,
              }}>
                <t.icon size={24} />
              </button>
            );
          }
          return (
            <button key={t.id} onClick={() => onChange(t.id)} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              padding: "6px 0", color: isActive ? "var(--aw-violet)" : "var(--aw-ink-3)",
            }}>
              <t.icon size={20} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.02em" }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// =============== Top App Bar ===============
const TopBar = ({ title, sub, onBack, right }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 12,
    padding: "16px 18px 12px",
  }}>
    {onBack && (
      <button onClick={onBack} style={{
        width: 36, height: 36, borderRadius: 12,
        background: "var(--aw-cream)", display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--aw-ink)",
      }}><I.back size={18} /></button>
    )}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{title}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--aw-ink-3)", marginTop: 2 }}>{sub}</div>}
    </div>
    {right}
  </div>
);

// =============== HOME ===============
const HomeScreen = ({ data, goTo, openPreview }) => {
  const [copied, setCopied] = React.useState(false);
  const stats = [
    { k: "Visitas hoy", v: "84", d: "+12%" },
    { k: "Clics", v: "21", d: "+4" },
  ];
  const copyLink = async () => {
    const url = `aminoweb.la/${data.user.handle}`;
    try { await navigator.clipboard.writeText(url); } catch {
      const el = document.createElement('textarea');
      el.value = url; document.body.appendChild(el); el.select();
      document.execCommand('copy'); document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const activeCount = data.modules.filter(m => m.active).length;
  return (
    <div className="aw-scroll" style={{ height: "100%", overflowY: "auto", paddingBottom: 110 }}>
      <div style={{
        padding: "16px 18px 0", display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>
        <img src={`${import.meta.env.BASE_URL}aminoweb-logo.svg`} alt="aminoweb" style={{ height: 22, width: "auto", display: "block" }}/>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ width: 36, height: 36, borderRadius: 12, background: "var(--aw-cream)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I.bell size={18} color="var(--aw-ink-2)"/>
          </button>
        </div>
      </div>

      {/* Greeting */}
      <div style={{ padding: "16px 18px 4px" }}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
          ¡Hola, Carolina! <span style={{ display: "inline-block" }}>👋</span>
        </div>
        <div style={{ color: "var(--aw-ink-3)", fontSize: 14, marginTop: 6 }}>
          Tu página tiene <b style={{ color: "var(--aw-ink)" }}>{activeCount} módulo{activeCount !== 1 ? 's' : ''}</b> activo{activeCount !== 1 ? 's' : ''}.
        </div>
      </div>

      {/* Public URL card */}
      <div style={{ padding: "14px 18px 0" }}>
        <div style={{
          background: "linear-gradient(135deg, var(--aw-brown) 0%, var(--aw-lavender) 100%)",
          borderRadius: 20, padding: 16, color: "#fff",
          boxShadow: "0 10px 24px rgba(72,35,23,0.16)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", right: -30, top: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.10)" }}/>
          <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, letterSpacing: "0.08em", textTransform: "uppercase" }}>Tu página</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
            <I.globe size={16}/>aminoweb.la/<b>{data.user.handle}</b>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button onClick={openPreview} style={{
              flex: 1, height: 40, borderRadius: 12, background: "#fff", color: "var(--aw-violet)",
              fontWeight: 700, fontSize: 13, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}><I.eye size={15}/> Ver página</button>
            <button onClick={copyLink} style={{
              width: 40, height: 40, borderRadius: 12,
              background: copied ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.18)", color: "#fff",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              transition: "background .2s",
            }}>
              {copied ? <I.check size={16}/> : <I.copy size={16}/>}
            </button>
            <button style={{
              width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.18)", color: "#fff",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}><I.qr size={16}/></button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: "14px 18px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {stats.map((s) => (
          <div key={s.k} style={{
            background: "#fff", borderRadius: 16, padding: 14, border: "1px solid var(--aw-line)",
          }}>
            <div style={{ fontSize: 11, color: "var(--aw-ink-3)", fontWeight: 600 }}>{s.k}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
              <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>{s.v}</span>
              <span style={{ fontSize: 11, color: "var(--aw-success)", fontWeight: 700 }}>{s.d}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick edit */}
      <div style={{ padding: "20px 18px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--aw-ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
          Acciones rápidas
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <QuickAction icon={I.user}  label="Editar perfil"   onClick={() => goTo("profile")}      tone="violet"/>
          <QuickAction icon={I.link}  label="Agregar enlace"  onClick={() => goTo("links:add")}   tone="coral"/>
          <QuickAction icon={I.bag}   label="Nuevo producto"  onClick={() => goTo("products:add")} tone="ink"/>
          <QuickAction icon={I.cal}   label="Crear evento"    onClick={() => goTo("events:add")}   tone="violet"/>
        </div>
      </div>

      {/* Tip */}
      <div style={{ padding: "20px 18px 0" }}>
        <div style={{
          background: "var(--aw-coral-50)", borderRadius: 16, padding: 14,
          display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 12, background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}><I.spark size={18} color="var(--aw-coral)"/></div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#9A3412" }}>Consejo del día</div>
            <div style={{ fontSize: 12, color: "#9A3412", opacity: 0.8, marginTop: 2, lineHeight: 1.45 }}>
              Comparte tu página en WhatsApp con un código QR — funciona offline.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickAction = ({ icon: Ic, label, onClick, tone }) => {
  const tones = {
    violet: { bg: "#fff", icon: "var(--aw-violet)", chip: "var(--aw-violet-50)" },
    coral:  { bg: "#fff", icon: "var(--aw-coral)",  chip: "var(--aw-coral-50)"  },
    ink:    { bg: "#fff", icon: "var(--aw-ink)",    chip: "var(--aw-violet-50)" },
  }[tone];
  return (
    <button onClick={onClick} style={{
      background: tones.bg, border: "1px solid var(--aw-line)",
      borderRadius: 16, padding: 12, display: "flex", flexDirection: "column",
      alignItems: "flex-start", gap: 12, textAlign: "left",
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10, background: tones.chip,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}><Ic size={17} color={tones.icon}/></div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--aw-ink)" }}>{label}</div>
    </button>
  );
};

export {  TabBar, TopBar, HomeScreen, QuickAction  };
