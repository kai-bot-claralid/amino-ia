// AminoWeb — sample content (Spanish/LATAM)
// All content is in-memory; persists nothing. The data shape is the
// proposed frontend data model for the MVP.

export const AW_DATA = {
  user: {
    handle: "carolina",
    email: "carolina@aminoweb.la",
    plan: "free",
  },
  profile: {
    name: "Carolina Méndez",
    bio: "Repostería artesanal en Medellín 🇨🇴 — pedidos para eventos y entregas a domicilio.",
    avatar: "AVATAR",        // placeholder
    cover: "COVER",          // placeholder
    location: "Medellín, Colombia",
  },
  modules: [
    // order matters; visible toggles via "active"
    { id: "links",    active: true, label: "Enlaces" },
    { id: "products", active: true, label: "Productos" },
    { id: "events",   active: true, label: "Eventos" },
    { id: "blog",     active: false, label: "Blog" },
  ],
  links: [
    { id: "l1", title: "WhatsApp Pedidos", url: "https://wa.me/57", icon: "💬", clicks: 248 },
    { id: "l2", title: "Instagram",        url: "https://instagram.com", icon: "📷", clicks: 1340 },
    { id: "l3", title: "Catálogo PDF",     url: "#", icon: "📄", clicks: 87 },
    { id: "l4", title: "Reseñas Google",   url: "#", icon: "⭐", clicks: 32 },
  ],
  products: [
    { id: "p1", title: "Torta de Chocolate", price: "COP 85.000", desc: "8 porciones, ganache de chocolate belga.", img: "P1" },
    { id: "p2", title: "Cupcakes (caja x12)", price: "COP 48.000", desc: "Surtido de seis sabores.", img: "P2" },
    { id: "p3", title: "Mesa de Postres",     price: "Cotizar",     desc: "Para eventos de 20 a 100 personas.", img: "P3" },
  ],
  events: [
    { id: "e1", title: "Taller de Repostería", date: "2026-05-18", time: "10:00", desc: "Aprende a hacer macarons en 3 horas.", link: "#" },
    { id: "e2", title: "Pop-up en La Floresta", date: "2026-06-02", time: "15:00", desc: "Ven a probar nuestra nueva línea de panadería.", link: "#" },
  ],
  blog: [
    { id: "b1", title: "5 tips para conservar tortas frescas", excerpt: "La temperatura correcta hace toda la diferencia…", date: "2026-04-12", img: "B1" },
    { id: "b2", title: "Detrás de cámaras: una boda de 200",  excerpt: "Cómo organizamos la mesa de postres más grande…", date: "2026-03-28", img: "B2" },
  ],
  design: {
    palette: "violet",   // violet | coral | mint | midnight | sand
    layout:  "hybrid",   // stack | hybrid | grid
    cornerStyle: "soft", // soft | sharp
  },
  stats: {
    visitsToday: 84,
    visitsDelta: "+12%",
    clicks: 21,
    clicksDelta: "+4",
  },
};


