'use client';

const CATEGORY_THEMES = {
  'ai-tools':          { bg: '#1a0533', accent: '#a855f7', glow: '#7c3aed' },
  'saas-productivity': { bg: '#0a1a33', accent: '#3b82f6', glow: '#2563eb' },
  'website-nocode':    { bg: '#0a2620', accent: '#10b981', glow: '#059669' },
  'business-crm':      { bg: '#1a1500', accent: '#f59e0b', glow: '#d97706' },
  'cybersecurity':     { bg: '#1a0a0a', accent: '#ef4444', glow: '#dc2626' },
  'cloud-dev':         { bg: '#0a1a2e', accent: '#0ea5e9', glow: '#0284c7' },
  'automation':        { bg: '#1a1000', accent: '#f97316', glow: '#ea580c' },
  'marketing-seo':     { bg: '#1a0a1a', accent: '#ec4899', glow: '#db2777' },
  'dev-tools':         { bg: '#0f1a0a', accent: '#84cc16', glow: '#65a30d' },
};

export default function ComparisonHero({ tools = [], category = '', verdict = '', emoji = '' }) {
  const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES['ai-tools'];
  const isVs = tools.length >= 2;
  
  // Create a deterministic "random" from tool names for variety
  const seed = tools.join('').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const patternAngle = (seed % 60) + 15;
  const blobX = 300 + (seed % 200);
  const blobY = 50 + (seed % 100);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-8" style={{ aspectRatio: '21/9' }}>
      <svg viewBox="0 0 840 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id={`bg-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.bg} />
            <stop offset="100%" stopColor="#060b1d" />
          </linearGradient>
          <radialGradient id={`glow-${seed}`} cx={`${blobX/840*100}%`} cy={`${blobY/360*100}%`} r="40%">
            <stop offset="0%" stopColor={theme.glow} stopOpacity="0.3" />
            <stop offset="100%" stopColor={theme.glow} stopOpacity="0" />
          </radialGradient>
          <filter id={`blur-${seed}`}>
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <pattern id={`grid-${seed}`} width="40" height="40" patternUnits="userSpaceOnUse" patternTransform={`rotate(${patternAngle})`}>
            <line x1="0" y1="0" x2="0" y2="40" stroke={theme.accent} strokeWidth="0.3" strokeOpacity="0.15" />
            <line x1="0" y1="0" x2="40" y2="0" stroke={theme.accent} strokeWidth="0.3" strokeOpacity="0.15" />
          </pattern>
        </defs>

        {/* Background */}
        <rect width="840" height="360" fill={`url(#bg-${seed})`} />
        <rect width="840" height="360" fill={`url(#grid-${seed})`} />
        <circle cx={blobX} cy={blobY} r="180" fill={`url(#glow-${seed})`} />
        <circle cx={840 - blobX} cy={360 - blobY} r="120" fill={theme.accent} fillOpacity="0.06" />

        {isVs ? (
          <>
            {/* VS layout — tool cards */}
            {tools.length === 2 && (
              <>
                {/* Tool A */}
                <rect x="60" y="80" width="300" height="200" rx="16" fill="white" fillOpacity="0.04" stroke={theme.accent} strokeWidth="1" strokeOpacity="0.2" />
                <rect x="60" y="80" width="300" height="4" rx="2" fill={theme.accent} fillOpacity="0.6" />
                <text x="210" y="175" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="28" fontWeight="700" fill="white" fillOpacity="0.95">
                  {tools[0].length > 16 ? tools[0].slice(0, 15) + '…' : tools[0]}
                </text>
                <text x="210" y="215" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="13" fill={theme.accent} fillOpacity="0.8">
                  {verdict === tools[0] ? '★ Our Pick' : 'Contender'}
                </text>

                {/* VS badge */}
                <circle cx="420" cy="180" r="32" fill={theme.bg} stroke={theme.accent} strokeWidth="2" strokeOpacity="0.4" />
                <text x="420" y="188" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="800" fill={theme.accent}>VS</text>

                {/* Tool B */}
                <rect x="480" y="80" width="300" height="200" rx="16" fill="white" fillOpacity="0.04" stroke={theme.accent} strokeWidth="1" strokeOpacity="0.2" />
                <rect x="480" y="80" width="300" height="4" rx="2" fill={theme.accent} fillOpacity="0.6" />
                <text x="630" y="175" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="28" fontWeight="700" fill="white" fillOpacity="0.95">
                  {tools[1].length > 16 ? tools[1].slice(0, 15) + '…' : tools[1]}
                </text>
                <text x="630" y="215" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="13" fill={theme.accent} fillOpacity="0.8">
                  {verdict === tools[1] ? '★ Our Pick' : 'Contender'}
                </text>
              </>
            )}

            {tools.length >= 3 && (
              <>
                {/* 3-way layout */}
                {tools.slice(0, 3).map((tool, idx) => {
                  const cx = 140 + idx * 280;
                  const isWinner = verdict === tool;
                  return (
                    <g key={tool}>
                      <rect x={cx - 120} y="85" width="240" height="190" rx="14" fill="white" fillOpacity={isWinner ? 0.06 : 0.03} stroke={theme.accent} strokeWidth={isWinner ? 2 : 1} strokeOpacity={isWinner ? 0.5 : 0.15} />
                      {isWinner && <rect x={cx - 120} y="85" width="240" height="4" rx="2" fill={theme.accent} fillOpacity="0.7" />}
                      <text x={cx} y="175" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="700" fill="white" fillOpacity="0.95">
                        {tool.length > 14 ? tool.slice(0, 13) + '…' : tool}
                      </text>
                      <text x={cx} y="210" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="12" fill={theme.accent} fillOpacity="0.8">
                        {isWinner ? '★ Our Pick' : 'Contender'}
                      </text>
                      {idx < tools.length - 1 && idx < 2 && (
                        <text x={cx + 140} y="185" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="800" fill={theme.accent} fillOpacity="0.4">VS</text>
                      )}
                    </g>
                  );
                })}
              </>
            )}

            {/* Bottom bar */}
            <text x="420" y="330" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fill="white" fillOpacity="0.25" letterSpacing="3">
              TOOLDECISIONENGINE.COM
            </text>
          </>
        ) : (
          <>
            {/* Single tool / Best-of layout */}
            <text x="420" y="130" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="48" fill="white" fillOpacity="0.15">{emoji}</text>
            <rect x="170" y="150" width="500" height="120" rx="16" fill="white" fillOpacity="0.04" stroke={theme.accent} strokeWidth="1" strokeOpacity="0.2" />
            <text x="420" y="215" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="600" fill="white" fillOpacity="0.9">
              {tools[0] || 'Expert Review'}
            </text>
            <text x="420" y="250" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="12" fill={theme.accent} fillOpacity="0.7">
              In-Depth Analysis & Verdict
            </text>
            <text x="420" y="330" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fill="white" fillOpacity="0.25" letterSpacing="3">
              TOOLDECISIONENGINE.COM
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
