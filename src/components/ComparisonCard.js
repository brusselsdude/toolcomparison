import Link from 'next/link';
import { getCategoryBySlug } from '@/data/categories';

export default function ComparisonCard({ comparison }) {
  const c = comparison;
  const cat = getCategoryBySlug(c.category);
  const scores = c.scores || {};
  const hasScores = Object.keys(scores).length > 0;
  const topScore = hasScores ? Math.max(...Object.values(scores)) : 0;

  return (
    <Link
      href={`/comparisons/${c.slug}/`}
      className="group glass-card-hover flex flex-col overflow-hidden"
    >
      {/* Emoji header */}
      <div className={`relative h-28 flex items-center justify-center bg-gradient-to-br ${cat?.gradient || 'from-electric-500/10 to-electric-600/5'}`}>
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
          {c.emoji}
        </span>
        {c.verdict && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-midnight-950/70 backdrop-blur-sm border border-white/10 rounded-lg">
            <span className="text-[10px] font-semibold text-electric-300">
              Pick: {c.verdict}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Category + read time */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {cat && (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${cat.tagClass}`}>
              {cat.name}
            </span>
          )}
          <span className="text-[11px] text-midnight-500 ml-auto">
            {c.readTime} min
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-[16px] font-semibold text-white leading-snug mb-2 group-hover:text-electric-300 transition-colors line-clamp-2">
          {c.seoTitle || c.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-midnight-400 leading-relaxed flex-1 line-clamp-2">
          {c.description}
        </p>

        {/* Tools pills */}
        {c.tools && c.tools.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 mb-3">
            {c.tools.slice(0, 4).map((tool) => (
              <span key={tool} className="px-1.5 py-0.5 text-[10px] font-medium bg-midnight-900 text-midnight-400 rounded border border-midnight-800 truncate max-w-[100px]">
                {tool}
              </span>
            ))}
          </div>
        )}

        {/* Score bars (only old posts with scores) */}
        {hasScores && (
          <div className="pt-3 border-t border-white/[0.04]">
            {Object.entries(scores).map(([tool, score]) => (
              <div key={tool} className="flex items-center gap-2 mb-1 last:mb-0">
                <span className="text-[10px] text-midnight-500 w-20 truncate">{tool}</span>
                <div className="flex-1 h-1 bg-midnight-900 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(score / 10) * 100}%`,
                      background: score === topScore ? 'linear-gradient(90deg, #06b6d4, #22ff88)' : '#334155',
                    }}
                  />
                </div>
                <span className={`text-[10px] font-mono w-5 text-right ${score === topScore ? 'text-electric-400' : 'text-midnight-600'}`}>
                  {score}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className={`mt-3 flex items-center justify-between ${!hasScores ? 'pt-3 border-t border-white/[0.04]' : ''}`}>
          <span className="text-[10px] text-midnight-600">
            {new Date(c.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-[11px] text-electric-400 font-medium group-hover:text-electric-300 transition-colors">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}
