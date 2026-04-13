'use client';

import { useEffect, useRef, useState } from 'react';

let mermaidLoadPromise = null;

function loadMermaid() {
  if (mermaidLoadPromise) return mermaidLoadPromise;
  mermaidLoadPromise = new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.mermaid) {
      resolve(window.mermaid);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
    script.onload = () => {
      if (window.mermaid) {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            primaryColor: '#0e7490',
            primaryTextColor: '#e2e8f0',
            primaryBorderColor: '#155e75',
            lineColor: '#22d3ee',
            secondaryColor: '#1e293b',
            tertiaryColor: '#0f172a',
            background: '#0a1230',
            mainBkg: '#0e7490',
            nodeBorder: '#22d3ee',
            clusterBkg: '#0f172a',
            clusterBorder: '#1e3a5f',
            titleColor: '#e2e8f0',
            edgeLabelBackground: '#0a1230',
            nodeTextColor: '#f1f5f9',
          },
          flowchart: { htmlLabels: true, curve: 'basis', padding: 15 },
          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
        });
        resolve(window.mermaid);
      } else {
        reject(new Error('mermaid not found on window'));
      }
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return mermaidLoadPromise;
}

export default function MermaidDiagram({ chart, title }) {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!chart) return;
    let cancelled = false;

    loadMermaid()
      .then(async (mermaid) => {
        const id = 'mm-' + Math.random().toString(36).slice(2, 9);
        const { svg: rendered } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(rendered);
      })
      .catch(() => { if (!cancelled) setError(true); });

    return () => { cancelled = true; };
  }, [chart]);

  if (error || !chart) return null;

  if (!svg) {
    return (
      <div className="my-8 rounded-xl border border-white/[0.06] bg-midnight-925 p-8 text-center">
        <div className="animate-pulse text-midnight-500 text-sm">Loading diagram...</div>
      </div>
    );
  }

  return (
    <figure className="my-10">
      <div
        className="rounded-xl border border-white/[0.06] bg-midnight-925/80 p-6 overflow-x-auto [&_svg]:max-w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
        style={{ minHeight: '100px' }}
      />
      {title && (
        <figcaption className="mt-2 text-center text-xs text-midnight-500 italic">
          {title}
        </figcaption>
      )}
    </figure>
  );
}
