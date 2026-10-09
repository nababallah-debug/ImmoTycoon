const persistSession=true;
const autoRefreshToken=true;
const detectSessionInUrl=false;
const passive=false;

const SUPABASE_URL='https://gvyeooqemajnvfbgnagv.supabase.co';
const SUPABASE_KEY='sb_publishable_moYDSTJplgl9XPCiKR96b_CPt3MJ7z';

const sb=window.supabase?.createClient?.(
SUPABASE_URL,
SUPABASE_KEY,
{auth:{persistSession,autoRefreshToken,detectSessionInUrl}}
)||null;

const KEY='space-mining-v11';
const LEGACY_KEYS=[
'space-mining-v11','space-mining-v10','space-mining-v9','space-mining-v8',
'space-mining-v7','space-mining-v6','space-mining-v5','space-mining-v4',
'space-mining-v3','space-mining-v2'
];

const WORLDS=[
['🌑','Astéroïde Nova',0,1],['🔴','Mars',1e6,1.6],['🪐','Saturne',5e7,2.4],
['💠','Nébuleuse Azur',5e9,3.5],['🌌','Trou noir',1e12,5],['☀️','Étoile Helios',1e14,7.5],
['🌀','Dimension X',1e16,11],['🌊','Océan de Nyx',1e18,16],['💎','Géode Prime',1e21,24],
['🧊','Crypte d’Oort',1e24,36],['🧿','Singularité Oméga',1e28,55],['✨','Cœur de l’Univers',1e32,85],
['🌠','Vespera',5e35,120],['🟣','Nébuleuse Éclipse',2e39,170],['🌟','Quasar Aether',1e43,240],
['🔷','Cristallia',5e46,340],['🌋','Forge Stellaire',2e50,480],['🕳️','Abîme Primordial',1e54,680],
['🌌','Galaxie Némésis',5e57,950],['🪐','Titania X',2e61,1300],['⚡','Orage Cosmique',1e65,1800],
['🌙','Lune Spectrale',5e68,2500],['💫','Puits de Pulsar',2e72,3500],['☄️','Couronne des Comètes',1e76,5000],
['🧬','Matrice Cosmique',5e79,7000],['🔱','Royaume des Titans',2e83,10000],['🧿','Œil de l’Éternité',1e87,14000],
['♾️','Nexus Infini',5e90,20000],['🪩','Mégasphère',2e94,28000],['🛸','Frontière Omniverselle',1e98,40000],
['🌌','Mer des Univers',5e101,56000],['✨','Trône de la Création',1e105,80000]
];

const BUILDINGS=[
['Foreuse laser','🔧'],['Robot mineur','🤖'],['Raffinerie orbitale','🏭'],['Station minière','🛰️'],
['Flotte de cargos','🚚'],['Extracteur gravitationnel','🧲'],['Collecteur Dyson','☀️'],['Portail quantique','🌀'],
['Forge antimatière','⚛️'],['Anneau de singularité','💫'],['Usine de matière noire','🌑'],['Noyau d’assemblage','🔮']
];

const LATE_BUILDINGS=[
['Foreuse à fusion','🔥'],['Mineur de matière noire','🕳️'],['Extracteur stellaire','⭐'],
['Raffinerie de quasars','💠'],['Flotte interstellaire','🚀'],['Moissonneur cosmique','🌌'],
['Forge gravitationnelle','🧲'],['Constructeur de mégastructure','🏗️'],['Réacteur du néant','⚫'],
['Portail multiversel','🌀'],['Usine d’antimatière','⚛️'],['Noyau omnidimensionnel','🔮']
];

const TECH=[
['laser','Laser industriel',5e6,'+50% puissance de clic','click',1.5],['ai','IA autonome',2.5e8,'+40% production','auto',1.4],
['reactor','Réacteur quantique',2e10,'x1,6 production globale','global',1.6],['logistics','Logistique zéro-g',2e11,'-8% coûts bâtiments','discount',.92],
['nano','Nanobots industriels',2e13,'+70% production','auto',1.7],['fusion','Fusion contrôlée',2e15,'x2 production globale','global',2],
['drill','Forage abyssal',5e16,'+100% puissance de clic','click',2],['market','Marché galactique',2e18,'+20% revenus','income',1.2],
['chrono','Chrono-core',1e20,'hors-ligne jusqu’à 24 h','offline',86400],['antimatter','Réacteur antimatière',5e22,'x2,5 production globale','global',2.5],
['dyson','Réseau Dyson',2e25,'+150% production','auto',2.5],['singularity','Moteur de singularité',1e28,'x3 production globale','global',3],
['economy','Économie fractale',1e31,'-15% coûts bâtiments','discount',.85],['deep','Forage dimensionnel',5e33,'x4 production globale','global',4],
['quantum','Calcul quantique',1e36,'+250% production','auto',3.5],['gravity','Gant gravitationnel',5e38,'x3 clic','click',3],
['entropy','Gestion de l’entropie',1e41,'+50% revenus','income',1.5],['time','Maîtrise temporelle',5e43,'hors-ligne 48 h','offline',172800],
['void','Conduit du Vide',1e46,'x6 production globale','global',6],['ascension','Architecture d’ascension',5e49,'+50% bonus de prestige','prestige',1.5]
];

const MISSION_BASE=[
['first','Premier forage','clics',1,250],['collector','Petit capital','lifetime',1e6,2500],
['factory','Première usine','buildings',10,10000],['operator','Opérateur industriel','buildings',100,75000],
['millionaire','Millionnaire','lifetime',1e9,500000],['billionaire','Milliardaire','lifetime',1e12,25000000],
['prestige1','Premier prestige','prestige',1,100000000],['researcher','Chercheur','tech',5,250000000],
['veteran','Vétéran','level',25,500000000],['tycoon','Magnat galactique','lifetime',1e16,5000000000],
['legend','Légende','prestige',5,25000000000],['empire','Empire spatial','buildings',1000,100000000000]
];

const PLANET_MISSIONS=WORLDS.slice(1).map((w,i)=>[
'planet'+(i+1),'Maîtrise de '+w[1],'planet',i+1,Math.max(5000,w[2]*0.0002)
]);

const WEEKLY=[
['week_click','Frénésie de forage','clicks',2500,1000000],['week_build','Semaine industrielle','buildings',75,5000000],
['week_earn','Mineur acharné','run',1e11,25000000],['week_buy','Investisseur','spend',1e12,100000000],
['week_world','Explorateur','planet',3,500000000]
];

const TECH_BY_ID=Object.fromEntries(TECH.map(x=>[x[0],x]));
let s;

const EVENTS=[
['meteor','Pluie de météorites','☄️','Les météorites enrichissent les chaînes minières.','global',1.35,18],
['solar','Éruption solaire','☀️','Les réacteurs reçoivent un surplus d’énergie.','auto',1.5,14],
['quantum','Faille quantique','🌀','Une faille accélère temporairement toutes les opérations.','global',1.75,10],
['crystal','Averse cristalline','💎','Les cristaux sont plus faciles à extraire.','crystal',4,12],
['cargo','Convoi de cargos','🚚','Les coûts logistiques chutent pendant l’arrivée du convoi.','cost',0.75,20],
['ai','Surcadence IA','🤖','Les intelligences minières travaillent à plein régime.','auto',1.8,9],
['gravity','Anomalie gravitationnelle','🧲','La gravité amplifie la puissance des extracteurs.','auto',1.65,16],
['dyson','Pic Dyson','🔆','Les collecteurs captent une vague d’énergie stellaire.','global',1.55,15],
['antimatter','Débordement d’antimatière','⚛️','Une réserve d’antimatière booste la production.','global',2,8],
['void','Souffle du Vide','🌑','Le Vide accélère les machines les plus avancées.','global',1.9,7],
['trade','Marché en folie','📈','Les cours galactiques augmentent les revenus.','income',1.5,22],
['jackpot','Veine exceptionnelle','💰','Une poche de minerai rare est découverte.','global',1.45,25],
['nano','Essaim de nanobots','🧬','Les nanobots optimisent chaque cycle de production.','auto',1.7,13],
['fusion','Pic de fusion','🔥','Les réacteurs à fusion atteignent leur rendement maximal.','global',1.6,11],
['chrono','Accélération temporelle','⏱️','Le temps opérationnel est légèrement accéléré.','global',1.4,19],
['star','Naissance d’une étoile','🌟','Une nouvelle étoile alimente les colonies proches.','global',1.65,17],
['portal','Portail instable','🛸','Un portail ouvre une route commerciale impossible.','income',1.7,10],
['storm','Tempête cosmique','⚡','La tempête charge les extracteurs.','click',2,12],
['overclock','Overclock général','🚀','Toutes les équipes passent en mode performance.','global',1.5,15],
['deep','Veine abyssale','⛏️','Une veine profonde augmente les gains manuels.','click',2.5,10]
];

const SHOP_ITEMS=[
['prod','Amplificateur industriel','⚙️','+4% production permanente',4,'prod',1.04],
['click','Gantelet de forage','⛏️','+5% puissance de clic permanente',6,'click',1.05],
['crystal','Scanner cristallin','💎','+0,15 point de chance de cristal',8,'crystalChance',0.0015],
['event','Résonateur d’événements','⚡','+5% puissance des événements',10,'eventPower',1.05],
['duration','Chronomètre cosmique','⏱️','+8% durée des événements',12,'eventDuration',1.08],
['offline','Batterie orbitale','🌙','+5% gains hors-ligne',15,'offline',1.05],
['discount','Nanocomptabilité','💠','-1% coût des bâtiments',20,'discount',0.99],
['prestige','Catalyseur d’ascension','👑','+2% bonus de prestige',30,'prestige',1.02]
];

function fresh(){
const buildings={};

WORLDS.forEach((_,w)=>{
BUILDINGS.forEach((_,b)=>{
buildings[w+'-'+b]=0;
});
});

return{
money:0,
runTotal:0,
lifetimeTotal:0,
prestige:0,
prestigeShards:0,

crystals:0,
lastCrystalCheckAt:Date.now(),

buildings,
research:{},
missions:{},
weekly:{
  key:weekKey(),
  claimed:{},
  progress:{}
},
shopUpgrades:{},
event:{nextAt:0,current:null,activeUntil:0},

xp:0,
level:1,
nickname:'Mineur',
lastActiveAt:Date.now(),
lastOfflineClaimAt:Date.now(),
combo:0,
cLICKS:0,
spent:0,
offlineLast:0,
online:false

};
}

function buildingList(w){ return w<12?BUILDINGS:LATE_BUILDINGS; }

function migrateState(z){
const base=fresh();
z.buildings=Object.assign({},base.buildings,z.buildings||{});
WORLDS.forEach((_,w)=>buildingList(w).forEach((__,b)=>{
const k=w+'-'+b;
if(!Number.isFinite(Number(z.buildings[k])))z.buildings[k]=0;

}));
if(!Number.isFinite(Number(z.lastCrystalCheckAt))){
z.lastCrystalCheckAt=Date.now();
}
z.research=z.research||{}; z.missions=z.missions||{};
z.weekly=z.weekly||base.weekly; z.weekly.claimed=z.weekly.claimed||{}; z.weekly.progress=z.weekly.progress||{};
z.shopUpgrades=z.shopUpgrades||{};
z.event=z.event||base.event;
if(!Number.isFinite(Number(z.crystals)))z.crystals=0;
z.crystals=Math.max(0,Number(z.crystals)||0);
z.nickname=(z.nickname||'Mineur').slice(0,20);
z.xp=Math.max(0,Number(z.xp)||0); z.level=Math.max(1,Number(z.level)||1);
z.prestige=Math.max(0,Number(z.prestige)||0); z.prestigeShards=Math.max(0,Number(z.prestigeShards)||0);
return z;
}

function load(){
try{
let raw=null;
for(const k of LEGACY_KEYS){const v=localStorage.getItem(k);if(v){raw=JSON.parse(v);break;}}
const z=Object.assign(fresh(),raw||{});
const oldTotal=Number(raw?.total||0);
if(!raw?.lifetimeTotal){z.lifetimeTotal=oldTotal||Number(raw?.money||0);z.runTotal=z.lifetimeTotal;}
if(!raw?.runTotal)z.runTotal=Math.max(z.money||0,z.runTotal||0);
z.money=Math.max(0,Number(z.money)||0);
z.lifetimeTotal=Math.max(z.runTotal||0,Number(z.lifetimeTotal)||0);
z.lastActiveAt=Number(raw?.lastActiveAt||raw?.last||Date.now());
z.lastOfflineClaimAt=Number(raw?.lastOfflineClaimAt||z.lastActiveAt||Date.now());
if(!Number.isFinite(z.lastActiveAt)||z.lastActiveAt>Date.now()+60000)z.lastActiveAt=Date.now();
z.weekly=z.weekly||fresh().weekly; z.weekly.key=weekKey();
return migrateState(z);
}catch(e){console.warn('Erreur chargement local:',e);return fresh();}
}

function save(){try{localStorage.setItem(KEY,JSON.stringify(s));}catch(e){}}

function fmt(n){
if(!Number.isFinite(n))return '∞';
if(Math.abs(n)<1000)return Math.floor(n).toLocaleString('fr-FR');
const units=['K','M','Md','Bn','T','Qa','Qi','Sx','Sp','Oc','No','Dc','Ud','Dd','Td','Qad','Qid'];
const i=Math.floor(Math.log10(Math.abs(n))/3);
return (n/10**(i*3)).toFixed(i>=5?2:1)+' '+(units[i-1]||('e'+(i*3)));
}

function weekKey(d=new Date()){
const x=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));
const day=x.getUTCDay()||7;x.setUTCDate(x.getUTCDate()-day+1);return x.toISOString().slice(0,10);
}
function ensureWeekly(){if(s.weekly.key!==weekKey()){s.weekly={key:weekKey(),claimed:{},progress:{}};save();}}

function tech(id){return !!s.research[id];}
function shopLevel(id){return Math.max(0,Number(s.shopUpgrades?.[id])||0);}
function shopMult(id,base){return Math.pow(base,shopLevel(id));}

function globalMult(){
let m=1+(0.18*s.prestige)*(tech('ascension')?1.5:1);
for(const id of['reactor','fusion','antimatter','singularity','deep','void'])if(tech(id))m*=TECH_BY_ID[id][5];
return m*shopMult('prod',1.04)*eventMultiplier('global');
}
function autoMult(){let m=1;for(const id of['ai','nano','dyson','quantum'])if(tech(id))m=TECH_BY_ID[id][5];return m;}
function clickMult(){
let m=1;if(tech('laser'))m=1.5;if(tech('drill'))m*=2;if(tech('gravity'))m*=3;
return m*shopMult('click',1.05)*eventMultiplier('click');
}
function incomeMult(){let m=1;if(tech('market'))m=1.2;if(tech('entropy'))m=1.5;return m*eventMultiplier('income');}
function costMult(){
let m=1;if(tech('logistics'))m=.92;if(tech('economy'))m*=.85;
return m*shopMult('discount',.99)*eventMultiplier('cost');
}
function offlineCap(){if(tech('time'))return 172800;if(tech('chrono'))return 86400;return 14400;}
function prestigeMult(){return (1+(0.18*s.prestige)*(tech('ascension')?1.5:1))*shopMult('prestige',1.02);}
function clickPower(){return prestigeMult()*globalMult()*clickMult()*(1+Math.min(.75,s.combo*0.03));}

function baseProd(w,b){
  const earlyBoost=Math.max(1,2-b*.08);
  const lateBoost=w>=12?Math.pow(1.16,w-11):1;

  return 100 * (1.1+0.18*w) * Math.pow(3.2,w) * Math.pow(2.0,b) * earlyBoost * lateBoost;
}
function buildingCost(w,b){
const n=s.buildings[w+'-'+b]||0;
return (500*Math.pow(28,w)*Math.pow(5.5,b)*Math.pow(1.16,n)*costMult())/5;
}
function autoRate(){
let r=0;
WORLDS.forEach((_,w)=>buildingList(w).forEach((_,b)=>{
r+=(s.buildings[w+'-'+b]||0)*baseProd(w,b)*WORLDS[w][3];
}));
return r*prestigeMult()*globalMult()*autoMult()*incomeMult()*3;
}

function levelCheck(){
const nl=Math.floor(Math.sqrt(s.xp/80))+1;
if(nl>s.level){s.level=nl;toast('🎉 Niveau '+nl);}
}
function earn(x){
if(!Number.isFinite(x)||x<=0)return;
s.money+=x;s.runTotal+=x;s.lifetimeTotal+=x;
s.xp+=Math.max(1,Math.floor(Math.log10(Math.max(10,x))+2));levelCheck();
}
function spend(x){s.money-=x;s.spent+=x;}
function totalBuildings(){return Object.values(s.buildings).reduce((a,b)=>a+(Number(b)||0),0);}

function planetUnlocked(w){
if(w===0)return true;
const prev=w-1;
return buildingList(prev).every((_,b)=>(s.buildings[prev+'-'+b]||0)>=1);
}
function planetLevels(w){return buildingList(w).reduce((a,_,b)=>a+(s.buildings[w+'-'+b]||0),0);}
function planetDone(w){return planetUnlocked(w)&&buildingList(w).every((_,b)=>(s.buildings[w+'-'+b]||0)>=10);}
function goalText(){
for(let i=1;i<WORLDS.length;i++)if(!planetUnlocked(i))
return 'Construire au moins 1 exemplaire de chacun des '+buildingList(i-1).length+' bâtiments sur '+WORLDS[i-1][1]+' pour débloquer '+WORLDS[i][1]+'.';
return 'Toutes les planètes sont accessibles. Maîtrise-les avec 10 de chaque bâtiment pour préparer le prestige.';
}

function missionValue(m){
switch(m[2]){
case 'clics': return s.cLICKS;
case 'lifetime': return s.lifetimeTotal;
case 'run': return s.runTotal;
case 'buildings': return totalBuildings();
case 'prestige': return s.prestige;
case 'tech': return Object.keys(s.research).length;
case 'level': return s.level;
case 'planet': return m[3]<=WORLDS.length-1&&planetDone(m[3])?m[3]:0;
case 'spend': return s.spent;
default: return 0;
}
}
function weeklyValue(m){
ensureWeekly();
switch(m[2]){
case 'clicks': return s.cLICKS;
case 'buildings': return totalBuildings();
case 'run': return s.runTotal;
case 'spend': return s.spent;
case 'planet': return WORLDS.slice(0,m[3]+1).filter((_,i)=>planetDone(i)).length;
default: return 0;
}
}

function toast(t){
const e=document.getElementById('toast');if(!e)return;e.textContent=t;e.classList.add('show');
clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('show'),2200);
}
function setText(id,v){const e=document.getElementById(id);if(e)e.textContent=v;}

function uiHeader(){
const unlocked=WORLDS.filter((_,i)=>planetUnlocked(i)).length;
setText('total',fmt(s.money));setText('lifetimeTotal',fmt(s.lifetimeTotal));setText('runTotal',fmt(s.runTotal));
setText('rate',fmt(autoRate())+'/s');setText('prestige','P'+s.prestige);setText('clickPower','+'+fmt(clickPower()));setText('combo',s.combo);
setText('crystals',fmt(s.crystals));setText('profileName',s.nickname);setText('profileLevel',s.level);setText('profileXp',fmt(s.xp));setText('profileTotal',fmt(s.lifetimeTotal));
setText('profileStatus',s.online?'☁️ Classement synchronisé':'📱 Mode local');setText('onlineDot',s.online?'● CLOUD':'● LOCAL');
setText('worldProgress',unlocked+'/'+WORLDS.length+' débloquées');setText('researchProgress',Object.keys(s.research).length+'/'+TECH.length);
setText('missionProgress',Object.keys(s.missions).length+'/'+(MISSION_BASE.length+PLANET_MISSIONS.length));setText('planetTotal',unlocked+'/'+WORLDS.length);
setText('minePlanetName',WORLDS[selectedWorld][1]);setText('currentGoal',goalText());
setText('eventTitle',activeEvent()?.[2]||'Aucun événement');setText('eventText',activeEvent()?.[3]||'Le prochain événement apparaîtra aléatoirement.');
const ev=activeEvent();setText('eventTimer',ev?formatDuration(Math.max(0,s.event.activeUntil-Date.now())):'—');
const dot=document.getElementById('onlineDot');if(dot)dot.style.color=s.online?'var(--good)':'var(--warn)';
}

function formatDuration(ms){const sec=Math.ceil(ms/1000);if(sec<60)return sec+'s';const min=Math.floor(sec/60);return min+'m '+String(sec%60).padStart(2,'0')+'s';}

function setScreen(name){
if(!document.getElementById('screen-'+name))name='mine';currentScreen=name;
document.querySelectorAll('.screen').forEach(e=>e.classList.toggle('active',e.id==='screen-'+name));
document.querySelectorAll('.bottom-nav button').forEach(e=>e.classList.toggle('active',e.dataset.go===name));
if(name==='buildings')renderBuildings();if(name==='planets')renderPlanets();if(name==='research')renderResearch();
if(name==='missions')renderMissions();if(name==='rank')renderRank();if(name==='profile')renderProfile();if(name==='shop')renderShop();
uiHeader();window.scrollTo({top:0,behavior:'auto'});
}

function worldStrip(){
return WORLDS.map((w,i)=>`<button class="planet-chip ${i===selectedWorld?'active ':''}${planetUnlocked(i)?'':'locked'}" data-world="${i}">
    <strong>${w[0]} ${w[1]}</strong><small>${planetUnlocked(i)?'x'+w[3]:'🔒 '+fmt(w[2])}</small></button>`).join('');
}
function renderBuildings(){
const strip=document.getElementById('buildingWorlds');if(strip)strip.innerHTML=worldStrip();
const w=WORLDS[selectedWorld],detail=document.getElementById('buildingDetail');if(!detail)return;
if(!planetUnlocked(selectedWorld)){detail.innerHTML=`<div class="planet-card locked-card"><div class="big-icon">🔒</div><h3>${w[0]} ${w[1]}</h3><p>Construis au moins 1 exemplaire de chacun des ${buildingList(selectedWorld-1)?.length||12} bâtiments sur ${WORLDS[selectedWorld-1]?.[1]||'la planète précédente'} pour ouvrir cette planète.</p></div>`;return;}
const list=buildingList(selectedWorld);
detail.innerHTML=`<div class="building-balance"><div><small>SOLDE DISPONIBLE</small><strong>${fmt(s.money)}</strong></div><div><small>PRODUCTION</small><strong>${fmt(autoRate())}/s</strong></div></div>

  <div class="building-list">${list.map((x,b)=>{const n=s.buildings[selectedWorld+'-'+b]||0,c=buildingCost(selectedWorld,b);
    const income=baseProd(selectedWorld,b)*w[3]*prestigeMult()*globalMult()*autoMult()*incomeMult()*eventMultiplier('all');
    return `<article class="building"><div class="building-icon">${x[1]}</div><div class="building-info"><strong>${x[0]}</strong><small>Niv. ${n} · +${fmt(income)}/s</small><em>Prochain: ${fmt(c)}</em></div><button class="buy" data-buy="${b}" ${s.money<c?'disabled':''}>ACHETER</button></article>`;
  }).join('')}</div>`;
}

function renderPlanets(){
const strip=document.getElementById('planetStrip'),detail=document.getElementById('planetDetail');if(!strip||!detail)return;
strip.innerHTML=worldStrip();const w=WORLDS[selectedWorld],ok=planetUnlocked(selectedWorld),lv=planetLevels(selectedWorld),count=buildingList(selectedWorld).length;
detail.innerHTML=ok?`<article class="planet-card"><div class="planet-head"><div><h3>${w[0]} ${w[1]}</h3><p>Multiplicateur x${w[3]} · ${lv}/${count*10} niveaux</p></div><span class="badge">${planetDone(selectedWorld)?'COMPLÈTE':'ACTIVE'}</span></div><div class="progress"><i style="width:${Math.min(100,lv/(count*10)*100)}%"></i></div><button class="wide secondary" data-go="buildings">🏗️ Ouvrir les bâtiments</button></article>`:`<div class="planet-card locked-card"><div class="big-icon">🔒</div><h3>${w[0]} ${w[1]}</h3><p>🔒 Pour l’ouvrir : 1 de chacun des ${buildingList(selectedWorld-1)?.length||12} bâtiments sur ${WORLDS[selectedWorld-1]?.[1]||'la planète précédente'}.</p></div>`;
}

function renderResearch(){
const list=document.getElementById('researchList');if(!list)return;
list.innerHTML=TECH.map((t,i)=>{const owned=tech(t[0]),prev=i?TECH[i-1][0]:null,available=!prev||tech(prev);
return `<article class="research-card ${available?'':'locked-tech'}"><div><span>${owned?'✅':available?'🧪':'🔒'}</span><strong>${t[1]}</strong><small>${t[3]}</small></div><button class="buy" data-research="${t[0]}" ${owned||!available||s.money<t[2]?'disabled':''}>${owned?'ACQUISE':available?fmt(t[2]):'VERROUILLÉE'}</button></article>`;
}).join('');setText('researchCount',Object.keys(s.research).length+'/'+TECH.length);
}

function renderMissions(){
ensureWeekly();const list=document.getElementById('missionList');if(!list)return;
list.innerHTML=`<div class="mission-section"><h3>📜 Campagne</h3>${MISSION_BASE.map(m=>missionCard(m,false)).join('')}</div>

  <div class="mission-section"><h3>🌍 Missions planétaires</h3>${PLANET_MISSIONS.map(m=>missionCard(m,false)).join('')}</div>
  <div class="mission-section"><h3>📅 Quêtes hebdomadaires <small>semaine du ${s.weekly.key}</small></h3>${WEEKLY.map(m=>missionCard(m,true)).join('')}</div><div id="prestigeCard"></div>`;
  renderPrestige();setText('missionCount',Object.keys(s.missions).length+' / '+(MISSION_BASE.length+PLANET_MISSIONS.length));
}
function missionCard(m,weekly){
  const id=m[0],claimed=weekly?s.weekly.claimed[id]:s.missions[id],v=weekly?weeklyValue(m):missionValue(m),need=m[3],pct=Math.min(100,v/need*100);
  return `<article class="mission-card"><div class="mission-top"><strong>${claimed?'✅':'🎯'} ${m[1]}</strong><span>${fmt(m[4])}</span></div><small>${fmt(v)} / ${fmt(need)}</small><div class="bar"><i style="width:${pct}%"></i></div><button class="buy" data-${weekly?'weekly':'mission'}="${id}" ${claimed||v<need?'disabled':''}>${claimed?'RÉCLAMÉ':'RÉCLAMER'}</button></article>`;
}

function prestigeRequirement(){
const target=1e14*Math.pow(18,s.prestige),worlds=WORLDS.reduce((n,_,i)=>n+(planetUnlocked(i)?1:0),0);
const allTen=WORLDS.slice(0,worlds).every((_,w)=>buildingList(w).every((_,b)=>(s.buildings[w+'-'+b]||0)>=10));
return{target,worlds,allTen,ok:s.runTotal>=target&&worlds>=1&&allTen};
}
function renderPrestige(){
const box=document.getElementById('prestigeCard');if(!box)return;const p=prestigeRequirement();
const gain=Math.max(1,Math.floor(Math.log10(Math.max(10,s.runTotal/Math.max(1,p.target)))));
box.innerHTML=`<div class="prestige-card"><div class="mission-top"><strong>👑 Prestige ${s.prestige+1}</strong><span>+${gain} jeton${gain>1?'s':''}</span></div><p>Recommence un run avec <strong>10 de chaque bâtiment sur chacune des ${p.worlds} planète(s) débloquée(s)</strong> et ${fmt(p.target)} de crédits de run. Le prestige conserve technologies, niveau, missions, cristaux et améliorations boutique.</p><small>${p.allTen?'✅ Tous les bâtiments requis sont au niveau 10.':'🔒 Il faut 10 de chaque bâtiment sur toutes les planètes débloquées.'}</small><small>Bonus permanent actuel : x${prestigeMult().toFixed(2)} production/clic.</small><button class="wide primary" data-prestige="1" ${p.ok?'':'disabled'}>ASCENSIONNER</button></div>`;
}

function renderShop(){
const list=document.getElementById('shopList');if(!list)return;
list.innerHTML=SHOP_ITEMS.map(x=>{const lv=shopLevel(x[0]),cost=shopCost(x[0]);return `<article class="shop-card"><div class="shop-icon">${x[2]}</div><div><strong>${x[1]}</strong><small>${x[3]}</small><em>Niveau ${lv}</em></div><button class="buy" data-shop="${x[0]}" ${s.crystals<cost?'disabled':''}>${fmt(cost)} 💎</button></article>`}).join('');
setText('shopCrystals',fmt(s.crystals));
}
function shopCost(id){const x=SHOP_ITEMS.find(v=>v[0]===id);if(!x)return Infinity;return Math.ceil(x[4]*Math.pow(1.9,shopLevel(id)));}
function buyShop(id){
const x=SHOP_ITEMS.find(v=>v[0]===id),cost=shopCost(id);if(!x||s.crystals<cost)return;
s.crystals-=cost;s.shopUpgrades[id]=shopLevel(id)+1;save();toast('💎 '+x[1]+' niveau '+s.shopUpgrades[id]);renderShop();uiHeader();syncCloud();
}

function activeEvent(){
const e=s.event?.current;if(!e||Date.now()>=Number(s.event.activeUntil||0))return null;
return EVENTS.find(x=>x[0]===e)||null;
}
function eventMultiplier(kind){
const e=activeEvent();if(!e)return 1;
if(e[4]===kind||e[4]==='global'&&kind==='all'||e[4]==='global'&&kind==='global')return 1+(e[5]-1)*(1+0.05*shopLevel('event'));
return 1;
}
function crystalChance(){
return Math.min(.08,.008+shopLevel('crystal')*0.0015+(activeEvent()?.[4]==='crystal'?0.024:0));
}
function eventDurationMs(minutes){
return minutes*60000*Math.pow(1.08,shopLevel('duration'));
}
function scheduleEvent(from=Date.now()){
const gap=(20+Math.random()*100)*60000;
s.event.nextAt=from+gap;s.event.current=null;s.event.activeUntil=0;
}
function checkEvents(){
const now=Date.now();
if(!s.event?.nextAt){scheduleEvent(now);return;}
if(activeEvent())return;
if(now>=s.event.nextAt){
const e=EVENTS[Math.floor(Math.random()*EVENTS.length)];
s.event.current=e[0];
s.event.activeUntil=now+eventDurationMs(e[6]);
scheduleEvent(s.event.activeUntil);
toast(e[2]+' '+e[1]+' !');
save();
}
if(s.event.current&&now>=s.event.activeUntil)s.event.current=null;
}

function crystalAutoFarm(){
const now=Date.now();
const previous=Number(s.lastCrystalCheckAt||now);

// Nombre de minutes complètes écoulées
const minutes=Math.floor(Math.max(0,now-previous)/60000);

if(minutes<=0)return 0;

// On limite le nombre de tirages pour éviter un énorme calcul
// après une très longue absence.
const rolls=Math.min(minutes,1440);

let found=0;

for(let i=0;i<rolls;i++){
// Base : 1 chance sur 1000 par minute
const chance=0.001;

if(Math.random()<chance){
  s.crystals++;
  found++;
}

}

s.lastCrystalCheckAt=previous+rolls*60000;

if(found>0){
save();
toast('💎 '+found+' cristal'+(found>1?'s':'')+' trouvé'+(found>1?'s':'')+' automatiquement !');
}

return found;
}

function mine(){
  earn(clickPower());
  s.cLICKS++;
  s.combo=Math.min(12,s.combo+1);
  comboUntil=Date.now()+1700;
  setText('combo',s.combo);
  const bar=document.getElementById('comboBar');
  if(bar)bar.style.width=(s.combo/12*100)+'%';
  if(performance.now()-lastUi>120){
    uiHeader();
    lastUi=performance.now();
  }
}
function buyBuilding(b){
const list=buildingList(selectedWorld),c=buildingCost(selectedWorld,b);if(!planetUnlocked(selectedWorld))return;
if(s.money<c){toast('💸 Il manque '+fmt(c-s.money));return;}
spend(c);const key=selectedWorld+'-'+b;s.buildings[key]=(s.buildings[key]||0)+1;s.xp+=20;save();renderBuildings();uiHeader();syncCloud();
}
function doResearch(id){
const t=TECH_BY_ID[id];if(!t||tech(id))return;const idx=TECH.findIndex(x=>x[0]===id);
if(idx>0&&!tech(TECH[idx-1][0])){toast('🔒 Technologie précédente requise');return;}
if(s.money<t[2]){toast('💸 Technologie trop chère');return;}
spend(t[2]);s.research[id]=true;s.xp+=500;save();toast('🧪 '+t[1]+' activée');renderResearch();uiHeader();syncCloud(true);
}
function claimMission(id){
const m=MISSION_BASE.concat(PLANET_MISSIONS).find(x=>x[0]===id);if(!m||s.missions[id]||missionValue(m)<m[3])return;
s.missions[id]=true;earn(m[4]);save();toast('🎯 Récompense +'+fmt(m[4]));renderMissions();uiHeader();syncCloud(true);
}
function claimWeekly(id){
ensureWeekly();const m=WEEKLY.find(x=>x[0]===id);if(!m||s.weekly.claimed[id]||weeklyValue(m)<m[3])return;
s.weekly.claimed[id]=true;earn(m[4]);save();toast('📅 Quête hebdo +'+fmt(m[4]));renderMissions();uiHeader();syncCloud(true);
}
function doPrestige(){
const p=prestigeRequirement();if(!p.ok){toast('🔒 Conditions de prestige non remplies');return;}
const gain=Math.max(1,Math.floor(Math.log10(Math.max(10,s.runTotal/p.target)))+1);
const keep={
nickname:s.nickname,
prestige:s.prestige+gain,
prestigeShards:s.prestigeShards+gain,
research:{...s.research},
missions:{...s.missions},
weekly:{...s.weekly},
shopUpgrades:{...s.shopUpgrades},
crystals:s.crystals,
xp:s.xp,
level:s.level,
cLICKS:s.cLICKS,
lifetimeTotal:s.lifetimeTotal,
online:s.online
};
s=Object.assign(fresh(),keep);save();toast('👑 Prestige réussi : +'+gain);renderAll();syncCloud(true);
}

function earnOffline(){
const now=Date.now(),previous=Number(s.lastActiveAt||now),elapsed=Math.max(0,now-previous),seconds=Math.min(elapsed/1000,offlineCap());
s.lastOfflineClaimAt=now;s.lastActiveAt=now;if(seconds<10){save();return 0;}
const rate=Math.max(0,Number(autoRate())||0),bonus=rate*seconds*0.75*shopMult('offline',1.05);
if(Number.isFinite(bonus)&&bonus>0)earn(bonus);s.offlineLast=Number.isFinite(bonus)?bonus:0;save();return Number.isFinite(bonus)?bonus:0;
}

async function ensureAuth(){
if(!sb)throw new Error('SDK cloud indisponible');const {data,error}=await sb.auth.getSession();if(error)throw error;
if(data.session){s.online=true;return data.session;}const r=await sb.auth.signInAnonymously();if(r.error)throw r.error;s.online=true;return r.data.session;
}
async function syncCloud(force=false){
if(resetting||syncing||(!force&&Date.now()-lastCloud<12000)||!sb)return;syncing=true;lastCloud=Date.now();
try{await ensureAuth();if(resetting)return;const {error}=await sb.functions.invoke('game-sync',{body:{nickname:s.nickname,total:s.lifetimeTotal,prestige:s.prestige,level:s.level,xp:s.xp,state:s}});if(error)throw error;s.online=true;}
catch(e){console.warn('Cloud sync:',e);s.online=false;}finally{syncing=false;if(!resetting)uiHeader();}
}
async function loadCloud(){
if(!sb||resetting)return;
try{const session=await ensureAuth();if(resetting)return;const {data,error}=await sb.from('player_state').select('state').eq('user_id',session.user.id).maybeSingle();if(error)throw error;
if(!resetting&&data?.state&&Number(data.state.lifetimeTotal||data.state.total||0)>s.lifetimeTotal){const nick=s.nickname;s=Object.assign(fresh(),data.state);s.nickname=s.nickname||nick;s=migrateState(s);}
if(resetting)return;s.online=true;save();uiHeader();await syncCloud(true);
}catch(e){s.online=false;uiHeader();}
}
async function saveProfile(){
const input=document.getElementById('nickname');if(input)s.nickname=(input.value.trim()||'Mineur').slice(0,20);
save();await syncCloud(true);toast(s.online?'☁️ Profil publié':'📱 Profil local');renderProfile();
}

async function resetGame(){
if(resetting)return;const confirmed=confirm('Réinitialiser toute la progression ? Cette action est irréversible.');if(!confirmed)return;resetting=true;
const btn=document.getElementById('resetBtn');if(btn){btn.disabled=true;btn.textContent='RÉINITIALISATION…';}
try{
let attempts=0;while(syncing&&attempts<100){await new Promise(resolve=>setTimeout(resolve,100));attempts++;}
if(sb){try{const session=await sb.auth.getSession();if(session?.data?.session)await sb.functions.invoke('game-sync',{body:{action:'reset'}});}catch(e){console.warn('Reset Supabase:',e);}}
try{LEGACY_KEYS.forEach(k=>localStorage.removeItem(k));localStorage.removeItem('sm-world');localStorage.clear();sessionStorage.clear();}catch(e){}
try{if('caches'in window)await Promise.all((await caches.keys()).map(k=>caches.delete(k)));}catch(e){}
s=fresh();selectedWorld=0;currentScreen='mine';sessionStorage.setItem('sm-reset-complete','1');syncing=false;
window.location.replace(location.pathname+'?newgame='+Date.now());
}catch(e){console.error('RESET ERROR:',e);resetting=false;syncing=false;if(btn){btn.disabled=false;btn.textContent='Réinitialiser la partie';}alert('Impossible de réinitialiser la partie.');}
}
function esc(x){return String(x).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function renderRank(){const box=document.getElementById('rankList');if(!box)return;box.innerHTML='<div class="section-note">☁️ Chargement du classement mondial…</div>';
ensureAuth().then(async()=>{const {data,error}=await sb.from('leaderboard').select('nickname,total,prestige,level').order('total',{ascending:false}).order('prestige',{ascending:false}).order('level',{ascending:false}).limit(100);if(error)throw error;
setText('rankMe','☁️ Score synchronisé · '+s.nickname+' · '+fmt(s.lifetimeTotal));box.innerHTML=data?.length?data.map((r,i)=>`<div class="rank-row"><div class="pos">${i<3?['🥇','🥈','🥉'][i]:i+1}</div><div><strong>${esc(r.nickname)}</strong><small>Niv. ${r.level} · Prestige ${r.prestige}</small></div><b>${fmt(Number(r.total))}</b></div>`).join(''):'<div class="section-note">🏆 Aucun joueur classé pour le moment.</div>';
}).catch(()=>{setText('rankMe','📱 Classement local');box.innerHTML='<div class="section-note">⚠️ Le cloud est indisponible. Active la connexion invité dans Profil pour publier ton score.</div>';});
}
function renderProfile(){const input=document.getElementById('nickname');if(input)input.value=s.nickname;}

function renderAll(){
uiHeader();if(currentScreen==='buildings')renderBuildings();if(currentScreen==='planets')renderPlanets();if(currentScreen==='research')renderResearch();
if(currentScreen==='missions')renderMissions();if(currentScreen==='rank')renderRank();if(currentScreen==='profile')renderProfile();if(currentScreen==='shop')renderShop();
}

document.addEventListener('click',e=>{
const b=e.target.closest('button');if(!b)return;
if(b.id==='resetBtn'){e.preventDefault();e.stopPropagation();resetGame();return;}
if(b.id==='mineBtn'){e.preventDefault();mine();return;}
if(b.dataset.go){e.preventDefault();setScreen(b.dataset.go);return;}
if(b.dataset.world){const i=Number(b.dataset.world);if(planetUnlocked(i)){selectedWorld=i;localStorage.setItem('sm-world',String(i));if(currentScreen==='buildings')renderBuildings();else if(currentScreen==='planets')renderPlanets();}else toast('🔒 Planète verrouillée');return;}
if(b.dataset.buy!==undefined){buyBuilding(Number(b.dataset.buy));return;}
if(b.dataset.research){doResearch(b.dataset.research);return;}
if(b.dataset.mission){claimMission(b.dataset.mission);return;}
if(b.dataset.weekly){claimWeekly(b.dataset.weekly);return;}
if(b.dataset.prestige){doPrestige();return;}
if(b.dataset.shop){buyShop(b.dataset.shop);return;}
if(b.id==='refreshRank'){renderRank();return;}
if(b.id==='accountBtn'){setScreen('profile');return;}
if(b.id==='saveProfile'){saveProfile();return;}
if(b.id==='guestBtn'){ensureAuth().then(()=>{s.online=true;syncCloud(true);toast('☁️ Classement mondial activé');}).catch(()=>toast('⚠️ Active Anonymous Sign-Ins dans Supabase'));return;}
if(b.id==='closeModal'){document.getElementById('modal')?.classList.add('hidden');return;}
},{passive});

document.addEventListener('pointerup',e=>{if(e.target.closest('#mineBtn'))e.preventDefault();},{passive});

setInterval(()=>{
checkEvents();
ensureWeekly();

// 💎 Farm automatique des cristaux
crystalAutoFarm();

if(Date.now()>comboUntil&&s.combo){
s.combo=0;
setText('combo',0);

const bar=document.getElementById('comboBar');
if(bar)bar.style.width='0%';

}

earn(autoRate()/4);

if(!document.hidden)s.lastActiveAt=Date.now();

if(performance.now()-lastUi>500){
uiHeader();

if(currentScreen==='buildings')renderBuildings();
if(currentScreen==='shop')renderShop();

lastUi=performance.now();

}
},250);

setInterval(()=>{if(!resetting){save();syncCloud();}},5000);

window.addEventListener('pagehide',()=>{if(resetting)return;s.lastActiveAt=Date.now();save();});
document.addEventListener('visibilitychange',()=>{
if(document.hidden&&!resetting){
s.lastActiveAt=Date.now();
save();
syncCloud(true);
}else if(!document.hidden){
crystalAutoFarm();
checkEvents();
uiHeader();
}
});

let selectedWorld=Math.max(0,Math.min(WORLDS.length-1,Number(localStorage.getItem('sm-world')||0)));
let currentScreen='mine',comboUntil=0,lastUi=0,lastCloud=0,syncing=false,resetting=false,toastTimer=0;
s=load();
const crystalBonus=crystalAutoFarm();
const offlineBonus=earnOffline();
if(!s.event.nextAt)scheduleEvent();
checkEvents();uiHeader();setScreen('mine');
if(offlineBonus>0)setTimeout(()=>toast('🌙 Gain hors-ligne : +'+fmt(offlineBonus)),500);
let skipCloud=false;try{skipCloud=sessionStorage.getItem('sm-reset-complete')==='1';if(skipCloud)sessionStorage.removeItem('sm-reset-complete');}catch(e){}
if(!skipCloud)loadCloud();