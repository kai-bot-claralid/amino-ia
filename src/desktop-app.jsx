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
const DesktopSidebar = ({ active, onSelect, collapsed, onToggle, userName = "Usuario" }) => (
  <aside style={{
    width: collapsed ? 56 : 220,
    height: "100%",
    background: "#fff",
    borderRight: "1px solid var(--aw-line)",
    flexShrink: 0,
    display: "flex", flexDirection: "column",
    transition: "width .22s ease",
    overflow: "hidden",
  }}>
    {/* Logo */}
    <div style={{
      height: 52,
      padding: collapsed ? "0" : "0 16px",
      display: "flex", alignItems: "center",
      justifyContent: collapsed ? "center" : "flex-start",
      flexShrink: 0,
    }}>
      {collapsed
        ? <img src={`${import.meta.env.BASE_URL}aminoweb-mark.svg`} alt="aminoweb" style={{ height: 24, display: "block" }}/>
        : <img src={`${import.meta.env.BASE_URL}aminoweb-logo.svg`} alt="aminoweb" style={{ height: 20, display: "block" }}/>
      }
    </div>

    {/* Nav */}
    <nav style={{ flex: 1, padding: "4px 6px", display: "flex", flexDirection: "column", gap: 1, overflowY: "auto" }}>
      {DESKTOP_NAV.map(item => {
        const isActive = active === item.id;
        return (
          <button key={item.id} onClick={() => onSelect(item.id)}
            title={collapsed ? item.label : undefined}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: collapsed ? "7px 0" : "6px 10px",
              justifyContent: collapsed ? "center" : "flex-start",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: isActive ? 500 : 400,
              letterSpacing: "-0.01em",
              background: isActive ? "rgba(0,0,0,0.06)" : "transparent",
              color: isActive ? "var(--aw-ink)" : "#787774",
              transition: "background .1s, color .1s",
              flexShrink: 0,
            }}>
            <item.icon size={16} color={isActive ? "var(--aw-ink)" : "#9B9A97"}/>
            {!collapsed && <span style={{ flex: 1 }}>{item.label}</span>}
          </button>
        );
      })}
    </nav>

    {/* Collapse toggle */}
    <div style={{ padding: "6px 12px", borderTop: "1px solid var(--aw-line)", flexShrink: 0 }}>
      <button onClick={onToggle} title={collapsed ? "Expandir menú" : "Colapsar menú"} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 0,
        padding: collapsed ? "8px" : "8px 10px",
        justifyContent: collapsed ? "center" : "flex-start",
        borderRadius: 8,
        fontSize: 13, fontWeight: 400,
        color: "var(--aw-ink-3)", background: "transparent",
        letterSpacing: "-0.01em",
      }}>
        <span style={{ display: "flex", transform: collapsed ? "rotate(0)" : "rotate(180deg)", transition: "transform .2s ease" }}>
          <I.chev size={16} color="var(--aw-ink-3)"/>
        </span>
        {!collapsed && <span>Colapsar</span>}
      </button>
    </div>

    {/* User footer */}
    <div style={{ padding: "10px 10px", borderTop: "1px solid var(--aw-line)", flexShrink: 0 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, padding: "6px 6px",
        borderRadius: 6, justifyContent: collapsed ? "center" : "flex-start",
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: 6, background: "#E8E6E3", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 600, color: "#6B6B6B",
        }}>
          {userName.charAt(0).toUpperCase()}
        </div>
        {!collapsed && (
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{
              fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em",
              color: "var(--aw-ink)",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{userName}</div>
          </div>
        )}
      </div>
    </div>
  </aside>
);

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
      height: 56, padding: "0 20px",
      background: "#fff", borderBottom: "1px solid var(--aw-line)",
      display: "flex", alignItems: "center", gap: 0,
      flexShrink: 0,
    }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em" }}>
          {NAV_LABELS[active]}
        </span>
      </div>

      {/* Device switcher */}
      <div style={{ display: "flex", gap: 2, padding: 4, background: "#F3F0EC", borderRadius: 10, marginRight: 12 }}>
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
  const stats = [
    { k: "Visitas hoy",     v: s.visitsToday ?? "—",  d: s.visitsDelta ? `${s.visitsDelta} vs ayer` : "",  tone: "#AED5CD" },
    { k: "Clics totales",   v: s.clicks ?? "—",       d: s.clicksDelta ? `${s.clicksDelta} vs ayer` : "", tone: "#CDB5E7" },
    { k: "Módulos activos", v: `${data.modules.filter(m => m.active).length}/${data.modules.length}`, d: "", tone: "#B7D9EC" },
  ];
  return (
    <div className="aw-scroll" style={{ flex: 1, overflowY: "auto", padding: 18 }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--aw-ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 14px" }}>
        Resumen
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {stats.map(s => (
          <div key={s.k} style={{
            background: "#fff", borderRadius: 12, padding: "14px 16px",
            display: "flex", alignItems: "center", gap: 14,
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.tone, flexShrink: 0 }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--aw-ink-3)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.k}</div>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{s.v}</div>
              {s.d && <div style={{ fontSize: 11, color: "var(--aw-success)", fontWeight: 700 }}>{s.d}</div>}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--aw-ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "20px 0 10px" }}>
        Tu página
      </p>
      <div style={{
        background: "linear-gradient(135deg, #9B7BC9 0%, #7A5CA8 100%)",
        borderRadius: 12, padding: "16px", color: "#fff",
      }}>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>Enlace público</div>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>aminoweb.la/{data.user.handle}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={handleCopy} style={{ flex: 1, height: 32, borderRadius: 8, background: copied ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.18)", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "background .2s" }}>
            {copied ? <><I.check size={13}/> Copiado</> : <><I.copy size={13}/> Copiar</>}
          </button>
          <button style={{ flex: 1, height: 32, borderRadius: 8, background: "#fff", color: "var(--aw-violet)", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
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
            borderRadius: 12, background: "#fff",
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
            borderRadius: 12, background: "#fff",
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
            flex: 1, height: 40, borderRadius: 10, background: "#fff",
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
        <button style={{ height: 32, padding: "0 14px", borderRadius: 8, background: "#fff", border: "1px solid var(--aw-line)", fontSize: 12, fontWeight: 700 }}>
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
          <div key={l.id} style={{ background: "#fff", border: "1px solid var(--aw-line)", borderRadius: 12, padding: "11px 12px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#F4EFE6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--aw-violet)" }}>
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
          <div key={p.id} style={{ background: "#fff", border: "1px solid var(--aw-line)", borderRadius: 12, padding: "11px 12px", display: "flex", alignItems: "center", gap: 10 }}>
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
            <div key={e.id} style={{ background: "#fff", border: "1px solid var(--aw-line)", borderRadius: 12, padding: "11px 12px", display: "flex", alignItems: "center", gap: 10 }}>
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
          <div key={b.id} style={{ background: "#fff", border: "1px solid var(--aw-line)", borderRadius: 12, padding: "11px 12px", display: "flex", alignItems: "center", gap: 10 }}>
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

// ─── Secondary panel container ────────────────────────────────────────────────
const SecondaryPanel = ({ active, data, setData }) => (
  <div style={{
    width: 280, flexShrink: 0,
    borderRight: "1px solid var(--aw-line)",
    background: "var(--aw-cream-2)",
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
    padding: device === "phone" ? "32px 24px" : 0,
  }}>
    <div style={{
      width: device === "phone" ? 390 : "100%",
      minHeight: "100%",
      background: "#fff",
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
const DesktopApp = ({ data, setData }) => {
  const [active, setActive] = useS("home");
  const [collapsed, setCollapsed] = useS(false);
  const [device, setDevice] = useS("desktop");

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%", overflow: "hidden", background: "var(--aw-cream)", fontFamily: "'Inter', -apple-system, system-ui, sans-serif" }}>
      <DesktopSidebar
        active={active} onSelect={setActive}
        collapsed={collapsed} onToggle={() => setCollapsed(c => !c)}
        userName={data.profile.name}
      />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <TopBar active={active} device={device} onDeviceChange={setDevice} handle={data.user.handle}/>
        <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
          <SecondaryPanel active={active} data={data} setData={setData}/>
          <Canvas data={data} device={device}/>
        </div>
      </div>
    </div>
  );
};

export { DesktopApp, DesktopSidebar };
