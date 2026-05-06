import React, { useState as useS } from 'react';
import { I, Avatar, copyToClipboard } from './ui.jsx';
import { PublicPage } from './public-page.jsx';
import { Field, FieldLabel, LayoutPreview } from './dashboard-screens.jsx';

const LINK_ICONS = [
  { key: 'link',  Ico: I.link  },
  { key: 'whats', Ico: I.whats },
  { key: 'ig',    Ico: I.ig    },
  { key: 'globe', Ico: I.globe },
  { key: 'bag',   Ico: I.bag   },
  { key: 'doc',   Ico: I.doc   },
  { key: 'user',  Ico: I.user  },
  { key: 'cal',   Ico: I.cal   },
  { key: 'bell',  Ico: I.bell  },
  { key: 'share', Ico: I.share },
  { key: 'pin',   Ico: I.pin   },
  { key: 'spark', Ico: I.spark },
];
const EMOJI_TO_KEY = { '🔗':'link','💬':'whats','📷':'ig','📄':'doc','⭐':'spark','🌐':'globe','📞':'bell','📧':'share','🎵':'cal','🎬':'eye','🛍':'bag','📍':'pin' };
const getLinkIcon = (key) => {
  const resolved = EMOJI_TO_KEY[key] || key;
  return (LINK_ICONS.find(x => x.key === resolved) || LINK_ICONS[0]).Ico;
};

// AminoWeb — Desktop layout
// Sidebar (nav) | TopBar + SecondaryPanel + Canvas
// The canvas (live page preview) always takes the most space.

// ─── Nav items — dots from brand mark palette ─────────────────────────────────
const DESKTOP_NAV = [
  { id: "home",     label: "Inicio",    dot: "#AED5CD",  icon: I.home    },
  { id: "profile",  label: "Perfil",    dot: "#CDB5E7",  icon: I.user    },
  { id: "links",    label: "Enlaces",   dot: "#B7D9EC",  icon: I.link    },
  { id: "products", label: "Productos", dot: "#AED5CD",  icon: I.bag     },
  { id: "events",   label: "Eventos",   dot: "#CDB5E7",  icon: I.cal     },
  { id: "blog",     label: "Blog",      dot: "#B7D9EC",  icon: I.doc     },
  { id: "design",   label: "Diseño",    dot: "#F5C5A3",  icon: I.brush   },
];

const LEAP_TONES = {
  orange: { bg: "#FEF0E6", color: "#D97706" },
  pink:   { bg: "#FDE8F2", color: "#C93178" },
  blue:   { bg: "#E8EFFE", color: "#3B6EE0" },
  green:  { bg: "#E6F5EE", color: "#2A9E5E" },
};

// ─── Device icons (inline, no external dep) ──────────────────────────────────
const MonitorIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
  </svg>
);
const PhoneIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="18" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const DesktopSidebar = ({ active, onSelect, collapsed, onToggle, userName = "Usuario" }) => {
  const [hovered, setHovered] = useS(null);
  return (
  <aside style={{
    width: collapsed ? 58 : 242,
    height: "100%",
    background: "#fff",
    borderRight: "1px solid #ECE6DE",
    flexShrink: 0,
    display: "flex", flexDirection: "column",
    transition: "width .2s ease",
    overflow: "hidden",
  }}>
    {/* Workspace header */}
    <div style={{
      height: 68,
      padding: "0 20px",
      display: "flex", alignItems: "center", gap: 8,
      borderBottom: "none",
      flexShrink: 0,
    }}>
      <img src={import.meta.env.BASE_URL + "aminoweb-mark.svg"} alt="Amino IA"
        style={{ height: 22, display: "block", flexShrink: 0 }}/>
      {!collapsed && (
        <span style={{
          fontSize: 15, fontWeight: 800,
          color: "#2E1E14",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>Amino IA</span>
      )}
      {!collapsed && (
        <button onClick={onToggle} style={{
          width: 24, height: 24, borderRadius: 4,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "transparent", color: "var(--aw-ink-3)", flexShrink: 0,
        }}>
          <I.chev size={13} color="currentColor"/>
        </button>
      )}
    </div>

    {/* Search */}
    {!collapsed && (
      <div style={{ padding: "8px 10px", flexShrink: 0 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "5px 8px",
          background: "var(--aw-surface)",
          border: "1px solid var(--aw-line)",
          borderRadius: 6,
          color: "var(--aw-ink-3)",
          fontSize: 13,
        }}>
          <span style={{ fontSize: 14, opacity: 0.5 }}>🔍</span>
          <span style={{ flex: 1 }}>Buscar...</span>
        </div>
      </div>
    )}

    {/* Nav */}
    <nav style={{ flex: 1, padding: "6px 10px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
      {!collapsed && (
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--aw-ink-3)", letterSpacing: "0.04em", padding: "10px 6px 4px", textTransform: "uppercase" }}>
          Página
        </div>
      )}
      {DESKTOP_NAV.map(item => {
        const isActive = active === item.id;
        const isHovered = hovered === item.id;
        return (
          <button key={item.id} onClick={() => onSelect(item.id)}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            title={collapsed ? item.label : undefined}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: collapsed ? "0" : "0 6px",
              justifyContent: collapsed ? "center" : "flex-start",
              height: 38, borderRadius: 10,
              background: isActive ? "#FCE8F0" : isHovered ? "#FAF0EA" : "transparent",
              color: isActive ? "#C93178" : isHovered ? "#3D2C22" : "#5C3D2E",
              fontSize: 14,
              fontWeight: isActive ? 650 : 500,
              transition: "background .1s, color .1s",
              flexShrink: 0,
              marginBottom: 1,
              position: "relative",
            }}>
            <item.icon size={17} color="currentColor"/>
            {!collapsed && <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>}
            {collapsed && isActive && (
              <div style={{ position: "absolute", top: 6, right: 6, width: 4, height: 4, borderRadius: "50%", background: "#9B7BC9" }}/>
            )}
          </button>
        );
      })}
    </nav>

    {/* User footer */}
    <div style={{ padding: "14px 14px 18px", borderTop: "1px solid #ECE6DE", flexShrink: 0 }}>
      {!collapsed && (
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--aw-ink-3)", letterSpacing: "0.04em", padding: "4px 6px 6px", textTransform: "uppercase" }}>
          Mi cuenta
        </div>
      )}
      <div style={{
        display: "flex", alignItems: "center", gap: 8, padding: "4px 6px",
        borderRadius: 6, justifyContent: collapsed ? "center" : "flex-start",
      }}>
        <div style={{
          width: 24, height: 24, borderRadius: 4, background: "var(--aw-line-2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 600, color: "var(--aw-ink-2)", flexShrink: 0,
        }}>
          {(userName || "U").charAt(0).toUpperCase()}
        </div>
        {!collapsed && (
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--aw-ink)", letterSpacing: "-0.01em" }}>{userName}</div>
          </div>
        )}
      </div>
      {collapsed && (
        <button onClick={onToggle} title="Expandir" style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
          padding: "4px", borderRadius: 4, marginTop: 2,
          background: "transparent", color: "var(--aw-ink-3)",
        }}>
          <I.chev size={13} color="currentColor" style={{ transform: "rotate(180deg)" }}/>
        </button>
      )}
    </div>
  </aside>
  );
};

// ─── Top bar ──────────────────────────────────────────────────────────────────
const NAV_LABELS = {
  home: "Inicio", profile: "Perfil", links: "Enlaces",
  products: "Productos", events: "Eventos", blog: "Blog", design: "Diseño",
};

const TopBar = ({ active, device, onDeviceChange, handle }) => {
  const [shared, setShared] = useS(false);
  const handleShare = async () => {
    await copyToClipboard(`aminoweb.la/${handle}`);
    setShared(true); setTimeout(() => setShared(false), 2000);
  };
  return (
    <div style={{
      height: 64, padding: "0 36px",
      background: "#F5F3EF", borderBottom: "1px solid #ECE6DE",
      display: "flex", alignItems: "center", gap: 0,
      flexShrink: 0,
    }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: "#3D2C22" }}>
          Welcome, {handle} 👋
        </span>
      </div>

      {/* Device switcher */}
      <div style={{ display: "flex", gap: 2, padding: 4, background: "var(--aw-cream)", borderRadius: 10, marginRight: 12 }}>
        {[{ id: "desktop", Ico: MonitorIcon }, { id: "phone", Ico: PhoneIcon }].map(({ id, Ico }) => (
          <button key={id} onClick={() => onDeviceChange(id)} style={{
            width: 32, height: 32, borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: device === id ? "#fff" : "transparent",
            color: device === id ? "var(--aw-ink)" : "var(--aw-ink-3)",
            boxShadow: device === id ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            transition: "all .12s",
          }}>
            <Ico size={16}/>
          </button>
        ))}
      </div>

      {/* Share */}
      <button onClick={handleShare} title="Copiar enlace" style={{
        width: 36, height: 36, borderRadius: 9,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: shared ? "var(--aw-success)" : "var(--aw-ink-3)", marginRight: 8,
        transition: "color .2s",
      }}>
        {shared ? <I.check size={18}/> : <I.share size={18}/>}
      </button>

      {/* Publicar */}
      <button style={{
        height: 36, padding: "0 16px", borderRadius: 10,
        background: "var(--aw-violet)", color: "#fff",
        fontSize: 13, fontWeight: 700,
        display: "inline-flex", alignItems: "center", gap: 6,
      }}>
        <I.rocket size={14}/> Publicar
      </button>
    </div>
  );
};

// ─── Panel: Inicio ────────────────────────────────────────────────────────────
const HomePanel = ({ data }) => {
  const [copied, setCopied] = useS(false);
  const handleCopy = async () => {
    await copyToClipboard(`aminoweb.la/${data.user.handle}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  const s = data.stats || {};
  const actions = [
    { title: "Configura tu página pública", desc: "Ajusta nombre, bio, portada y estilo para que tu perfil se vea listo para compartir.", btn: "Personalizar", tone: "orange", icon: I.brush },
    { title: "Agrega un producto o servicio", desc: "Crea una oferta simple con precio, descripción y contacto directo por WhatsApp.", btn: "Crear producto", tone: "pink", icon: I.bag },
    { title: "Publica tus enlaces importantes", desc: "Organiza Instagram, WhatsApp, tienda, calendario y recursos en un solo lugar.", btn: "Editar links", tone: "blue", icon: I.link },
    { title: "Revisa tu actividad", desc: `${s.visitsToday ?? "—"} visitas hoy · ${s.clicks ?? "—"} clics registrados.`, btn: "Ver resumen", tone: "green", icon: I.analytics || I.spark },
  ];
  return (
    <div className="aw-scroll" style={{ flex: 1, overflowY: "auto", padding: "40px 36px 60px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 650, color: "#3D2C22", margin: "0 0 28px", letterSpacing: "-0.01em" }}>
        Get started
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {actions.map((a) => {
          const tone = LEAP_TONES[a.tone];
          return (
            <div key={a.title} style={{
              display: "flex", alignItems: "center", gap: 18,
              background: "#fff", border: "1.5px solid #E8E0D6",
              borderRadius: 14, padding: "20px 22px",
              boxShadow: "0 1px 0 rgba(61,44,34,0.02)",
            }}>
              <div style={{
                width: 46, height: 46, borderRadius: "50%",
                background: tone.bg, color: tone.color,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}><a.icon size={23} color="currentColor"/></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 650, color: "#3D2C22", marginBottom: 5 }}>{a.title}</div>
                <div style={{ fontSize: 13.5, color: "#7A5C4A", lineHeight: 1.5 }}>{a.desc}</div>
              </div>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "8px 18px", borderRadius: 30,
                border: "1.5px solid #C9B8AE", background: "#fff",
                fontSize: 13.5, fontWeight: 500, color: "#3D2C22", whiteSpace: "nowrap",
              }}>{a.btn}</button>
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: 12, fontWeight: 700, color: "#8A6A5A", textTransform: "uppercase", letterSpacing: "0.06em", margin: "28px 0 10px" }}>
        Tu página
      </p>
      <div style={{
        background: "linear-gradient(135deg, #FDE8F2 0%, #E8EFFE 100%)",
        border: "1.5px solid #E8E0D6",
        borderRadius: 14, padding: "16px", color: "#3D2C22",
      }}>
        <div style={{ fontSize: 12, opacity: 0.65, marginBottom: 4 }}>Enlace público</div>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>aminoweb.la/{data.user.handle}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={handleCopy} style={{ flex: 1, height: 34, borderRadius: 999, background: copied ? "#C93178" : "#fff", color: copied ? "#fff" : "#3D2C22", border: "1.5px solid #C9B8AE", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "background .2s" }}>
            {copied ? <><I.check size={13}/> Copiado</> : <><I.copy size={13}/> Copiar</>}
          </button>
          <button style={{ flex: 1, height: 34, borderRadius: 999, background: "#fff", color: "#3D2C22", border: "1.5px solid #C9B8AE", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
            <I.qr size={13}/> QR
          </button>
        </div>
      </div>
    </div>
  );
};


// ─── Panel: Diseño ────────────────────────────────────────────────────────────
const PALETTES = [
  { id: "violet",   name: "Lavanda",    colors: ["#9B7BC9", "#AED5CD", "#FAF6EE"] },
  { id: "coral",    name: "Coral",      colors: ["#E89A7A", "#9B7BC9", "#FAF6EE"] },
  { id: "mint",     name: "Menta",      colors: ["#6FB8A8", "#2E2E33", "#F0F5F1"] },
  { id: "midnight", name: "Medianoche", colors: ["#2E2E33", "#CDB5E7", "#AED5CD"] },
  { id: "sand",     name: "Arena",      colors: ["#A88A5C", "#2E2E33", "#FAF6EE"] },
];
const LAYOUTS = [
  { id: "stack",  name: "Pila",        desc: "Botones apilados" },
  { id: "hybrid", name: "Híbrido",     desc: "Hero + secciones" },
  { id: "grid",   name: "Cuadrícula",  desc: "Tarjetas en mosaico" },
];

const DesignPanel = ({ data, setData }) => {
  const setD = (k, v) => setData({ ...data, design: { ...data.design, [k]: v } });
  return (
    <div className="aw-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 12px" }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--aw-ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 2px 12px" }}>
        Paleta de colores
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 22 }}>
        {PALETTES.map(p => (
          <button key={p.id} onClick={() => setD("palette", p.id)} style={{
            display: "flex", alignItems: "center", gap: 0, padding: "10px 12px",
            borderRadius: 12, background: "var(--aw-surface)",
            border: data.design.palette === p.id ? "1.5px solid var(--aw-violet)" : "1px solid var(--aw-line)",
          }}>
            <div style={{ display: "flex", gap: 4 }}>
              {p.colors.map((c, i) => <div key={i} style={{ width: 18, height: 18, borderRadius: 5, background: c }}/>)}
            </div>
            <span style={{ flex: 1, textAlign: "left", fontSize: 13, fontWeight: 600 }}>{p.name}</span>
            {data.design.palette === p.id && <I.check size={14} color="var(--aw-violet)"/>}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--aw-ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 2px 12px" }}>
        Layout
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 22 }}>
        {LAYOUTS.map(l => (
          <button key={l.id} onClick={() => setD("layout", l.id)} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
            borderRadius: 12, background: "var(--aw-surface)",
            border: data.design.layout === l.id ? "1.5px solid var(--aw-violet)" : "1px solid var(--aw-line)",
          }}>
            <LayoutPreview kind={l.id}/>
            <div style={{ textAlign: "left", flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{l.name}</div>
              <div style={{ fontSize: 11, color: "var(--aw-ink-3)" }}>{l.desc}</div>
            </div>
            {data.design.layout === l.id && <I.check size={14} color="var(--aw-violet)"/>}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--aw-ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 2px 12px" }}>
        Esquinas
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        {[{ id: "soft", label: "Suaves" }, { id: "sharp", label: "Marcadas" }].map(c => (
          <button key={c.id} onClick={() => setD("cornerStyle", c.id)} style={{
            flex: 1, height: 40, borderRadius: 10, background: "var(--aw-surface)",
            border: data.design.cornerStyle === c.id ? "1.5px solid var(--aw-violet)" : "1px solid var(--aw-line)",
            fontSize: 13, fontWeight: 700,
          }}>{c.label}</button>
        ))}
      </div>
    </div>
  );
};

// ─── Panel: Mi marca ─────────────────────────────────────────────────────────
const BrandPanel = ({ data, setData }) => {
  const [saved, setSaved] = useS(false);
  const p = data.profile;
  const set = (k, v) => setData({ ...data, profile: { ...p, [k]: v } });
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="aw-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 12px" }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--aw-ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 2px 16px" }}>
        Perfil público
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <Avatar size={52} label="C"/>
        <button style={{ height: 32, padding: "0 14px", borderRadius: 8, background: "var(--aw-surface)", border: "1px solid var(--aw-line)", fontSize: 12, fontWeight: 700 }}>
          Cambiar foto
        </button>
      </div>
      <FieldLabel>Nombre</FieldLabel>
      <Field value={p.name} onChange={v => set("name", v)}/>
      <FieldLabel>Bio</FieldLabel>
      <Field value={p.bio} onChange={v => set("bio", v)} multiline/>
      <FieldLabel>Ubicación</FieldLabel>
      <Field value={p.location} onChange={v => set("location", v)}/>
      <button onClick={handleSave} style={{
        marginTop: 20, width: "100%", height: 40, borderRadius: 10,
        background: saved ? "#10B981" : "var(--aw-violet)", color: "#fff", fontWeight: 700, fontSize: 13,
        transition: "background .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
      }}>
        {saved ? <><I.check size={15}/> Guardado</> : "Guardar cambios"}
      </button>
    </div>
  );
};


// ─── Panel: Enlaces ───────────────────────────────────────────────────────────
const LinksPanel = ({ data, setData }) => {
  const [mode, setMode] = useS('list');
  const [title, setTitle] = useS('');
  const [url, setUrl] = useS('');
  const [icon, setIcon] = useS('link');
  const canSave = title.trim() && url.trim();
  const handleAdd = () => {
    if (!canSave) return;
    setData({ ...data, links: [...data.links, { id: 'l'+Date.now(), title: title.trim(), url: url.trim(), icon, clicks: 0 }] });
    setTitle(''); setUrl(''); setIcon('link'); setMode('list');
  };
  const handleDelete = (id) => setData({ ...data, links: data.links.filter(l => l.id !== id) });

  if (mode === 'add') return (
    <div className="aw-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setMode('list')} style={{ color: "var(--aw-ink-3)", display: "flex" }}><I.back size={16}/></button>
        <span style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>Nuevo enlace</span>
      </div>
      <FieldLabel>Ícono</FieldLabel>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 4 }}>
        {LINK_ICONS.map(({ key, Ico }) => (
          <button key={key} onClick={() => setIcon(key)} style={{
            width: 36, height: 36, borderRadius: 8,
            border: icon===key ? "1.5px solid var(--aw-violet)" : "1px solid var(--aw-line)",
            background: icon===key ? "var(--aw-violet-50)" : "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: icon===key ? "var(--aw-violet)" : "var(--aw-ink-3)",
          }}><Ico size={16}/></button>
        ))}
      </div>
      <FieldLabel>Título</FieldLabel>
      <Field value={title} onChange={setTitle} placeholder="Ej: WhatsApp"/>
      <FieldLabel>URL</FieldLabel>
      <Field value={url} onChange={setUrl} placeholder="https://..."/>
      <button onClick={handleAdd} disabled={!canSave} style={{ marginTop: 16, width: "100%", height: 38, borderRadius: 10, background: canSave ? "var(--aw-violet)" : "#E8E0F4", color: canSave ? "#fff" : "var(--aw-ink-3)", fontWeight: 700, fontSize: 13 }}>Guardar</button>
    </div>
  );

  return (
    <div className="aw-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--aw-ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{data.links.length} enlaces</p>
        <button onClick={() => setMode('add')} style={{ height: 28, padding: "0 10px", borderRadius: 8, background: "var(--aw-violet)", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
          <I.plus size={13}/> Agregar
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.links.map(l => (
          <div key={l.id} style={{ background: "var(--aw-surface)", border: "1px solid var(--aw-line)", borderRadius: 12, padding: "11px 12px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--aw-cream)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--aw-violet)" }}>
              {React.createElement(getLinkIcon(l.icon), { size: 15 })}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.title}</div>
              <div style={{ fontSize: 11, color: "var(--aw-ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.url}</div>
            </div>
            <button onClick={() => handleDelete(l.id)} style={{ color: "#DC2626", display: "flex", opacity: 0.6 }}><I.trash size={13}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Panel: Productos ─────────────────────────────────────────────────────────
const ProductsPanel = ({ data, setData }) => {
  const [mode, setMode] = useS('list');
  const [title, setTitle] = useS('');
  const [price, setPrice] = useS('');
  const [desc, setDesc] = useS('');
  const canSave = title.trim();
  const handleAdd = () => {
    if (!canSave) return;
    setData({ ...data, products: [...data.products, { id: 'p'+Date.now(), title: title.trim(), price: price.trim(), desc: desc.trim() }] });
    setTitle(''); setPrice(''); setDesc(''); setMode('list');
  };
  const handleDelete = (id) => setData({ ...data, products: data.products.filter(p => p.id !== id) });

  if (mode === 'add') return (
    <div className="aw-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setMode('list')} style={{ color: "var(--aw-ink-3)", display: "flex" }}><I.back size={16}/></button>
        <span style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>Nuevo producto</span>
      </div>
      <FieldLabel>Título</FieldLabel>
      <Field value={title} onChange={setTitle} placeholder="Ej: Consulta 1:1"/>
      <FieldLabel>Precio</FieldLabel>
      <Field value={price} onChange={setPrice} placeholder="Ej: $50 USD"/>
      <FieldLabel>Descripción</FieldLabel>
      <Field value={desc} onChange={setDesc} placeholder="Describe tu producto..." multiline/>
      <button onClick={handleAdd} disabled={!canSave} style={{ marginTop: 16, width: "100%", height: 38, borderRadius: 10, background: canSave ? "var(--aw-violet)" : "#E8E0F4", color: canSave ? "#fff" : "var(--aw-ink-3)", fontWeight: 700, fontSize: 13 }}>Guardar</button>
    </div>
  );

  return (
    <div className="aw-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--aw-ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{data.products.length} productos</p>
        <button onClick={() => setMode('add')} style={{ height: 28, padding: "0 10px", borderRadius: 8, background: "var(--aw-violet)", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
          <I.plus size={13}/> Agregar
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.products.map(p => (
          <div key={p.id} style={{ background: "var(--aw-surface)", border: "1px solid var(--aw-line)", borderRadius: 12, padding: "11px 12px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: "var(--aw-coral-50)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--aw-coral)" }}>
              <I.bag size={18}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
              <div style={{ fontSize: 11, color: "var(--aw-violet)", fontWeight: 700 }}>{p.price}</div>
            </div>
            <button onClick={() => handleDelete(p.id)} style={{ color: "#DC2626", display: "flex", opacity: 0.6 }}><I.trash size={13}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Panel: Eventos ───────────────────────────────────────────────────────────
const EventsPanel = ({ data, setData }) => {
  const [mode, setMode] = useS('list');
  const [title, setTitle] = useS('');
  const [date, setDate] = useS('');
  const [time, setTime] = useS('');
  const [desc, setDesc] = useS('');
  const canSave = title.trim() && date;
  const handleAdd = () => {
    if (!canSave) return;
    setData({ ...data, events: [...data.events, { id: 'e'+Date.now(), title: title.trim(), date, time, desc: desc.trim() }] });
    setTitle(''); setDate(''); setTime(''); setDesc(''); setMode('list');
  };
  const handleDelete = (id) => setData({ ...data, events: data.events.filter(e => e.id !== id) });

  if (mode === 'add') return (
    <div className="aw-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setMode('list')} style={{ color: "var(--aw-ink-3)", display: "flex" }}><I.back size={16}/></button>
        <span style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>Nuevo evento</span>
      </div>
      <FieldLabel>Título</FieldLabel>
      <Field value={title} onChange={setTitle} placeholder="Ej: Workshop de marca"/>
      <FieldLabel>Fecha</FieldLabel>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: "100%", height: 38, borderRadius: 8, border: "1.5px solid var(--aw-line)", padding: "0 10px", fontSize: 13, fontFamily: "inherit", marginBottom: 8, boxSizing: "border-box" }}/>
      <FieldLabel>Hora</FieldLabel>
      <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ width: "100%", height: 38, borderRadius: 8, border: "1.5px solid var(--aw-line)", padding: "0 10px", fontSize: 13, fontFamily: "inherit", marginBottom: 8, boxSizing: "border-box" }}/>
      <FieldLabel>Descripción</FieldLabel>
      <Field value={desc} onChange={setDesc} placeholder="Detalles del evento..." multiline/>
      <button onClick={handleAdd} disabled={!canSave} style={{ marginTop: 16, width: "100%", height: 38, borderRadius: 10, background: canSave ? "var(--aw-violet)" : "#E8E0F4", color: canSave ? "#fff" : "var(--aw-ink-3)", fontWeight: 700, fontSize: 13 }}>Guardar</button>
    </div>
  );

  return (
    <div className="aw-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--aw-ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{data.events.length} eventos</p>
        <button onClick={() => setMode('add')} style={{ height: 28, padding: "0 10px", borderRadius: 8, background: "var(--aw-violet)", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
          <I.plus size={13}/> Crear
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.events.map(e => {
          const d = new Date(e.date);
          const day = d.getDate();
          const mon = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"][d.getMonth()];
          return (
            <div key={e.id} style={{ background: "var(--aw-surface)", border: "1px solid var(--aw-line)", borderRadius: 12, padding: "11px 12px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 40, height: 44, borderRadius: 8, background: "var(--aw-coral-50)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#9A3412", letterSpacing: "0.06em" }}>{mon}</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: "#9A3412", lineHeight: 1 }}>{day}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.title}</div>
                <div style={{ fontSize: 11, color: "var(--aw-ink-3)" }}>{e.time}</div>
              </div>
              <button onClick={() => handleDelete(e.id)} style={{ color: "#DC2626", display: "flex", opacity: 0.6 }}><I.trash size={13}/></button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Panel: Blog ──────────────────────────────────────────────────────────────
const BlogPanel = ({ data, setData }) => {
  const [mode, setMode] = useS('list');
  const [title, setTitle] = useS('');
  const [excerpt, setExcerpt] = useS('');
  const canSave = title.trim();
  const handleAdd = () => {
    if (!canSave) return;
    const today = new Date().toISOString().split('T')[0];
    setData({ ...data, blog: [...data.blog, { id: 'b'+Date.now(), title: title.trim(), excerpt: excerpt.trim(), date: today }] });
    setTitle(''); setExcerpt(''); setMode('list');
  };
  const handleDelete = (id) => setData({ ...data, blog: data.blog.filter(b => b.id !== id) });

  if (mode === 'add') return (
    <div className="aw-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setMode('list')} style={{ color: "var(--aw-ink-3)", display: "flex" }}><I.back size={16}/></button>
        <span style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>Nueva publicación</span>
      </div>
      <FieldLabel>Título</FieldLabel>
      <Field value={title} onChange={setTitle} placeholder="Ej: Mis 5 tips de marca"/>
      <FieldLabel>Extracto</FieldLabel>
      <Field value={excerpt} onChange={setExcerpt} placeholder="Un resumen breve..." multiline/>
      <button onClick={handleAdd} disabled={!canSave} style={{ marginTop: 16, width: "100%", height: 38, borderRadius: 10, background: canSave ? "var(--aw-violet)" : "#E8E0F4", color: canSave ? "#fff" : "var(--aw-ink-3)", fontWeight: 700, fontSize: 13 }}>Publicar</button>
    </div>
  );

  return (
    <div className="aw-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--aw-ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{data.blog.length} publicaciones</p>
        <button onClick={() => setMode('add')} style={{ height: 28, padding: "0 10px", borderRadius: 8, background: "var(--aw-violet)", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
          <I.plus size={13}/> Nueva
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.blog.map(b => (
          <div key={b.id} style={{ background: "var(--aw-surface)", border: "1px solid var(--aw-line)", borderRadius: 12, padding: "11px 12px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: "var(--aw-violet-50)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--aw-violet)" }}>
              <I.doc size={18}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.title}</div>
              <div style={{ fontSize: 11, color: "var(--aw-ink-3)" }}>{b.date}</div>
            </div>
            <button onClick={() => handleDelete(b.id)} style={{ color: "#DC2626", display: "flex", opacity: 0.6 }}><I.trash size={13}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Full page: Products (The Leap-inspired) ─────────────────────────────────
const Badge = ({ children, tone = "neutral" }) => {
  const tones = {
    live: { bg: "#A9E6A1", border: "#7CCF72" },
    hidden: { bg: "#EFEDEA", border: "#DED6CE" },
    pink: { bg: "#F4D7F0", border: "#E6B8DE" },
    outline: { bg: "#fff", border: "#8DBA89" },
    neutral: { bg: "#F7F1E7", border: "#E8E0D6" },
  }[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", height: 24,
      padding: "0 10px", borderRadius: 999,
      background: tones.bg, border: `1px solid ${tones.border}`,
      color: "#3D2C22", fontSize: 12, fontWeight: 600,
      whiteSpace: "nowrap",
    }}>{children}</span>
  );
};

const ProductTileImage = ({ product, index }) => {
  const gradients = [
    "linear-gradient(135deg, #D7C8B8, #9F816D)",
    "linear-gradient(135deg, #F4D7F0, #E8EFFE)",
    "linear-gradient(135deg, #E6F5EE, #98C9B1)",
    "linear-gradient(135deg, #FEF0E6, #E0A66E)",
  ];
  return (
    <div style={{
      width: 80, height: 80, flexShrink: 0,
      background: gradients[index % gradients.length],
      border: "1px solid #E8E0D6",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "rgba(61,44,34,0.55)",
    }}>
      <I.bag size={24}/>
    </div>
  );
};

const ProductsDesktopPage = ({ data, setData }) => {
  const addProduct = () => {
    setData({
      ...data,
      products: [
        ...data.products,
        {
          id: 'p' + Date.now(),
          title: 'Untitled guide',
          desc: 'Nuevo producto listo para editar.',
          price: 'Lead Magnet',
        },
      ],
    });
  };

  const cards = data.products.length ? data.products : [
    { id: 'empty-1', title: 'Subscribe to my newsletter!', desc: "Join claralid's Inner Circle and Unlock Insider Secrets.", price: 'Lead Magnet' },
    { id: 'empty-2', title: 'Untitled guide', desc: '', price: 'Lead Magnet', hidden: true },
    { id: 'empty-3', title: 'Untitled event', desc: 'khkh', price: 'Lead Magnet' },
    { id: 'empty-4', title: 'Untitled book my time', desc: 'hghgh', price: 'Lead Magnet' },
  ];

  return (
    <main className="aw-scroll" style={{ flex: 1, minWidth: 0, height: "100%", overflowY: "auto", background: "#F5F3EF" }}>
      <div style={{
        height: 64, display: "flex", alignItems: "center", gap: 18,
        padding: "0 44px", background: "#fff", borderBottom: "1px solid #E8E0D6",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ fontSize: 16, fontWeight: 750, color: "#3D2C22" }}>Products</div>
        <button onClick={addProduct} style={{
          height: 38, padding: "0 30px", borderRadius: 999,
          background: "#ECF956", color: "#3D2C22",
          border: "1.5px solid #4C2116", fontSize: 15, fontWeight: 650,
          display: "inline-flex", alignItems: "center", gap: 8,
        }}><I.plus size={17}/> Add product</button>
        <div style={{ flex: 1 }}/>
        <a href={`/${data.user.handle}`} target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontSize: 14, fontWeight: 500, color: "#3D2C22", textDecoration: "none",
        }}><I.globe size={17}/> View my store</a>
      </div>

      <div style={{ padding: "42px 56px 80px", maxWidth: 980 }}>
        <h1 style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 34, fontWeight: 400, color: "#3D2C22",
          margin: "0 0 28px", letterSpacing: "-0.03em",
        }}>Products</h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(280px, 1fr))", gap: 16 }}>
          {cards.map((p, i) => (
            <button key={p.id} style={{
              minHeight: 122, background: "#fff", border: "1.5px solid #4C413A",
              borderRadius: 4, padding: 16, textAlign: "left",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              color: "#3D2C22",
            }}>
              <div style={{ display: "flex", gap: 14, justifyContent: "space-between" }}>
                <div style={{ minWidth: 0 }}>
                  <h2 style={{ fontSize: 15, fontWeight: 750, margin: "0 0 8px", lineHeight: 1.25 }}>{p.title || 'Untitled product'}</h2>
                  {p.desc && <p style={{ fontSize: 13.5, margin: 0, lineHeight: 1.45, color: "#3D2C22" }}>{p.desc}</p>}
                </div>
                {(i === 0 || i === 2) && <ProductTileImage product={p} index={i}/>} 
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
                <Badge tone={p.hidden ? "hidden" : "live"}>{p.hidden ? "Hidden" : "Live"}</Badge>
                <Badge tone="pink">{i === 2 ? "Event" : i === 3 ? "Book my time" : i === 0 ? "Subscription form" : "Leap product"}</Badge>
                <Badge tone="outline">{p.price || "Lead Magnet"}</Badge>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button style={{
        position: "fixed", right: 22, bottom: 22,
        height: 42, padding: "0 18px", borderRadius: 999,
        background: "#8E44AD", color: "#fff", fontSize: 14, fontWeight: 750,
        boxShadow: "0 8px 20px rgba(84,38,112,0.25)",
        display: "inline-flex", alignItems: "center", gap: 8,
      }}>ⓘ Help</button>
    </main>
  );
};

// ─── Secondary panel container ────────────────────────────────────────────────
const SecondaryPanel = ({ active, data, setData }) => (
  <div style={{
    width: active === "home" ? 760 : 320, flexShrink: 0,
    borderRight: "1px solid #ECE6DE",
    background: "#F5F3EF",
    display: "flex", flexDirection: "column",
    height: "100%", overflow: "hidden",
  }}>
    {active === "home"     && <HomePanel     data={data}/>}
    {active === "profile"  && <BrandPanel    data={data} setData={setData}/>}
    {active === "links"    && <LinksPanel    data={data} setData={setData}/>}
    {active === "products" && <ProductsPanel data={data} setData={setData}/>}
    {active === "events"   && <EventsPanel   data={data} setData={setData}/>}
    {active === "blog"     && <BlogPanel     data={data} setData={setData}/>}
    {active === "design"   && <DesignPanel   data={data} setData={setData}/>}
  </div>
);

// ─── Canvas (live page preview) ───────────────────────────────────────────────
const Canvas = ({ data, device }) => (
  <div style={{
    flex: 1, minWidth: 0,
    background: "#EDEBE8",
    display: "flex",
    alignItems: device === "phone" ? "flex-start" : "stretch",
    justifyContent: "center",
    overflowY: "auto",
    padding: device === "phone" ? "32px 24px" : "0 0 0 0",
  }}>
    <div style={{
      width: device === "phone" ? 390 : "100%",
      minHeight: "100%",
      background: "var(--aw-surface)",
      boxShadow: device === "phone" ? "0 8px 48px rgba(0,0,0,0.16)" : "none",
      borderRadius: device === "phone" ? 20 : 0,
      overflow: "hidden",
      flexShrink: 0,
    }}>
      <PublicPage data={data} device={device}/>
    </div>
  </div>
);

// ─── Top-level desktop app ────────────────────────────────────────────────────
const getInitialDesktopTab = () => {
  if (typeof window === "undefined") return "home";
  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab");
  if (tab && DESKTOP_NAV.some(item => item.id === tab)) return tab;
  if (window.location.pathname.includes("/dashboard/products")) return "products";
  return "home";
};

const DesktopApp = ({ data, setData }) => {
  const [active, setActive] = useS(getInitialDesktopTab);
  const [collapsed, setCollapsed] = useS(false);
  const [device, setDevice] = useS("desktop");

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%", overflow: "hidden", background: "#F5F3EF", fontFamily: "'Inter', -apple-system, system-ui, sans-serif", color: "#3D2C22" }}>
      <DesktopSidebar
        active={active} onSelect={setActive}
        collapsed={collapsed} onToggle={() => setCollapsed(c => !c)}
        userName={data.profile.name}
      />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {active === "products" ? (
          <ProductsDesktopPage data={data} setData={setData}/>
        ) : (
          <>
            <TopBar active={active} device={device} onDeviceChange={setDevice} handle={data.user.handle}/>
            <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
              <SecondaryPanel active={active} data={data} setData={setData}/>
              <Canvas data={data} device={device}/>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { DesktopApp, DesktopSidebar };
