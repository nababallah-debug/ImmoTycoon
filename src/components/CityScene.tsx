import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, Expand, Grid2X2, Hammer, Leaf, MapPin, Minus, Plus, RotateCcw, Sun, Zap } from 'lucide-react';
import { BuildingArt } from './BuildingArt';
import { economy, getDef, plotLimit, type Building, type GameState } from '../game';
import cityImage from '../../public/images/empire-city.png?inline';

const PLOTS = [
  [30, 66], [54, 82], [28, 28], [21, 45], [74, 64], [48, 19], [50, 47],
  [14, 68], [85, 77], [78, 19], [13, 28], [32, 89], [93, 46], [69, 92], [8, 49], [48, 5],
  [7, 78], [93, 70], [85, 10], [7, 20], [23, 95], [97, 36], [78, 96], [3, 39],
];

interface Props {
  state: GameState; onSelect: (building: Building) => void; onConstruct: (plot?: number) => void;
  expanded?: boolean; onExpand?: () => void;
}

export function CityScene({ state, onSelect, onConstruct, expanded, onExpand }: Props) {
  const [zoom, setZoom] = useState(1);
  const [grid, setGrid] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const e = economy(state);
  return <div className={`city-scene ${expanded ? 'is-expanded' : ''}`}>
    <div className="scene-weather"><Sun size={16} /><span>22&deg;C <span className="weather-divider">/</span> Une belle journ&eacute;e</span></div>
    <button className="scene-expand icon-button" onClick={onExpand} aria-label={expanded ? 'Revenir au tableau de bord' : 'Agrandir la carte'} title="Agrandir la carte"><Expand size={16} /></button>
    <motion.div className="city-world" animate={{ scale: zoom }} transition={{ type: 'spring', stiffness: 150, damping: 25 }}>
      <motion.img className="city-image" src={cityImage} alt="Ville miniature isom&eacute;trique : maisons, commerces, bureaux et parc verdoyant" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} draggable={false} />
      {grid && <div className="map-grid" />}
      {state.buildings.map(b => {
        const p = PLOTS[b.plot];
        if (!p) return null;
        const def = getDef(b.type);
        const building = b.plot >= 7;
        return <div key={b.uid} className={`map-building ${building ? 'new-building' : ''} ${b.enabled ? '' : 'building-closed'}`} style={{ left: `${p[0]}%`, top: `${p[1]}%` }}>
          {building && <motion.div className="new-building-art" initial={{ opacity: 0, y: -14, scale: 0.6 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 18 }}><BuildingArt type={b.type} /></motion.div>}
          <button className={`map-pin ${b.construction > 0 ? 'pin-construction' : ''} ${b.type === 'park' ? 'pin-park' : ''}`} aria-label={`${def.name}, niveau ${b.level}${b.construction > 0 ? ', en construction' : ''}`} onClick={() => onSelect(b)} onMouseEnter={() => setHovered(b.uid)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(b.uid)} onBlur={() => setHovered(null)}>
            {b.construction > 0 ? <Hammer size={12} /> : b.level > 1 ? <span className="pin-level">{b.level}</span> : b.type === 'park' ? <Leaf size={11} /> : b.plot === 5 ? <Building2 size={11} /> : <MapPin size={11} />}
            {b.construction > 0 && <svg className="pin-progress" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" pathLength="100" strokeDasharray={`${(1 - b.construction / b.totalConstruction) * 100} 100`} /></svg>}
          </button>
          <AnimatePresence>{hovered === b.uid && <motion.div className="map-tooltip" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 3 }}><strong>{def.name}</strong><span>{b.construction > 0 ? 'Chantier en cours' : `Niveau ${b.level} \u00b7 ${Math.round(b.condition)} % d\u2019\u00e9tat`}</span></motion.div>}</AnimatePresence>
        </div>;
      })}
      {grid && PLOTS.slice(0, plotLimit(state)).map((p, i) => !state.buildings.some(b => b.plot === i) && <button key={i} className="empty-plot" style={{ left: `${p[0]}%`, top: `${p[1]}%` }} onClick={() => onConstruct(i)} aria-label={`Construire sur le terrain ${i + 1}`}><Plus size={16} /><span>Terrain {i + 1}</span></button>)}
    </motion.div>
    <div className="scene-caption"><span className="live-dot" />{state.paused ? 'La ville prend une pause' : 'Une ville pleine de vie'}</div>
    {e.powerFactor < 1 && <div className="power-warning"><Zap size={13} />Capacit&eacute; &eacute;nerg&eacute;tique insuffisante</div>}
    <div className="map-controls">
      <button onClick={() => setZoom(z => Math.max(0.8, Math.round((z - 0.15) * 100) / 100))} disabled={zoom <= 0.8} aria-label="D&eacute;zoomer" title="D&eacute;zoomer"><Minus size={16} /></button>
      <span>{Math.round(zoom * 100)} %</span>
      <button onClick={() => setZoom(z => Math.min(1.6, Math.round((z + 0.15) * 100) / 100))} disabled={zoom >= 1.6} aria-label="Zoomer" title="Zoomer"><Plus size={16} /></button>
      <div className="control-divider" />
      <button onClick={() => setZoom(1)} aria-label="R&eacute;initialiser le zoom" title="R&eacute;initialiser"><RotateCcw size={14} /></button>
      <button className={grid ? 'selected' : ''} onClick={() => setGrid(!grid)} aria-pressed={grid} aria-label="Afficher les terrains" title="Afficher les terrains"><Grid2X2 size={15} /></button>
    </div>
  </div>;
}