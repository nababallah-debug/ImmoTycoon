import { useState } from 'react';
import { ArrowRight, Check, ChevronRight, Coins, LockKeyhole, Pause, Play, Plus, Search, Users } from 'lucide-react';
import { BUILDINGS, CATEGORIES, economy, getLevel, metric, MISSIONS, money, number, type Category, type GameState, type Goal } from '../game';
import type { ViewProps } from '../types';
import { BuildingArt } from './BuildingArt';

export function Progress({ value, className = '' }: { value: number; className?: string }) {
  return <div className={`progress-track ${className}`} role="progressbar" aria-valuenow={Math.round(Math.max(0, Math.min(100, value)))} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>;
}

export function SimulationControls({ state, act }: Pick<ViewProps, 'state' | 'act'>) {
  return <div className="simulation-controls">
    <button className={`simulation-toggle ${state.paused ? 'paused' : ''}`} onClick={() => act({ type: 'PAUSE' })} title="Pause / lecture (Espace)" aria-label={state.paused ? 'Reprendre la simulation' : 'Mettre en pause'}>{state.paused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}</button>
    <span>{state.paused ? 'En pause' : 'Simulation en cours'}</span>
    <div className="speed-control">{([1, 2, 3] as const).map(speed => <button key={speed} className={state.speed === speed ? 'active' : ''} aria-pressed={state.speed === speed} onClick={() => act({ type: 'SPEED', value: speed })} title={`Vitesse ${speed} (touche ${speed})`}>{speed}x</button>)}</div>
  </div>;
}

interface CatalogProps { state: GameState; onBuild: (id: string) => void; compact?: boolean; initialCategory?: Category | 'all' }
const searchText = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');

export function BuildCatalog({ state, onBuild, compact, initialCategory = 'all' }: CatalogProps) {
  const [category, setCategory] = useState<Category | 'all'>(initialCategory);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recommended');
  const [available, setAvailable] = useState(false);
  const level = getLevel(state);
  const list = BUILDINGS.filter(b => (category === 'all' || b.category === category) && searchText(b.name).includes(searchText(search)) && (!available || b.unlock <= level)).sort((a, b) => sort === 'price' ? a.price - b.price : sort === 'revenue' ? b.revenue - a.revenue : BUILDINGS.indexOf(a) - BUILDINGS.indexOf(b));
  return <div className={`build-catalog ${compact ? 'catalog-compact' : ''}`}>
    <div className="catalog-tabs" role="tablist" aria-label="Cat&eacute;gories de b&acirc;timents">{(['all', 'habitat', 'commerce', ...(compact ? [] : ['services', 'industrie'])] as (Category | 'all')[]).map(c => <button key={c} role="tab" aria-selected={category === c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c === 'all' ? 'Tous' : CATEGORIES[c]}</button>)}</div>
    {!compact && <div className="catalog-filter"><div className="search-input"><Search size={16} /><input aria-label="Rechercher un b&acirc;timent" placeholder="Quel sera votre prochain projet ?" value={search} onChange={e => setSearch(e.target.value)} /></div><select aria-label="Trier les b&acirc;timents" value={sort} onChange={e => setSort(e.target.value)}><option value="recommended">Recommand&eacute;s</option><option value="price">Prix croissant</option><option value="revenue">Revenus d&eacute;croissants</option></select><label className="checkbox-label"><input type="checkbox" checked={available} onChange={e => setAvailable(e.target.checked)} />D&eacute;bloqu&eacute;s</label></div>}
    <div className={compact ? 'catalog-rows' : 'catalog-grid'}>
      {list.slice(0, compact ? 4 : list.length).map(b => <div key={b.id} className={`catalog-item ${b.unlock > level ? 'catalog-locked' : ''}`}>
        <button className="catalog-item-info" onClick={() => onBuild(b.id)} aria-label={`Voir ${b.name}`}><div className="building-thumb"><BuildingArt type={b.id} /></div><div><h3>{b.name}</h3><p>{b.revenue > 0 ? <><span className="positive">+{money(b.revenue)}</span> / min</> : b.power > 0 ? <><span className="positive">+{b.power}</span> &eacute;nergie</> : b.id === 'lab' ? <><span className="positive">+35</span> recherche / min</> : b.id === 'warehouse' ? <><span className="positive">+500</span> stockage</> : <><span className="positive">+{b.happiness}</span> bonheur</>}{!compact && b.population > 0 && <span className="building-pop"><Users size={12} />+{b.population} habitants</span>}</p>{!compact && <span className="category-label">{CATEGORIES[b.category]}</span>}</div></button>
        <button className="build-price-button" onClick={() => onBuild(b.id)}>{b.unlock > level ? <><LockKeyhole size={12} />Niv. {b.unlock}</> : <>{money(b.price)}<Plus size={13} /></>}</button>
      </div>)}
      {list.length === 0 && <div className="empty-state"><Search size={26} /><h3>Aucun projet trouv&eacute;</h3><p>Essayez une autre recherche ou une autre cat&eacute;gorie.</p></div>}
    </div>
  </div>;
}

export function GoalRow({ goal, state, onClaim, compact }: { goal: Goal; state: GameState; onClaim: () => void; compact?: boolean }) {
  const value = metric(state, goal.metric);
  const claimed = state.missionsClaimed.includes(goal.id);
  const done = value >= goal.target;
  return <div className={`goal-row ${claimed ? 'goal-claimed' : ''}`}>
    <div className={`goal-symbol ${done ? 'is-done' : ''}`}>{done ? <Check size={17} /> : <span>{Math.min(99, Math.round(value / goal.target * 100))}%</span>}</div>
    <div className="goal-copy"><h3>{goal.name}</h3>{!compact && <p>{goal.description}</p>}<div className="goal-progress"><Progress value={value / goal.target * 100} /><span>{number(Math.min(value, goal.target))} / {number(goal.target)}</span></div></div>
    <div className="goal-reward">{claimed ? <span className="claimed-label"><Check size={13} />R&eacute;cup&eacute;r&eacute;</span> : done ? <button className="btn btn-primary btn-small" onClick={onClaim}>R&eacute;cup&eacute;rer</button> : <><span><Coins size={13} />{money(goal.reward)}</span>{!compact && <small>+{goal.xp} XP</small>}</>}</div>
  </div>;
}

export function CompactGoals({ state, act, navigate }: Pick<ViewProps, 'state' | 'act' | 'navigate'>) {
  const goals = MISSIONS.filter(m => !state.missionsClaimed.includes(m.id)).slice(0, 3);
  return <section className="panel objectives-panel"><div className="panel-heading"><div><h2>Un objectif &agrave; la fois</h2><p>De petites victoires, de grandes ambitions.</p></div><button className="text-button" onClick={() => navigate('missions')}>Tout voir <ArrowRight size={14} /></button></div><div className="compact-goals">{goals.map(goal => <GoalRow key={goal.id} goal={goal} state={state} compact onClaim={() => act({ type: 'CLAIM_MISSION', id: goal.id })} />)}{goals.length === 0 && <button className="mission-complete" onClick={() => navigate('achievements')}><Check size={20} />Tous vos objectifs sont accomplis ! <ChevronRight size={16} /></button>}</div></section>;
}

export function CityResourceBar({ state, onClick }: { state: GameState; onClick: () => void }) {
  const e = economy(state);
  return <button className="city-resource-bar" onClick={onClick}><span>Votre ville en chiffres</span><span><strong>{state.buildings.length}</strong> b&acirc;timents</span><span><strong>{number(e.population)}</strong> habitants</span><span><strong>{Math.round(e.energyDemand)} / {Math.round(e.energyCapacity)}</strong> &eacute;nergie</span><ChevronRight size={15} /></button>;
}