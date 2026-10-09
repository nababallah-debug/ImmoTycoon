import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ArrowUpRight, Bell, Building2, ChartNoAxesCombined, Check, ChevronDown, ChevronRight, CloudCheck, CloudOff, Coins, Flag, FlaskConical, HelpCircle, LayoutDashboard, Leaf, Map, Medal, Menu, Plus, Settings, ShoppingBag, Sparkles, Sun, Trophy, UsersRound, Wallet, X } from 'lucide-react';
import { economy, gameReducer, getLevel, LEVELS, loadGame, metric, MISSIONS, money, number, SAVE_KEY, validSave, type Action, type Notification, type Page } from './game';
import type { Modal, ViewProps } from './types';
import { Dialogs } from './components/Dialogs';
import { AchievementsPage, BuildingsPage, CityPage, EmployeesPage, FinancesPage, MarketPage, MissionsPage, Overview, RankingPage, ResearchPage } from './components/Pages';
import { Progress } from './components/UI';

const NAV = [
  { id: 'overview', label: 'Vue d\u2019ensemble', icon: LayoutDashboard },
  { id: 'city', label: 'Votre ville', icon: Map },
  { id: 'buildings', label: 'B\u00e2timents', icon: Building2 },
  { id: 'employees', label: 'Personnel', icon: UsersRound },
  { id: 'research', label: 'Recherche', icon: FlaskConical },
  { id: 'finances', label: 'Finances', icon: ChartNoAxesCombined },
  { id: 'market', label: 'March\u00e9', icon: ShoppingBag },
  { id: 'missions', label: 'Missions', icon: Flag },
  { id: 'achievements', label: 'Succ\u00e8s', icon: Trophy },
  { id: 'ranking', label: 'Classement', icon: Medal },
] as const;

const PAGE_INFO: Record<Page, { title: string; subtitle: string }> = {
  overview: { title: 'Un petit quartier. Un grand empire.', subtitle: 'Chaque d\u00e9cision compte. \u00c0 vous de b\u00e2tir la suite.' },
  city: { title: 'Une ville qui vous ressemble.', subtitle: 'Prenez de la hauteur. Votre prochaine grande id\u00e9e se trouve juste ici.' },
  buildings: { title: 'Les fondations de vos ambitions.', subtitle: 'Du premier caf\u00e9 \u00e0 la m\u00e9tropole. Chaque b\u00e2timent ouvre un nouvel horizon.' },
  employees: { title: 'La r\u00e9ussite se construit ensemble.', subtitle: 'Les bonnes personnes transforment les grandes id\u00e9es en r\u00e9alit\u00e9.' },
  research: { title: 'Vos id\u00e9es font la diff\u00e9rence.', subtitle: 'Investissez dans demain. Une innovation peut tout changer.' },
  finances: { title: 'Gardez une longueur d\u2019avance.', subtitle: 'Comprendre votre \u00e9conomie, c\u2019est donner de l\u2019avenir \u00e0 votre empire.' },
  market: { title: 'Le bon choix, au bon moment.', subtitle: 'Les ressources d\u2019aujourd\u2019hui construisent les r\u00e9ussites de demain.' },
  missions: { title: 'Chaque objectif ouvre un horizon.', subtitle: 'Une mission, une rencontre, une d\u00e9cision. Votre histoire avance.' },
  achievements: { title: 'Vos victoires racontent votre histoire.', subtitle: 'Les petites r\u00e9ussites font les grands empires. C\u00e9l\u00e9brez les v\u00f4tres.' },
  ranking: { title: 'Votre place parmi les grands.', subtitle: 'Inspirez-vous des autres villes et tracez votre propre chemin.' },
};

function BrandMark() {
  return <svg viewBox="0 0 38 38" fill="none" aria-hidden="true"><path d="M4 17L12 12L20 17L12 22Z" fill="#8ecbaa" /><path d="M4 17V28L12 33V22Z" fill="#579a75" /><path d="M12 22L20 17V28L12 33Z" fill="#73b58e" /><path d="M18 7L26 2L34 7L26 12Z" fill="#b9ddbe" /><path d="M18 7V28L26 33V12Z" fill="#83bd94" /><path d="M26 12L34 7V28L26 33Z" fill="#a4d0a7" /></svg>;
}

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, undefined, loadGame);
  const [page, setPage] = useState<Page>('overview');
  const [modal, setModal] = useState<Modal | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<Notification | null>(null);
  const [saveOK, setSaveOK] = useState(true);
  const stateRef = useRef(state);
  const lastNotification = useRef(state.notifications[0]?.id);
  const audioRef = useRef<AudioContext | null>(null);
  stateRef.current = state;
  const e = economy(state);
  const level = getLevel(state);
  const currentXP = LEVELS[level - 1] ?? 0;
  const nextXP = LEVELS[level] ?? currentXP + 10000;
  const unread = state.notifications.filter(n => !n.read).length;
  const rewards = MISSIONS.filter(m => !state.missionsClaimed.includes(m.id) && metric(state, m.metric) >= m.target).length;
  const dailyAvailable = state.lastDailyBonus !== new Date().toISOString().slice(0, 10);
  const modalVisible = modal !== null;

  const act = useCallback((action: Action) => {
    dispatch(action);
    if (!stateRef.current.settings.sound || ['TICK', 'SPEED', 'SETTINGS', 'READ_NOTIFICATIONS', 'TAX'].includes(action.type)) return;
    try {
      if (!audioRef.current) audioRef.current = new AudioContext();
      const audio = audioRef.current;
      if (audio.state === 'suspended') void audio.resume();
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(520, audio.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(780, audio.currentTime + 0.08);
      gain.gain.setValueAtTime(0.07 * stateRef.current.settings.volume, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.18);
      oscillator.connect(gain); gain.connect(audio.destination);
      oscillator.start(); oscillator.stop(audio.currentTime + 0.2);
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    } catch { /* Audio is optional; browser restrictions must not interrupt play. */ }
  }, []);

  const open = useCallback((value: Modal) => { setModal(value); setSidebarOpen(false); }, []);
  const close = useCallback(() => setModal(null), []);
  const navigate = useCallback((value: Page) => { setPage(value); setSidebarOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  const save = useCallback(() => {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify({ ...stateRef.current, savedAt: Date.now() })); setSaveOK(true); return true; }
    catch { setSaveOK(false); return false; }
  }, []);

  useEffect(() => {
    let previous = performance.now();
    const timer = window.setInterval(() => { const now = performance.now(); dispatch({ type: 'TICK', dt: (now - previous) / 1000 }); previous = now; }, 1000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    save();
    const timer = window.setInterval(save, 5000);
    const onHide = () => { if (document.visibilityState === 'hidden') save(); };
    window.addEventListener('beforeunload', save);
    document.addEventListener('visibilitychange', onHide);
    return () => { window.clearInterval(timer); window.removeEventListener('beforeunload', save); document.removeEventListener('visibilitychange', onHide); save(); };
  }, [save]);
  useEffect(() => {
    const latest = state.notifications[0];
    if (latest && latest.id !== lastNotification.current) { lastNotification.current = latest.id; setToast(latest); }
  }, [state.notifications]);
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(null), 5500); return () => window.clearTimeout(timer); }, [toast]);
  useEffect(() => {
    if (!modalVisible) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [modalVisible]);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (modal || event.repeat || event.ctrlKey || event.metaKey || (event.target as HTMLElement).closest('input, textarea, select, [contenteditable]')) return;
      if (event.code === 'Space') { event.preventDefault(); act({ type: 'PAUSE' }); }
      if (['1', '2', '3'].includes(event.key)) act({ type: 'SPEED', value: Number(event.key) as 1 | 2 | 3 });
      if (event.key.toLowerCase() === 'b') open({ type: 'catalog' });
      if (event.key.toLowerCase() === 'm') navigate('missions');
      if (event.key === '?') open({ type: 'help' });
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [act, modal, navigate, open]);

  const exportGame = () => {
    const blob = new Blob([JSON.stringify({ ...stateRef.current, savedAt: Date.now() }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `empire-${state.cityName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${new Date().toISOString().slice(0, 10)}.json`;
    link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const importGame = async (file: File) => {
    if (file.size > 2000000) throw new Error('File too large');
    const value: unknown = JSON.parse(await file.text());
    if (!validSave(value)) throw new Error('Invalid save');
    act({ type: 'IMPORT', state: { ...value, savedAt: Date.now() } });
  };
  const fullscreen = async () => {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); }
    catch { setToast({ id: 'fullscreen-error', title: 'Le plein \u00e9cran est indisponible', message: 'Votre navigateur ne permet pas le plein \u00e9cran dans cette fen\u00eatre. Le jeu reste enti\u00e8rement jouable.', time: state.gameTime, kind: 'info', read: false }); }
  };

  const viewProps: ViewProps = { state, act, open, navigate };
  const PageComponent = { overview: Overview, city: CityPage, buildings: BuildingsPage, employees: EmployeesPage, research: ResearchPage, finances: FinancesPage, market: MarketPage, missions: MissionsPage, achievements: AchievementsPage, ranking: RankingPage }[page];
  const info = PAGE_INFO[page];
  const navLabel = NAV.find(n => n.id === page)?.label;

  return <MotionConfig reducedMotion={state.settings.reduceMotion ? 'always' : 'user'}><div className="app-shell">
    <AnimatePresence>{sidebarOpen && <motion.button className="sidebar-scrim" aria-label="Fermer le menu" onClick={() => setSidebarOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}</AnimatePresence>
    <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="brand" onClick={() => navigate('overview')} aria-label="empire, accueil"><BrandMark /><span>empire<span className="brand-period">.</span></span></button><div className="brand-tagline">LE CITY TYCOON</div>
      <div className="sidebar-main"><div className="nav-group-label">VOTRE EMPIRE</div><nav aria-label="Navigation principale">{NAV.map((item, index) => <div key={item.id}>{index === 5 && <div className="nav-group-label nav-second-group">L'ART DE GRANDIR</div>}{index === 8 && <div className="nav-separator" />}<button className={`nav-item ${page === item.id ? 'nav-current' : ''}`} onClick={() => navigate(item.id)} aria-current={page === item.id ? 'page' : undefined}>{page === item.id && <motion.span className="nav-active-bg" layoutId="nav-active" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}<item.icon size={18} /><span>{item.label}</span>{item.id === 'missions' && (rewards + (dailyAvailable ? 1 : 0) + (state.event ? 1 : 0)) > 0 && <span className="nav-badge">{rewards + (dailyAvailable ? 1 : 0) + (state.event ? 1 : 0)}</span>}{item.id === 'research' && state.activeResearch && <span className="nav-research-dot" />}</button></div>)}</nav></div>
      <div className="sidebar-bottom"><button className="sidebar-settings" onClick={() => open({ type: 'settings' })}><Settings size={17} />Param&egrave;tres<ChevronRight size={14} /></button><button className="sidebar-help" onClick={() => open({ type: 'help' })}><div><span className="sidebar-help-icon"><Sparkles size={18} /></span><strong>Un coup de pouce ?</strong></div><p>Les grands empires s'apprennent.</p><span>Ouvrir le guide<ArrowUpRight size={14} /></span></button><button className="player-profile" onClick={() => open({ type: 'prestige' })}><span className="player-avatar">VO</span><div><strong>Votre empire</strong><span>Niveau {level} &middot; {level < 5 ? 'Entrepreneur' : level < 8 ? 'Visionnaire' : 'Magnat'}</span><Progress value={(state.xp - currentXP) / (nextXP - currentXP) * 100} /></div><ChevronRight size={14} /></button></div>
    </aside>

    <div className="main-shell">
      <header className={`topbar ${page !== 'overview' ? 'topbar-has-capital' : ''}`}>
        <div className="topbar-breadcrumb"><button className="mobile-menu icon-button" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Ouvrir le menu"><Menu size={21} /></button><span className="breadcrumb-home">Votre empire</span><ChevronRight size={12} /><span>{navLabel}</span></div>
        <div className="topbar-tools">
          <span className="game-date"><Sun size={17} /><span>Jour {12 + Math.floor(state.gameTime / 60)}<span className="date-season"> &middot; {['Printemps', '\u00c9t\u00e9', 'Automne', 'Hiver'][Math.floor(state.gameTime / 1800) % 4]}</span></span></span>
          {page !== 'overview' && <button className="topbar-capital" onClick={() => navigate('finances')} title="Votre capital disponible"><Wallet size={14} />{money(state.cash)}</button>}
          <span className="topbar-divider" />
          <button className={`save-status ${!saveOK ? 'save-error' : ''}`} onClick={save} title={saveOK ? 'Sauvegarde automatique, cliquer pour sauvegarder' : 'Stockage indisponible : exportez votre sauvegarde'}>{saveOK ? <CloudCheck size={17} /> : <CloudOff size={17} />}<span>{saveOK ? 'Sauvegarde auto' : 'Non sauvegard\u00e9'}</span></button>
          {state.event && <button className="event-topbar-button icon-button" onClick={() => open({ type: 'event' })} aria-label="Un &eacute;v&eacute;nement attend votre d&eacute;cision" title="Un &eacute;v&eacute;nement vous attend"><Sparkles size={18} /></button>}
          <button className="notification-button icon-button" onClick={() => open({ type: 'notifications' })} aria-label={`Notifications, ${unread} non lues`}><Bell size={19} />{unread > 0 && <span className="notification-dot" />}</button>
          <button className="topbar-profile" onClick={() => open({ type: 'settings' })} aria-label="Votre profil et vos param&egrave;tres"><span>VO</span><ChevronDown size={13} /></button>
        </div>
      </header>

      <main className="main-content" id="main-content"><div className="page-heading"><div><div className="page-eyebrow">{page === 'overview' ? 'VOTRE TABLEAU DE BORD' : navLabel?.toLocaleUpperCase('fr')}</div><h1>{info.title}</h1><p>{info.subtitle}</p></div><div className="page-heading-actions"><button className="btn btn-secondary guide-button" onClick={() => open({ type: 'help' })}><HelpCircle size={15} />Comment jouer</button><button className="btn btn-primary" onClick={() => open({ type: 'catalog' })}><Plus size={17} />Construire</button></div></div>

        {page === 'overview' && <div className="stats-grid"><button className="stat-item" onClick={() => navigate('finances')}><div className="stat-top"><span>CAPITAL DISPONIBLE</span><span className="stat-icon stat-icon-green"><Wallet size={17} /></span></div><div className="stat-value">{money(state.cash)}</div><div className="stat-foot"><span className="stat-trend"><ArrowUpRight size={13} />{e.net >= 0 ? '+' : ''}{money(e.net)} / min</span><span>Votre prochaine id&eacute;e</span></div></button><button className="stat-item" onClick={() => navigate('finances')}><div className="stat-top"><span>REVENUS PAR MINUTE</span><span className="stat-icon stat-icon-peach"><Coins size={17} /></span></div><div className="stat-value">{money(e.income)}<span>/ min</span></div><div className="stat-foot"><span className="stat-trend"><TrendingIcon />+{Math.max(0, (e.income / Math.max(1, state.history[0]?.income ?? e.income) - 1) * 100).toFixed(1)} %</span><span>sur la p&eacute;riode</span></div></button><button className="stat-item" onClick={() => open({ type: 'cityInfo' })}><div className="stat-top"><span>POPULATION</span><span className="stat-icon stat-icon-blue"><UsersRound size={17} /></span></div><div className="stat-value">{number(e.population)}<span>habitants</span></div><div className="stat-foot"><span className="population-dot" />Un quartier qui prend vie</div></button><button className="stat-item satisfaction-stat" onClick={() => open({ type: 'cityInfo' })}><div className="stat-top"><span>BONHEUR DES HABITANTS</span><span className="stat-icon stat-icon-purple"><Leaf size={17} /></span></div><div className="stat-value">{Math.round(e.happiness)}<span className="percent-symbol">%</span><span className="happiness-word">{e.happiness >= 85 ? '\u00c9panouis' : e.happiness >= 60 ? 'Satisfaits' : '\u00c0 votre \u00e9coute'}</span></div><Progress value={e.happiness} /></button></div>}

        <AnimatePresence mode="wait"><motion.div key={page} className="page-view" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.18 }}><PageComponent {...viewProps} /></motion.div></AnimatePresence>
        <footer className="main-footer"><span><Leaf size={13} />Les grands empires commencent par de petites d&eacute;cisions.</span><span>Fait pour voir grand <span className="footer-dot" /> v1.0</span></footer>
      </main>
    </div>
    <AnimatePresence mode="wait">{modal && <Dialogs key={`${modal.type}${'id' in modal ? modal.id : 'uid' in modal ? modal.uid : ''}`} {...viewProps} modal={modal} close={close} onExport={exportGame} onImport={importGame} onSave={save} onFullscreen={fullscreen} />}</AnimatePresence>
    <AnimatePresence>{toast && <motion.div key={toast.id} className={`toast toast-${toast.kind}`} role="status" aria-live="polite" initial={{ opacity: 0, y: 20, x: 12 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ type: 'spring', stiffness: 350, damping: 30 }}><span className="toast-icon">{toast.kind === 'success' ? <Check size={20} /> : toast.kind === 'warning' ? <Wallet size={20} /> : <Bell size={19} />}</span><div><h3>{toast.title}</h3><p>{toast.message}</p></div><button className="icon-button" aria-label="Fermer la notification" onClick={() => setToast(null)}><X size={15} /></button><motion.span className="toast-timer" initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 5.5, ease: 'linear' }} /></motion.div>}</AnimatePresence>
  </div></MotionConfig>;
}

function TrendingIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 17 6-6 4 4 8-10M15 5h6v6" /></svg>; }
