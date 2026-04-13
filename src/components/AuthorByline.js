import Link from 'next/link';

export default function AuthorByline({ author, date, updatedDate, readTime }) {
  const initials = author?.name
    ? author.name.split(' ').map(n => n[0]).join('')
    : 'TD';

  const pubDate = date ? new Date(date) : null;
  const updDate = updatedDate ? new Date(updatedDate) : null;
  const showUpdated = updDate && pubDate && updDate.getTime() - pubDate.getTime() > 7 * 86400000;

  return (
    <div className="flex items-center gap-4 py-4 mb-6 border-b border-white/[0.04]">
      {/* Avatar */}
      <Link href="/about/" className="shrink-0">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-electric-500/30 to-electric-600/20 border border-electric-500/20 flex items-center justify-center">
          <span className="text-sm font-bold text-electric-300">{initials}</span>
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        {/* Author name + role */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/about/" className="text-sm font-semibold text-white hover:text-electric-300 transition-colors">
            {author?.name || 'Tool Decision Engine'}
          </Link>
          {author?.role && (
            <span className="text-[11px] text-midnight-500 hidden sm:inline">
              · {author.role}
            </span>
          )}
        </div>

        {/* Dates + read time */}
        <div className="flex items-center gap-2 flex-wrap mt-0.5">
          {pubDate && (
            <time dateTime={date} className="text-xs text-midnight-500">
              {pubDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          )}
          {showUpdated && (
            <>
              <span className="text-xs text-midnight-700">·</span>
              <span className="text-xs text-electric-500/70">
                Updated {updDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </>
          )}
          {readTime && (
            <>
              <span className="text-xs text-midnight-700">·</span>
              <span className="text-xs text-midnight-500">{readTime} min read</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
