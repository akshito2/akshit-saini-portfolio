import { useRef, useState } from 'react';
import { Clapperboard, Sparkles, Zap, Eye } from 'lucide-react';
import { profile } from '@/data/profile';
import { Reveal } from '@/components/Reveal';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function About() {
  const isDesktop = useMediaQuery('(hover: hover) and (pointer: fine)');
  const imgRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const imgSrc = imgError ? profile.placeholderImage : profile.aboutImage;

  const handleTilt = (e: React.MouseEvent) => {
    if (!isDesktop || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (0.5 - y) * 12;
    const tiltY = (x - 0.5) * 12;
    imgRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const resetTilt = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  };

  const focusAreas = [
    { icon: Clapperboard, label: 'Storytelling' },
    { icon: Zap, label: 'Pacing & Rhythm' },
    { icon: Eye, label: 'Visual Impact' },
    { icon: Sparkles, label: 'Motion Design' },
  ];

  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-accent/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal variant="up" className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">About Me</p>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            The Editor Behind <span className="text-accent-gradient">The Stories</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Image */}
          <Reveal variant="left">
            <div className="flex justify-center">
              <div
                ref={imgRef}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                className="relative will-change-transform"
                style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-accent/20 to-transparent blur-2xl" />
                <div className="relative h-[420px] w-[360px] overflow-hidden rounded-[1.8rem] border border-white/12 glass-strong p-3 sm:h-[500px] sm:w-[420px]">
                  <img
                    src={imgSrc}
                    alt="Akshit Saini — Professional Video Editor"
                    className="h-full w-full rounded-[1.5rem] object-cover"
                    loading="lazy"
                    onError={() => setImgError(true)}
                  />
                  <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] bg-gradient-to-t from-ink-950/60 to-transparent" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — Content */}
          <Reveal variant="right" delay={100}>
            <div>
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                {profile.name}
              </h3>
              <p className="mt-1 font-display text-lg font-semibold text-accent">
                {profile.title}
              </p>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-200">
                <p>
                  With <span className="font-semibold text-white">2+ years of editing experience</span>,
                  I've edited <span className="font-semibold text-white">400+ videos</span> for{' '}
                  <span className="font-semibold text-white">50+ clients</span> across multiple video
                  categories — from corporate films and YouTube content to wedding reels and motion
                  graphics.
                </p>
                <p>
                  My focus is on storytelling, pacing, visuals, and motion — combining technical
                  precision with creative instinct to produce engaging, cinematic content that
                  resonates with audiences and elevates every brand I work with.
                </p>
              </div>

              {/* Focus areas */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {focusAreas.map((area) => (
                  <div
                    key={area.label}
                    className="flex flex-col items-center gap-2 rounded-xl glass p-4 text-center transition-colors hover:border-accent/30"
                  >
                    <area.icon className="h-5 w-5 text-accent" />
                    <span className="text-xs font-medium text-ink-100">{area.label}</span>
                  </div>
                ))}
              </div>

              {/* Inline stats */}
              <div className="mt-8 flex flex-wrap gap-6">
                <div>
                  <p className="font-display text-3xl font-extrabold text-white">2+</p>
                  <p className="text-xs text-ink-300">Years Experience</p>
                </div>
                <div className="h-12 w-px bg-white/10" />
                <div>
                  <p className="font-display text-3xl font-extrabold text-white">400+</p>
                  <p className="text-xs text-ink-300">Videos Edited</p>
                </div>
                <div className="h-12 w-px bg-white/10" />
                <div>
                  <p className="font-display text-3xl font-extrabold text-white">50+</p>
                  <p className="text-xs text-ink-300">Clients</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
