import { useEffect, useRef } from 'react';

/**
 * Custom animated cursor with glow trail and magnetic interaction.
 * Only active on desktop (hover: hover, pointer: fine).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mql.matches) return;

    document.body.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;
    let raf = 0;
    let hovering = false;
    let magnetic = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="magnet"]')) {
        magnetic = true;
        hovering = true;
      } else if (target.closest('a, button, [data-cursor="hover"]')) {
        magnetic = false;
        hovering = true;
      } else {
        magnetic = false;
        hovering = false;
      }
    };

    const animate = () => {
      const ease = magnetic ? 0.18 : 0.15;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      if (ringRef.current) {
        const scale = hovering ? (magnetic ? 2.2 : 1.8) : 1;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.opacity = hovering ? '1' : '0.6';
      }
      if (glowRef.current) {
        const glowScale = hovering ? 1.5 : 1;
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%) scale(${glowScale})`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden="true">
      <div
        ref={glowRef}
        className="fixed left-0 top-0 h-8 w-8 rounded-full bg-accent/20 blur-xl"
        style={{ transition: 'opacity 0.3s' }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-accent/60"
        style={{ transition: 'transform 0.15s ease-out, opacity 0.3s, width 0.2s, height 0.2s' }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent"
        style={{ transition: 'opacity 0.3s' }}
      />
    </div>
  );
}
