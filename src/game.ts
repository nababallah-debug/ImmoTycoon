export type Resource = 'wood' | 'stone' | 'steel';
export type Category = 'habitat' | 'commerce' | 'services' | 'industrie';
export type Role = 'manager' | 'builder' | 'researcher' | 'marketer' | 'technician';
export type Stock = 'terra' | 'solis' | 'nova';
export type Page = 'overview' | 'city' | 'buildings' | 'employees' | 'research' | 'finances' | 'market' | 'missions' | 'achievements' | 'ranking';

export interface BuildingDef {
  id: string; name: string; category: Category; description: string; price: number;
  revenue: number; upkeep: number; population: number; jobs: number; energy: number;
  power: number; happiness: number; duration: number; unlock: number;
  materials: Partial<Record<Resource, number>>;
}

export const BUILDINGS: BuildingDef[] = [
  { id: 'house', name: 'Maison de ville', category: 'habitat', description: 'Un petit chez-soi pour les grandes ambitions. Accueille 24 habitants et rapporte des loyers.', price: 3200, revenue: 65, upkeep: 8, population: 24, jobs: 0, energy: 2, power: 0, happiness: 0, duration: 12, unlock: 1, materials: { wood: 12, stone: 8 } },
  { id: 'cafe', name: 'Caf\u00e9 de quartier', category: 'commerce', description: 'Le rendez-vous pr\u00e9f\u00e9r\u00e9 du quartier. Un commerce accessible et des pourboires \u00e0 encaisser.', price: 2400, revenue: 120, upkeep: 22, population: 0, jobs: 2, energy: 3, power: 0, happiness: 0, duration: 10, unlock: 1, materials: { wood: 10, stone: 5 } },
  { id: 'park', name: 'Parc municipal', category: 'services', description: 'Une respiration au milieu de la ville. Am\u00e9liore le bonheur de tous vos habitants de 5 points.', price: 2800, revenue: 0, upkeep: 12, population: 0, jobs: 1, energy: 0, power: 0, happiness: 5, duration: 10, unlock: 1, materials: { wood: 15, stone: 8 } },
  { id: 'apartment', name: 'R\u00e9sidence', category: 'habitat', description: 'Des logements confortables pour 70 nouveaux habitants. La cl\u00e9 d\u2019une ville qui grandit.', price: 7800, revenue: 150, upkeep: 18, population: 70, jobs: 0, energy: 5, power: 0, happiness: 0, duration: 20, unlock: 2, materials: { wood: 25, stone: 30 } },
  { id: 'shop', name: 'Sup\u00e9rette', category: 'commerce', description: 'Tous les essentiels, juste au coin de la rue. Un investissement commercial fiable.', price: 5500, revenue: 240, upkeep: 42, population: 0, jobs: 4, energy: 4, power: 0, happiness: 0, duration: 16, unlock: 2, materials: { wood: 15, stone: 15 } },
  { id: 'bakery', name: 'Boulangerie', category: 'commerce', description: 'Du pain frais et une activit\u00e9 rentable. Compl\u00e8te parfaitement vos commerces de proximit\u00e9.', price: 3900, revenue: 180, upkeep: 35, population: 0, jobs: 3, energy: 4, power: 0, happiness: 0, duration: 14, unlock: 2, materials: { wood: 10, stone: 15 } },
  { id: 'warehouse', name: 'Entrep\u00f4t', category: 'industrie', description: 'Ajoute 500 unit\u00e9s \u00e0 votre stockage de mat\u00e9riaux. Anticipez vos prochaines constructions.', price: 6000, revenue: 0, upkeep: 20, population: 0, jobs: 2, energy: 2, power: 0, happiness: 0, duration: 18, unlock: 2, materials: { wood: 20, stone: 20 } },
  { id: 'office', name: 'Bureaux', category: 'commerce', description: 'Accueille les entrepreneurs de demain. Des revenus importants et de nouveaux emplois.', price: 12500, revenue: 470, upkeep: 95, population: 0, jobs: 6, energy: 6, power: 0, happiness: 0, duration: 25, unlock: 3, materials: { stone: 30, steel: 12 } },
  { id: 'solar', name: 'Centrale solaire', category: 'industrie', description: 'Produit 35 unit\u00e9s d\u2019\u00e9nergie propre. \u00c9vitez les pannes et alimentez votre croissance.', price: 9500, revenue: 0, upkeep: 15, population: 0, jobs: 2, energy: 0, power: 35, happiness: 1, duration: 20, unlock: 3, materials: { stone: 15, steel: 15 } },
  { id: 'factory', name: 'Atelier de production', category: 'industrie', description: 'Produit chaque minute 12 bois, 8 pierres et 3 aciers, en plus de ses revenus.', price: 16000, revenue: 330, upkeep: 65, population: 0, jobs: 8, energy: 10, power: 0, happiness: -3, duration: 30, unlock: 4, materials: { stone: 35, steel: 20 } },
  { id: 'lab', name: 'Laboratoire', category: 'services', description: 'G\u00e9n\u00e8re 35 points de recherche suppl\u00e9mentaires par minute pour inventer votre avenir.', price: 18500, revenue: 0, upkeep: 70, population: 0, jobs: 5, energy: 8, power: 0, happiness: 0, duration: 30, unlock: 4, materials: { stone: 30, steel: 20 } },
  { id: 'hospital', name: 'Centre de sant\u00e9', category: 'services', description: 'Une ville en bonne sant\u00e9 est une ville heureuse. Ajoute 8 points de satisfaction.', price: 21000, revenue: 100, upkeep: 100, population: 0, jobs: 6, energy: 8, power: 0, happiness: 8, duration: 35, unlock: 4, materials: { stone: 40, steel: 15 } },
  { id: 'hotel', name: 'H\u00f4tel Bellevue', category: 'commerce', description: 'Faites de votre ville une destination. Un investissement premium aux revenus exceptionnels.', price: 26000, revenue: 810, upkeep: 150, population: 0, jobs: 10, energy: 10, power: 0, happiness: 2, duration: 40, unlock: 5, materials: { wood: 30, stone: 45, steel: 20 } },
  { id: 'wind', name: 'Parc \u00e9olien', category: 'industrie', description: '60 unit\u00e9s d\u2019\u00e9nergie renouvelable pour accompagner une m\u00e9tropole ambitieuse.', price: 22000, revenue: 0, upkeep: 30, population: 0, jobs: 3, energy: 0, power: 60, happiness: 1, duration: 35, unlock: 5, materials: { stone: 25, steel: 30 } },
  { id: 'stadium', name: 'Complexe sportif', category: 'services', description: 'Rassemblez les habitants. Ajoute 8 points de bonheur et d\u00e9veloppe les loisirs.', price: 42000, revenue: 600, upkeep: 140, population: 0, jobs: 12, energy: 12, power: 0, happiness: 8, duration: 50, unlock: 6, materials: { stone: 70, steel: 35 } },
];

export const CATEGORIES: Record<Category, string> = { habitat: 'Habitat', commerce: 'Commerce', services: 'Services', industrie: 'Industrie' };
export const RESOURCE_NAMES: Record<Resource, string> = { wood: 'Bois', stone: 'Pierre', steel: 'Acier' };
export const ROLE_NAMES: Record<Role, string> = { manager: 'Responsable', builder: 'Constructeur', researcher: 'Chercheur', marketer: 'Communicant', technician: 'Technicien' };
export const ROLE_EFFECTS: Record<Role, string> = { manager: '+12 % de revenus par niveau', builder: '+25 % de vitesse de construction', researcher: '+20 % de vitesse de recherche', marketer: '+10 % aux effets des campagnes', technician: '-10 % de frais de maintenance' };

export interface TechDef { id: string; name: string; description: string; cost: number; points: number; duration: number; requires?: string; branch: string }
export const TECHS: TechDef[] = [
  { id: 'accounting', name: 'Gestion intelligente', description: '-8 % sur les frais de fonctionnement.', cost: 2500, points: 40, duration: 25, branch: '\u00c9conomie' },
  { id: 'concrete', name: 'Construction modulaire', description: 'Vos constructions sont 25 % plus rapides.', cost: 3000, points: 50, duration: 30, branch: 'Construction' },
  { id: 'commerce', name: 'Commerce de proximit\u00e9', description: '+15 % de revenus pour tous vos commerces.', cost: 4000, points: 60, duration: 35, branch: '\u00c9conomie' },
  { id: 'green', name: 'Ville v\u00e9g\u00e9tale', description: '+6 points de bonheur permanents.', cost: 3500, points: 50, duration: 30, branch: 'Environnement' },
  { id: 'solartech', name: '\u00c9nergie optimis\u00e9e', description: '+25 % de production \u00e9nerg\u00e9tique.', cost: 5000, points: 80, duration: 45, requires: 'green', branch: 'Environnement' },
  { id: 'materials', name: 'Production circulaire', description: '+30 % de production de mat\u00e9riaux.', cost: 6000, points: 90, duration: 45, requires: 'concrete', branch: 'Construction' },
  { id: 'training', name: 'Formation continue', description: 'Les bonus de votre personnel augmentent de 30 %.', cost: 5500, points: 75, duration: 40, requires: 'accounting', branch: '\u00c9conomie' },
  { id: 'zoning', name: 'Nouveaux horizons', description: 'D\u00e9bloque 8 terrains suppl\u00e9mentaires.', cost: 8000, points: 100, duration: 50, requires: 'concrete', branch: 'Construction' },
  { id: 'logistics', name: 'Logistique avanc\u00e9e', description: '+500 unit\u00e9s de stockage permanent.', cost: 7000, points: 100, duration: 45, requires: 'materials', branch: 'Construction' },
  { id: 'automation', name: 'Automatisation', description: '+25 % sur tous les revenus de votre ville.', cost: 12000, points: 160, duration: 60, requires: 'commerce', branch: '\u00c9conomie' },
  { id: 'investment', name: 'Investissement durable', description: '+20 % de revenus et -5 % de frais.', cost: 18000, points: 220, duration: 75, requires: 'automation', branch: '\u00c9conomie' },
  { id: 'smartcity', name: 'Ville connect\u00e9e', description: '+10 de bonheur et +20 % de revenus.', cost: 24000, points: 280, duration: 90, requires: 'solartech', branch: 'Environnement' },
];

export interface Candidate { id: string; name: string; role: Role; salary: number; hireCost: number; color: string }
export const CANDIDATES: Candidate[] = [
  { id: 'amelie', name: 'Am\u00e9lie Martin', role: 'manager', salary: 45, hireCost: 1800, color: 'peach' },
  { id: 'lucas', name: 'Lucas Bernard', role: 'builder', salary: 35, hireCost: 1200, color: 'blue' },
  { id: 'ines', name: 'In\u00e8s Dubois', role: 'researcher', salary: 50, hireCost: 2000, color: 'purple' },
  { id: 'sacha', name: 'Sacha Petit', role: 'marketer', salary: 40, hireCost: 1500, color: 'green' },
  { id: 'lea', name: 'L\u00e9a Moreau', role: 'technician', salary: 38, hireCost: 1400, color: 'yellow' },
  { id: 'adam', name: 'Adam Laurent', role: 'manager', salary: 48, hireCost: 2100, color: 'blue' },
  { id: 'emma', name: 'Emma Roux', role: 'builder', salary: 37, hireCost: 1300, color: 'peach' },
  { id: 'nathan', name: 'Nathan Simon', role: 'researcher', salary: 55, hireCost: 2300, color: 'green' },
  { id: 'jade', name: 'Jade Lefebvre', role: 'marketer', salary: 42, hireCost: 1650, color: 'purple' },
  { id: 'malo', name: 'Malo Garcia', role: 'technician', salary: 40, hireCost: 1550, color: 'yellow' },
];

export const CAMPAIGNS = [
  { id: 'local', name: 'L\u2019esprit du quartier', description: 'Une campagne locale pour attirer vos voisins.', price: 1200, duration: 90, boost: 0.2, happiness: 0 },
  { id: 'digital', name: 'Votre ville, partout', description: 'Faites rayonner votre ville sur les r\u00e9seaux.', price: 3600, duration: 180, boost: 0.4, happiness: 2 },
  { id: 'festival', name: 'Le grand festival', description: 'Un rendez-vous inoubliable pour tous.', price: 6000, duration: 240, boost: 0.6, happiness: 5 },
];

export interface ContractDef { id: string; name: string; client: string; description: string; materials: Partial<Record<Resource, number>>; buildings?: Record<string, number>; reward: number; xp: number; duration: number; unlock: number }
export const CONTRACTS: ContractDef[] = [
  { id: 'district', name: 'Un quartier prometteur', client: 'Mairie de Bellevue', description: 'Livrez des mat\u00e9riaux pour r\u00e9nover la place du quartier.', materials: { wood: 25, stone: 20 }, reward: 2600, xp: 120, duration: 180, unlock: 1 },
  { id: 'greenpower', name: 'Un avenir plus vert', client: 'Association Terra', description: 'Poss\u00e9dez une centrale solaire et fournissez les mat\u00e9riaux demand\u00e9s.', materials: { wood: 35, steel: 10 }, buildings: { solar: 1 }, reward: 6500, xp: 250, duration: 300, unlock: 3 },
  { id: 'artisan', name: 'Le go\u00fbt de r\u00e9ussir', client: 'Collectif des artisans', description: 'Ouvrez une boulangerie et soutenez les artisans du quartier.', materials: { wood: 30, stone: 25 }, buildings: { bakery: 1 }, reward: 4500, xp: 180, duration: 240, unlock: 2 },
  { id: 'industry', name: 'Fabriqu\u00e9 chez nous', client: 'Groupe Horizon', description: 'Poss\u00e9dez un atelier et livrez une commande d\u2019acier.', materials: { steel: 30, stone: 40 }, buildings: { factory: 1 }, reward: 12000, xp: 450, duration: 360, unlock: 4 },
  { id: 'tourism', name: 'Bienvenue \u00e0 Bellevue', client: 'Office de tourisme', description: 'Construisez un h\u00f4tel pour accueillir un congr\u00e8s r\u00e9gional.', materials: { wood: 50, steel: 20 }, buildings: { hotel: 1 }, reward: 18000, xp: 650, duration: 480, unlock: 5 },
];

interface EventChoice { label: string; description: string; cash: number; happiness?: number; revenue?: number; duration?: number; wood?: number; research?: number; condition?: number; xp?: number }
export const EVENTS: { id: string; title: string; description: string; choices: EventChoice[] }[] = [
  { id: 'festival', title: 'Et si on faisait la f\u00eate ?', description: 'Les habitants aimeraient organiser une f\u00eate de quartier. Votre soutien pourrait donner un bel \u00e9lan \u00e0 la ville.', choices: [
    { label: 'Financer la f\u00eate', description: '+10 bonheur, +20 % de revenus pendant 90 s.', cash: -1200, happiness: 10, revenue: 0.2, duration: 90, xp: 80 },
    { label: 'Pr\u00eater la place publique', description: '+3 bonheur pendant 60 s. Aucun frais.', cash: 0, happiness: 3, duration: 60, xp: 30 },
  ] },
  { id: 'investor', title: 'Une offre sur votre bureau', description: 'Un investisseur propose de soutenir votre croissance. Son projet commercial ne fait cependant pas l\u2019unanimit\u00e9.', choices: [
    { label: 'Accepter l\u2019investissement', description: '+5 000 euros, -5 bonheur pendant 120 s.', cash: 5000, happiness: -5, duration: 120, xp: 100 },
    { label: 'Privil\u00e9gier l\u2019ind\u00e9pendance', description: '+30 points de recherche et 60 XP.', cash: 0, research: 30, xp: 60 },
  ] },
  { id: 'delivery', title: 'Une livraison inattendue', description: 'Une scierie voisine vous propose un lot de bois \u00e0 prix r\u00e9duit. L\u2019occasion de pr\u00e9parer vos prochains projets.', choices: [
    { label: 'Acheter le lot', description: '100 bois pour seulement 1 000 euros.', cash: -1000, wood: 100, xp: 40 },
    { label: 'Passer votre tour', description: 'Gardez votre capital pour un autre projet.', cash: 0, xp: 15 },
  ] },
  { id: 'storm', title: 'Un orage se pr\u00e9pare', description: 'La m\u00e9t\u00e9o annonce des vents forts. Vos \u00e9quipes vous conseillent de s\u00e9curiser les b\u00e2timents.', choices: [
    { label: 'Prot\u00e9ger le quartier', description: '1 800 euros. Restaure 10 % de l\u2019\u00e9tat des b\u00e2timents.', cash: -1800, condition: 10, xp: 100 },
    { label: 'Prendre le risque', description: 'Aucun frais, mais -15 % d\u2019\u00e9tat sur les b\u00e2timents.', cash: 0, condition: -15, xp: 25 },
  ] },
  { id: 'startup', title: 'Les id\u00e9es ont de l\u2019avenir', description: 'De jeunes chercheurs souhaitent tester leur prototype dans votre ville.', choices: [
    { label: 'Soutenir leur projet', description: '1 500 euros contre 70 points de recherche.', cash: -1500, research: 70, xp: 120 },
    { label: 'Leur ouvrir votre r\u00e9seau', description: 'Un partenariat vous rapporte 600 euros.', cash: 600, research: 10, xp: 40 },
  ] },
];

export interface Building { uid: string; type: string; level: number; condition: number; construction: number; totalConstruction: number; enabled: boolean; plot: number }
export interface Employee { id: string; name: string; role: Role; level: number; salary: number; color: string }
export interface Notification { id: string; title: string; message: string; time: number; kind: 'success' | 'info' | 'warning'; read: boolean }
export interface HistoryPoint { time: number; cash: number; income: number; expenses: number; net: number }
export interface GameState {
  version: 1; cityName: string; cash: number; lifetimeEarned: number; xp: number;
  buildings: Building[]; employees: Employee[]; resources: Record<Resource, number>;
  researchPoints: number; research: string[];
  activeResearch: { id: string; remaining: number; total: number } | null;
  gameTime: number; speed: 1 | 2 | 3; paused: boolean; taxRate: number; salaryRate: number;
  marketing: { id: string; remaining: number; total: number } | null;
  loans: { id: string; original: number; balance: number; daysLeft: number; rate: number }[];
  stocks: Record<Stock, number>; prices: Record<Resource | Stock, number>;
  event: { id: string; remaining: number } | null; nextEventAt: number;
  boost: { happiness: number; revenue: number; until: number };
  activeContract: { id: string; deadline: number } | null; completedContracts: string[];
  stats: { built: number; upgraded: number; demolished: number; hired: number; trained: number; researched: number; trades: number; contracts: number; events: number; collected: number };
  missionsClaimed: string[]; achievementsUnlocked: string[]; achievementsClaimed: string[];
  lastDailyBonus: string; dailyStreak: number; lastCollected: Record<string, number>;
  history: HistoryPoint[]; notifications: Notification[];
  settings: { sound: boolean; volume: number; autoRepair: boolean; reduceMotion: boolean };
  prestige: number; savedAt: number;
}

export const LEVELS = [0, 100, 350, 750, 1400, 2300, 3600, 5200, 7600, 10600, 15000, 22000, 32000];
export const getLevel = (s: GameState) => Math.min(LEVELS.length, LEVELS.filter(x => s.xp >= x).length);
export const getDef = (id: string) => BUILDINGS.find(b => b.id === id)!;
export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
export const money = (value: number, decimals = 0) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(value);
export const number = (value: number) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value);
export const duration = (seconds: number) => seconds >= 60 ? `${Math.floor(seconds / 60)} min ${Math.ceil(seconds % 60).toString().padStart(2, '0')} s` : `${Math.ceil(Math.max(0, seconds))} s`;
export const plotLimit = (s: GameState) => 16 + (s.research.includes('zoning') ? 8 : 0);
export const readyBuildings = (s: GameState) => s.buildings.filter(b => b.construction <= 0 && b.enabled);
export const storageCapacity = (s: GameState) => 600 + readyBuildings(s).filter(b => b.type === 'warehouse').reduce((n, b) => n + 500 * b.level, 0) + (s.research.includes('logistics') ? 500 : 0);
export const stored = (s: GameState) => Object.values(s.resources).reduce((a, b) => a + b, 0);
export const totalAssets = (s: GameState) => s.cash + s.buildings.reduce((n, b) => n + getDef(b.type).price * b.level * 0.65, 0) + Object.entries(s.stocks).reduce((n, [key, shares]) => n + shares * s.prices[key as Stock], 0) - s.loans.reduce((n, l) => n + l.balance, 0);

export function economy(s: GameState) {
  const active = readyBuildings(s);
  const has = (id: string) => s.research.includes(id);
  const staffMultiplier = has('training') ? 1.3 : 1;
  const role = (r: Role) => s.employees.filter(e => e.role === r).reduce((n, e) => n + e.level, 0) * staffMultiplier;
  const energyDemand = active.reduce((n, b) => n + getDef(b.type).energy * b.level, 0);
  const energyCapacity = (45 + active.reduce((n, b) => n + getDef(b.type).power * b.level, 0)) * (has('solartech') ? 1.25 : 1);
  const powerFactor = Math.min(1, energyCapacity / Math.max(1, energyDemand));
  const avgCondition = active.length ? active.reduce((n, b) => n + b.condition, 0) / active.length : 100;
  const campaign = CAMPAIGNS.find(c => c.id === s.marketing?.id);
  const happiness = Math.max(10, Math.min(100, 87 + active.reduce((n, b) => n + getDef(b.type).happiness * Math.sqrt(b.level), 0) - Math.max(0, s.taxRate - 12) * 1.35 + Math.max(0, 12 - s.taxRate) * 0.5 + (has('green') ? 6 : 0) + (has('smartcity') ? 10 : 0) + (powerFactor < 1 ? -15 * (1 - powerFactor) : 0) - (100 - avgCondition) * 0.12 + (s.boost.until > s.gameTime ? s.boost.happiness : 0) + (campaign?.happiness ?? 0) + (s.salaryRate - 1) * 15));
  const population = 24 + active.reduce((n, b) => n + getDef(b.type).population * b.level, 0);
  const incomeMultiplier = (0.75 + happiness / 400) * powerFactor * (1 + role('manager') * 0.12) * (has('automation') ? 1.25 : 1) * (has('investment') ? 1.2 : 1) * (has('smartcity') ? 1.2 : 1) * (1 + s.prestige * 0.15) * (1 + (campaign?.boost ?? 0) * (1 + role('marketer') * 0.1)) * (1 + (s.boost.until > s.gameTime ? s.boost.revenue : 0));
  const buildingIncome: Record<string, number> = Object.fromEntries(active.map(b => {
    const def = getDef(b.type);
    const taxFactor = def.category === 'habitat' ? s.taxRate / 12 : 0.8 + s.taxRate / 60;
    return [b.uid, def.revenue * Math.pow(b.level, 1.35) * (b.condition / 100) * taxFactor * (def.category === 'commerce' && has('commerce') ? 1.15 : 1) * incomeMultiplier];
  }));
  const income = Object.values(buildingIncome).reduce((n, value) => n + value, 0);
  const upkeepMultiplier = (has('accounting') ? 0.92 : 1) * (has('investment') ? 0.95 : 1) * Math.max(0.4, 1 - role('technician') * 0.1);
  const upkeep = active.reduce((n, b) => n + getDef(b.type).upkeep * b.level, 0) * upkeepMultiplier;
  const salaries = s.employees.reduce((n, e) => n + e.salary * s.salaryRate, 0);
  const researchRate = (10 + active.filter(b => b.type === 'lab').reduce((n, b) => n + 35 * b.level, 0)) * (1 + role('researcher') * 0.2);
  const constructionSpeed = (1 + role('builder') * 0.25) * (has('concrete') ? 1.25 : 1);
  const researchSpeed = 1 + role('researcher') * 0.2;
  const production = active.filter(b => b.type === 'factory').reduce((n, b) => n + b.level, 0) * (has('materials') ? 1.3 : 1) * powerFactor;
  return { income, buildingIncome, upkeep, salaries, expenses: upkeep + salaries, net: income - upkeep - salaries, population, happiness, energyDemand, energyCapacity, powerFactor, avgCondition, researchRate, constructionSpeed, researchSpeed, production, jobs: active.reduce((n, b) => n + getDef(b.type).jobs * b.level, 0) };
}

export function newGame(prestige = 0): GameState {
  const initial = ['house', 'house', 'apartment', 'cafe', 'shop', 'office', 'park'];
  return {
    version: 1, cityName: 'Bellevue', cash: 24850, lifetimeEarned: 32000, xp: 450,
    buildings: initial.map((type, plot) => ({ uid: `initial-${plot}`, type, level: 1, condition: 100, construction: 0, totalConstruction: 0, enabled: true, plot })),
    employees: [{ id: 'melanie', name: 'M\u00e9lanie Robert', role: 'manager', level: 1, salary: 45, color: 'peach' }, { id: 'noe', name: 'No\u00e9 Mercier', role: 'builder', level: 1, salary: 35, color: 'blue' }],
    resources: { wood: 180, stone: 120, steel: 40 }, researchPoints: 160, research: [], activeResearch: null,
    gameTime: 0, speed: 1, paused: false, taxRate: 12, salaryRate: 1, marketing: null, loans: [],
    stocks: { terra: 0, solis: 0, nova: 0 }, prices: { wood: 15, stone: 24, steel: 60, terra: 80, solis: 120, nova: 210 },
    event: null, nextEventAt: 150, boost: { happiness: 0, revenue: 0, until: 0 }, activeContract: null, completedContracts: [],
    stats: { built: 0, upgraded: 0, demolished: 0, hired: 0, trained: 0, researched: 0, trades: 0, contracts: 0, events: 0, collected: 0 },
    missionsClaimed: [], achievementsUnlocked: [], achievementsClaimed: [], lastDailyBonus: '', dailyStreak: 0, lastCollected: {},
    history: Array.from({ length: 12 }, (_, i) => ({ time: (i - 11) * 5, cash: 22000 + i * 259, income: 880 + i * 31 + Math.sin(i * 0.8) * 35, expenses: 250 + i * 3, net: 630 + i * 28 + Math.sin(i * 0.8) * 35 })),
    notifications: [{ id: 'welcome', title: 'Bienvenue \u00e0 Bellevue', message: 'Votre ville est pr\u00eate. Construisez votre prochain chapitre !', time: 0, kind: 'info', read: false }],
    settings: { sound: false, volume: 0.3, autoRepair: false, reduceMotion: false }, prestige, savedAt: Date.now(),
  };
}

type Metric = 'buildings' | 'population' | 'employees' | 'research' | 'cash' | 'contracts' | 'upgraded' | 'power' | 'trained' | 'trades' | 'events' | 'prestige' | 'happiness' | 'level' | 'collected';
export interface Goal { id: string; name: string; description: string; metric: Metric; target: number; reward: number; xp: number }
export const MISSIONS: Goal[] = [
  { id: 'neighborhood', name: 'Un quartier qui grandit', description: 'Poss\u00e9dez 10 b\u00e2timents termin\u00e9s dans votre ville.', metric: 'buildings', target: 10, reward: 2500, xp: 150 },
  { id: 'team', name: 'L\u2019union fait la force', description: 'R\u00e9unissez une \u00e9quipe de 3 collaborateurs.', metric: 'employees', target: 3, reward: 1500, xp: 100 },
  { id: 'ideas', name: 'Une longueur d\u2019avance', description: 'Terminez votre premi\u00e8re recherche.', metric: 'research', target: 1, reward: 2000, xp: 150 },
  { id: 'people', name: 'Bienvenue chez vous', description: 'Accueillez 200 habitants \u00e0 Bellevue.', metric: 'population', target: 200, reward: 3000, xp: 200 },
  { id: 'capital', name: 'Voir plus grand', description: 'Atteignez 40 000 euros de tr\u00e9sorerie.', metric: 'cash', target: 40000, reward: 4000, xp: 250 },
  { id: 'deal', name: 'Promesse tenue', description: 'Honorez un premier contrat.', metric: 'contracts', target: 1, reward: 2000, xp: 180 },
  { id: 'quality', name: 'Toujours mieux', description: 'Am\u00e9liorez des b\u00e2timents 3 fois.', metric: 'upgraded', target: 3, reward: 3500, xp: 220 },
  { id: 'power', name: 'Une \u00e9nergie nouvelle', description: 'Atteignez 80 unit\u00e9s de capacit\u00e9 \u00e9nerg\u00e9tique.', metric: 'power', target: 80, reward: 3000, xp: 180 },
  { id: 'master', name: 'Un empire durable', description: 'Atteignez le niveau 8.', metric: 'level', target: 8, reward: 10000, xp: 500 },
];
export const ACHIEVEMENTS: Goal[] = [
  { id: 'first', name: 'La premi\u00e8re pierre', description: 'Poss\u00e9der 8 b\u00e2timents.', metric: 'buildings', target: 8, reward: 500, xp: 50 },
  { id: 'architect', name: 'L\u2019architecte', description: 'Poss\u00e9der 15 b\u00e2timents.', metric: 'buildings', target: 15, reward: 2500, xp: 200 },
  { id: 'community', name: 'Une vraie communaut\u00e9', description: 'Accueillir 300 habitants.', metric: 'population', target: 300, reward: 2000, xp: 150 },
  { id: 'metropolis', name: 'La m\u00e9tropole', description: 'Accueillir 1 000 habitants.', metric: 'population', target: 1000, reward: 6000, xp: 500 },
  { id: 'dreamteam', name: 'La dream team', description: 'Employer 5 collaborateurs.', metric: 'employees', target: 5, reward: 1500, xp: 100 },
  { id: 'mentor', name: 'Le mentor', description: 'Former un collaborateur.', metric: 'trained', target: 1, reward: 800, xp: 75 },
  { id: 'inventor', name: 'L\u2019inventeur', description: 'Terminer 3 recherches.', metric: 'research', target: 3, reward: 2000, xp: 200 },
  { id: 'visionary', name: 'Le visionnaire', description: 'Terminer 10 recherches.', metric: 'research', target: 10, reward: 8000, xp: 600 },
  { id: 'wealth', name: 'Les affaires fleurissent', description: 'Accumuler 50 000 euros.', metric: 'cash', target: 50000, reward: 2500, xp: 200 },
  { id: 'million', name: 'Le premier million', description: 'Accumuler 1 000 000 euros.', metric: 'cash', target: 1000000, reward: 25000, xp: 1500 },
  { id: 'trader', name: 'Le sens des affaires', description: 'Effectuer 5 transactions au march\u00e9.', metric: 'trades', target: 5, reward: 1000, xp: 100 },
  { id: 'reliable', name: 'Une parole en or', description: 'Honorer 3 contrats.', metric: 'contracts', target: 3, reward: 3000, xp: 250 },
  { id: 'leader', name: 'Au bon moment', description: 'R\u00e9soudre 2 \u00e9v\u00e9nements.', metric: 'events', target: 2, reward: 1500, xp: 120 },
  { id: 'happy', name: 'La vie est belle', description: 'Atteindre 100 % de bonheur.', metric: 'happiness', target: 100, reward: 2000, xp: 200 },
  { id: 'tips', name: 'Les petits ruisseaux', description: 'Encaisser 5 fois des pourboires.', metric: 'collected', target: 5, reward: 1000, xp: 100 },
  { id: 'legacy', name: 'Une nouvelle \u00e8re', description: 'Effectuer votre premier prestige.', metric: 'prestige', target: 1, reward: 10000, xp: 500 },
];

export function metric(s: GameState, key: Metric): number {
  const e = economy(s);
  switch (key) {
    case 'buildings': return s.buildings.filter(b => b.construction <= 0).length;
    case 'population': return e.population;
    case 'employees': return s.employees.length;
    case 'research': return s.research.length;
    case 'cash': return s.cash;
    case 'contracts': return s.stats.contracts;
    case 'upgraded': return s.stats.upgraded;
    case 'power': return e.energyCapacity;
    case 'trained': return s.stats.trained;
    case 'trades': return s.stats.trades;
    case 'events': return s.stats.events;
    case 'prestige': return s.prestige;
    case 'happiness': return e.happiness;
    case 'level': return getLevel(s);
    case 'collected': return s.stats.collected;
  }
}

function notify(s: GameState, title: string, message: string, kind: Notification['kind'] = 'success'): GameState {
  return { ...s, notifications: [{ id: uid(), title, message, time: s.gameTime, kind, read: false }, ...s.notifications].slice(0, 35) };
}
const enoughMaterials = (s: GameState, materials: Partial<Record<Resource, number>>) => Object.entries(materials).every(([key, value]) => s.resources[key as Resource] >= value!);
const spendMaterials = (s: GameState, materials: Partial<Record<Resource, number>>) => ({ ...s.resources, ...Object.fromEntries(Object.entries(materials).map(([key, value]) => [key, s.resources[key as Resource] - value!])) });
export const canCompleteContract = (s: GameState, c: ContractDef) => enoughMaterials(s, c.materials) && Object.entries(c.buildings ?? {}).every(([type, count]) => readyBuildings(s).filter(b => b.type === type).length >= count);
export const upgradeCost = (b: Building) => Math.round(getDef(b.type).price * 0.7 * b.level);
export const repairCost = (b: Building) => Math.ceil(getDef(b.type).price * (100 - b.condition) / 1000);

export type Action =
  | { type: 'TICK'; dt: number } | { type: 'PAUSE' } | { type: 'SPEED'; value: 1 | 2 | 3 }
  | { type: 'BUILD'; id: string; plot?: number } | { type: 'UPGRADE'; uid: string }
  | { type: 'DEMOLISH'; uid: string } | { type: 'TOGGLE_BUILDING'; uid: string } | { type: 'REPAIR'; uid: string }
  | { type: 'HIRE'; id: string } | { type: 'FIRE'; id: string } | { type: 'TRAIN'; id: string }
  | { type: 'RESEARCH'; id: string } | { type: 'CANCEL_RESEARCH' }
  | { type: 'TRADE_RESOURCE'; resource: Resource; quantity: number; buy: boolean }
  | { type: 'TRADE_STOCK'; stock: Stock; quantity: number; buy: boolean }
  | { type: 'LOAN'; amount: number } | { type: 'REPAY'; id: string }
  | { type: 'TAX'; value: number } | { type: 'WAGE'; value: number } | { type: 'MARKETING'; id: string }
  | { type: 'ACCEPT_CONTRACT'; id: string } | { type: 'COMPLETE_CONTRACT' } | { type: 'ABANDON_CONTRACT' }
  | { type: 'EVENT_CHOICE'; index: number } | { type: 'CLAIM_MISSION'; id: string }
  | { type: 'CLAIM_ACHIEVEMENT'; id: string } | { type: 'DAILY' } | { type: 'COLLECT'; uid: string }
  | { type: 'SETTINGS'; value: Partial<GameState['settings']> } | { type: 'RENAME'; value: string }
  | { type: 'READ_NOTIFICATIONS' } | { type: 'PRESTIGE' } | { type: 'RESET' } | { type: 'IMPORT'; state: GameState };

function reduce(s: GameState, a: Action): GameState {
  switch (a.type) {
    case 'TICK': {
      if (s.paused) return s;
      const dt = Math.min(5, Math.max(0, a.dt)) * s.speed;
      const e = economy(s);
      const time = s.gameTime + dt;
      let next: GameState = { ...s, gameTime: time, cash: s.cash + e.net * dt / 60, lifetimeEarned: s.lifetimeEarned + Math.max(0, e.income) * dt / 60, researchPoints: s.researchPoints + e.researchRate * dt / 60 };
      next.buildings = s.buildings.map(b => {
        if (b.construction <= 0) return b;
        const remaining = Math.max(0, b.construction - dt * e.constructionSpeed);
        if (remaining === 0) {
          next = notify(next, 'Les portes sont ouvertes !', `${getDef(b.type).name} rejoint votre ville. +80 XP`);
          next.xp += 80; next.stats = { ...next.stats, built: next.stats.built + 1 };
        }
        return { ...b, construction: remaining };
      });
      if (s.activeResearch) {
        const remaining = Math.max(0, s.activeResearch.remaining - dt * e.researchSpeed);
        next.activeResearch = { ...s.activeResearch, remaining };
        if (remaining === 0) {
          const tech = TECHS.find(t => t.id === s.activeResearch!.id)!;
          next.research = [...s.research, tech.id]; next.activeResearch = null;
          next.xp += 120; next.stats = { ...next.stats, researched: next.stats.researched + 1 };
          next = notify(next, 'Une id\u00e9e qui change tout', `${tech.name} : ${tech.description}`);
        }
      }
      if (s.marketing) {
        next.marketing = { ...s.marketing, remaining: Math.max(0, s.marketing.remaining - dt) };
        if (next.marketing.remaining <= 0) { next.marketing = null; next = notify(next, 'Campagne termin\u00e9e', 'Vos revenus retrouvent leur rythme habituel.', 'info'); }
      }
      if (e.production > 0) {
        const free = Math.max(0, storageCapacity(next) - stored(next));
        const scale = Math.min(1, free / Math.max(0.001, 23 * e.production * dt / 60));
        next.resources = { wood: s.resources.wood + 12 * e.production * dt / 60 * scale, stone: s.resources.stone + 8 * e.production * dt / 60 * scale, steel: s.resources.steel + 3 * e.production * dt / 60 * scale };
      }
      if (Math.floor(time / 60) > Math.floor(s.gameTime / 60)) {
        next.xp += 10;
        next.buildings = next.buildings.map(b => b.construction > 0 ? b : { ...b, condition: Math.max(20, b.condition - 0.75) });
        if (s.settings.autoRepair) {
          next.buildings = next.buildings.map(b => {
            const price = repairCost(b);
            if (b.condition < 75 && next.cash >= price) { next.cash -= price; return { ...b, condition: 100 }; }
            return b;
          });
        }
        next.loans = s.loans.flatMap(l => {
          const principal = Math.min(l.balance, l.original / 20);
          const payment = principal + l.balance * l.rate;
          if (next.cash >= payment) {
            next.cash -= payment;
            if (l.balance - principal <= 0.01) { next = notify(next, 'Pr\u00eat rembours\u00e9', 'Votre dernier paiement a sold\u00e9 un emprunt.'); return []; }
            return [{ ...l, balance: l.balance - principal, daysLeft: Math.max(0, l.daysLeft - 1) }];
          }
          next = notify(next, '\u00c9ch\u00e9ance impay\u00e9e', 'Les int\u00e9r\u00eats ont \u00e9t\u00e9 ajout\u00e9s \u00e0 votre dette.', 'warning');
          return [{ ...l, balance: l.balance + l.balance * l.rate }];
        });
        const dividends = (Object.entries(s.stocks) as [Stock, number][]).reduce((n, [key, shares]) => n + shares * s.prices[key] * 0.005, 0);
        next.cash += dividends; next.lifetimeEarned += dividends;
      }
      if (Math.floor(time / 10) > Math.floor(s.gameTime / 10)) {
        const base = { wood: 15, stone: 24, steel: 60, terra: 80, solis: 120, nova: 210 };
        next.prices = Object.fromEntries(Object.entries(base).map(([key, price], i) => [key, Math.round(price * (1 + Math.sin(time / 70 + i * 1.9) * 0.13 + Math.cos(time / 23 + i) * 0.035) * 100) / 100])) as GameState['prices'];
      }
      if (s.event) {
        next.event = { ...s.event, remaining: s.event.remaining - dt };
        if (next.event.remaining <= 0) { next.event = null; next = notify(next, 'L\u2019occasion est pass\u00e9e', 'Cet \u00e9v\u00e9nement a expir\u00e9. Une autre occasion se pr\u00e9sentera.', 'info'); }
      } else if (time >= s.nextEventAt) {
        const event = EVENTS[(Math.max(0, Math.floor(time / 150) - 1) + s.prestige) % EVENTS.length];
        next.event = { id: event.id, remaining: 120 }; next.nextEventAt = time + 240;
        next = notify(next, event.title, 'Un \u00e9v\u00e9nement attend votre d\u00e9cision. Ouvrez les missions.', 'info');
      }
      if (s.activeContract && time > s.activeContract.deadline) {
        next.activeContract = null;
        next = notify(next, 'Contrat expir\u00e9', 'Le d\u00e9lai est d\u00e9pass\u00e9. Vous pourrez retenter ce contrat.', 'warning');
      }
      if (Math.floor(time / 5) > Math.floor(s.gameTime / 5)) {
        next.history = [...s.history, { time, cash: next.cash, income: e.income, expenses: e.expenses, net: e.net }].slice(-48);
      }
      return next;
    }
    case 'PAUSE': return { ...s, paused: !s.paused };
    case 'SPEED': return { ...s, speed: a.value };
    case 'BUILD': {
      const def = BUILDINGS.find(b => b.id === a.id);
      if (!def || getLevel(s) < def.unlock) return s;
      if (s.cash < def.price) return notify(s, 'Capital insuffisant', 'Un emprunt ou un contrat peut financer ce projet.', 'warning');
      if (!enoughMaterials(s, def.materials)) return notify(s, 'Il manque des mat\u00e9riaux', 'Rendez-vous au march\u00e9 pour compl\u00e9ter votre stock.', 'warning');
      const limit = plotLimit(s);
      const free = Array.from({ length: limit }, (_, i) => i).filter(i => !s.buildings.some(b => b.plot === i));
      if (!free.length) return notify(s, 'Votre quartier est complet', 'La recherche Nouveaux horizons d\u00e9bloque 8 terrains.', 'warning');
      if (s.buildings.filter(b => b.construction > 0).length >= 2 + s.employees.filter(e => e.role === 'builder').length) return notify(s, 'Vos \u00e9quipes sont occup\u00e9es', 'Attendez une fin de chantier ou recrutez un constructeur.', 'warning');
      const plot = a.plot !== undefined && free.includes(a.plot) ? a.plot : free[0];
      const building: Building = { uid: uid(), type: def.id, level: 1, condition: 100, construction: def.duration, totalConstruction: def.duration, enabled: true, plot };
      return notify({ ...s, cash: s.cash - def.price, resources: spendMaterials(s, def.materials), buildings: [...s.buildings, building] }, 'Votre prochain chapitre', `Construction de ${def.name.toLowerCase()} lanc\u00e9e.`, 'info');
    }
    case 'UPGRADE': {
      const b = s.buildings.find(x => x.uid === a.uid);
      if (!b || b.level >= 5 || b.construction > 0) return s;
      const price = upgradeCost(b);
      if (s.cash < price) return notify(s, 'Capital insuffisant', 'Cette am\u00e9lioration attendra encore un peu.', 'warning');
      return notify({ ...s, cash: s.cash - price, xp: s.xp + 100, stats: { ...s.stats, upgraded: s.stats.upgraded + 1 }, buildings: s.buildings.map(x => x.uid === a.uid ? { ...x, level: x.level + 1, condition: 100 } : x) }, 'Une nouvelle dimension', `${getDef(b.type).name} passe au niveau ${b.level + 1}.`);
    }
    case 'DEMOLISH': {
      const b = s.buildings.find(x => x.uid === a.uid);
      if (!b) return s;
      const refund = Math.round(getDef(b.type).price * b.level * 0.5);
      return notify({ ...s, cash: s.cash + refund, buildings: s.buildings.filter(x => x.uid !== a.uid), stats: { ...s.stats, demolished: s.stats.demolished + 1 } }, 'Un terrain, de nouvelles possibilit\u00e9s', `${money(refund)} r\u00e9cup\u00e9r\u00e9s. Le terrain est de nouveau libre.`, 'info');
    }
    case 'TOGGLE_BUILDING': return { ...s, buildings: s.buildings.map(b => b.uid === a.uid ? { ...b, enabled: !b.enabled } : b) };
    case 'REPAIR': {
      const b = s.buildings.find(x => x.uid === a.uid);
      if (!b || b.condition >= 100 || s.cash < repairCost(b)) return s;
      return notify({ ...s, cash: s.cash - repairCost(b), buildings: s.buildings.map(x => x.uid === a.uid ? { ...x, condition: 100 } : x) }, 'Comme au premier jour', `${getDef(b.type).name} est enti\u00e8rement r\u00e9nov\u00e9.`);
    }
    case 'HIRE': {
      const c = CANDIDATES.find(x => x.id === a.id);
      if (!c || s.employees.some(e => e.id === c.id) || s.employees.length >= 12 || s.cash < c.hireCost) return s;
      return notify({ ...s, cash: s.cash - c.hireCost, xp: s.xp + 50, employees: [...s.employees, { id: c.id, name: c.name, role: c.role, salary: c.salary, level: 1, color: c.color }], stats: { ...s.stats, hired: s.stats.hired + 1 } }, 'Bienvenue dans l\u2019\u00e9quipe !', `${c.name} apporte son expertise \u00e0 votre ville.`);
    }
    case 'FIRE': {
      const e = s.employees.find(x => x.id === a.id);
      if (!e) return s;
      return notify({ ...s, employees: s.employees.filter(x => x.id !== a.id) }, 'Une page se tourne', `${e.name} a quitt\u00e9 votre \u00e9quipe.`, 'info');
    }
    case 'TRAIN': {
      const e = s.employees.find(x => x.id === a.id);
      if (!e || e.level >= 5 || s.cash < 800 * e.level) return s;
      return notify({ ...s, cash: s.cash - 800 * e.level, xp: s.xp + 60, employees: s.employees.map(x => x.id === a.id ? { ...x, level: x.level + 1, salary: Math.round(x.salary * 1.1) } : x), stats: { ...s.stats, trained: s.stats.trained + 1 } }, 'Le talent se cultive', `${e.name} atteint le niveau ${e.level + 1}. Ses bonus augmentent.`);
    }
    case 'RESEARCH': {
      const t = TECHS.find(x => x.id === a.id);
      if (!t || s.activeResearch || s.research.includes(t.id) || (t.requires && !s.research.includes(t.requires)) || s.cash < t.cost || s.researchPoints < t.points) return s;
      return notify({ ...s, cash: s.cash - t.cost, researchPoints: s.researchPoints - t.points, activeResearch: { id: t.id, remaining: t.duration, total: t.duration } }, 'L\u2019avenir est en marche', `Recherche ${t.name.toLowerCase()} lanc\u00e9e.`, 'info');
    }
    case 'CANCEL_RESEARCH': {
      if (!s.activeResearch) return s;
      const t = TECHS.find(x => x.id === s.activeResearch!.id)!;
      return notify({ ...s, activeResearch: null, cash: s.cash + t.cost * 0.5, researchPoints: s.researchPoints + t.points * 0.5 }, 'Recherche interrompue', '50 % du budget et des points ont \u00e9t\u00e9 restitu\u00e9s.', 'info');
    }
    case 'TRADE_RESOURCE': {
      const q = Math.floor(a.quantity);
      if (!Number.isFinite(q) || q <= 0 || q > 10000) return s;
      const price = s.prices[a.resource] * q * (a.buy ? 1 : 0.8);
      if (a.buy ? s.cash < price || stored(s) + q > storageCapacity(s) : s.resources[a.resource] < q) return s;
      return notify({ ...s, cash: s.cash + price * (a.buy ? -1 : 1), resources: { ...s.resources, [a.resource]: s.resources[a.resource] + q * (a.buy ? 1 : -1) }, stats: { ...s.stats, trades: s.stats.trades + 1 } }, a.buy ? 'Livraison re\u00e7ue' : 'Vente conclue', `${number(q)} ${RESOURCE_NAMES[a.resource].toLowerCase()} : ${money(price)}.`);
    }
    case 'TRADE_STOCK': {
      const q = Math.floor(a.quantity);
      if (!Number.isFinite(q) || q <= 0 || q > 10000) return s;
      const price = s.prices[a.stock] * q;
      if (a.buy ? s.cash < price : s.stocks[a.stock] < q) return s;
      return notify({ ...s, cash: s.cash + price * (a.buy ? -1 : 1), stocks: { ...s.stocks, [a.stock]: s.stocks[a.stock] + q * (a.buy ? 1 : -1) }, stats: { ...s.stats, trades: s.stats.trades + 1 } }, 'Ordre ex\u00e9cut\u00e9', `${q} actions ${a.stock.toUpperCase()} ${a.buy ? 'achet\u00e9es' : 'vendues'}.`);
    }
    case 'LOAN': {
      if (![5000, 10000, 25000].includes(a.amount) || s.loans.length >= 3 || s.loans.reduce((n, l) => n + l.balance, 0) + a.amount > 60000) return s;
      return notify({ ...s, cash: s.cash + a.amount, loans: [...s.loans, { id: uid(), original: a.amount, balance: a.amount, daysLeft: 20, rate: 0.01 }] }, 'Un nouvel \u00e9lan', `${money(a.amount)} financ\u00e9s sur 20 jours de jeu. Int\u00e9r\u00eat : 1 % du solde par jour.`);
    }
    case 'REPAY': {
      const l = s.loans.find(x => x.id === a.id);
      if (!l || s.cash < l.balance) return s;
      return notify({ ...s, cash: s.cash - l.balance, loans: s.loans.filter(x => x.id !== a.id) }, 'Libre de votre dette', 'Votre emprunt a \u00e9t\u00e9 rembours\u00e9 par anticipation.');
    }
    case 'TAX': return { ...s, taxRate: Math.min(30, Math.max(5, Math.round(a.value))) };
    case 'WAGE': return [0.9, 1, 1.2].includes(a.value) ? { ...s, salaryRate: a.value } : s;
    case 'MARKETING': {
      const c = CAMPAIGNS.find(x => x.id === a.id);
      if (!c || s.marketing || s.cash < c.price) return s;
      return notify({ ...s, cash: s.cash - c.price, marketing: { id: c.id, remaining: c.duration, total: c.duration } }, 'Faites parler de vous', `${c.name} : vos revenus prennent de l\u2019ampleur.`);
    }
    case 'ACCEPT_CONTRACT': {
      const c = CONTRACTS.find(x => x.id === a.id);
      if (!c || s.activeContract || s.completedContracts.includes(c.id) || getLevel(s) < c.unlock) return s;
      return notify({ ...s, activeContract: { id: c.id, deadline: s.gameTime + c.duration } }, 'March\u00e9 conclu', `${c.name}. Vous avez ${duration(c.duration)} pour livrer.`, 'info');
    }
    case 'COMPLETE_CONTRACT': {
      const c = CONTRACTS.find(x => x.id === s.activeContract?.id);
      if (!c || !canCompleteContract(s, c) || s.gameTime > s.activeContract!.deadline) return s;
      return notify({ ...s, cash: s.cash + c.reward, lifetimeEarned: s.lifetimeEarned + c.reward, xp: s.xp + c.xp, resources: spendMaterials(s, c.materials), completedContracts: [...s.completedContracts, c.id], activeContract: null, stats: { ...s.stats, contracts: s.stats.contracts + 1 } }, 'Une promesse tenue', `${money(c.reward)} et ${c.xp} XP gagn\u00e9s. Votre client est ravi !`);
    }
    case 'ABANDON_CONTRACT': return notify({ ...s, activeContract: null }, 'Contrat abandonn\u00e9', 'Aucun mat\u00e9riau n\u2019a \u00e9t\u00e9 consomm\u00e9. Vous pourrez le retenter.', 'info');
    case 'EVENT_CHOICE': {
      const event = EVENTS.find(x => x.id === s.event?.id);
      const choice = event?.choices[a.index];
      if (!choice || s.cash + choice.cash < 0) return s;
      const free = Math.max(0, storageCapacity(s) - stored(s));
      return notify({ ...s, cash: s.cash + choice.cash, xp: s.xp + (choice.xp ?? 0), researchPoints: s.researchPoints + (choice.research ?? 0), resources: { ...s.resources, wood: s.resources.wood + Math.min(free, choice.wood ?? 0) }, boost: { happiness: choice.happiness ?? 0, revenue: choice.revenue ?? 0, until: s.gameTime + (choice.duration ?? 0) }, buildings: s.buildings.map(b => ({ ...b, condition: Math.max(20, Math.min(100, b.condition + (choice.condition ?? 0))) })), event: null, stats: { ...s.stats, events: s.stats.events + 1 } }, 'Une d\u00e9cision qui compte', choice.description);
    }
    case 'CLAIM_MISSION': {
      const m = MISSIONS.find(x => x.id === a.id);
      if (!m || s.missionsClaimed.includes(m.id) || metric(s, m.metric) < m.target) return s;
      return notify({ ...s, cash: s.cash + m.reward, xp: s.xp + m.xp, missionsClaimed: [...s.missionsClaimed, m.id] }, 'Objectif atteint !', `${m.name} : ${money(m.reward)} et ${m.xp} XP.`);
    }
    case 'CLAIM_ACHIEVEMENT': {
      const g = ACHIEVEMENTS.find(x => x.id === a.id);
      if (!g || !s.achievementsUnlocked.includes(g.id) || s.achievementsClaimed.includes(g.id)) return s;
      return notify({ ...s, cash: s.cash + g.reward, xp: s.xp + g.xp, achievementsClaimed: [...s.achievementsClaimed, g.id] }, 'Un succ\u00e8s bien m\u00e9rit\u00e9', `${g.name} : ${money(g.reward)} et ${g.xp} XP.`);
    }
    case 'DAILY': {
      const today = new Date().toISOString().slice(0, 10);
      if (s.lastDailyBonus === today) return s;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const streak = s.lastDailyBonus === yesterday ? Math.min(7, s.dailyStreak + 1) : 1;
      const reward = 1500 + (streak - 1) * 250;
      return notify({ ...s, cash: s.cash + reward, xp: s.xp + 50, researchPoints: s.researchPoints + 10, dailyStreak: streak, lastDailyBonus: today }, 'Chaque jour compte', `${money(reward)}, 50 XP et 10 points de recherche. S\u00e9rie : ${streak} jour(s).`);
    }
    case 'COLLECT': {
      const b = s.buildings.find(x => x.uid === a.uid);
      if (!b || b.construction > 0 || !b.enabled || getDef(b.type).category !== 'commerce' || s.gameTime - (s.lastCollected[b.uid] ?? -60) < 30) return s;
      const amount = 60 * b.level;
      return notify({ ...s, cash: s.cash + amount, xp: s.xp + 5, lastCollected: { ...s.lastCollected, [b.uid]: s.gameTime }, stats: { ...s.stats, collected: s.stats.collected + 1 } }, 'Les petits ruisseaux...', `${money(amount)} de pourboires encaiss\u00e9s.`);
    }
    case 'SETTINGS': return { ...s, settings: { ...s.settings, ...a.value } };
    case 'RENAME': return a.value.trim().length >= 2 ? notify({ ...s, cityName: a.value.trim().slice(0, 26) }, 'Une ville \u00e0 votre image', `Bienvenue \u00e0 ${a.value.trim().slice(0, 26)}.`, 'info') : s;
    case 'READ_NOTIFICATIONS': return { ...s, notifications: s.notifications.map(n => ({ ...n, read: true })) };
    case 'PRESTIGE': {
      if (totalAssets(s) < 250000) return s;
      const next = newGame(s.prestige + 1);
      return notify({ ...next, cityName: s.cityName, settings: s.settings, achievementsUnlocked: s.achievementsUnlocked, achievementsClaimed: s.achievementsClaimed, cash: next.cash + 5000 * (s.prestige + 1) }, 'Une nouvelle \u00e8re commence', `Prestige ${next.prestige}. Bonus permanent : +${next.prestige * 15} % de revenus.`);
    }
    case 'RESET': return newGame();
    case 'IMPORT': return a.state;
    default: return s;
  }
}

export function gameReducer(s: GameState, a: Action): GameState {
  let next = reduce(s, a);
  if (next === s) return s;
  const unlocked = ACHIEVEMENTS.filter(g => !next.achievementsUnlocked.includes(g.id) && metric(next, g.metric) >= g.target);
  if (unlocked.length) {
    next = { ...next, achievementsUnlocked: [...next.achievementsUnlocked, ...unlocked.map(g => g.id)] };
    next = notify(next, 'Un nouveau succ\u00e8s !', `${unlocked[0].name}. R\u00e9cup\u00e9rez votre r\u00e9compense dans les succ\u00e8s.`);
  }
  if (getLevel(next) > getLevel(s) && a.type !== 'RESET' && a.type !== 'IMPORT') next = notify(next, 'Votre ambition paie', `Niveau ${getLevel(next)} atteint ! De nouvelles possibilit\u00e9s vous attendent.`);
  return next;
}

export const SAVE_KEY = 'empire-tycoon-save-v1';
const finite = (v: unknown) => typeof v === 'number' && Number.isFinite(v) && Math.abs(v) <= 1e12;

export function validSave(value: unknown): value is GameState {
  if (!value || typeof value !== 'object') return false;
  const s = value as GameState;
  const base = newGame();
  if (!Object.keys(base).every(key => key in s) || s.version !== 1 || typeof s.cityName !== 'string' || s.cityName.length < 2 || s.cityName.length > 26 || ![s.cash, s.xp, s.gameTime, s.researchPoints, s.savedAt, s.prestige, s.lifetimeEarned, s.taxRate].every(finite)) return false;
  if (![1, 2, 3].includes(s.speed) || typeof s.paused !== 'boolean' || s.gameTime < 0 || s.xp < 0 || s.researchPoints < 0 || !Number.isInteger(s.prestige) || s.prestige < 0 || s.prestige > 1000 || s.taxRate < 5 || s.taxRate > 30 || ![0.9, 1, 1.2].includes(s.salaryRate)) return false;
  if (!Array.isArray(s.buildings) || s.buildings.length > 24 || !s.buildings.every(b => b && BUILDINGS.some(d => d.id === b.type) && typeof b.uid === 'string' && Number.isInteger(b.level) && b.level >= 1 && b.level <= 5 && Number.isInteger(b.plot) && b.plot >= 0 && b.plot < 24 && finite(b.condition) && b.condition >= 20 && b.condition <= 100 && finite(b.construction) && b.construction >= 0 && finite(b.totalConstruction) && b.totalConstruction >= 0 && (b.construction === 0 || b.totalConstruction > 0) && typeof b.enabled === 'boolean')) return false;
  if (new Set(s.buildings.map(b => b.uid)).size !== s.buildings.length || new Set(s.buildings.map(b => b.plot)).size !== s.buildings.length) return false;
  if (!Array.isArray(s.employees) || s.employees.length > 12 || !s.employees.every(e => e && typeof e.id === 'string' && typeof e.name === 'string' && Object.prototype.hasOwnProperty.call(ROLE_NAMES, e.role) && finite(e.salary) && e.salary >= 0 && Number.isInteger(e.level) && e.level >= 1 && e.level <= 5 && typeof e.color === 'string')) return false;
  if (new Set(s.employees.map(e => e.id)).size !== s.employees.length) return false;
  if (!s.resources || !s.prices || !s.stocks || !(['wood', 'stone', 'steel'] as Resource[]).every(r => finite(s.resources[r]) && s.resources[r] >= 0 && finite(s.prices[r]) && s.prices[r] > 0) || !(['terra', 'solis', 'nova'] as Stock[]).every(r => finite(s.stocks[r]) && s.stocks[r] >= 0 && finite(s.prices[r]) && s.prices[r] > 0)) return false;
  if (!Array.isArray(s.research) || !s.research.every(id => TECHS.some(t => t.id === id)) || new Set(s.research).size !== s.research.length) return false;
  if (s.activeResearch && (!TECHS.some(t => t.id === s.activeResearch!.id) || !finite(s.activeResearch.remaining) || s.activeResearch.remaining < 0 || !finite(s.activeResearch.total) || s.activeResearch.total <= 0)) return false;
  if (s.marketing && (!CAMPAIGNS.some(c => c.id === s.marketing!.id) || !finite(s.marketing.remaining) || s.marketing.remaining < 0 || !finite(s.marketing.total) || s.marketing.total <= 0)) return false;
  if (s.event && (!EVENTS.some(e => e.id === s.event!.id) || !finite(s.event.remaining) || s.event.remaining < 0)) return false;
  if (s.activeContract && (!CONTRACTS.some(c => c.id === s.activeContract!.id) || !finite(s.activeContract.deadline))) return false;
  if (!s.boost || ![s.boost.happiness, s.boost.revenue, s.boost.until].every(finite) || !finite(s.nextEventAt) || s.nextEventAt < 0) return false;
  if (!Array.isArray(s.loans) || s.loans.length > 3 || !s.loans.every(l => l && typeof l.id === 'string' && [l.balance, l.original, l.daysLeft, l.rate].every(finite) && l.balance >= 0 && l.original > 0 && l.rate === 0.01 && l.daysLeft >= 0 && l.daysLeft <= 20)) return false;
  if (!Array.isArray(s.history) || s.history.length < 1 || s.history.length > 48 || !s.history.every(h => h && [h.time, h.cash, h.income, h.expenses, h.net].every(finite))) return false;
  if (!Array.isArray(s.notifications) || s.notifications.length > 35 || !s.notifications.every(n => n && typeof n.id === 'string' && typeof n.title === 'string' && typeof n.message === 'string' && typeof n.read === 'boolean' && ['success', 'info', 'warning'].includes(n.kind) && finite(n.time))) return false;
  if (!s.settings || typeof s.settings.sound !== 'boolean' || typeof s.settings.autoRepair !== 'boolean' || typeof s.settings.reduceMotion !== 'boolean' || !finite(s.settings.volume) || s.settings.volume < 0 || s.settings.volume > 1) return false;
  if (!s.stats || !Object.keys(base.stats).every(key => finite(s.stats[key as keyof GameState['stats']]) && s.stats[key as keyof GameState['stats']] >= 0)) return false;
  if (!['missionsClaimed', 'achievementsUnlocked', 'achievementsClaimed', 'completedContracts'].every(key => Array.isArray(s[key as keyof GameState]) && (s[key as keyof GameState] as unknown[]).every(v => typeof v === 'string'))) return false;
  return typeof s.lastDailyBonus === 'string' && Number.isInteger(s.dailyStreak) && s.dailyStreak >= 0 && s.dailyStreak <= 7 && !!s.lastCollected && typeof s.lastCollected === 'object' && Object.values(s.lastCollected).every(finite);
}

export function loadGame(): GameState {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return newGame();
    const saved: unknown = JSON.parse(raw);
    if (!validSave(saved)) return notify(newGame(), 'Une nouvelle page', 'La sauvegarde est incompatible. Une ville neuve vous attend.', 'warning');
    let s = saved;
    // Offline profits are intentionally capped; active contract and loan clocks stay protected.
    const offline = Math.min(7200, Math.max(0, (Date.now() - s.savedAt) / 1000));
    if (offline >= 30 && !s.paused) {
      const e = economy(s);
      const earnings = Math.max(0, e.net) * offline / 60 * 0.65;
      let completed = 0;
      const buildings = s.buildings.map(b => {
        if (b.construction <= 0) return b;
        const remaining = Math.max(0, b.construction - offline * e.constructionSpeed);
        if (!remaining) completed++;
        return { ...b, construction: remaining };
      });
      const finishedResearch = s.activeResearch && s.activeResearch.remaining <= offline * e.researchSpeed;
      s = { ...s, cash: s.cash + earnings, lifetimeEarned: s.lifetimeEarned + earnings, buildings, stats: { ...s.stats, built: s.stats.built + completed, researched: s.stats.researched + (finishedResearch ? 1 : 0) }, xp: s.xp + completed * 80 + (finishedResearch ? 120 : 0), researchPoints: s.researchPoints + e.researchRate * offline / 60, research: finishedResearch ? [...s.research, s.activeResearch!.id] : s.research, activeResearch: finishedResearch ? null : s.activeResearch ? { ...s.activeResearch, remaining: Math.max(0, s.activeResearch.remaining - offline * e.researchSpeed) } : null };
      s = notify(s, 'Votre ville n\u2019a pas dormi', `${money(earnings)} gagn\u00e9s pendant votre absence. Gains hors ligne : 65 %, limit\u00e9s \u00e0 2 heures.`);
    }
    return { ...s, savedAt: Date.now() };
  } catch { return newGame(); }
}

export const FEATURES = [
  'Revenus passifs en temps r\u00e9el', '15 types de b\u00e2timents', '4 familles de construction', 'Terrains et placement libre', 'Chantiers avec progression', 'File de construction limit\u00e9e', '5 niveaux par b\u00e2timent', 'D\u00e9molition avec remboursement', 'Ouverture et fermeture des activit\u00e9s', 'Usure et r\u00e9novation', 'Maintenance automatique', 'Population dynamique', 'Bonheur et satisfaction', 'Production et consommation d\u2019\u00e9nergie', '3 ressources de construction', 'Production industrielle', 'Capacit\u00e9 de stockage', 'March\u00e9 aux prix variables', 'Achat et vente de mat\u00e9riaux', 'Bourse de 3 entreprises', 'Dividendes quotidiens de jeu', '5 professions sp\u00e9cialis\u00e9es', 'Recrutement et licenciement', 'Formation du personnel', 'Politique salariale', '12 technologies avec pr\u00e9requis', 'Points et d\u00e9lais de recherche', 'Annulation de recherche', '3 campagnes marketing', 'Imp\u00f4ts ajustables', 'Pr\u00eats et int\u00e9r\u00eats', 'Remboursement anticip\u00e9', '5 contrats \u00e0 honorer', '\u00c9v\u00e9nements \u00e0 choix multiples', '9 missions r\u00e9compens\u00e9es', '16 succ\u00e8s \u00e0 d\u00e9bloquer', 'Bonus quotidien et s\u00e9rie', 'Pourboires \u00e0 encaisser', 'Niveaux et exp\u00e9rience', 'Prestige et bonus permanents', 'Classement local simul\u00e9', 'Historique financier interactif', 'Pause et 3 vitesses', 'Zoom et grille de la carte', 'Nom de ville personnalisable', 'Sauvegarde automatique locale', 'Export et import de sauvegarde', 'Progression hors ligne', 'Notifications et journal', 'Sons optionnels et raccourcis',
];