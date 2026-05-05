import React from 'react';
import { I, Chip } from './ui.jsx';
import { Field, FieldLabel } from './dashboard-screens.jsx';

// AminoWeb — Login & Onboarding screens

function useIsDesktop() {
  const [d, setD] = React.useState(() => typeof window !== 'undefined' && window.innerWidth >= 768);
  React.useEffect(() => {
    const fn = () => setD(window.innerWidth >= 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return d;
}

// ─── Login ───────────────────────────────────────────────────────────────────

const LoginScreen = ({ onLogin }) => {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Left brand panel */}
        <div style={{
          flex: '0 0 52%',
          background: 'linear-gradient(160deg, #2A2430 0%, #3D2B5A 45%, #5C3D8F 100%)',
          display: 'flex', flexDirection: 'column',
          padding: '48px 56px', position: 'relative', overflow: 'hidden',
        }}>
          <img src={`${import.meta.env.BASE_URL}aminoweb-logo.svg`} alt="aminoweb" style={{
            height: 26, width: 'auto', display: 'block',
            filter: 'brightness(0) invert(1)', opacity: 0.92,
          }} />

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{
              color: '#fff', fontSize: 'clamp(36px, 3.5vw, 54px)', fontWeight: 800,
              letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 20px',
            }}>
              Tu mundo digital,<br />en una sola página.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.65, margin: 0, maxWidth: 340 }}>
              Comparte links, productos y eventos desde un solo lugar. Sin código, desde cualquier dispositivo.
            </p>

            {/* Mini testimonial chips */}
            <div style={{ display: 'flex', gap: 8, marginTop: 36, flexWrap: 'wrap' }}>
              {['@carolina.reposteria', '@marcos.foto', '@la.tienda.de.ana'].map(h => (
                <span key={h} style={{
                  fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)',
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                  padding: '5px 12px', borderRadius: 999,
                }}>{h}</span>
              ))}
            </div>
          </div>

          {/* Decorative circles from the brand mark */}
          <div style={{ position: 'absolute', bottom: -140, right: -100, width: 440, height: 440, borderRadius: '50%', background: 'rgba(205,181,231,0.10)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: -60, right: 60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(183,217,236,0.08)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 80, right: 140, width: 140, height: 140, borderRadius: '50%', background: 'rgba(174,213,205,0.10)', pointerEvents: 'none' }} />
        </div>

        {/* Right form panel */}
        <div style={{
          flex: 1, background: 'var(--aw-cream)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px',
        }}>
          <div style={{ width: '100%', maxWidth: 360 }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.025em', margin: '0 0 8px', color: 'var(--aw-ink)' }}>
              Empezar es gratis
            </h2>
            <p style={{ fontSize: 14, color: 'var(--aw-ink-3)', margin: '0 0 36px', lineHeight: 1.5 }}>
              Sin tarjeta de crédito. Cancela cuando quieras.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={onLogin} style={{
                width: '100%', height: 52, borderRadius: 14,
                background: 'var(--aw-ink)', color: '#fff',
                fontWeight: 700, fontSize: 15,
                boxShadow: '0 8px 18px rgba(26,21,48,0.18)',
              }}>Crear mi cuenta gratis</button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--aw-line)' }} />
                <span style={{ fontSize: 12, color: 'var(--aw-ink-3)' }}>o</span>
                <div style={{ flex: 1, height: 1, background: 'var(--aw-line)' }} />
              </div>

              <button onClick={onLogin} style={{
                width: '100%', height: 52, borderRadius: 14,
                background: '#fff', color: 'var(--aw-ink)',
                fontWeight: 700, fontSize: 15,
                border: '1.5px solid var(--aw-line)',
              }}>Ya tengo cuenta</button>
            </div>

            <p style={{ fontSize: 11, color: 'var(--aw-ink-3)', marginTop: 24, textAlign: 'center', lineHeight: 1.5 }}>
              Al continuar aceptas los{' '}
              <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Términos</span>{' '}
              y la{' '}
              <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Política de Privacidad</span>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Mobile
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(180deg, #FAF6EE 0%, #F0EAE0 60%, #E8DEF5 100%)',
      paddingTop: 60,
    }}>
      <div style={{ padding: '40px 24px 0', textAlign: 'center' }}>
        <img src={`${import.meta.env.BASE_URL}aminoweb-logo.svg`} alt="aminoweb" style={{ height: 28, width: 'auto', display: 'inline-block' }} />
      </div>

      <div style={{ flex: 1, padding: '40px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
          Tu mundo digital,<br />
          <span style={{ color: 'var(--aw-violet)' }}>en una sola página.</span>
        </div>
        <div style={{ fontSize: 14, color: 'var(--aw-ink-2)', marginTop: 14, lineHeight: 1.5 }}>
          Crea tu página pública en minutos. Sin código, desde tu celular.
        </div>
      </div>

      <div style={{ padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={onLogin} style={{
          width: '100%', height: 52, borderRadius: 16, background: 'var(--aw-ink)',
          color: '#fff', fontWeight: 700, fontSize: 15,
          boxShadow: '0 8px 18px rgba(26,21,48,0.18)',
        }}>Empezar gratis</button>
        <button onClick={onLogin} style={{
          width: '100%', height: 52, borderRadius: 16, background: '#fff',
          color: 'var(--aw-ink)', fontWeight: 700, fontSize: 15,
          border: '1px solid var(--aw-line)',
        }}>Ya tengo cuenta</button>
        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--aw-ink-3)', marginTop: 8 }}>
          Al continuar aceptas los Términos y la Política de Privacidad.
        </div>
      </div>
    </div>
  );
};

// ─── Onboarding data ─────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: 'influencer',
    name: 'Influencer',
    tag: 'Creadores · Comunidades',
    desc: 'Bio centrada en tu audiencia, enlaces destacados y contenido editorial.',
    accent: '#CDB5E7',
    modules: ['links', 'blog', 'events'],
    sample: { name: 'Camila Ruiz', bio: 'Creadora de contenido sobre bienestar y vida slow 🧘‍♀️' },
    layout: 'stack', palette: 'violet', icon: '✨',
    preview: ['Hero centrado', 'Botones de redes', 'Notas del blog'],
  },
  {
    id: 'shop',
    name: 'Tienda',
    tag: 'Productos · Pedidos',
    desc: 'Catálogo visual con precios, descripciones y botón de pedido por WhatsApp.',
    accent: '#AED5CD',
    modules: ['products', 'links', 'events'],
    sample: { name: 'Carolina Méndez', bio: 'Repostería artesanal en Medellín 🇨🇴' },
    layout: 'grid', palette: 'mint', icon: '🛍',
    preview: ['Grid de productos', 'Pedido directo', 'Eventos pop-up'],
  },
  {
    id: 'pro',
    name: 'Profesional',
    tag: 'Servicios · Consultoría',
    desc: 'Pestaña editorial con servicios, casos de estudio y agenda de citas.',
    accent: '#B7D9EC',
    modules: ['links', 'events', 'blog'],
    sample: { name: 'Juan Pablo Vega', bio: 'Diseñador independiente · UX strategy & branding' },
    layout: 'hybrid', palette: 'sand', icon: '📐',
    preview: ['Hero editorial', 'Agenda de citas', 'Estudios de caso'],
  },
];

const PALETTE_COLORS = { violet: '#9B7BC9', mint: '#6FB8A8', sand: '#A88A5C', coral: '#E89A7A', midnight: '#2E2E33' };
const MODULE_LABELS = { links: 'Mis enlaces', products: 'Mi tienda', events: 'Agenda', blog: 'Blog' };

// ─── Live preview (desktop right panel) ──────────────────────────────────────

const OnboardingPreview = ({ tpl, handle, picks, name, bio }) => {
  const color = PALETTE_COLORS[tpl?.palette] || PALETTE_COLORS.violet;
  const displayName = name || tpl?.sample.name || 'Tu nombre';
  const displayBio  = bio  || tpl?.sample.bio  || 'Tu descripción aquí...';
  const displayHandle = handle || 'tulink';
  const activePicks = Array.from(picks).slice(0, 4);

  return (
    <div style={{
      width: 234, flexShrink: 0,
      background: '#fff', borderRadius: 36,
      border: '8px solid #1C1C1E',
      overflow: 'hidden',
      boxShadow: '0 24px 64px rgba(0,0,0,0.28)',
    }}>
      {/* Notch bar */}
      <div style={{
        height: 26, background: '#1C1C1E',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: 56, height: 10, borderRadius: 5, background: '#333' }} />
      </div>

      {/* Page content */}
      <div style={{ height: 436, overflowY: 'auto', background: '#FAF6EE' }} className="aw-scroll">
        {/* Cover */}
        <div style={{
          height: 76,
          background: `linear-gradient(135deg, ${color}55 0%, ${color}22 100%)`,
        }} />

        {/* Avatar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: -22 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFB991, #FF8A5C)',
            border: '3px solid #FAF6EE',
            boxShadow: '0 2px 6px rgba(0,0,0,0.14)',
          }} />
        </div>

        {/* Name + bio */}
        <div style={{ textAlign: 'center', padding: '8px 14px 10px' }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#2E2E33', lineHeight: 1.3 }}>
            {displayName}
          </div>
          <div style={{ fontSize: 10, color: '#8B8B92', marginTop: 3, lineHeight: 1.4 }}>
            {displayBio.length > 60 ? displayBio.slice(0, 60) + '…' : displayBio}
          </div>
          <div style={{ fontSize: 9, color, marginTop: 5, fontWeight: 700, letterSpacing: '0.02em' }}>
            aminoweb.la/{displayHandle}
          </div>
        </div>

        {/* Module buttons */}
        <div style={{ padding: '2px 12px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {activePicks.length > 0 ? activePicks.map(id => (
            <div key={id} style={{
              height: 30, borderRadius: 8,
              background: `${color}18`, border: `1px solid ${color}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 600, color,
            }}>
              {MODULE_LABELS[id] || id}
            </div>
          )) : (
            <div style={{
              height: 30, borderRadius: 8, background: '#F0EAE0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, color: '#B0A898',
            }}>
              Elige módulos →
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Onboarding ───────────────────────────────────────────────────────────────

const OnboardingScreen = ({ onDone }) => {
  const isDesktop = useIsDesktop();
  const [step, setStep] = React.useState(0);
  const [tplId, setTplId] = React.useState(null);
  const [handle, setHandle] = React.useState('carolina');
  const [picks, setPicks] = React.useState(new Set(['links', 'products']));
  const [name, setName] = React.useState('');
  const [bio, setBio] = React.useState('');
  const tpl = TEMPLATES.find(t => t.id === tplId);

  const choose = (id) => {
    setTplId(id);
    setPicks(new Set(TEMPLATES.find(x => x.id === id).modules));
  };
  const togglePick = (id) => {
    const next = new Set(picks);
    next.has(id) ? next.delete(id) : next.add(id);
    setPicks(next);
  };

  if (step === 0.5) { setStep(1); return null; }

  // wrap: composes step content + CTA into mobile or desktop two-column shell
  const wrap = (stepNum, body, ctaContent, ctaAction, ctaDisabled = false) => {
    const ctaBtn = (
      <button
        onClick={ctaAction}
        disabled={ctaDisabled}
        style={{ ...primaryBtn, opacity: ctaDisabled ? 0.4 : 1 }}
      >
        {ctaContent}
      </button>
    );

    if (isDesktop) {
      return (
        <div style={{ display: 'flex', height: '100vh', background: 'var(--aw-cream-2)' }}>
          {/* Left: form */}
          <div style={{
            flex: '0 0 480px',
            background: '#fff', borderRight: '1.5px solid var(--aw-line)',
            display: 'flex', flexDirection: 'column',
            padding: '40px 48px 32px',
            overflowY: 'auto',
          }}>
            <img src={`${import.meta.env.BASE_URL}aminoweb-logo.svg`} alt="aminoweb" style={{ height: 22, width: 'auto', display: 'block', marginBottom: 32 }} />
            <Progress step={stepNum} total={4} />
            <div style={{ flex: 1, marginTop: 28, overflowY: 'auto' }} className="aw-scroll">
              {body}
            </div>
            <div style={{ paddingTop: 20 }}>{ctaBtn}</div>
          </div>

          {/* Right: live preview */}
          <div style={{
            flex: 1,
            background: 'radial-gradient(ellipse at 55% 45%, var(--aw-violet-50) 0%, var(--aw-cream) 65%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 20,
            padding: 40,
          }}>
            <p className="aw-eyebrow">Vista previa</p>
            <OnboardingPreview tpl={tpl} handle={handle} picks={picks} name={name} bio={bio} />
          </div>
        </div>
      );
    }

    // Mobile shell
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '60px 20px 20px' }}>
        <Progress step={stepNum} total={4} />
        <div style={{ flex: 1, overflowY: 'auto', paddingTop: 18 }} className="aw-scroll">
          {body}
        </div>
        {ctaBtn}
      </div>
    );
  };

  // ── Step 0: Template ───────────────────────────────────────────────────────
  if (step === 0) return wrap(1,
    <>
      <div className="aw-eyebrow" style={{ marginBottom: 8 }}>Paso 1 · Plantilla</div>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
        Empieza con una plantilla
      </div>
      <div style={{ fontSize: 13, color: 'var(--aw-ink-3)', marginTop: 8, lineHeight: 1.5 }}>
        Elige el punto de partida. Puedes cambiar todo después.
      </div>
      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {TEMPLATES.map(t => {
          const sel = tplId === t.id;
          return (
            <button key={t.id} onClick={() => choose(t.id)} style={{
              display: 'flex', gap: 14, alignItems: 'stretch',
              padding: 14, borderRadius: 18, background: '#fff',
              border: sel ? '2px solid var(--aw-violet)' : '1px solid var(--aw-line)',
              textAlign: 'left', position: 'relative',
              boxShadow: sel ? '0 8px 18px rgba(155,123,201,0.18)' : '0 1px 3px rgba(0,0,0,0.04)',
              transition: 'all .15s ease',
            }}>
              <TemplateThumb tpl={t} />
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="aw-eyebrow" style={{ color: 'var(--aw-ink-3)', fontSize: 10 }}>{t.tag}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 2 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--aw-ink-2)', marginTop: 5, lineHeight: 1.4 }}>{t.desc}</div>
                </div>
                <div style={{ display: 'flex', gap: 5, marginTop: 10, flexWrap: 'wrap' }}>
                  {t.preview.map((p, i) => (
                    <span key={i} style={{
                      fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999,
                      background: '#F4EFE6', color: 'var(--aw-ink-2)',
                    }}>{p}</span>
                  ))}
                </div>
              </div>
              {sel && (
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  width: 22, height: 22, borderRadius: '50%', background: 'var(--aw-violet)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <I.check size={13} />
                </div>
              )}
            </button>
          );
        })}
        <button onClick={() => setStep(1)} style={{
          display: 'block', width: '100%', textAlign: 'center', marginTop: 4,
          fontSize: 12, color: 'var(--aw-ink-3)', fontWeight: 600, padding: 8,
        }}>
          O empezar desde cero →
        </button>
      </div>
    </>,
    <><span>Continuar</span> <I.arrow size={16} /></>,
    () => setStep(1),
    !tplId,
  );

  // ── Step 1: Handle ─────────────────────────────────────────────────────────
  if (step === 1) {
    const handleValid = /^[a-z0-9_.-]{3,}$/i.test(handle.trim());
    const handleTooShort = handle.trim().length > 0 && handle.trim().length < 3;
    return wrap(2,
      <>
        <div className="aw-eyebrow" style={{ marginBottom: 8 }}>Paso 2 · Tu dirección</div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
          Elige tu dirección
        </div>
        <div style={{ fontSize: 13, color: 'var(--aw-ink-3)', marginTop: 8, lineHeight: 1.5 }}>
          Así te encontrarán tus clientes. Puedes cambiarlo después.
        </div>
        <div style={{
          marginTop: 24, padding: '12px 14px', borderRadius: 14, background: '#fff',
          border: handleTooShort ? '1.5px solid #E89A7A' : handleValid ? '1.5px solid #10B981' : '1.5px solid var(--aw-line)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ color: 'var(--aw-ink-3)', fontSize: 14, whiteSpace: 'nowrap' }}>aminoweb.la/</span>
          <input
            value={handle}
            onChange={e => setHandle(e.target.value.toLowerCase().replace(/\s/g, ''))}
            style={{
              flex: 1, border: 'none', outline: 'none', fontSize: 15, fontWeight: 700,
              fontFamily: 'inherit', color: 'var(--aw-ink)', background: 'transparent',
            }}
          />
          {handleValid && <Chip tone="success">disponible</Chip>}
        </div>
        {handleTooShort && (
          <div style={{ fontSize: 12, color: '#C2410C', marginTop: 6, fontWeight: 600 }}>
            Mínimo 3 caracteres
          </div>
        )}
        {!handleValid && !handleTooShort && handle.trim().length === 0 && (
          <div style={{ fontSize: 12, color: 'var(--aw-ink-3)', marginTop: 6 }}>
            Solo letras, números, guiones y puntos
          </div>
        )}
        {tpl && (
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--aw-ink-3)' }}>
            <span style={{ fontSize: 15 }}>{tpl.icon}</span>
            Plantilla: <b style={{ color: 'var(--aw-ink-2)' }}>{tpl.name}</b>
          </div>
        )}
      </>,
      <><span>Continuar</span> <I.arrow size={16} /></>,
      () => setStep(2),
      !handleValid,
    );
  }

  // ── Step 2: Modules ────────────────────────────────────────────────────────
  if (step === 2) {
    const opts = [
      { id: 'links',    label: 'Enlaces a redes' },
      { id: 'products', label: 'Productos / Servicios' },
      { id: 'events',   label: 'Eventos / Citas' },
      { id: 'blog',     label: 'Blog / Historias' },
    ];
    return wrap(3,
      <>
        <div className="aw-eyebrow" style={{ marginBottom: 8 }}>Paso 3 · Módulos</div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
          ¿Qué vas a mostrar?
        </div>
        <div style={{ fontSize: 13, color: 'var(--aw-ink-3)', marginTop: 8, lineHeight: 1.5 }}>
          {tpl ? `Tu plantilla "${tpl.name}" ya activó algunos. Ajústalos si quieres.` : 'Activa los módulos que necesites.'}
        </div>
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {opts.map(o => {
            const on = picks.has(o.id);
            return (
              <button key={o.id} onClick={() => togglePick(o.id)} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '13px 14px', borderRadius: 14, background: '#fff',
                border: on ? '2px solid var(--aw-violet)' : '1px solid var(--aw-line)',
                textAlign: 'left', transition: 'border .1s',
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                  background: on ? 'var(--aw-violet)' : 'transparent',
                  border: on ? 'none' : '2px solid #D9CFEF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                }}>{on && <I.check size={13} />}</div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{o.label}</span>
              </button>
            );
          })}
        </div>
      </>,
      <><span>Continuar</span> <I.arrow size={16} /></>,
      () => setStep(3),
    );
  }

  // ── Step 4: Success ────────────────────────────────────────────────────────
  if (step === 4) {
    return (
      <div style={{
        height: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', background: 'var(--aw-cream)', textAlign: 'center',
      }}>
        <div style={{ fontSize: 72, lineHeight: 1 }}>🎉</div>
        <div style={{
          fontSize: 28, fontWeight: 800, marginTop: 20,
          letterSpacing: '-0.025em', lineHeight: 1.15, color: 'var(--aw-ink)',
        }}>
          ¡Tu página está lista!
        </div>
        <div style={{ fontSize: 14, color: 'var(--aw-ink-3)', marginTop: 10, lineHeight: 1.5 }}>
          Ya está disponible en
        </div>
        <div style={{
          marginTop: 8, padding: '8px 18px', borderRadius: 10,
          background: 'var(--aw-violet-50)', color: 'var(--aw-violet)',
          fontWeight: 700, fontSize: 15,
        }}>
          aminoweb.la/{handle}
        </div>
        <button onClick={onDone} style={{
          marginTop: 36, width: '100%', maxWidth: 320, height: 52, borderRadius: 14,
          background: 'var(--aw-violet)', color: '#fff', fontWeight: 700, fontSize: 15,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 6px 16px rgba(124,58,237,0.25)',
        }}>
          Ir a mi dashboard <I.arrow size={16}/>
        </button>
      </div>
    );
  }

  // ── Step 3: Profile ────────────────────────────────────────────────────────
  return wrap(4,
    <>
      <div className="aw-eyebrow" style={{ marginBottom: 8 }}>Paso 4 · Perfil</div>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
        Cuéntanos de ti
      </div>
      <div style={{ fontSize: 13, color: 'var(--aw-ink-3)', marginTop: 8, lineHeight: 1.5 }}>
        Esto será lo primero que vean tus visitantes.
      </div>
      <div style={{ marginTop: 20 }}>
        <FieldLabel>Tu nombre</FieldLabel>
        <Field
          value={name || (tpl ? tpl.sample.name : 'Carolina Méndez')}
          onChange={v => setName(v)}
        />
        <FieldLabel>¿Qué haces?</FieldLabel>
        <Field
          value={bio || (tpl ? tpl.sample.bio : 'Repostería artesanal en Medellín 🇨🇴')}
          onChange={v => setBio(v)}
          multiline
        />
      </div>
    </>,
    <><span>Crear mi página</span> <I.rocket size={16} /></>,
    () => setStep(4),
  );
};

// ─── Shared sub-components ────────────────────────────────────────────────────

const TemplateThumb = ({ tpl }) => {
  const bg = tpl.accent;
  if (tpl.id === 'influencer') {
    return (
      <div style={{
        width: 78, flexShrink: 0, borderRadius: 14, overflow: 'hidden',
        background: bg, padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
      }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff', marginTop: 4 }} />
        <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.7)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4, width: '100%' }}>
          <div style={{ height: 10, borderRadius: 5, background: '#fff' }} />
          <div style={{ height: 10, borderRadius: 5, background: '#fff', opacity: 0.85 }} />
          <div style={{ height: 10, borderRadius: 5, background: '#fff', opacity: 0.7 }} />
        </div>
      </div>
    );
  }
  if (tpl.id === 'shop') {
    return (
      <div style={{
        width: 78, flexShrink: 0, borderRadius: 14, overflow: 'hidden',
        background: bg, padding: 10, display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <div style={{ height: 10, borderRadius: 4, background: 'rgba(255,255,255,0.5)', width: '60%' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 4 }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{ aspectRatio: '1/1', background: '#fff', borderRadius: 4, opacity: 0.85 - i * 0.05 }} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div style={{
      width: 78, flexShrink: 0, borderRadius: 14, overflow: 'hidden',
      background: bg, display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ height: 30, background: 'rgba(255,255,255,0.55)' }} />
      <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ height: 8, borderRadius: 4, background: '#fff' }} />
        <div style={{ height: 6, borderRadius: 3, background: '#fff', opacity: 0.7, width: '70%' }} />
        <div style={{ height: 14, borderRadius: 7, background: '#fff', marginTop: 4, width: '55%' }} />
      </div>
    </div>
  );
};

const Progress = ({ step, total }) => (
  <div style={{ display: 'flex', gap: 5 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        flex: 1, height: 3, borderRadius: 2,
        background: i < step ? 'var(--aw-violet)' : '#E8E0F4',
        transition: 'background .2s',
      }} />
    ))}
  </div>
);

const primaryBtn = {
  width: '100%', height: 52, borderRadius: 14, background: 'var(--aw-violet)',
  color: '#fff', fontWeight: 700, fontSize: 15,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  boxShadow: '0 6px 16px rgba(124,58,237,0.25)',
};

export { LoginScreen, OnboardingScreen, TEMPLATES };
