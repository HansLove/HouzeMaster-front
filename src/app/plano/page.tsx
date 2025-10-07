'use client';
import { useEffect, useRef } from 'react';

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    fetch('/assets/plano.svg').then(r=>r.text()).then(html => {
      if (ref.current) ref.current.innerHTML = html;
    });
  }, []);
  return <div ref={ref} />;
}
  