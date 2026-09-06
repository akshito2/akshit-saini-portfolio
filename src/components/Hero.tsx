import { useEffect, useRef, useState } from 'react';
import { Play, ArrowRight, Trophy, Film, Users } from 'lucide-react';
import { profile } from '@/data/profile';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function Hero() {
  const isDesktop = useMediaQuery('(hover: hover) and (pointer: fine)');
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  const imgSrc = imgError ? profile.placeholderImage : profile.image;

  useEffect(() => {
    if (!isDesktop) return;
    const el = imageWrapRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      el.style.transform = `perspective(1200px) rotateY(${dx * 14}deg) rotateX(${-dy * 14}deg) translateZ(0)`;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isDesktop]);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-40 pb-16 lg:pt-36"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/0 via-ink-950/50 to-ink-950" />
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-blue-500/5 blur-[100px] animate-glow-pulse" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Left content */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <div
            className="reveal is-visible mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-ink-200"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            Available for freelance work
          </div>

          <h1 className="whitespace-nowrap font-display text-[clamp(2rem,8vw,5rem)] font-extrabold leading-none tracking-tight text-white uppercase">
            <span className="text-gradient">AKSHIT SAINI</span>
          </h1>

          <p className="mt-4 font-display text-lg font-semibold text-accent-gradient sm:text-xl">
            {profile.title}
          </p>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-200 sm:text-lg lg:mx-0">
            {profile.intro}
          </p>

          <h2 className="mt-8 font-display text-xl font-bold italic leading-snug text-white sm:text-2xl lg:text-3xl">
            "{profile.headline}"
          </h2>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <button
              onClick={() => scrollTo('#work')}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-ink-950 transition-all duration-300 hover:shadow-lg hover:shadow-accent/40 sm:w-auto"
              data-cursor="magnet"
            >
              <Play className="h-4 w-4 fill-current" />
              View My Work
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="group flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-accent/50 hover:bg-white/5 sm:w-auto"
              data-cursor="magnet"
            >
              Let's Work Together
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Stats row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <StatPill icon={Trophy} value="2+" label="Years Experience" />
            <StatPill icon={Film} value="400+" label="Videos Edited" />
            <StatPill icon={Users} value="50+" label="Clients" />
          </div>
        </div>

        {/* Right — Profile image */}
        <div className="order-1 flex justify-center lg:order-2">
          <div
            ref={imageWrapRef}
            className="relative will-change-transform"
            style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Glow behind */}
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-accent/10 to-transparent blur-3xl" />

            {/* Glass frame */}
            <div className="relative animate-float">
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-b from-accent/40 to-transparent opacity-60" />
              <div className="relative h-[380px] w-[320px] overflow-hidden rounded-[2rem] border border-white/15 glass-strong p-3 sm:h-[460px] sm:w-[380px]">
                <img
                  src={imgSrc}
                  alt="Akshit Saini — Professional Video Editor"
                  className="h-full w-full rounded-[1.6rem] object-cover"
                  loading="eager"
                  onError={() => setImgError(true)}
                />
                {/* Overlay gradient */}
                <div className="pointer-events-none absolute inset-3 rounded-[1.6rem] bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />

                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="rounded-xl glass-strong px-3 py-2">
                    <p className="text-xs font-semibold text-white">Akshit Saini</p>
                    <p className="text-[10px] text-ink-300">Video Editor</p>
                  </div>
                  {/*<div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/90 text-ink-950">
                    <Play className="h-4 w-4 fill-current" />
                  </div>*/}
                </div>
              </div>
            </div>

            {/* Floating accent dots */}
            <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-accent animate-float-slow" />
            <div className="absolute -bottom-3 -left-3 h-3 w-3 rounded-full bg-accent/60 animate-float" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <div className="h-2 w-1 rounded-full bg-accent animate-float" />
        </div>
      </div>
    </section>
  );
}

function StatPill({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Trophy;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl glass px-3.5 py-2.5">
      <Icon className="h-4 w-4 text-accent" />
      <div className="text-left">
        <p className="font-display text-sm font-bold text-white">{value}</p>
        <p className="text-[10px] text-ink-300">{label}</p>
      </div>
    </div>
  );
}
