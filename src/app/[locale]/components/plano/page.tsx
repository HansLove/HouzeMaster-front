'use client';

import { useEffect, useRef, useState } from 'react';

export default function PlanoPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch('/assets/plano.svg', { cache: 'force-cache' });
      const svg = await res.text();
      if (ref.current) {
        ref.current.innerHTML = svg;   // inyecta el SVG inline
        setReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!ready || !ref.current) return;
    const svg = ref.current.querySelector('svg');
    if (!svg) return;

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t?.id?.startsWith('lote_')) { t.style.cursor = 'pointer'; t.setAttribute('fill', '#D1E7DD'); }
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t?.id?.startsWith('lote_')) { t.setAttribute('fill', '#CCCCCC'); }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const m = t?.id?.match(/^lote_(\d+)$/);
      if (m) alert(`Lote ${m[1]}`);
    };

    svg.addEventListener('mouseover', onOver);
    svg.addEventListener('mouseout', onOut);
    svg.addEventListener('click', onClick);
    return () => {
      svg.removeEventListener('mouseover', onOver);
      svg.removeEventListener('mouseout', onOut);
      svg.removeEventListener('click', onClick);
    };
  }, [ready]);

  return (
    <div className="min-h-screen p-4 bg-neutral-50">
      <h1 className="text-2xl font-semibold mb-4">Plano</h1>
      <div className="border rounded bg-white shadow-sm overflow-auto">
        <div ref={ref} className="w-full h-full" />
      </div>
      <p className="text-xs text-neutral-500 mt-2">IDs esperados: <code>lote_123</code>.</p>
    </div>
  );
}
