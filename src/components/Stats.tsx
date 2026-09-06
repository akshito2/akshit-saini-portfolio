import { useEffect, useRef, useState } from 'react';
import { stats } from '@/data/profile';
import { Reveal } from '@/components/Reveal';
import { useInView } from '@/hooks/useInView';

export function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/50 to-transparent" />

      <div ref={ref} className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} variant="scale" delay={i * 100}>
              <Counter value={stat.value} suffix={stat.suffix} label={stat.label} active={inView} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({
  value,
  suffix,
  label,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [active, value]);

  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/10 glass p-8 text-center">
      <p className="font-display text-5xl font-extrabold text-accent-gradient lg:text-6xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium uppercase tracking-wider text-ink-300">{label}</p>
    </div>
  );
}
