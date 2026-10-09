import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { money, type HistoryPoint } from '../game';

interface Props { history: HistoryPoint[]; field: 'income' | 'cash' | 'net'; large?: boolean }

export function FinanceChart({ history, field, large }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const id = useId().replace(/:/g, '');
  const values = history.length ? history.map(h => h[field]) : [0];
  const lowest = Math.min(...values);
  const min = lowest < 0 ? lowest * 1.15 : lowest * 0.8;
  const max = Math.max(...values, 1) * 1.12;
  const width = 700;
  const height = large ? 230 : 132;
  const left = 4, right = 692, top = 12, bottom = height - 20;
  const point = (i: number) => ({ x: left + i / Math.max(1, values.length - 1) * (right - left), y: bottom - (values[i] - min) / Math.max(1, max - min) * (bottom - top) });
  const points = values.map((_, i) => point(i));
  const path = points.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const area = `${path} L${right},${bottom} L${left},${bottom} Z`;
  const selected = hover !== null && hover < points.length ? points[hover] : null;
  return <div className={`finance-chart ${large ? 'chart-large' : ''}`} onMouseLeave={() => setHover(null)}>
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label={`Historique ${field === 'cash' ? 'du capital' : 'des revenus'} : de ${money(values[0] ?? 0)} \u00e0 ${money(values[values.length - 1] ?? 0)}`}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#2d9473" stopOpacity=".17" /><stop offset="1" stopColor="#2d9473" stopOpacity=".015" /></linearGradient></defs>
      {[0, 1, 2].map(i => <line key={i} x1={left} x2={right} y1={top + i * (bottom - top) / 2} y2={top + i * (bottom - top) / 2} stroke="#e9ede7" strokeDasharray="3 5" />)}
      <path d={area} fill={`url(#${id})`} />
      <motion.path d={path} stroke="#368f6d" strokeWidth="2.5" fill="none" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: 'easeOut' }} />
      {points.map((p, i) => <rect key={i} x={p.x - (right - left) / Math.max(1, values.length - 1) / 2} y="0" width={(right - left) / Math.max(1, values.length - 1)} height={height} fill="transparent" onMouseEnter={() => setHover(i)} />)}
      {selected && <><line x1={selected.x} x2={selected.x} y1={top} y2={bottom} stroke="#83b89e" strokeDasharray="3 3" /><circle cx={selected.x} cy={selected.y} r="5" fill="#2d8b68" stroke="white" strokeWidth="3" vectorEffect="non-scaling-stroke" /></>}
    </svg>
    {hover !== null && selected && <div className="chart-tooltip" style={{ left: `${Math.max(13, Math.min(87, (selected.x / width) * 100))}%` }}><strong>{money(values[hover])}</strong><span>{field === 'cash' ? 'Capital disponible' : 'Par minute de jeu'}</span></div>}
    <div className="chart-axis">{[0, 1, 2, 3, 4].map(i => { const t = history[Math.round(i * Math.max(0, history.length - 1) / 4)]?.time ?? 0; return <span key={i}>{t < 0 ? `J. 11 \u00b7 ${Math.max(0, 60 + Math.round(t)).toString().padStart(2, '0')}` : `${Math.floor(t / 60).toString().padStart(2, '0')}:${Math.floor(t % 60).toString().padStart(2, '0')}`}</span>; })}</div>
  </div>;
}