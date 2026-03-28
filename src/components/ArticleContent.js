'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const MermaidDiagram = dynamic(() => import('./MermaidDiagram'), { ssr: false });

function AdSlot({ slot }) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      // AdSense not loaded yet, skip
    }
  }, []);

  return (
    <div className="my-10 flex justify-center">
      <div className="w-full max-w-2xl">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-client="ca-pub-5660843310926667"
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-slot={slot}
        />
      </div>
    </div>
  );
}

export default function ArticleContent({ content, mermaids = [], title = '' }) {
  // Split content at mermaid AND ad slot placeholders
  const parts = content.split(/(%%MERMAID_\d+%%|%%AD_SLOT_\d+%%)/);

  return (
    <article className="article-body">
      {parts.map((part, i) => {
        // Mermaid diagram
        const mermaidMatch = part.match(/%%MERMAID_(\d+)%%/);
        if (mermaidMatch) {
          const idx = parseInt(mermaidMatch[1], 10);
          const chart = mermaids[idx];
          if (!chart) return null;
          const diagramTitle = idx === 0
            ? `${title} — Quick Decision Flowchart`
            : `${title} — Who Should Choose What`;
          return <MermaidDiagram key={`mm-${idx}-${i}`} chart={chart} title={diagramTitle} />;
        }

        // Ad slot
        const adMatch = part.match(/%%AD_SLOT_(\d+)%%/);
        if (adMatch) {
          // Use slot number as a differentiator
          // These are auto-format in-article ads — Google picks the best format
          return <AdSlot key={`ad-${adMatch[1]}-${i}`} slot={`${adMatch[1]}`} />;
        }

        if (!part.trim()) return null;
        return <div key={`t-${i}`} dangerouslySetInnerHTML={{ __html: part }} />;
      })}
    </article>
  );
}
