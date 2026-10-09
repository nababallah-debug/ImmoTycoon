import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, Bell, Check, CheckCheck, ChevronLeft, Clock3, Coins, Download, Expand, FlaskConical, Hammer, HelpCircle, Leaf, LockKeyhole, MapPin, Pause, Play, Plus, Settings2, ShieldCheck, Sparkles, Trash2, Upload, Users, Volume2, Wallet, X, Zap } from 'lucide-react';
import { CATEGORIES, duration, economy, EVENTS, FEATURES, getDef, getLevel, money, number, plotLimit, repairCost, RESOURCE_NAMES, storageCapacity, stored, totalAssets, upgradeCost, type Building, type Resource } from '../game';
import type { Modal, ViewProps } from '../types';
import { BuildingArt } from './BuildingArt';
import { BuildCatalog, Progress } from './UI';

interface Props extends ViewProps {
  modal: Modal; close: () => void; onExport: () => void; onImport: (file: File) => Promise<void>;
  onSave: () => boolean; onFullscreen: () => void;
}

export function Dialogs(props: Props) {
  const { modal, close } = props;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timer = window.setTimeout(() => ref.current?.querySelector<HTMLButtonElement>('button')?.focus(), 70);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [close]);
  const trapFocus = (event: React.KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    const elements = ref.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), a[href], [tabindex="0"]');
    if (!elements?.length) return;
    const first = elements[0], last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  let title = '', subtitle = '', Icon = Sparkles;
  switch (modal.type) {
    case 'build': title = getDef(modal.id).name; subtitle = 'LES FONDATIONS DE VOTRE EMPIRE'; Icon = Hammer; break;
    case 'building': title = 'Un lieu, mille possibilit\u00e9s'; subtitle = 'LA VIE DE VOTRE B\u00c2TIMENT'; Icon = MapPin; break;
    case 'catalog': title = 'Quelle sera votre prochaine id\u00e9e ?'; subtitle = modal.plot === undefined ? 'LE CATALOGUE DE VOTRE VILLE' : `TERRAIN ${modal.plot + 1} \u00b7 PR\u00caT \u00c0 CONSTRUIRE`; Icon = Hammer; break;
    case 'settings': title = 'Un empire \u00e0 votre image'; subtitle = 'VOTRE PARTIE, VOS R\u00c8GLES'; Icon = Settings2; break;
    case 'help': title = 'Le guide du maire'; subtitle = 'LES GRANDES AMBITIONS COMMENCENT ICI'; Icon = HelpCircle; break;
    case 'notifications': title = 'La vie de votre empire'; subtitle = 'NE MANQUEZ AUCUN PETIT PAS'; Icon = Bell; break;
    case 'prestige': title = 'Le d\u00e9but d\u2019une nouvelle \u00e8re'; subtitle = 'B\u00c2TISSEZ UN H\u00c9RITAGE'; Icon = Sparkles; break;
    case 'event': title = EVENTS.find(e => e.id === props.state.event?.id)?.title ?? 'Le calme est revenu'; subtitle = 'UNE D\u00c9CISION QUI COMPTE'; Icon = Sparkles; break;
    case 'cityInfo': title = `${props.state.cityName}, en d\u00e9tail`; subtitle = 'LE POULS DE VOTRE VILLE'; Icon = Leaf; break;
    case 'confirm': title = modal.title; subtitle = 'PRENEZ LE TEMPS DE D\u00c9CIDER'; Icon = AlertTriangle; break;
  }
  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
    <motion.div ref={ref} className={`dialog dialog-${modal.type}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title" onKeyDown={trapFocus} initial={{ opacity: 0, y: 22, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ type: 'spring', stiffness: 350, damping: 30 }}>
      <div className="dialog-header"><div className="dialog-heading-icon"><Icon size={22} /></div><div><span className="small-label">{subtitle}</span><h2 id="dialog-title">{title}</h2></div><button className="dialog-close icon-button" onClick={close} aria-label="Fermer la fen&ecirc;tre"><X size={20} /></button></div>
      <div className="dialog-body">
        {modal.type === 'build' && <BuildDialog {...props} id={modal.id} plot={modal.plot} />}
        {modal.type === 'building' && <BuildingDialog {...props} building={props.state.buildings.find(b => b.uid === modal.uid)} />}
        {modal.type === 'catalog' && <BuildCatalog state={props.state} onBuild={id => props.open({ type: 'build', id, plot: modal.plot })} />}
        {modal.type === 'settings' && <SettingsDialog {...props} />}
        {modal.type === 'help' && <HelpDialog {...props} />}
        {modal.type === 'notifications' && <NotificationsDialog {...props} />}
        {modal.type === 'prestige' && <PrestigeDialog {...props} />}
        {modal.type === 'event' && <EventDialog {...props} />}
        {modal.type === 'cityInfo' && <CityInfoDialog {...props} />}
        {modal.type === 'confirm' && <><p className="confirm-description">{modal.description}</p><div className="dialog-actions"><button className="btn btn-secondary" onClick={close}>Garder comme &ccedil;a</button><button className="btn btn-danger" onClick={() => { props.act(modal.action); close(); }}>{modal.label ?? 'Confirmer'}<ArrowRight size={15} /></button></div></>}
      </div>
    </motion.div>
  </motion.div>;
}

function BuildDialog({ state, act, open, close, navigate, id, plot }: Props & { id: string; plot?: number }) {
  const d = getDef(id);
  const free = Array.from({ length: plotLimit(state) }, (_, i) => i).filter(i => !state.buildings.some(b => b.plot === i));
  const [selected, setSelected] = useState(plot ?? free[0] ?? 0);
  const materialsOK = Object.entries(d.materials).every(([r, q]) => state.resources[r as Resource] >= q!);
  const locked = getLevel(state) < d.unlock;
  const busy = state.buildings.filter(b => b.construction > 0).length >= 2 + state.employees.filter(e => e.role === 'builder').length;
  const canBuild = !locked && !busy && state.cash >= d.price && materialsOK && free.length > 0;
  return <>
    <div className="build-detail-intro"><div className="detail-illustration"><BuildingArt type={id} /></div><div><span className="detail-category">{CATEGORIES[d.category]} &middot; Niveau {d.unlock}</span><p>{d.description}</p></div></div>
    <div className="detail-stat-grid">{d.revenue > 0 && <div><Coins size={16} /><span>Revenus de base<strong className="positive">+{money(d.revenue)} / min</strong></span></div>}{d.population > 0 && <div><Users size={16} /><span>Nouveaux habitants<strong>+{d.population}</strong></span></div>}{d.happiness !== 0 && <div><Leaf size={16} /><span>Bonheur<strong>{d.happiness > 0 ? '+' : ''}{d.happiness} points</strong></span></div>}<div><Clock3 size={16} /><span>Construction<strong>{duration(d.duration / economy(state).constructionSpeed)}</strong></span></div><div><Zap size={16} /><span>{d.power ? 'Production d\u2019\u00e9nergie' : 'Consommation d\u2019\u00e9nergie'}<strong>{d.power ? `+${d.power}` : d.energy} unit&eacute;s</strong></span></div><div><Wallet size={16} /><span>Fonctionnement<strong>{money(d.upkeep)} / min</strong></span></div></div>
    <div className="materials-detail"><h3>Les mat&eacute;riaux du projet</h3>{Object.entries(d.materials).map(([r, q]) => <div key={r}><span>{RESOURCE_NAMES[r as Resource]}</span><strong className={state.resources[r as Resource] >= q! ? 'positive' : 'negative'}>{q} n&eacute;cessaires <small>/ {number(state.resources[r as Resource])} en stock</small></strong>{state.resources[r as Resource] >= q! ? <Check size={14} className="positive" /> : <AlertTriangle size={14} className="negative" />}</div>)}</div>
    <label className="field-label">L'emplacement de votre projet<select value={selected} onChange={e => setSelected(Number(e.target.value))} disabled={!free.length}>{free.map(p => <option key={p} value={p}>Terrain {p + 1} &middot; Disponible</option>)}{!free.length && <option>Aucun terrain disponible</option>}</select></label>
    {!materialsOK && <div className="inline-warning"><AlertTriangle size={16} /><span>Il vous manque quelques mat&eacute;riaux.</span><button className="text-button" onClick={() => { navigate('market'); close(); }}>Aller au march&eacute;<ArrowRight size={13} /></button></div>}
    {locked && <div className="inline-warning"><LockKeyhole size={16} />Ce projet se d&eacute;bloque au niveau {d.unlock}. Vous &ecirc;tes au niveau {getLevel(state)}.</div>}
    {busy && <div className="inline-warning"><Hammer size={16} />Toutes vos &eacute;quipes sont sur un chantier. Recrutez un constructeur ou patientez.</div>}
    {!free.length && <div className="inline-warning"><MapPin size={16} />D&eacute;bloquez de nouveaux terrains avec la recherche Nouveaux horizons.</div>}
    <div className="build-total"><span>Votre investissement<small>Capital disponible : {money(state.cash)}</small></span><strong>{money(d.price)}</strong></div>
    <div className="dialog-actions"><button className="btn btn-secondary" onClick={() => open({ type: 'catalog', plot })}><ChevronLeft size={14} />Le catalogue</button><button className="btn btn-primary" disabled={!canBuild} onClick={() => { act({ type: 'BUILD', id, plot: selected }); close(); }}><Plus size={16} />Lancer la construction<ArrowRight size={15} /></button></div>
  </>;
}

function BuildingDialog({ state, act, open, close, building: b }: Props & { building?: Building }) {
  if (!b) return <div className="empty-state"><MapPin size={28} /><h3>Ce terrain est disponible</h3><p>Le b&acirc;timent n'existe plus. Place &agrave; votre prochaine id&eacute;e.</p><button className="btn btn-primary" onClick={close}>Retour &agrave; ma ville</button></div>;
  const d = getDef(b.type);
  const cooldown = Math.max(0, 30 - (state.gameTime - (state.lastCollected[b.uid] ?? -60)));
  return <>
    <div className="build-detail-intro"><div className="detail-illustration"><BuildingArt type={b.type} /></div><div><span className="detail-category">Terrain {b.plot + 1} &middot; {CATEGORIES[d.category]}</span><h3>{d.name}</h3><p>Niveau {b.level} / 5 &middot; {b.construction > 0 ? 'En construction' : b.enabled ? 'En activit\u00e9' : 'Actuellement ferm\u00e9'}</p></div></div>
    {b.construction > 0 ? <div className="building-construction"><Hammer size={24} /><h3>Votre prochaine id&eacute;e prend forme.</h3><Progress value={(1 - b.construction / b.totalConstruction) * 100} /><p>Les portes ouvriront dans {duration(b.construction / economy(state).constructionSpeed)}.</p></div> : <><div className="detail-stat-grid"><div><Coins size={16} /><span>Revenus avant bonus<strong className="positive">{money(d.revenue * Math.pow(b.level, 1.35) * b.condition / 100)} / min</strong></span></div><div><Users size={16} /><span>Habitants accueillis<strong>{d.population * b.level}</strong></span></div><div><Zap size={16} /><span>{d.power > 0 ? '\u00c9nergie produite' : '\u00c9nergie utilis\u00e9e'}<strong>{(d.power || d.energy) * b.level} unit&eacute;s</strong></span></div><div><Wallet size={16} /><span>Frais avant bonus<strong>{money(d.upkeep * b.level)} / min</strong></span></div></div><div className="condition-detail"><div><span>&Eacute;tat du b&acirc;timent</span><strong>{Math.round(b.condition)} %</strong></div><Progress value={b.condition} /><p>L'usure est de 0,75 % par jour de jeu. Un b&acirc;timent entretenu rapporte davantage.</p><button className="btn btn-secondary btn-small" disabled={b.condition >= 100 || state.cash < repairCost(b)} onClick={() => act({ type: 'REPAIR', uid: b.uid })}><Hammer size={14} />{b.condition >= 100 ? 'En parfait \u00e9tat' : `R\u00e9nover \u00b7 ${money(repairCost(b))}`}</button></div><div className="building-action-list"><button className="btn btn-primary" disabled={b.level >= 5 || state.cash < upgradeCost(b)} onClick={() => act({ type: 'UPGRADE', uid: b.uid })}><Plus size={15} />{b.level >= 5 ? 'Niveau maximum atteint' : `Am\u00e9liorer au niveau ${b.level + 1}`}<span>{b.level >= 5 ? <Check size={15} /> : money(upgradeCost(b))}</span></button>{d.category === 'commerce' && <button className="btn btn-secondary" disabled={cooldown > 0 || !b.enabled} onClick={() => act({ type: 'COLLECT', uid: b.uid })}><Coins size={15} />{cooldown > 0 ? `Prochains pourboires dans ${duration(cooldown)}` : 'Encaisser les pourboires'}<span>{money(60 * b.level)}</span></button>}<button className="btn btn-secondary" onClick={() => act({ type: 'TOGGLE_BUILDING', uid: b.uid })}>{b.enabled ? <Pause size={15} /> : <Play size={15} />}{b.enabled ? 'Mettre l\u2019activit\u00e9 en pause' : 'Rouvrir les portes'}<span>{b.enabled ? 'Aucun frais, aucun revenu' : 'Reprendre la production'}</span></button></div></>}
    <button className="demolish-button" onClick={() => open({ type: 'confirm', title: 'Faire place \u00e0 une nouvelle id\u00e9e ?', description: `${d.name} sera d\u00e9moli. Le terrain sera lib\u00e9r\u00e9 et ${money(Math.round(d.price * b.level * 0.5))} vous seront rembours\u00e9s (50 % de la valeur).`, action: { type: 'DEMOLISH', uid: b.uid }, label: 'D\u00e9molir le b\u00e2timent' })}><Trash2 size={14} />Lib&eacute;rer ce terrain<span>+{money(d.price * b.level * 0.5)}</span></button>
  </>;
}

function Toggle({ checked, onChange, title, description }: { checked: boolean; onChange: (checked: boolean) => void; title: string; description: string }) {
  return <label className="setting-toggle"><div><h3>{title}</h3><p>{description}</p></div><input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} /><span className="switch-track"><span /></span></label>;
}

function SettingsDialog({ state, act, open, onExport, onImport, onSave, onFullscreen, close }: Props) {
  const [name, setName] = useState(state.cityName);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  return <>
    <form className="city-name-form" onSubmit={e => { e.preventDefault(); act({ type: 'RENAME', value: name }); setMessage('Votre ville a un nouveau nom.'); setError(false); }}><label className="field-label">Le nom de votre ville<div><input value={name} onChange={e => setName(e.target.value)} minLength={2} maxLength={26} required placeholder="Un nom qui vous ressemble" /><button className="btn btn-primary" type="submit">Renommer</button></div></label></form>
    <div className="settings-section"><h3 className="settings-section-title">Votre confort de jeu</h3><Toggle checked={state.settings.sound} onChange={sound => act({ type: 'SETTINGS', value: { sound } })} title="Une touche de son" description="De petits sons pour vos grandes d\u00e9cisions. D\u00e9sactiv\u00e9s par d\u00e9faut." />{state.settings.sound && <label className="volume-control"><Volume2 size={15} />Volume<input type="range" min="0" max="1" step="0.05" value={state.settings.volume} onChange={e => act({ type: 'SETTINGS', value: { volume: Number(e.target.value) } })} /></label>}<Toggle checked={state.settings.reduceMotion} onChange={reduceMotion => act({ type: 'SETTINGS', value: { reduceMotion } })} title="Prendre le temps" description="R\u00e9duit les animations de l\u2019interface." /><Toggle checked={state.settings.autoRepair} onChange={autoRepair => act({ type: 'SETTINGS', value: { autoRepair } })} title="Maintenance automatique" description="R\u00e9pare les b\u00e2timents sous 75 % d\u2019\u00e9tat si votre capital le permet." /><button className="text-button fullscreen-setting" onClick={onFullscreen}><Expand size={16} />Jouer en plein &eacute;cran<ArrowRight size={14} /></button></div>
    <div className="settings-section"><h3 className="settings-section-title">Gardez votre empire en lieu s&ucirc;r</h3><p className="save-explanation">Votre partie est sauvegard&eacute;e automatiquement dans ce navigateur toutes les 5 secondes. Exportez-la pour la conserver ou changer d'appareil.</p><div className="save-buttons"><button className="btn btn-secondary" onClick={() => { const saved = onSave(); setError(!saved); setMessage(saved ? 'Votre empire est sauvegard\u00e9.' : 'Le stockage est indisponible. Exportez votre partie.'); }}><ShieldCheck size={15} />Sauvegarder</button><button className="btn btn-secondary" onClick={onExport}><Download size={15} />Exporter</button><button className="btn btn-secondary" onClick={() => fileRef.current?.click()}><Upload size={15} />Importer</button></div><input ref={fileRef} className="visually-hidden" type="file" accept=".json,application/json" onChange={async e => { const file = e.target.files?.[0]; if (!file) return; try { await onImport(file); close(); } catch { setError(true); setMessage('Ce fichier n\u2019est pas une sauvegarde Empire valide. Votre partie actuelle est conserv\u00e9e.'); } e.target.value = ''; }} />{message && <p className={`settings-message ${error ? 'negative' : 'positive'}`} role="status">{message}</p>}</div>
    <button className="reset-button" onClick={() => open({ type: 'confirm', title: '\u00c9crire une nouvelle histoire ?', description: 'Votre ville, votre progression et votre prestige seront effac\u00e9s de ce navigateur. Exportez votre sauvegarde avant de recommencer.', action: { type: 'RESET' }, label: 'Commencer une nouvelle partie' })}><Trash2 size={15} />Recommencer une nouvelle partie</button>
  </>;
}

function HelpDialog({ close }: Props) {
  const [tab, setTab] = useState('start');
  return <><div className="page-tabs"><button className={tab === 'start' ? 'active' : ''} onClick={() => setTab('start')}>Vos premiers pas</button><button className={tab === 'features' ? 'active' : ''} onClick={() => setTab('features')}>{FEATURES.length} fonctionnalit&eacute;s</button></div>{tab === 'start' ? <><p className="help-intro">Vous &ecirc;tes le maire et l'entrepreneur de Bellevue. Transformez ce petit quartier en un empire prosp&egrave;re. Ici, chaque d&eacute;cision a un effet r&eacute;el.</p><div className="help-steps">{[
    ['01', 'B\u00e2tissez votre prochain chapitre', 'Ouvrez le catalogue, choisissez un b\u00e2timent et un terrain. Pr\u00e9voyez le capital et les mat\u00e9riaux n\u00e9cessaires.'],
    ['02', 'Laissez votre ville travailler', 'Les activit\u00e9s rapportent automatiquement. Les frais et salaires sont d\u00e9duits en temps r\u00e9el. 60 secondes simul\u00e9es repr\u00e9sentent un jour de jeu.'],
    ['03', 'Entourez-vous et innovez', 'Recrutez des sp\u00e9cialistes, formez-les et lancez des recherches. Leurs bonus se cumulent et changent votre croissance.'],
    ['04', 'Trouvez votre \u00e9quilibre', 'Surveillez le bonheur, l\u2019\u00e9nergie et l\u2019\u00e9tat des b\u00e2timents. Des imp\u00f4ts trop \u00e9lev\u00e9s et des pannes r\u00e9duisent votre rentabilit\u00e9.'],
    ['05', 'Voyez toujours plus grand', 'Honorez les contrats, r\u00e9cup\u00e9rez les r\u00e9compenses et investissez. \u00c0 250 000 euros de patrimoine, le prestige offre +15 % de revenus permanents par \u00e8re.'],
  ].map(([index, title, text]) => <div key={index}><span>{index}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div><div className="keyboard-guide"><h3>Les raccourcis du maire</h3><div><span><kbd>Espace</kbd> Pause / lecture</span><span><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> Vitesse</span><span><kbd>B</kbd> Construire</span><span><kbd>M</kbd> Missions</span><span><kbd>?</kbd> Ce guide</span><span><kbd>Esc</kbd> Fermer</span></div></div><p className="help-offline"><ShieldCheck size={15} />Votre ville continue de g&eacute;n&eacute;rer 65 % du b&eacute;n&eacute;fice net hors ligne, pendant 2 heures maximum. Une partie en pause ne produit pas de gains hors ligne.</p><button className="btn btn-primary help-start-button" onClick={close}>Mon empire m'attend<ArrowRight size={16} /></button></> : <><p className="help-intro">Un vrai jeu de gestion solo, sans compte et sans argent r&eacute;el. Toutes ces m&eacute;caniques sont int&eacute;gr&eacute;es &agrave; votre partie.</p><div className="features-list">{FEATURES.map((feature, i) => <div key={feature}><span>{String(i + 1).padStart(2, '0')}</span>{feature}</div>)}</div></>}</>;
}

function NotificationsDialog({ state, act }: Props) {
  return <><div className="notification-toolbar"><span>{state.notifications.length} nouvelles de votre ville</span><button className="text-button" onClick={() => act({ type: 'READ_NOTIFICATIONS' })}><CheckCheck size={14} />Tout marquer comme lu</button></div><div className="notifications-list">{state.notifications.map(n => <div className={`notification-row ${!n.read ? 'notification-unread' : ''}`} key={n.id}><span className={`notification-icon notification-${n.kind}`}>{n.kind === 'warning' ? <AlertTriangle size={17} /> : n.kind === 'info' ? <Bell size={17} /> : <Check size={17} />}</span><div><h3>{n.title}</h3><p>{n.message}</p><small>{state.gameTime - n.time < 60 ? '\u00c0 l\u2019instant' : `Il y a ${Math.floor((state.gameTime - n.time) / 60)} min de jeu`}</small></div>{!n.read && <span className="unread-dot" />}</div>)}</div></>;
}

function PrestigeDialog({ state, open }: Props) {
  const assets = totalAssets(state);
  return <><div className="prestige-illustration"><Sparkles size={42} /><span>PRESTIGE {state.prestige + 1}</span></div><p className="prestige-intro">Les plus grands empires savent se r&eacute;inventer. Recommencez avec l'exp&eacute;rience de votre r&eacute;ussite et un bonus qui ne vous quittera plus.</p><div className="prestige-benefits"><div><TrendingUpIcon /><span>Revenus permanents<strong>+{(state.prestige + 1) * 15} %</strong></span></div><div><Wallet size={22} /><span>Capital de d&eacute;part<strong>{money(24850 + 5000 * (state.prestige + 1))}</strong></span></div><div><ShieldCheck size={22} /><span>Conserv&eacute;s pour toujours<strong>Vos succ&egrave;s et vos r&eacute;glages</strong></span></div></div><div className="prestige-requirement"><div><span>Patrimoine net n&eacute;cessaire</span><strong>{money(assets)} / {money(250000)}</strong></div><Progress value={assets / 250000 * 100} /></div><p className="prestige-warning">Votre argent, vos b&acirc;timents, employ&eacute;s, recherches, contrats et missions seront r&eacute;initialis&eacute;s. Le bonus se cumule &agrave; chaque prestige.</p><button className="btn btn-primary prestige-button" disabled={assets < 250000} onClick={() => open({ type: 'confirm', title: 'Pr\u00eat pour votre prochaine \u00e8re ?', description: `Votre empire sera reconstruit \u00e0 partir du quartier initial. Vos succ\u00e8s seront conserv\u00e9s et vos revenus auront un bonus permanent de ${(state.prestige + 1) * 15} %.`, action: { type: 'PRESTIGE' }, label: 'Entrer dans une nouvelle \u00e8re' })}><Sparkles size={16} />{assets >= 250000 ? 'Une nouvelle \u00e8re commence' : 'Votre h\u00e9ritage se construit encore'}<ArrowRight size={15} /></button></>;
}

function TrendingUpIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m3 17 6-6 4 4 8-10M15 5h6v6" /></svg>; }

function EventDialog({ state, act, close }: Props) {
  const event = EVENTS.find(e => e.id === state.event?.id);
  if (!event) return <div className="empty-state"><Leaf size={28} /><h3>La ville profite du calme.</h3><p>Un nouvel &eacute;v&eacute;nement se pr&eacute;sentera bient&ocirc;t. Continuez &agrave; b&acirc;tir votre empire.</p></div>;
  return <><div className="event-description"><Sparkles size={31} /><p>{event.description}</p></div><div className="event-deadline"><Clock3 size={14} />Vous avez {duration(state.event!.remaining)} pour d&eacute;cider.</div><div className="event-options">{event.choices.map((choice, i) => <button key={choice.label} disabled={state.cash + choice.cash < 0} onClick={() => { act({ type: 'EVENT_CHOICE', index: i }); close(); }}><div><h3>{choice.label}</h3><p>{choice.description}</p></div><span>{choice.cash === 0 ? 'Sans frais' : choice.cash < 0 ? money(-choice.cash) : `+${money(choice.cash)}`}<ArrowRight size={16} /></span></button>)}</div></>;
}

function CityInfoDialog({ state }: Props) {
  const e = economy(state);
  return <><div className="city-info-intro"><Leaf size={30} /><div><h3>{Math.round(e.happiness)} % de bonheur</h3><p>{e.happiness >= 85 ? 'Vos habitants aiment leur quartier. Continuez sur cette belle lanc\u00e9e.' : e.happiness >= 60 ? 'Quelques espaces verts et des imp\u00f4ts mod\u00e9r\u00e9s pourraient faire la diff\u00e9rence.' : 'Vos habitants ont besoin de vous. Am\u00e9liorez l\u2019\u00e9nergie, les services et la fiscalit\u00e9.'}</p></div></div><div className="city-info-stats"><div><Users size={19} /><span>Habitants<strong>{number(e.population)}</strong></span></div><div><Hammer size={19} /><span>B&acirc;timents<strong>{state.buildings.length} / {plotLimit(state)}</strong></span></div><div><FlaskConical size={19} /><span>Technologies<strong>{state.research.length} / 12</strong></span></div><div><MapPin size={19} /><span>Emplois cr&eacute;&eacute;s<strong>{e.jobs}</strong></span></div></div><div className="city-info-meter"><h3>Une ville bien aliment&eacute;e</h3><div><span>Consommation / production</span><strong className={e.powerFactor < 1 ? 'negative' : 'positive'}>{Math.round(e.energyDemand)} / {Math.round(e.energyCapacity)} unit&eacute;s</strong></div><Progress value={e.energyDemand / e.energyCapacity * 100} className={e.powerFactor < 1 ? 'progress-warning' : ''} /><p>Au-del&agrave; de la capacit&eacute;, les revenus baissent et le bonheur diminue. Les centrales solaires et &eacute;oliennes augmentent votre production.</p></div><div className="city-info-meter"><h3>Vos ressources pour demain</h3><div><span>Capacit&eacute; de stockage</span><strong>{number(stored(state))} / {number(storageCapacity(state))}</strong></div><Progress value={stored(state) / storageCapacity(state) * 100} />{(['wood', 'stone', 'steel'] as Resource[]).map(r => <div className="resource-detail-row" key={r}><span>{RESOURCE_NAMES[r]}</span><strong>{number(state.resources[r])} unit&eacute;s</strong></div>)}</div><p className="city-info-note">Votre population inclut 24 habitants du centre historique. Les autres logements et les services ferm&eacute;s ne contribuent pas aux statistiques.</p></>;
}