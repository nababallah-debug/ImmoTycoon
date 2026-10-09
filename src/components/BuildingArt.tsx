import { memo } from 'react';

interface Props { type: string; className?: string }

export const BuildingArt = memo(function BuildingArt({ type, className = '' }: Props) {
  const park = type === 'park';
  const solar = type === 'solar' || type === 'wind';
  const tall = ['office', 'apartment', 'hotel', 'hospital', 'lab'].includes(type);
  const industry = ['factory', 'warehouse'].includes(type);
  const roof = type === 'cafe' || type === 'shop' ? '#477963' : industry ? '#7b8890' : '#d7845c';
  const wall = type === 'apartment' ? '#dd9b79' : type === 'office' || type === 'lab' ? '#e4e9e5' : '#f1e5cb';
  return <svg className={`building-art ${className}`} viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <ellipse cx="40" cy="66" rx="29" ry="9" fill="#283d2d" opacity=".07" />
    <path d="M7 53L39 36L72 53L40 71Z" fill={park ? '#a3bd80' : '#d7dfcf'} />
    <path d="M7 53V57L40 75L72 57V53L40 71Z" fill="#bccbb4" />
    {park ? <>
      <path d="M20 55L39 44L60 55L40 65Z" fill="#dcdcc0" />
      <ellipse cx="41" cy="55" rx="11" ry="6" fill="#9ebdb0" />
      <ellipse cx="41" cy="54" rx="8" ry="4" fill="#87c4c8" />
      <path d="M41 51V43" stroke="#eeeade" strokeWidth="3" strokeLinecap="round" />
      {[{ x: 19, y: 37 }, { x: 58, y: 35 }, { x: 33, y: 29 }].map((p, i) => <g key={i}>
        <path d={`M${p.x} ${p.y + 9}v12`} stroke="#8b7954" strokeWidth="3" />
        <ellipse cx={p.x} cy={p.y} rx="10" ry="12" fill={i === 1 ? '#72955d' : '#52794c'} />
        <ellipse cx={p.x - 3} cy={p.y - 3} rx="6" ry="8" fill="#77985c" />
      </g>)}
    </> : solar ? <>
      <path d="M23 47V62M57 37V55" stroke="#8a9992" strokeWidth="3" />
      <path d="M12 43L46 24L67 36L33 56Z" fill="#365b6b" stroke="#e5ece7" strokeWidth="2" />
      <path d="M24 37L45 49M35 31L56 42M23 49L57 30" stroke="#8db3ba" strokeWidth="1" />
      {type === 'wind' && <><path d="M43 54V13" stroke="#f7f7ef" strokeWidth="4" /><path d="M43 14L28 9M43 14L52 2M43 14L48 29" stroke="#f7f7ef" strokeWidth="3" strokeLinecap="round" /></>}
    </> : <>
      <path d={tall ? 'M16 23L41 37V66L16 52Z' : 'M16 36L41 50V66L16 52Z'} fill={wall} />
      <path d={tall ? 'M41 37L65 24V53L41 66Z' : 'M41 50L65 37V53L41 66Z'} fill={tall ? '#cbd6cd' : '#d6cbb3'} />
      {tall ? <>
        <path d="M13 23L38 9L68 24L41 39Z" fill={type === 'apartment' ? '#b56949' : '#83918a'} />
        <path d="M20 23L39 13L61 24L41 35Z" fill={type === 'apartment' ? '#c6815a' : '#b8c2b8'} />
        {[0, 1, 2].map(row => <g key={row}>
          <path d={`M22 ${30 + row * 9}l5 3v5l-5-3zM32 ${35 + row * 9}l5 3v5l-5-3z`} fill="#577d81" />
          <path d={`M46 ${41 + row * 8}l5-3v5l-5 3zM56 ${35 + row * 8}l5-3v5l-5 3z`} fill="#426f75" />
        </g>)}
        {type === 'hospital' && <path d="M31 19v8M27 23h8" stroke="#f7f8f4" strokeWidth="3" />}
      </> : <>
        <path d="M11 37L26 18L47 30L41 51Z" fill={roof} />
        <path d="M26 18L52 5L70 36L47 49L47 30Z" fill={type === 'cafe' ? '#679478' : industry ? '#a0adb1' : '#e79c6a'} />
        <path d="M26 18L47 30" stroke="#fff" strokeOpacity=".15" strokeWidth="2" />
        <path d="M22 43l6 3v8l-6-3zM47 52l6-3v8l-6 3z" fill="#638080" />
        <path d="M32 49l5 3v10l-5-3z" fill="#96714f" />
        {['cafe', 'shop', 'bakery'].includes(type) && <path d="M44 50L67 37L68 42L44 55Z" fill="#2e6550" />}
        {industry && <><path d="M56 26V8L61 5V25" fill="#939c95" /><path d="M56 8L61 5L65 7L60 10Z" fill="#c5c9bd" /></>}
      </>}
      <path d="M9 57v-9" stroke="#8a7756" strokeWidth="2" />
      <ellipse cx="9" cy="43" rx="7" ry="9" fill="#6b935c" />
      <ellipse cx="7" cy="40" rx="4" ry="6" fill="#86a86d" />
    </>}
  </svg>;
});