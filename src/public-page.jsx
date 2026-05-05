import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { I, Avatar, ImgPH } from './ui.jsx';

const PALETTES = {
  violet:   { primary: "var(--aw-brown)", accent: "var(--aw-mint)", bg: "#FAF6EE", text: "var(--aw-brown)", muted: "#6B6B73", card: "#fff" },
  coral:    { primary: "#E89A7A", accent: "var(--aw-brown)", bg: "#FAF6EE", text: "var(--aw-brown)", muted: "#6B6B73", card: "#fff" },
  mint:     { primary: "var(--aw-green-strong)", accent: "var(--aw-brown)", bg: "#F0F5F1", text: "var(--aw-brown)", muted: "#5C6664", card: "#fff" },
  midnight: { primary: "var(--aw-lavender-strong)", accent: "var(--aw-mint)", bg: "var(--aw-brown)", text: "#FAF6EE", muted: "#A8A8B0", card: "#3D3D44" },
  sand:     { primary: "#A88A5C", accent: "var(--aw-brown)", bg: "#FAF6EE", text: "var(--aw-brown)", muted: "#6B6B73", card: "#fff" },
};

const openLink = (url) => url && url !== '#' && window.open(url, '_blank', 'noopener,noreferrer');

const PublicPage = ({ data, device = "phone" }) => {
  const palette = PALETTES[data.design.palette] || PALETTES.violet;
  const layout = data.design.layout;
  const radius = data.design.cornerStyle === "soft" ? 20 : 8;
  const ordered = data.modules.filter(m => m.active);
  const isDesktop = device === "desktop";

  const location = useLocation();
  const navigate = useNavigate();
  const fromDashboard = location.state?.fromDashboard;

  return (
    <div className="aw-scroll" style={{
      height: "100%", overflowY: "auto", background: palette.bg, color: palette.text,
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
      paddingBottom: 48,
    }}>
      {fromDashboard && (
        <div style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "var(--aw-brown)", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 16px", gap: 10,
        }}>
          <button onClick={() => navigate(-1)} style={{
            display: "flex", alignItems: "center", gap: 6,
            color: "#fff", fontWeight: 700, fontSize: 13,
            background: "rgba(255,255,255,0.12)", borderRadius: 8,
            padding: "6px 12px",
          }}>
            <I.back size={15} color="#fff"/> Volver al editor
          </button>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>
            aminoweb.la/{data.user.handle}
          </span>
        </div>
      )}
      <Hero data={data} palette={palette} radius={radius} layout={layout} isDesktop={isDesktop}/>

      <div style={{
        padding: isDesktop ? "0 40px" : "0 16px",
        maxWidth: isDesktop ? 860 : "none",
        margin: isDesktop ? "0 auto" : undefined,
        display: "flex", flexDirection: "column", gap: 32,
      }}>
        {ordered.map((m) => {
          if (m.id === "links")    return <LinksSection    key="links"    data={data} palette={palette} radius={radius} layout={layout} isDesktop={isDesktop}/>;
          if (m.id === "products") return <ProductsSection key="products" data={data} palette={palette} radius={radius} isDesktop={isDesktop}/>;
          if (m.id === "events")   return <EventsSection   key="events"   data={data} palette={palette} radius={radius} isDesktop={isDesktop}/>;
          if (m.id === "blog")     return <BlogSection     key="blog"     data={data} palette={palette} radius={radius} isDesktop={isDesktop}/>;
          return null;
        })}
        <Footer palette={palette}/>
      </div>
    </div>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = ({ data, palette, radius, layout, isDesktop }) => {
  const p = data.profile;
  const [copied, setCopied] = React.useState(false);

  const waLink = data.links.find(l =>
    l.url?.includes('wa.me') || l.title?.toLowerCase().includes('whatsapp')
  );
  const pageUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${data.user.handle}`
    : `https://aminoweb.la/${data.user.handle}`;

  const onContact = () => openLink(waLink?.url || 'https://wa.me/');
  const onShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: p.name, url: pageUrl }); } catch {
        // Share was cancelled or unavailable.
      }
    } else {
      try { await navigator.clipboard.writeText(pageUrl); } catch {
        // Share was cancelled or unavailable.
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const actionBtns = (size = "md") => {
    const h = size === "sm" ? 36 : 40;
    const px = size === "sm" ? "0 16px" : "0 20px";
    return (
      <div style={{ display: "flex", gap: 8, justifyContent: layout === "stack" ? "center" : undefined }}>
        <button onClick={onContact} style={{
          height: h, padding: px, borderRadius: radius,
          background: palette.primary, color: "#fff",
          fontWeight: 700, fontSize: 13,
          display: "inline-flex", alignItems: "center", gap: 6,
          boxShadow: `0 4px 14px ${palette.primary}45`,
        }}><I.whats size={14}/> Contactar</button>
        <button onClick={onShare} style={{
          width: h, height: h, borderRadius: radius,
          background: copied ? palette.primary : palette.card, color: copied ? "#fff" : palette.text,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          border: `1.5px solid ${palette.muted}22`,
          transition: "background .2s, color .2s",
        }}>
          {copied ? <I.check size={15}/> : <I.share size={15}/>}
        </button>
      </div>
    );
  };

  if (layout === "stack") {
    return (
      <div style={{
        padding: isDesktop ? "56px 40px 32px" : "36px 20px 24px",
        textAlign: "center",
        maxWidth: isDesktop ? 860 : "none",
        margin: isDesktop ? "0 auto" : undefined,
      }}>
        <div style={{ display: "inline-flex", marginBottom: 16 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: isDesktop ? 100 : 86,
            height: isDesktop ? 100 : 86,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
            boxShadow: `0 8px 24px rgba(0,0,0,0.18)`,
          }}>
            <Avatar size={isDesktop ? 92 : 78} label="C"/>
          </div>
        </div>
        <div style={{ fontSize: isDesktop ? 30 : 24, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
          {p.name}
        </div>
        <div style={{ fontSize: isDesktop ? 15 : 13, color: palette.muted, marginTop: 8, lineHeight: 1.55, maxWidth: 360, margin: "8px auto 0" }}>
          {p.bio}
        </div>
        <div style={{ fontSize: 12, color: palette.muted, marginTop: 8, opacity: 0.7, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <I.pin size={11} color={palette.muted}/> {p.location}
        </div>
        <div style={{ marginTop: 20 }}>{actionBtns()}</div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", paddingBottom: 20 }}>
      <div style={{
        height: isDesktop ? 240 : 180,
        background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.accent} 100%)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0 6px, transparent 6px 18px)",
        }}/>
      </div>
      <div style={{
        padding: isDesktop ? "0 40px" : "0 16px",
        maxWidth: isDesktop ? 860 : "none",
        margin: isDesktop ? "0 auto" : undefined,
      }}>
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between",
          marginTop: -40, position: "relative",
        }}>
          <div style={{
            display: "inline-flex", borderRadius: "50%",
            border: `4px solid ${palette.bg}`,
            boxShadow: "0 4px 16px rgba(0,0,0,0.14)", flexShrink: 0,
          }}>
            <Avatar size={isDesktop ? 88 : 72} label="C"/>
          </div>
          <div style={{ paddingBottom: 4 }}>{actionBtns("sm")}</div>
        </div>
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: isDesktop ? 26 : 20, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2 }}>{p.name}</div>
          <div style={{ fontSize: 12, color: palette.muted, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
            <I.pin size={11} color={palette.muted}/> {p.location}
          </div>
          <div style={{ fontSize: isDesktop ? 14 : 13, color: palette.muted, marginTop: 8, lineHeight: 1.55, maxWidth: 520 }}>{p.bio}</div>
        </div>
      </div>
    </div>
  );
};

// ─── Section header ───────────────────────────────────────────────────────────
const SectionHeader = ({ title }) => (
  <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
    <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.03em" }}>{title}</div>
  </div>
);

// ─── Links ────────────────────────────────────────────────────────────────────
const LinksSection = ({ data, palette, radius }) => (
  <div>
    <SectionHeader title="Enlaces" palette={palette}/>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {data.links.map((l) => (
        <button key={l.id} onClick={() => openLink(l.url)} style={{
          height: 58, borderRadius: radius,
          background: palette.card, color: palette.text,
          display: "flex", alignItems: "center", gap: 13, padding: "0 16px",
          border: `1.5px solid ${palette.muted}16`,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)",
          textAlign: "left", cursor: l.url && l.url !== '#' ? "pointer" : "default",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: `${palette.primary}16`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
          }}>{l.icon}</div>
          <span style={{ flex: 1, fontWeight: 700, fontSize: 14 }}>{l.title}</span>
          <I.arrow size={15} color={palette.muted}/>
        </button>
      ))}
    </div>
  </div>
);

// ─── Products ─────────────────────────────────────────────────────────────────
const ProductsSection = ({ data, palette, radius, isDesktop }) => {
  const waLink = data.links.find(l => l.url?.includes('wa.me') || l.title?.toLowerCase().includes('whatsapp'));
  const onBuy = (product) => {
    const base = waLink?.url || 'https://wa.me/';
    const msg = encodeURIComponent(`Hola! Me interesa: ${product.title} (${product.price})`);
    openLink(`${base}?text=${msg}`);
  };
  return (
    <div>
      <SectionHeader title="Productos" palette={palette}/>
      {isDesktop ? (
        <div style={{ display: "flex", gap: 16, overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", paddingBottom: 8 }}>
          {data.products.map((p) => (
            <div key={p.id} style={{
              minWidth: 220, maxWidth: 220, flexShrink: 0, scrollSnapAlign: "start",
              background: palette.card, borderRadius: radius, overflow: "hidden",
              border: `1.5px solid ${palette.muted}14`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              <ImgPH ratio="4/3" radius={0} label={p.img}/>
              <div style={{ padding: "12px 14px 16px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.25 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: palette.muted, marginTop: 4, lineHeight: 1.4,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.desc}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                  <span style={{ fontWeight: 800, fontSize: 16, color: palette.primary }}>{p.price}</span>
                  <button onClick={() => onBuy(p)} style={{
                    height: 30, padding: "0 12px", borderRadius: 8,
                    background: palette.primary, color: "#fff", fontSize: 11, fontWeight: 700,
                  }}>Comprar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {data.products.map((p) => (
            <button key={p.id} onClick={() => onBuy(p)} style={{
              background: palette.card, borderRadius: radius, overflow: "hidden",
              border: `1.5px solid ${palette.muted}14`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              textAlign: "left",
            }}>
              <ImgPH ratio="1/1" radius={0} label={p.img}/>
              <div style={{ padding: "10px 11px 13px" }}>
                <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>{p.title}</div>
                <div style={{ fontSize: 11, color: palette.muted, marginTop: 3, lineHeight: 1.3,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.desc}</div>
                <div style={{ fontWeight: 800, fontSize: 14, marginTop: 7, color: palette.primary }}>{p.price}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Events ───────────────────────────────────────────────────────────────────
const EventsSection = ({ data, palette, radius, isDesktop }) => (
  <div>
    <SectionHeader title="Eventos" palette={palette}/>
    <div style={{
      display: isDesktop ? "grid" : "flex",
      gridTemplateColumns: isDesktop ? "1fr 1fr" : undefined,
      flexDirection: isDesktop ? undefined : "column",
      gap: 10,
    }}>
      {data.events.map((e) => {
        const d = new Date(e.date);
        const day = d.getDate();
        const mon = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"][d.getMonth()];
        const clickable = e.link && e.link !== '#';
        return (
          <div key={e.id} onClick={() => clickable && openLink(e.link)}
            style={{
              background: palette.card, borderRadius: radius, padding: "14px 16px",
              display: "flex", alignItems: "center", gap: 14,
              border: `1.5px solid ${palette.muted}14`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              cursor: clickable ? "pointer" : "default",
            }}>
            <div style={{
              width: 52, height: 58, borderRadius: 12, flexShrink: 0,
              background: `${palette.primary}18`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              border: `1.5px solid ${palette.primary}30`,
            }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: palette.primary, letterSpacing: "0.06em" }}>{mon}</span>
              <span style={{ fontSize: 24, fontWeight: 900, color: palette.primary, lineHeight: 1.05 }}>{day}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>{e.title}</div>
              <div style={{ fontSize: 12, color: palette.muted, marginTop: 3, lineHeight: 1.35 }}>{e.desc}</div>
              <div style={{ fontSize: 11, color: palette.primary, fontWeight: 700, marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
                <I.cal size={11} color={palette.primary}/> {e.time}
              </div>
            </div>
            {clickable && <I.arrow size={14} color={palette.muted}/>}
          </div>
        );
      })}
    </div>
  </div>
);

// ─── Blog ─────────────────────────────────────────────────────────────────────
const BlogSection = ({ data, palette, radius, isDesktop }) => {
  const [expanded, setExpanded] = React.useState(null);
  const [featured, ...rest] = data.blog;
  return (
    <div>
      <SectionHeader title="Blog" palette={palette}/>
      {featured && (
        <div style={{
          background: palette.card, borderRadius: radius, overflow: "hidden",
          border: `1.5px solid ${palette.muted}14`,
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)", marginBottom: 10,
        }}>
          <ImgPH ratio={isDesktop ? "21/9" : "16/7"} radius={0} label={featured.img}/>
          <div style={{ padding: isDesktop ? "18px 20px 20px" : "14px 14px 16px" }}>
            <div style={{ fontSize: 11, color: palette.primary, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 6 }}>{featured.date}</div>
            <div style={{ fontWeight: 800, fontSize: isDesktop ? 20 : 16, letterSpacing: "-0.02em", lineHeight: 1.25 }}>{featured.title}</div>
            <div style={{ fontSize: 13, color: palette.muted, marginTop: 6, lineHeight: 1.5 }}>{featured.excerpt}</div>
            <button onClick={() => setExpanded(expanded === featured.id ? null : featured.id)} style={{
              marginTop: 14, height: 34, padding: "0 16px", borderRadius: 8,
              background: `${palette.primary}18`, color: palette.primary,
              fontSize: 12, fontWeight: 700,
              display: "inline-flex", alignItems: "center", gap: 5,
            }}>
              {expanded === featured.id ? 'Cerrar' : 'Leer más'} <I.arrow size={12} color={palette.primary}/>
            </button>
          </div>
        </div>
      )}
      {rest.length > 0 && (
        <div style={{
          display: isDesktop ? "grid" : "flex",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : undefined,
          flexDirection: isDesktop ? undefined : "column",
          gap: 10,
        }}>
          {rest.map((b) => (
            <div key={b.id} style={{
              background: palette.card, borderRadius: radius, overflow: "hidden",
              display: "flex", border: `1.5px solid ${palette.muted}14`,
              boxShadow: "0 1px 4px rgba(72,35,23,0.08)",
            }}>
              <ImgPH ratio="1/1" radius={0} label={b.img} style={{ width: 80, height: 80, flexShrink: 0 }}/>
              <div style={{ padding: "10px 12px", flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, color: palette.primary, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>{b.date}</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginTop: 3, lineHeight: 1.25,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{b.title}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = ({ palette }) => (
  <div style={{ textAlign: "center", padding: "12px 0 4px", color: palette.muted, fontSize: 12 }}>
    Hecho con{" "}
    <span style={{ fontWeight: 800, color: palette.primary }}>aminoweb</span>
  </div>
);

export { PublicPage, PALETTES };
