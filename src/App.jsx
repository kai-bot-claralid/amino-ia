import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AW_DATA } from './data.jsx';
import { OnboardingScreen, LoginScreen } from './onboarding.jsx';
import { TabBar, HomeScreen } from './dashboard-home.jsx';
import { ModulesScreen, ProfileScreen, LinksScreen, ProductsScreen, EventsScreen, BlogScreen, DesignScreen, PublishScreen, AccountScreen } from './dashboard-screens.jsx';
import { PublicPage } from './public-page.jsx';
import { DesktopApp } from './desktop-app.jsx';
import { LandingPage } from './landing.jsx';
import './styles.css';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false));
  React.useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  return matches;
}

// Main Dashboard shell
function Dashboard({ data, setData }) {
  const [tab, setTab] = useState("home");
  const [screen, setScreen] = useState(null); // specific module screen inside tab
  const navigate = useNavigate();

  const goTo = (s) => setScreen(s);
  const goBack = () => setScreen(null);

  // Render current tab/screen
  let content = null;
  const openPreview = () => navigate('/' + data.user.handle, { state: { fromDashboard: true } });

  if (tab === "home") {
    if (screen === "profile") content = <ProfileScreen data={data} setData={setData} goBack={goBack} />;
    else if (screen === "links" || screen === "links:add") content = <LinksScreen data={data} setData={setData} goBack={goBack} openForm={screen === "links:add"} />;
    else if (screen === "products" || screen === "products:add") content = <ProductsScreen data={data} setData={setData} goBack={goBack} openForm={screen === "products:add"} />;
    else if (screen === "events" || screen === "events:add") content = <EventsScreen data={data} setData={setData} goBack={goBack} openForm={screen === "events:add"} />;
    else content = <HomeScreen data={data} setData={setData} goTo={goTo} openPreview={openPreview} />;
  } else if (tab === "modules") {
    if (screen === "profile") content = <ProfileScreen data={data} setData={setData} goBack={goBack} />;
    else if (screen === "links" || screen === "links:add") content = <LinksScreen data={data} setData={setData} goBack={goBack} openForm={screen === "links:add"} />;
    else if (screen === "products" || screen === "products:add") content = <ProductsScreen data={data} setData={setData} goBack={goBack} openForm={screen === "products:add"} />;
    else if (screen === "events" || screen === "events:add") content = <EventsScreen data={data} setData={setData} goBack={goBack} openForm={screen === "events:add"} />;
    else if (screen === "blog") content = <BlogScreen data={data} setData={setData} goBack={goBack} />;
    else content = <ModulesScreen data={data} setData={setData} goTo={goTo} />;
  } else if (tab === "publish") {
    content = <PublishScreen data={data} openPreview={openPreview} />;
  } else if (tab === "design") {
    content = <DesignScreen data={data} setData={setData} />;
  } else if (tab === "me") {
    content = <AccountScreen data={data} onLogout={() => navigate('/')} />;
  }

  // Wraps in a mobile-like container, or full screen. The user requested to organize screens correctly.
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', height: '100vh', position: 'relative', background: '#FAF6EE', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
      {content}
      <TabBar active={tab} onChange={(t) => { setTab(t); setScreen(null); }} />
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(AW_DATA);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/onboarding" element={
          <div style={{ height: '100vh', overflow: 'hidden' }}>
            <OnboardingScreen onDone={() => window.location.href = import.meta.env.BASE_URL + 'dashboard'} />
          </div>
        } />

        <Route path="/login" element={
          <div style={{ height: '100vh', overflow: 'hidden' }}>
            <LoginScreen onLogin={() => window.location.href = import.meta.env.BASE_URL + 'dashboard'} />
          </div>
        } />
        
        <Route path="/dashboard/*" element={
          isDesktop ? (
            <DesktopApp data={data} setData={setData}/>
          ) : (
            <Dashboard data={data} setData={setData} />
          )
        } />
        
        <Route path="/:handle" element={<PublicPage data={data} />} />
      </Routes>
    </Router>
  );
}
