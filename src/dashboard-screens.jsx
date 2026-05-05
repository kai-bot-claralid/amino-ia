import React from 'react';
import { I, Avatar, ImgPH, Chip } from './ui.jsx';
import { TopBar } from './dashboard-home.jsx';

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ msg, onDone }) => {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div style={{
      position: "fixed", bottom: 96, left: "50%", transform: "translateX(-50%)",
      background: "#2E2E33", color: "#fff", borderRadius: 12,
      padding: "10px 18px", fontSize: 13, fontWeight: 600,
      display: "flex", alignItems: "center", gap: 8,
      boxShadow: "0 8px 20px rgba(0,0,0,0.25)", zIndex: 200,
      whiteSpace: "nowrap", pointerEvents: "none",
    }}>
      <I.check size={15} color="#10B981"/> {msg}
    </div>
  );
};

// ─── Drop Menu (eliminar item) ────────────────────────────────────────────────
const DropMenu = ({ open, onDelete, onClose }) => {
  if (!open) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 10 }}/>
      <div style={{
        position: "absolute", right: 0, top: "calc(100% + 4px)", zIndex: 20,
        background: "#fff", borderRadius: 12, border: "1px solid var(--aw-line)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)", padding: 4, minWidth: 140,
      }}>
        <button onClick={onDelete} style={{
          width: "100%", padding: "10px 14px", borderRadius: 8,
          textAlign: "left", color: "#DC2626", fontWeight: 700, fontSize: 14,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <I.trash size={15}/> Eliminar
        </button>
      </div>
    </>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ icon: Ic, title, desc, cta, onCta }) => (
  <div style={{ padding: "48px 18px", textAlign: "center" }}>
    <div style={{
      width: 64, height: 64, borderRadius: 20, background: "#F4EFE6",
      display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
    }}>
      <Ic size={28} color="var(--aw-ink-3)"/>
    </div>
    <div style={{ fontWeight: 700, fontSize: 16, color: "var(--aw-ink)" }}>{title}</div>
    <div style={{ fontSize: 13, color: "var(--aw-ink-3)", marginTop: 6, lineHeight: 1.5, maxWidth: 240, margin: "6px auto 0" }}>{desc}</div>
    {cta && (
      <div style={{ marginTop: 20 }}>
        <button onClick={onCta} style={{
          height: 44, padding: "0 20px", borderRadius: 12,
          background: "var(--aw-violet)", color: "#fff", fontWeight: 700, fontSize: 14,
          display: "inline-flex", alignItems: "center", gap: 6,
        }}>
          <I.plus size={16}/>{cta}
        </button>
      </div>
    )}
  </div>
);

// ─── Shared form primitives ───────────────────────────────────────────────────
const SaveBtn = ({ onSave, label = "Guardar" }) => (
  <button onClick={onSave} style={{
    height: 36, padding: "0 14px", borderRadius: 12,
    background: "var(--aw-violet)", color: "#fff", fontSize: 13, fontWeight: 700,
  }}>{label}</button>
);

const DisabledSaveBtn = ({ label = "Guardar" }) => (
  <button disabled style={{
    height: 36, padding: "0 14px", borderRadius: 12,
    background: "#E8E0F4", color: "var(--aw-ink-3)", fontSize: 13, fontWeight: 700, cursor: "default",
  }}>{label}</button>
);

export const FieldLabel = ({ children }) => (
  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--aw-ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "16px 0 6px" }}>{children}</div>
);

export const Field = ({ value, onChange, multiline, placeholder }) => (
  multiline ? (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{
      width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid var(--aw-line)",
      fontFamily: "inherit", fontSize: 14, color: "var(--aw-ink)", background: "#fff", resize: "none",
      outline: "none",
    }}/>
  ) : (
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{
      width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid var(--aw-line)",
      fontFamily: "inherit", fontSize: 14, color: "var(--aw-ink)", background: "#fff", outline: "none",
    }}/>
  )
);

const DateInput = ({ value, onChange }) => (
  <input type="date" value={value} onChange={(e) => onChange(e.target.value)} style={{
    width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid var(--aw-line)",
    fontFamily: "inherit", fontSize: 14, color: "var(--aw-ink)", background: "#fff", outline: "none",
  }}/>
);

const TimeInput = ({ value, onChange }) => (
  <input type="time" value={value} onChange={(e) => onChange(e.target.value)} style={{
    width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid var(--aw-line)",
    fontFamily: "inherit", fontSize: 14, color: "var(--aw-ink)", background: "#fff", outline: "none",
  }}/>
);

// ============ MODULES (drag-reorder + show/hide) ============
const ModulesScreen = ({ data, setData, goTo }) => {
  const meta = {
    profile:  { label: "Perfil",     icon: I.user,   desc: "Foto, nombre y bio",      always: true },
    links:    { label: "Enlaces",    icon: I.link,   desc: "Botones a tus redes y más" },
    products: { label: "Productos",  icon: I.bag,    desc: "Catálogo con fotos y precios" },
    events:   { label: "Eventos",    icon: I.cal,    desc: "Talleres, pop-ups, citas" },
    blog:     { label: "Blog",       icon: I.doc,    desc: "Publica historias breves" },
  };

  const reorder = (id, dir) => {
    const idx = data.modules.findIndex((m) => m.id === id);
    const target = idx + dir;
    if (target < 0 || target >= data.modules.length) return;
    const next = [...data.modules];
    [next[idx], next[target]] = [next[target], next[idx]];
    setData({ ...data, modules: next });
  };
  const toggle = (id) => {
    setData({ ...data, modules: data.modules.map((m) => m.id === id ? { ...m, active: !m.active } : m) });
  };

  return (
    <div className="aw-scroll" style={{ height: "100%", overflowY: "auto", paddingBottom: 110 }}>
      <TopBar title="Módulos" sub="Arrastra para reordenar · Toca el ojo para ocultar" />

      <div style={{ padding: "0 18px 12px" }}>
        <button onClick={() => goTo("profile")} style={{
          width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 12,
          background: "#fff", border: "1px solid var(--aw-line)", borderRadius: 16, padding: 12,
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--aw-violet-50)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I.user size={20} color="var(--aw-violet)"/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Perfil</div>
            <div style={{ fontSize: 12, color: "var(--aw-ink-3)" }}>Siempre visible</div>
          </div>
          <Chip tone="violet">SIEMPRE</Chip>
        </button>
      </div>

      <div style={{ padding: "0 18px", fontSize: 12, fontWeight: 700, color: "var(--aw-ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
        En tu página pública
      </div>

      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 8 }}>
        {data.modules.map((m, i) => {
          const M = meta[m.id];
          return (
            <div key={m.id} style={{
              background: "#fff", border: "1px solid var(--aw-line)",
              borderRadius: 16, padding: 12, display: "flex", alignItems: "center", gap: 10,
              opacity: m.active ? 1 : 0.55,
            }}>
              <button onClick={() => reorder(m.id, -1)} disabled={i === 0} style={{
                cursor: i===0 ? "default" : "grab", color: "var(--aw-ink-3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 24, height: 36,
              }}><I.drag size={16}/></button>
              <button onClick={() => goTo(m.id)} style={{
                flex: 1, display: "flex", alignItems: "center", gap: 12, textAlign: "left",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, background: "#F4EFE6",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}><M.icon size={20} color="var(--aw-ink-2)"/></div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{M.label}</div>
                  <div style={{ fontSize: 12, color: "var(--aw-ink-3)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{M.desc}</div>
                </div>
              </button>
              <button onClick={() => toggle(m.id)} style={{
                width: 36, height: 36, borderRadius: 12,
                background: m.active ? "var(--aw-violet-50)" : "#F1ECF9",
                color: m.active ? "var(--aw-violet)" : "var(--aw-ink-3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{m.active ? <I.eye size={17}/> : <I.eyeOff size={17}/>}</button>
            </div>
          );
        })}
      </div>

      <div style={{ padding: "16px 18px 0" }}>
        <button style={{
          width: "100%", padding: 14, border: "1.5px dashed #D9CFEF", borderRadius: 16,
          color: "var(--aw-violet)", fontWeight: 700, fontSize: 14, background: "transparent",
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}><I.plus size={16}/> Explorar más módulos (próximamente)</button>
      </div>
    </div>
  );
};

// ============ PROFILE EDITOR ============
const ProfileScreen = ({ data, setData, goBack }) => {
  const [toast, setToast] = React.useState(false);
  const p = data.profile;
  const set = (k, v) => setData({ ...data, profile: { ...p, [k]: v } });
  return (
    <div className="aw-scroll" style={{ height: "100%", overflowY: "auto", paddingBottom: 110 }}>
      <TopBar title="Perfil" onBack={goBack} right={<SaveBtn onSave={() => setToast(true)} />} />
      <div style={{ padding: "0 18px" }}>
        <div style={{ position: "relative" }}>
          <ImgPH ratio="16/7" radius={16} label="cover image" />
          <button style={{
            position: "absolute", right: 10, bottom: 10,
            background: "rgba(255,255,255,0.95)", borderRadius: 10,
            padding: "6px 10px", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4,
          }}><I.edit size={13}/> Cambiar</button>
          <div style={{ position: "absolute", left: 14, bottom: -22, width: 64, height: 64, borderRadius: "50%", border: "3px solid #FFFBF5" }}>
            <Avatar size={58} label="C"/>
          </div>
        </div>
        <div style={{ height: 30 }}/>
        <FieldLabel>Nombre</FieldLabel>
        <Field value={p.name} onChange={(v) => set("name", v)}/>
        <FieldLabel>Bio</FieldLabel>
        <Field value={p.bio} onChange={(v) => set("bio", v)} multiline />
        <FieldLabel>Ubicación</FieldLabel>
        <Field value={p.location} onChange={(v) => set("location", v)} />
      </div>
      {toast && <Toast msg="Perfil guardado ✓" onDone={() => setToast(false)} />}
    </div>
  );
};

// ============ LINKS ============
const LINK_ICONS = [
  { key: 'link',   Ico: I.link   },
  { key: 'whats',  Ico: I.whats  },
  { key: 'ig',     Ico: I.ig     },
  { key: 'globe',  Ico: I.globe  },
  { key: 'bag',    Ico: I.bag    },
  { key: 'doc',    Ico: I.doc    },
  { key: 'user',   Ico: I.user   },
  { key: 'cal',    Ico: I.cal    },
  { key: 'bell',   Ico: I.bell   },
  { key: 'share',  Ico: I.share  },
  { key: 'pin',    Ico: I.pin    },
  { key: 'spark',  Ico: I.spark  },
];
const EMOJI_TO_KEY = { '🔗':'link','💬':'whats','📷':'ig','📄':'doc','⭐':'spark','🌐':'globe','📞':'bell','📧':'share','🎵':'cal','🎬':'eye','🛍':'bag','📍':'pin' };
const getLinkIcon = (key) => {
  const resolved = EMOJI_TO_KEY[key] || key;
  return (LINK_ICONS.find(x => x.key === resolved) || LINK_ICONS[0]).Ico;
};

const AddLinkForm = ({ onBack, onSave }) => {
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [icon, setIcon] = React.useState('link');
  const canSave = title.trim().length > 0 && url.trim().length > 0;
  return (
    <div className="aw-scroll" style={{ height: "100%", overflowY: "auto", paddingBottom: 110 }}>
      <TopBar title="Nuevo enlace" onBack={onBack} right={
        canSave
          ? <SaveBtn onSave={() => onSave({ title: title.trim(), url: url.trim(), icon })} />
          : <DisabledSaveBtn />
      }/>
      <div style={{ padding: "0 18px" }}>
        <FieldLabel>Ícono</FieldLabel>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {LINK_ICONS.map(({ key, Ico }) => (
            <button key={key} onClick={() => setIcon(key)} style={{
              width: 42, height: 42, borderRadius: 12,
              border: icon === key ? "2px solid var(--aw-violet)" : "1px solid var(--aw-line)",
              background: icon === key ? "var(--aw-violet-50)" : "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: icon === key ? "var(--aw-violet)" : "var(--aw-ink-3)",
            }}><Ico size={18}/></button>
          ))}
        </div>
        <FieldLabel>Título</FieldLabel>
        <Field value={title} onChange={setTitle} placeholder="Ej: WhatsApp Pedidos"/>
        <FieldLabel>URL</FieldLabel>
        <Field value={url} onChange={setUrl} placeholder="https://..."/>
      </div>
    </div>
  );
};

const LinksScreen = ({ data, setData, goBack, openForm = false }) => {
  const [mode, setMode] = React.useState(openForm ? 'add' : 'list');
  const [toast, setToast] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(null);

  const handleAdd = ({ title, url, icon }) => {
    const newLink = { id: 'l' + Date.now(), title, url, icon, clicks: 0 };
    setData({ ...data, links: [...data.links, newLink] });
    setMode('list');
    setToast('Enlace añadido');
  };
  const handleDelete = (id) => {
    setData({ ...data, links: data.links.filter(l => l.id !== id) });
    setMenuOpen(null);
    setToast('Enlace eliminado');
  };

  if (mode === 'add') return <AddLinkForm onBack={() => setMode('list')} onSave={handleAdd}/>;

  return (
    <div className="aw-scroll" style={{ height: "100%", overflowY: "auto", paddingBottom: 110 }}>
      <TopBar title="Enlaces" sub={`${data.links.length} enlace${data.links.length !== 1 ? 's' : ''}`} onBack={goBack} right={
        <button onClick={() => setMode('add')} style={{ width: 36, height: 36, borderRadius: 12, background: "var(--aw-violet)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I.plus size={18}/>
        </button>
      }/>
      {data.links.length === 0 ? (
        <EmptyState icon={I.link} title="Sin enlaces aún" desc="Agrega tu primer enlace a redes sociales o sitios web." cta="Agregar enlace" onCta={() => setMode('add')}/>
      ) : (
        <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 8 }}>
          {data.links.map((l) => (
            <div key={l.id} style={{
              background: "#fff", border: "1px solid var(--aw-line)", borderRadius: 16, padding: 12,
              display: "flex", alignItems: "center", gap: 10, position: "relative",
            }}>
              <I.drag size={16} color="var(--aw-ink-3)"/>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: "#F4EFE6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {React.createElement(getLinkIcon(l.icon), { size: 18, color: "var(--aw-violet)" })}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{l.title}</div>
                <div style={{ fontSize: 11, color: "var(--aw-ink-3)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{l.url}</div>
              </div>
              <Chip tone="ink">{l.clicks} clics</Chip>
              <button onClick={() => setMenuOpen(menuOpen === l.id ? null : l.id)} style={{ color: "var(--aw-ink-3)" }}><I.more size={18}/></button>
              <DropMenu open={menuOpen === l.id} onClose={() => setMenuOpen(null)} onDelete={() => handleDelete(l.id)}/>
            </div>
          ))}
          <button onClick={() => setMode('add')} style={{
            marginTop: 4, padding: 14, border: "1.5px dashed #D9CFEF", borderRadius: 16,
            color: "var(--aw-violet)", fontWeight: 700, fontSize: 14,
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}><I.plus size={16}/> Agregar enlace</button>
        </div>
      )}
      {toast && <Toast msg={toast} onDone={() => setToast(null)}/>}
    </div>
  );
};

// ============ PRODUCTS ============
const AddProductForm = ({ onBack, onSave }) => {
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const canSave = title.trim().length > 0;
  return (
    <div className="aw-scroll" style={{ height: "100%", overflowY: "auto", paddingBottom: 110 }}>
      <TopBar title="Nuevo producto" onBack={onBack} right={
        canSave
          ? <SaveBtn onSave={() => onSave({ title: title.trim(), price: price.trim() || 'Cotizar', desc: desc.trim() })} />
          : <DisabledSaveBtn />
      }/>
      <div style={{ padding: "0 18px" }}>
        <FieldLabel>Nombre del producto</FieldLabel>
        <Field value={title} onChange={setTitle} placeholder="Ej: Torta de Chocolate"/>
        <FieldLabel>Precio</FieldLabel>
        <Field value={price} onChange={setPrice} placeholder="Ej: COP 85.000 (vacío = Cotizar)"/>
        <FieldLabel>Descripción</FieldLabel>
        <Field value={desc} onChange={setDesc} placeholder="Descripción breve del producto..." multiline/>
      </div>
    </div>
  );
};

const ProductsScreen = ({ data, setData, goBack, openForm = false }) => {
  const [mode, setMode] = React.useState(openForm ? 'add' : 'list');
  const [toast, setToast] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(null);

  const handleAdd = ({ title, price, desc }) => {
    const newProduct = { id: 'p' + Date.now(), title, price, desc, img: 'NEW' };
    setData({ ...data, products: [...data.products, newProduct] });
    setMode('list');
    setToast('Producto añadido');
  };
  const handleDelete = (id) => {
    setData({ ...data, products: data.products.filter(p => p.id !== id) });
    setMenuOpen(null);
    setToast('Producto eliminado');
  };

  if (mode === 'add') return <AddProductForm onBack={() => setMode('list')} onSave={handleAdd}/>;

  return (
    <div className="aw-scroll" style={{ height: "100%", overflowY: "auto", paddingBottom: 110 }}>
      <TopBar title="Productos" sub={`${data.products.length} producto${data.products.length !== 1 ? 's' : ''}`} onBack={goBack} right={
        <button onClick={() => setMode('add')} style={{ width: 36, height: 36, borderRadius: 12, background: "var(--aw-violet)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><I.plus size={18}/></button>
      }/>
      {data.products.length === 0 ? (
        <EmptyState icon={I.bag} title="Sin productos aún" desc="Agrega tu primer producto o servicio con foto y precio." cta="Agregar producto" onCta={() => setMode('add')}/>
      ) : (
        <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 10 }}>
          {data.products.map((p) => (
            <div key={p.id} style={{
              background: "#fff", border: "1px solid var(--aw-line)", borderRadius: 16, padding: 12,
              display: "flex", gap: 12, position: "relative",
            }}>
              <ImgPH ratio="1/1" radius={12} label={p.img} style={{ width: 70, height: 70 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{p.title}</div>
                <div style={{ fontSize: 11, color: "var(--aw-ink-3)", marginTop: 2, lineHeight: 1.3 }}>{p.desc}</div>
                <div style={{ marginTop: 6 }}><Chip tone="violet">{p.price}</Chip></div>
              </div>
              <button onClick={() => setMenuOpen(menuOpen === p.id ? null : p.id)} style={{ color: "var(--aw-ink-3)", alignSelf: "flex-start" }}><I.more size={18}/></button>
              <DropMenu open={menuOpen === p.id} onClose={() => setMenuOpen(null)} onDelete={() => handleDelete(p.id)}/>
            </div>
          ))}
          <button onClick={() => setMode('add')} style={{
            marginTop: 4, padding: 14, border: "1.5px dashed #D9CFEF", borderRadius: 16,
            color: "var(--aw-violet)", fontWeight: 700, fontSize: 14,
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}><I.plus size={16}/> Agregar producto</button>
        </div>
      )}
      {toast && <Toast msg={toast} onDone={() => setToast(null)}/>}
    </div>
  );
};

// ============ EVENTS ============
const AddEventForm = ({ onBack, onSave }) => {
  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const canSave = title.trim().length > 0 && date.length > 0;
  return (
    <div className="aw-scroll" style={{ height: "100%", overflowY: "auto", paddingBottom: 110 }}>
      <TopBar title="Nuevo evento" onBack={onBack} right={
        canSave
          ? <SaveBtn onSave={() => onSave({ title: title.trim(), date, time, desc: desc.trim() })} />
          : <DisabledSaveBtn />
      }/>
      <div style={{ padding: "0 18px" }}>
        <FieldLabel>Título del evento</FieldLabel>
        <Field value={title} onChange={setTitle} placeholder="Ej: Taller de Repostería"/>
        <FieldLabel>Fecha</FieldLabel>
        <DateInput value={date} onChange={setDate}/>
        <FieldLabel>Hora</FieldLabel>
        <TimeInput value={time} onChange={setTime}/>
        <FieldLabel>Descripción</FieldLabel>
        <Field value={desc} onChange={setDesc} placeholder="Detalles del evento..." multiline/>
      </div>
    </div>
  );
};

const EventsScreen = ({ data, setData, goBack, openForm = false }) => {
  const [mode, setMode] = React.useState(openForm ? 'add' : 'list');
  const [toast, setToast] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(null);

  const handleAdd = ({ title, date, time, desc }) => {
    const newEvent = { id: 'e' + Date.now(), title, date, time, desc, link: '#' };
    setData({ ...data, events: [...data.events, newEvent] });
    setMode('list');
    setToast('Evento añadido');
  };
  const handleDelete = (id) => {
    setData({ ...data, events: data.events.filter(e => e.id !== id) });
    setMenuOpen(null);
    setToast('Evento eliminado');
  };

  if (mode === 'add') return <AddEventForm onBack={() => setMode('list')} onSave={handleAdd}/>;

  return (
    <div className="aw-scroll" style={{ height: "100%", overflowY: "auto", paddingBottom: 110 }}>
      <TopBar title="Eventos" sub={`${data.events.length} próximo${data.events.length !== 1 ? 's' : ''}`} onBack={goBack} right={
        <button onClick={() => setMode('add')} style={{ width: 36, height: 36, borderRadius: 12, background: "var(--aw-violet)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><I.plus size={18}/></button>
      }/>
      {data.events.length === 0 ? (
        <EmptyState icon={I.cal} title="Sin eventos aún" desc="Agrega talleres, pop-ups, citas o cualquier cosa que quieras compartir." cta="Crear evento" onCta={() => setMode('add')}/>
      ) : (
        <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 10 }}>
          {data.events.map((e) => {
            const d = new Date(e.date);
            const day = d.getDate();
            const mon = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"][d.getMonth()];
            return (
              <div key={e.id} style={{
                background: "#fff", border: "1px solid var(--aw-line)", borderRadius: 16, padding: 12,
                display: "flex", gap: 12, alignItems: "center", position: "relative",
              }}>
                <div style={{
                  width: 56, height: 64, borderRadius: 12, background: "var(--aw-coral-50)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  color: "#9A3412", fontWeight: 800, flexShrink: 0,
                }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.08em" }}>{mon}</span>
                  <span style={{ fontSize: 22, lineHeight: 1 }}>{day}</span>
                  <span style={{ fontSize: 10, opacity: 0.7 }}>{e.time}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{e.title}</div>
                  <div style={{ fontSize: 12, color: "var(--aw-ink-3)", lineHeight: 1.3, marginTop: 2 }}>{e.desc}</div>
                </div>
                <button onClick={() => setMenuOpen(menuOpen === e.id ? null : e.id)} style={{ color: "var(--aw-ink-3)" }}><I.more size={18}/></button>
                <DropMenu open={menuOpen === e.id} onClose={() => setMenuOpen(null)} onDelete={() => handleDelete(e.id)}/>
              </div>
            );
          })}
          <button onClick={() => setMode('add')} style={{
            marginTop: 4, padding: 14, border: "1.5px dashed #D9CFEF", borderRadius: 16,
            color: "var(--aw-violet)", fontWeight: 700, fontSize: 14,
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}><I.plus size={16}/> Agregar evento</button>
        </div>
      )}
      {toast && <Toast msg={toast} onDone={() => setToast(null)}/>}
    </div>
  );
};

// ============ BLOG ============
const AddBlogForm = ({ onBack, onSave }) => {
  const [title, setTitle] = React.useState('');
  const [excerpt, setExcerpt] = React.useState('');
  const canSave = title.trim().length > 0;
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="aw-scroll" style={{ height: "100%", overflowY: "auto", paddingBottom: 110 }}>
      <TopBar title="Nueva publicación" onBack={onBack} right={
        canSave
          ? <SaveBtn onSave={() => onSave({ title: title.trim(), excerpt: excerpt.trim(), date: today })} label="Publicar" />
          : <DisabledSaveBtn label="Publicar" />
      }/>
      <div style={{ padding: "0 18px" }}>
        <FieldLabel>Título</FieldLabel>
        <Field value={title} onChange={setTitle} placeholder="Título de tu publicación"/>
        <FieldLabel>Resumen</FieldLabel>
        <Field value={excerpt} onChange={setExcerpt} placeholder="Un párrafo breve que capture la atención de tus visitantes..." multiline/>
      </div>
    </div>
  );
};

const BlogScreen = ({ data, setData, goBack }) => {
  const [mode, setMode] = React.useState('list');
  const [toast, setToast] = React.useState(null);

  const handleAdd = ({ title, excerpt, date }) => {
    const newPost = { id: 'b' + Date.now(), title, excerpt, date, img: 'NEW' };
    setData({ ...data, blog: [...data.blog, newPost] });
    setMode('list');
    setToast('Publicación añadida');
  };

  if (mode === 'add') return <AddBlogForm onBack={() => setMode('list')} onSave={handleAdd}/>;

  return (
    <div className="aw-scroll" style={{ height: "100%", overflowY: "auto", paddingBottom: 110 }}>
      <TopBar title="Blog" sub={`${data.blog.length} publicación${data.blog.length !== 1 ? 'es' : ''}`} onBack={goBack} right={
        <button onClick={() => setMode('add')} style={{ width: 36, height: 36, borderRadius: 12, background: "var(--aw-violet)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><I.plus size={18}/></button>
      }/>
      {data.blog.length === 0 ? (
        <EmptyState icon={I.doc} title="Sin publicaciones aún" desc="Comparte historias, tips o novedades con tus visitantes." cta="Escribir publicación" onCta={() => setMode('add')}/>
      ) : (
        <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 10 }}>
          {data.blog.map((b) => (
            <div key={b.id} style={{
              background: "#fff", border: "1px solid var(--aw-line)", borderRadius: 16,
              overflow: "hidden",
            }}>
              <ImgPH ratio="16/7" radius={0} label={b.img}/>
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 11, color: "var(--aw-ink-3)", fontWeight: 700, letterSpacing: "0.04em" }}>{b.date}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginTop: 4 }}>{b.title}</div>
                <div style={{ fontSize: 12, color: "var(--aw-ink-3)", marginTop: 4, lineHeight: 1.4 }}>{b.excerpt}</div>
              </div>
            </div>
          ))}
          <button onClick={() => setMode('add')} style={{
            marginTop: 4, padding: 14, border: "1.5px dashed #D9CFEF", borderRadius: 16,
            color: "var(--aw-violet)", fontWeight: 700, fontSize: 14,
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}><I.plus size={16}/> Agregar publicación</button>
        </div>
      )}
      {toast && <Toast msg={toast} onDone={() => setToast(null)}/>}
    </div>
  );
};

// ============ DESIGN ============
const DesignScreen = ({ data, setData }) => {
  const palettes = [
    { id: "violet",  name: "Lavanda",   colors: ["#9B7BC9", "#AED5CD", "#FAF6EE"] },
    { id: "coral",   name: "Coral",     colors: ["#E89A7A", "#9B7BC9", "#FAF6EE"] },
    { id: "mint",    name: "Menta",     colors: ["#6FB8A8", "#2E2E33", "#F0F5F1"] },
    { id: "midnight",name: "Medianoche",colors: ["#2E2E33", "#CDB5E7", "#AED5CD"] },
    { id: "sand",    name: "Arena",     colors: ["#A88A5C", "#2E2E33", "#FAF6EE"] },
  ];
  const layouts = [
    { id: "stack",  name: "Pila",   desc: "Botones apilados (Linktree)" },
    { id: "hybrid", name: "Híbrido",desc: "Hero + secciones" },
    { id: "grid",   name: "Cuadrícula", desc: "Tarjetas en mosaico" },
  ];
  const setD = (k, v) => setData({ ...data, design: { ...data.design, [k]: v } });
  return (
    <div className="aw-scroll" style={{ height: "100%", overflowY: "auto", paddingBottom: 110 }}>
      <TopBar title="Diseño" sub="Cambia el look de tu página"/>
      <div style={{ padding: "0 18px" }}>
        <FieldLabel>Paleta de colores</FieldLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {palettes.map((p) => (
            <button key={p.id} onClick={() => setD("palette", p.id)} style={{
              background: "#fff", border: data.design.palette === p.id ? "2px solid var(--aw-violet)" : "1px solid var(--aw-line)",
              borderRadius: 14, padding: 12, textAlign: "left", display: "flex", flexDirection: "column", gap: 8,
            }}>
              <div style={{ display: "flex", gap: 6 }}>
                {p.colors.map((c, i) => <div key={i} style={{ width: 22, height: 22, borderRadius: 7, background: c, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)" }}/>)}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{p.name}</div>
            </button>
          ))}
        </div>

        <FieldLabel>Estilo de layout</FieldLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {layouts.map((l) => {
            const active = data.design.layout === l.id;
            return (
              <button key={l.id} onClick={() => setD("layout", l.id)} style={{
                display: "flex", alignItems: "center", gap: 12,
                background: "#fff", border: active ? "2px solid var(--aw-violet)" : "1px solid var(--aw-line)",
                borderRadius: 14, padding: 12, textAlign: "left",
              }}>
                <LayoutPreview kind={l.id}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{l.name}</div>
                  <div style={{ fontSize: 12, color: "var(--aw-ink-3)" }}>{l.desc}</div>
                </div>
                {active && <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--aw-violet)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><I.check size={14}/></div>}
              </button>
            );
          })}
        </div>

        <FieldLabel>Esquinas</FieldLabel>
        <div style={{ display: "flex", gap: 8 }}>
          {["soft","sharp"].map((c) => (
            <button key={c} onClick={() => setD("cornerStyle", c)} style={{
              flex: 1, padding: "12px 10px", borderRadius: 14,
              border: data.design.cornerStyle === c ? "2px solid var(--aw-violet)" : "1px solid var(--aw-line)",
              background: "#fff", fontWeight: 700, fontSize: 13,
            }}>{c === "soft" ? "Suaves" : "Marcadas"}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const LayoutPreview = ({ kind }) => (
  <div style={{ width: 56, height: 64, borderRadius: 8, background: "#F4EFE6", padding: 6, display: "flex", flexDirection: "column", gap: 3 }}>
    <div style={{ height: 10, borderRadius: 3, background: "var(--aw-violet)" }}/>
    {kind === "stack" && [0,1,2].map(i => <div key={i} style={{ height: 8, borderRadius: 3, background: "#fff" }}/>)}
    {kind === "hybrid" && (
      <>
        <div style={{ height: 14, borderRadius: 3, background: "#fff" }}/>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <div style={{ height: 12, borderRadius: 3, background: "#fff" }}/>
          <div style={{ height: 12, borderRadius: 3, background: "#fff" }}/>
        </div>
      </>
    )}
    {kind === "grid" && (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, flex: 1 }}>
        {[0,1,2,3].map(i => <div key={i} style={{ borderRadius: 3, background: "#fff" }}/>)}
      </div>
    )}
  </div>
);

// ============ PUBLISH ============
const PublishScreen = ({ data, openPreview }) => (
  <div className="aw-scroll" style={{ height: "100%", overflowY: "auto", paddingBottom: 110 }}>
    <TopBar title="Publicar" sub="Tus cambios se publican al instante" />
    <div style={{ padding: "0 18px" }}>
      <div style={{
        background: "linear-gradient(135deg, #10B981, #34D399)",
        borderRadius: 20, padding: 18, color: "#fff", textAlign: "center",
      }}>
        <I.check size={28}/>
        <div style={{ fontSize: 18, fontWeight: 800, marginTop: 6 }}>Tu página está en línea</div>
        <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4 }}>aminoweb.la/{data.user.handle}</div>
      </div>

      <FieldLabel>Compartir</FieldLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <ShareBtn icon={I.qr}    label="Código QR"/>
        <ShareBtn icon={I.copy}  label="Copiar enlace"/>
        <ShareBtn icon={I.whats} label="WhatsApp"/>
        <ShareBtn icon={I.ig}    label="Instagram"/>
      </div>

      <FieldLabel>Vista previa</FieldLabel>
      <button onClick={openPreview} style={{
        width: "100%", padding: 14, borderRadius: 16, background: "var(--aw-violet)", color: "#fff",
        fontWeight: 700, fontSize: 14, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
      }}><I.eye size={16}/> Ver mi página pública</button>
    </div>
  </div>
);

const ShareBtn = ({ icon: Ic, label }) => (
  <button style={{
    background: "#fff", border: "1px solid var(--aw-line)", borderRadius: 14,
    padding: "12px 10px", display: "flex", alignItems: "center", gap: 8,
    fontWeight: 700, fontSize: 13,
  }}>
    <Ic size={16} color="var(--aw-violet)"/> {label}
  </button>
);

// ============ ACCOUNT ============
const AccountScreen = ({ data, onLogout }) => (
  <div className="aw-scroll" style={{ height: "100%", overflowY: "auto", paddingBottom: 110 }}>
    <TopBar title="Cuenta"/>
    <div style={{ padding: "0 18px" }}>
      <div style={{
        background: "#fff", border: "1px solid var(--aw-line)", borderRadius: 16, padding: 14,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <Avatar size={48} label="C"/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{data.profile.name}</div>
          <div style={{ fontSize: 12, color: "var(--aw-ink-3)" }}>{data.user.email}</div>
        </div>
        <Chip tone="yellow">FREE</Chip>
      </div>

      <FieldLabel>Mi cuenta</FieldLabel>
      <SettingsList items={[
        { label: "Mi handle", detail: "@"+data.user.handle },
        { label: "Idioma",    detail: "Español" },
        { label: "Notificaciones" },
        { label: "Plan", detail: "Free → Pro" },
      ]}/>

      <FieldLabel>Soporte</FieldLabel>
      <SettingsList items={[
        { label: "Centro de ayuda" },
        { label: "Contactar soporte" },
        { label: "Cerrar sesión", danger: true, onClick: onLogout },
      ]}/>
      <div style={{ height: 24 }}/>
    </div>
  </div>
);

const SettingsList = ({ items }) => (
  <div style={{ background: "#fff", border: "1px solid var(--aw-line)", borderRadius: 16, overflow: "hidden" }}>
    {items.map((it, i) => (
      <button key={i} onClick={it.onClick} style={{
        width: "100%", padding: "14px 14px", display: "flex", alignItems: "center", gap: 8,
        borderTop: i ? "1px solid var(--aw-line-2)" : "none",
        color: it.danger ? "#DC2626" : "var(--aw-ink)",
        fontWeight: it.danger ? 700 : 500, fontSize: 14, textAlign: "left",
        background: "transparent",
      }}>
        <span style={{ flex: 1 }}>{it.label}</span>
        {it.detail && <span style={{ fontSize: 12, color: "var(--aw-ink-3)" }}>{it.detail}</span>}
        {!it.danger && <I.chev size={14} color="var(--aw-ink-3)"/>}
      </button>
    ))}
  </div>
);

export {
  ModulesScreen, ProfileScreen, LinksScreen, ProductsScreen, EventsScreen,
  BlogScreen, DesignScreen, PublishScreen, AccountScreen,
};
