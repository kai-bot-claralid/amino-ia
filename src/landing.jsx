import React from 'react';
import { useNavigate } from 'react-router-dom';
import { I } from './ui.jsx';

const useIsNarrow = () => {
  const [narrow, setNarrow] = React.useState(() => typeof window !== 'undefined' && window.innerWidth < 760);
  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const onResize = () => setNarrow(window.innerWidth < 760);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return narrow;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const Btn = ({ children, onClick, variant = 'primary', size = 'md', style = {} }) => {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, cursor: 'pointer', border: 'none', fontFamily: 'inherit',
    fontWeight: 700, letterSpacing: '-0.01em', whiteSpace: 'nowrap',
  };
  const variants = {
    primary: { background: 'var(--aw-violet)', color: '#fff', boxShadow: '0 6px 20px rgba(155,123,201,0.38)' },
    ghost:   { background: 'rgba(255,255,255,0.12)', color: '#fff', backdropFilter: 'blur(8px)' },
    outline: { background: 'transparent', color: 'var(--aw-ink)', border: '1.5px solid var(--aw-line)' },
  };
  const sizes = {
    sm: { fontSize: 13, padding: '8px 18px', borderRadius: 10 },
    md: { fontSize: 15, padding: '12px 24px', borderRadius: 12 },
    lg: { fontSize: 16, padding: '15px 32px', borderRadius: 14 },
  };
  return <button onClick={onClick} style={{ ...base, ...variants[variant], ...sizes[size], ...style }}>{children}</button>;
};

const Pill = ({ children, color = 'var(--aw-violet)', bg = 'var(--aw-violet-50)' }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5,
    background: bg, color, fontSize: 11, fontWeight: 800,
    letterSpacing: '0.07em', textTransform: 'uppercase',
    padding: '5px 13px', borderRadius: 99,
  }}>{children}</span>
);

// ─── Phone frame ──────────────────────────────────────────────────────────────
const PhoneShell = ({ children, scale = 1, style = {} }) => (
  <div style={{
    width: 240 * scale, background: '#1A1530',
    borderRadius: 40 * scale, padding: `${14 * scale}px`,
    boxShadow: '0 32px 80px rgba(26,21,48,0.28), 0 0 0 1px rgba(255,255,255,0.08)',
    flexShrink: 0, ...style,
  }}>
    {/* notch */}
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 * scale }}>
      <div style={{ width: 64 * scale, height: 6 * scale, background: '#2E2844', borderRadius: 99 }}/>
    </div>
    <div style={{ borderRadius: 28 * scale, overflow: 'hidden', background: '#FAF6EE' }}>
      {children}
    </div>
  </div>
);

const MockPage = () => (
  <div style={{ fontFamily: "'Inter', sans-serif" }}>
    {/* cover */}
    <div style={{ height: 72, background: 'linear-gradient(135deg, #9B7BC9 0%, #B89FD9 60%, #E89A7A 100%)' }}/>
    {/* avatar */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: -22 }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#FFB991,#9B7BC9)', border: '3px solid #FAF6EE', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}/>
    </div>
    <div style={{ textAlign: 'center', padding: '8px 14px 4px' }}>
      <div style={{ fontWeight: 800, fontSize: 12, color: '#1A1530', letterSpacing: '-0.02em' }}>Carolina Méndez</div>
      <div style={{ fontSize: 10, color: '#9694A4', marginTop: 2 }}>Diseñadora · Ciudad de México</div>
    </div>
    {/* links */}
    <div style={{ padding: '8px 12px 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
      {[
        { label: 'Mi portafolio',    bg: '#EDE8F7', color: '#6D4FA0', icon: I.globe  },
        { label: 'Consultoría 1:1',  bg: '#9B7BC9', color: '#fff',    icon: I.user   },
        { label: 'Recursos gratis',  bg: '#FAF6EE', color: '#1A1530', icon: I.doc    },
        { label: 'WhatsApp',         bg: '#FCF0EA', color: '#C0613B', icon: I.whats  },
      ].map(l => (
        <div key={l.label} style={{ background: l.bg, borderRadius: 9, padding: '8px 11px', fontSize: 10, fontWeight: 700, color: l.color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
          <l.icon size={11} color={l.color}/>{l.label}
        </div>
      ))}
    </div>
    {/* product */}
    <div style={{ margin: '0 12px 14px', borderRadius: 12, background: '#fff', border: '1px solid #EDE9E0', padding: '10px 10px' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ width: 38, height: 38, borderRadius: 8, background: 'linear-gradient(135deg,#9B7BC9,#E89A7A)', flexShrink: 0 }}/>
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#1A1530', lineHeight: 1.3 }}>Guía de marca digital</div>
          <div style={{ fontSize: 10, color: '#9B7BC9', fontWeight: 700, marginTop: 2 }}>$29 USD</div>
          <div style={{ marginTop: 4, background: '#9B7BC9', borderRadius: 5, padding: '2px 7px', fontSize: 9, fontWeight: 700, color: '#fff', display: 'inline-block' }}>Comprar</div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = ({ onSignup, onLogin }) => (
  <nav style={{
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(250,246,238,0.88)', backdropFilter: 'blur(16px)',
    borderBottom: '1px solid var(--aw-line)',
  }}>
    <div style={{
      maxWidth: 1120, margin: '0 auto',
      display: 'flex', alignItems: 'center',
      padding: '0 28px', height: 60, gap: 32,
    }}>
      <img src={`${import.meta.env.BASE_URL}aminoweb-logo.svg`} alt="aminoweb" style={{ height: 20, display: 'block' }}/>
      <div style={{ flex: 1 }}/>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Btn onClick={onLogin} variant="outline" size="sm">Iniciar sesión</Btn>
        <Btn onClick={onSignup} variant="primary" size="sm">
          Crear gratis <I.arrow size={13}/>
        </Btn>
      </div>
    </div>
  </nav>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HANDLES = ['@carolina.studio', '@marcos.foto', '@la.tienda.ana', '@chef.mario'];

const Hero = ({ onSignup, compact = false }) => (
  <section style={{
    background: 'radial-gradient(circle at 78% 14%, rgba(174,213,205,0.42), transparent 25%), radial-gradient(circle at 18% 18%, rgba(205,181,231,0.44), transparent 28%), linear-gradient(160deg, #F3EFF9 0%, #FAF6EE 48%, #FFF0E8 100%)',
    padding: compact ? '54px 20px 0' : '80px 28px 0',
    overflow: 'hidden',
  }}>
    <div style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', flexDirection: compact ? 'column' : 'row', alignItems: compact ? 'center' : 'flex-end', gap: compact ? 28 : 48 }}>

      {/* Left */}
      <div style={{ flex: compact ? 'none' : '0 0 520px', paddingBottom: compact ? 18 : 80, textAlign: compact ? 'center' : 'left' }}>
        <Pill><I.spark size={11} color="var(--aw-violet)"/> Link-in-bio para creadores LATAM</Pill>
        <h1 style={{
          fontSize: 'clamp(42px, 5.5vw, 64px)', fontWeight: 800,
          letterSpacing: '-0.035em', lineHeight: 1.08,
          color: 'var(--aw-ink)', margin: '20px 0 22px',
        }}>
          Todo lo que eres,<br/>
          <span style={{ color: 'var(--aw-violet)' }}>en un solo link.</span>
        </h1>
        <p style={{ fontSize: compact ? 16 : 18, color: 'var(--aw-ink-2)', lineHeight: 1.65, margin: '0 auto 36px', maxWidth: 460 }}>
          Crea tu página personal con links, productos y eventos. Lista en 2 minutos — sin código, sin tarjeta.
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: compact ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
          <Btn onClick={onSignup} variant="primary" size="lg">
            Crear mi página gratis
          </Btn>
          <span style={{ fontSize: 13, color: 'var(--aw-ink-3)', fontWeight: 500 }}>Sin tarjeta · Listo en 2 min</span>
        </div>
        {/* Handle chips */}
        <div style={{ display: 'flex', gap: 8, marginTop: 32, flexWrap: 'wrap', justifyContent: compact ? 'center' : 'flex-start' }}>
          {HANDLES.map(h => (
            <span key={h} style={{
              fontSize: 12, color: 'var(--aw-ink-3)', fontWeight: 500,
              background: '#fff', border: '1.5px solid var(--aw-line)',
              padding: '4px 12px', borderRadius: 99,
              boxShadow: '0 1px 4px rgba(26,21,48,0.05)',
            }}>aminoweb.la{h.replace('@', '/')}</span>
          ))}
        </div>
      </div>

      {/* Right — phone */}
      <div style={{ flex: 1, display: 'flex', justifyContent: compact ? 'center' : 'flex-end', alignItems: 'flex-end', paddingBottom: 0, gap: compact ? 12 : 20, width: compact ? '100%' : undefined }}>
        {/* floating stat card */}
        <div style={{ display: compact ? 'none' : 'flex', flexDirection: 'column', gap: 12, marginBottom: 60, alignSelf: 'center' }}>
          {[
            { label: 'Visitas hoy', v: '2.4k', d: '+18%', bg: '#fff' },
            { label: 'Ingresos este mes', v: '$840', d: '+32%', bg: 'var(--aw-violet)' },
          ].map(s => (
            <div key={s.label} style={{
              background: s.bg, borderRadius: 16, padding: '14px 18px',
              boxShadow: '0 8px 28px rgba(26,21,48,0.10)',
              minWidth: 160,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: s.bg === '#fff' ? 'var(--aw-ink-3)' : 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: s.bg === '#fff' ? 'var(--aw-ink)' : '#fff', letterSpacing: '-0.02em' }}>{s.v}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: s.bg === '#fff' ? '#22c55e' : '#BBF7D0' }}>{s.d}</span>
              </div>
            </div>
          ))}
        </div>
        <PhoneShell scale={compact ? 0.92 : 1} style={{ marginBottom: 0 }}>
          <MockPage/>
        </PhoneShell>
      </div>
    </div>
  </section>
);

// ─── Logos / social proof bar ─────────────────────────────────────────────────
const STATS = [
  { v: '40 mil+', l: 'creadores activos' },
  { v: '2 min',   l: 'para crear tu página' },
  { v: '100%',    l: 'gratis para empezar' },
  { v: '#1',      l: 'link-in-bio en LATAM' },
];

const SocialProof = () => (
  <section style={{ background: 'var(--aw-ink)', padding: '28px 28px' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 24 }}>
      {STATS.map(s => (
        <div key={s.v} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.v}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4, fontWeight: 500 }}>{s.l}</div>
        </div>
      ))}
    </div>
  </section>
);

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    pill: { label: 'Links & redes', color: 'var(--aw-violet)', bg: 'var(--aw-violet-50)', icon: I.link },
    title: 'Todos tus links en un solo lugar',
    body:  'WhatsApp, Instagram, TikTok, tu tienda, tu portfolio — todo accesible desde un solo enlace que pones en tu bio.',
    items: ['Orden drag & drop', 'Íconos personalizados', 'Clics en tiempo real'],
    accent: 'var(--aw-violet-50)',
    visual: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, width: 200 }}>
        {[
          { label: 'Portafolio',  bg: '#EDE8F7', color: '#6D4FA0', icon: I.globe },
          { label: 'WhatsApp',    bg: '#FCF0EA', color: '#C0613B', icon: I.whats },
          { label: 'Instagram',   bg: '#F3EFF9', color: '#9B7BC9', icon: I.ig    },
          { label: 'Mi tienda',   bg: '#EDE8F7', color: '#6D4FA0', icon: I.bag   },
        ].map(l => (
          <div key={l.label} style={{ background: l.bg, borderRadius: 11, padding: '10px 14px', fontSize: 12, fontWeight: 700, color: l.color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
            <l.icon size={14} color={l.color}/>{l.label}
          </div>
        ))}
      </div>
    ),
  },
  {
    pill: { label: 'Productos', color: 'var(--aw-coral)', bg: 'var(--aw-coral-50)', icon: I.bag },
    title: 'Vende sin necesitar una tienda',
    body:  'Publica tus productos, cursos o servicios con imagen y precio. Tus clientes te contactan por WhatsApp directo.',
    items: ['Sin comisiones', 'Contacto por WhatsApp', 'Imagen + precio + descripción'],
    accent: 'var(--aw-coral-50)',
    visual: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 220 }}>
        {[
          { name: 'Guía de marca digital', price: '$29 USD', icon: I.doc  },
          { name: 'Consultoría 1:1 — 60 min', price: '$80 USD', icon: I.user },
        ].map(p => (
          <div key={p.name} style={{ background: '#fff', border: '1.5px solid var(--aw-line)', borderRadius: 14, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'center', boxShadow: '0 2px 12px rgba(26,21,48,0.06)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--aw-coral-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><p.icon size={18} color="var(--aw-coral)"/></div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--aw-ink)', lineHeight: 1.3 }}>{p.name}</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--aw-violet)', marginTop: 2 }}>{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    pill: { label: 'Diseño', color: '#5A7A6A', bg: '#E4F0EB', icon: I.brush },
    title: 'Tu página con tu estilo',
    body:  'Elige paleta de colores, layout y tipografía. Sin código. Tu página queda increíble desde el primer día.',
    items: ['5 paletas de color', 'Layouts en cuadrícula o pila', 'Vista previa en tiempo real'],
    accent: '#EEF6F2',
    visual: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 200 }}>
        {[
          { name: 'Lavanda', colors: ['#9B7BC9','#AED5CD','#FAF6EE'] },
          { name: 'Coral',   colors: ['#E89A7A','#9B7BC9','#FAF6EE'] },
          { name: 'Menta',   colors: ['#6FB8A8','#2E2E33','#F0F5F1'] },
        ].map((p, i) => (
          <div key={p.name} style={{ background: i === 0 ? '#fff' : 'transparent', border: i === 0 ? '2px solid var(--aw-violet)' : '1.5px solid var(--aw-line)', borderRadius: 12, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {p.colors.map((c, j) => <div key={j} style={{ width: 16, height: 16, borderRadius: 5, background: c }}/>)}
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--aw-ink)' }}>{p.name}</span>
            {i === 0 && <I.check size={13} color="var(--aw-violet)" style={{ marginLeft: 'auto' }}/>}
          </div>
        ))}
      </div>
    ),
  },
];

const Features = ({ compact = false }) => (
  <section style={{ background: 'var(--aw-cream)', padding: compact ? '68px 20px' : '96px 28px' }}>
    <div style={{ maxWidth: 1120, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 72 }}>
        <Pill><I.layers size={11} color="var(--aw-violet)"/> Todo en uno</Pill>
        <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--aw-ink)', margin: '16px 0 12px', lineHeight: 1.1 }}>
          Hecho para creadores de LATAM
        </h2>
        <p style={{ fontSize: 17, color: 'var(--aw-ink-3)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
          Simple de usar, poderoso de verdad. Todo lo que necesitas para construir tu presencia digital.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {FEATURES.map((f, i) => (
          <div key={f.title} style={{
            background: '#fff', borderRadius: 24,
            border: '1.5px solid var(--aw-line)',
            display: 'flex', alignItems: 'center',
            flexDirection: compact ? 'column' : (i % 2 === 0 ? 'row' : 'row-reverse'),
            overflow: 'hidden',
            boxShadow: '0 2px 20px rgba(26,21,48,0.05)',
          }}>
            {/* text */}
            <div style={{ flex: 1, padding: compact ? '30px 26px 24px' : '48px 48px' }}>
              <Pill color={f.pill.color} bg={f.pill.bg}><f.pill.icon size={11} color={f.pill.color}/> {f.pill.label}</Pill>
              <h3 style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--aw-ink)', margin: '14px 0 12px', lineHeight: 1.15 }}>{f.title}</h3>
              <p style={{ fontSize: 15, color: 'var(--aw-ink-3)', lineHeight: 1.65, margin: '0 0 24px', maxWidth: 360 }}>{f.body}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {f.items.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--aw-violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width={9} height={9} viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2L7.5 2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--aw-ink-2)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* visual */}
            <div style={{
              width: compact ? '100%' : 340, flexShrink: 0, background: f.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: compact ? '32px 20px' : '48px 40px', alignSelf: 'stretch',
            }}>
              {f.visual}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── How it works ─────────────────────────────────────────────────────────────
const STEPS = [
  { n: '01', title: 'Crea tu cuenta',      body: 'Regístrate gratis. Elige tu @usuario y empieza a personalizar.', icon: I.user   },
  { n: '02', title: 'Agrega tu contenido', body: 'Sube tus links, productos y eventos en minutos.',                  icon: I.layers },
  { n: '03', title: 'Comparte tu link',    body: 'Pon tu aminoweb.la/@tuusuario en tu bio y empieza a recibir clics.', icon: I.share },
];

const HowItWorks = () => (
  <section style={{ background: 'var(--aw-ink)', padding: '96px 28px' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
      <Pill color="var(--aw-violet)" bg="rgba(155,123,201,0.18)"><I.spark size={11} color="var(--aw-violet)"/> Así de simple</Pill>
      <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '16px 0 60px', lineHeight: 1.1 }}>
        Lista en menos de 2 minutos
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
        {STEPS.map((s, i) => (
          <div key={s.n} style={{
            background: 'rgba(255,255,255,0.05)', borderRadius: 20,
            padding: '32px 28px', textAlign: 'left', position: 'relative',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(155,123,201,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <s.icon size={18} color="var(--aw-violet)"/>
              </div>
              <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.04em', color: 'rgba(155,123,201,0.25)', lineHeight: 1 }}>{s.n}</span>
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '-0.01em' }}>{s.title}</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{s.body}</div>
            {i < STEPS.length - 1 && (
              <div style={{ position: 'absolute', top: '50%', right: -14, transform: 'translateY(-50%)', zIndex: 1, color: 'rgba(155,123,201,0.4)' }}>
                <I.arrow size={18} color="rgba(155,123,201,0.4)"/>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    q: '¡Me enamoré de mi página! Mis clientes me dicen que se ve súper profesional. La monté en un rato y quedó perfecta.',
    name: 'Valeria Torres', handle: '@valeriatorre.uy', role: 'Diseñadora gráfica',
    accent: 'var(--aw-violet-50)',
  },
  {
    q: 'Antes mandaba 5 links por WhatsApp. Ahora mando uno solo y mis ventas subieron. No lo puedo creer.',
    name: 'Marcos Rodríguez', handle: '@marcos.foto.cl', role: 'Fotógrafo',
    accent: 'var(--aw-coral-50)',
  },
  {
    q: 'Lo que más me gusta es que mis productos se ven lindos y mis seguidoras me preguntan cómo lo hice.',
    name: 'Ana Sofía Ruiz', handle: '@lastienda.ana', role: 'Emprendedora',
    accent: 'var(--aw-violet-50)',
  },
];

const Testimonials = () => (
  <section style={{ background: 'var(--aw-cream)', padding: '96px 28px' }}>
    <div style={{ maxWidth: 1060, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <Pill><I.spark size={11} color="var(--aw-violet)"/> Opiniones reales</Pill>
        <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--aw-ink)', margin: '14px 0 0', lineHeight: 1.1 }}>
          Lo que dicen nuestras creadoras
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
        {TESTIMONIALS.map(t => (
          <div key={t.name} style={{
            background: '#fff', borderRadius: 20, padding: '28px 26px',
            border: '1.5px solid var(--aw-line)',
            boxShadow: '0 2px 20px rgba(26,21,48,0.05)',
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <div style={{ display: 'flex', gap: 2 }}>{Array(5).fill(0).map((_, i) => <span key={i} style={{ color: '#F59E0B', fontSize: 15 }}>★</span>)}</div>
            <p style={{ fontSize: 14, color: 'var(--aw-ink-2)', lineHeight: 1.65, margin: 0, flex: 1 }}>"{t.q}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: 'var(--aw-violet)', flexShrink: 0 }}>
                {t.name[0]}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--aw-ink)', lineHeight: 1.2 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: 'var(--aw-ink-3)' }}>{t.role} · {t.handle}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── CTA final ────────────────────────────────────────────────────────────────
const FinalCTA = ({ onSignup }) => (
  <section style={{ padding: '80px 28px' }}>
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, #9B7BC9 0%, #7A5CA8 100%)',
        borderRadius: 28, padding: '64px 48px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(155,123,201,0.40)',
      }}>
        {/* bg orbs */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }}/>
        <div style={{ position: 'absolute', bottom: -60, left: -30, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}/>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 16 }}>
            Empieza hoy
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 14px', lineHeight: 1.1 }}>
            Tu página lista en 2 minutos.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', margin: '0 0 36px', lineHeight: 1.55 }}>
            Sin tarjeta. Sin código. Solo tú y tu audiencia.
          </p>
          <Btn onClick={onSignup} style={{ background: '#fff', color: 'var(--aw-violet)', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', fontSize: 16 }} size="lg">
            Crear mi página gratis <I.arrow size={16} color="var(--aw-violet)"/>
          </Btn>
        </div>
      </div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ borderTop: '1.5px solid var(--aw-line)', padding: '32px 28px' }}>
    <div style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
      <img src={`${import.meta.env.BASE_URL}aminoweb-logo.svg`} alt="aminoweb" style={{ height: 18, display: 'block', opacity: 0.6 }}/>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {['Privacidad', 'Términos', 'Contacto'].map(l => (
          <span key={l} style={{ fontSize: 13, color: 'var(--aw-ink-3)', cursor: 'pointer' }}>{l}</span>
        ))}
      </div>
      <span style={{ fontSize: 12, color: 'var(--aw-ink-3)' }}>© 2026 AminoWeb</span>
    </div>
  </footer>
);

// ─── Export ───────────────────────────────────────────────────────────────────
export function LandingPage() {
  const navigate = useNavigate();
  const compact = useIsNarrow();
  const goSignup = () => navigate('/onboarding');
  const goLogin  = () => navigate('/login');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--aw-cream)', fontFamily: "'Inter', -apple-system, system-ui, sans-serif", color: 'var(--aw-ink)' }}>
      <Navbar onSignup={goSignup} onLogin={goLogin}/>
      <Hero onSignup={goSignup} compact={compact}/>
      <SocialProof/>
      <Features compact={compact}/>
      <HowItWorks/>
      <Testimonials/>
      <FinalCTA onSignup={goSignup}/>
      <Footer/>
    </div>
  );
}
