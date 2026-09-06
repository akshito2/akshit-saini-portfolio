import { useEffect, useRef, useState } from "react";
import { Play, X, Volume2, VolumeX, Maximize, Pause } from "lucide-react";
// import { portfolioItems, portfolioFilters, type PortfolioFilter } from '@/data/portfolio';
import { portfolioItems } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { useTilt } from "@/hooks/useTilt";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// const filterMap: Record<PortfolioFilter, string | null> = {
//   All: null,
//   Corporate: 'corporate',
//   YouTube: 'youtube',
//   Reels: 'reels',
//   Wedding: 'wedding',
//   'Motion Graphics': 'motion-graphics',
//   Promotional: 'promotional',
//   'Talking Head': 'talking-head',
// };

export function Portfolio() {
  // const [activeFilter, setActiveFilter] = useState<PortfolioFilter>('All');
  const [selected, setSelected] = useState<
    (typeof portfolioItems)[number] | null
  >(null);

  // const filtered = portfolioItems.filter((item) => {
  //   const cat = filterMap[activeFilter];
  //   return cat === null || item.category === cat;
  // });

  return (
    <section id="work" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute top-1/4 right-0 h-72 w-72 rounded-full bg-accent/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal variant="up" className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Portfolio
          </p>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Selected <span className="text-accent-gradient">Work</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-ink-300">
            A collection of edits crafted with purpose, precision, and
            creativity.
          </p>
        </Reveal>

        {/* Filters
        <Reveal variant="up" delay={100} className="mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {portfolioFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-accent text-ink-950 shadow-lg shadow-accent/20'
                    : 'glass text-ink-200 hover:text-white hover:border-accent/30'
                }`}
                data-cursor="hover"
              >
                {filter}
              </button>
            ))}
          </div>
        </Reveal> */}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {/* {filtered.map((item, i) => ( */}
          {portfolioItems.map((item, i) => (
            <Reveal key={item.id} variant="scale" delay={i * 60}>
              <PortfolioCard item={item} onClick={() => setSelected(item)} />
            </Reveal>
          ))}
        </div>

        {/* {filtered.length === 0 && (
          <p className="py-12 text-center text-ink-300">No projects in this category yet.</p>
        )} */}
      </div>

      {/* Video modal */}
      {selected && (
        <VideoModal item={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function PortfolioCard({
  item,
  onClick,
}: {
  item: (typeof portfolioItems)[number];
  onClick: () => void;
}) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt<HTMLDivElement>(8);

  const isDesktop = useMediaQuery("(hover: hover) and (pointer: fine)");
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // Browser autoplay restriction
    });
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video || isDesktop) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          } else {
            pauseVideo();
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [isDesktop]);

  return (
    <div
      ref={ref}
      onMouseMove={isDesktop ? handleMouseMove : undefined}
      onMouseLeave={isDesktop ? handleMouseLeave : undefined}
      onMouseEnter={isDesktop ? playVideo : undefined}
      onClick={onClick}
      className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 will-change-transform"
      style={{
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      data-cursor="hover"
    >
      {/* Video */}
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl">
        <video
          ref={videoRef}
          src={item.videoUrl}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

        {/* Play Icon - Desktop Hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex h-14 w-14 items-center justify-center rounded-full glass-strong border border-white/20 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75">
            <Play className="h-5 w-5 fill-white text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5">
        <h3 className="font-display text-lg font-bold text-white">
          {item.title}
        </h3>
      </div>

      {/* Hover Accent Border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-accent/0 transition-colors duration-300 group-hover:border-accent/40" />
    </div>
  );
}

function VideoModal({
  item,
  onClose,
}: {
  item: (typeof portfolioItems)[number];
  onClose: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      v.requestFullscreen?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 glass-strong"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div>
            <h3 className="font-display text-lg font-bold text-white">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-200 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video */}
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            src={item.videoUrl}
            className="h-full w-full object-contain"
            onClick={togglePlay}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            controls={false}
          />

          {/* Video not found message (since placeholder videos don't exist yet) */}
          {/* <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="text-center">
              <Play className="mx-auto h-12 w-12 text-white/40" />
              <p className="mt-3 text-sm text-ink-300">Video coming soon</p>
              <p className="mt-1 text-xs text-ink-400">
                Thumbnail shown — replace with actual video file
              </p>
            </div>
          </div> */}

          {/* Custom controls */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent p-4">
            <button
              onClick={togglePlay}
              className="text-white transition-colors hover:text-accent"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 fill-current" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="text-white transition-colors hover:text-accent"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
            <div className="ml-auto">
              <button
                onClick={toggleFullscreen}
                className="text-white transition-colors hover:text-accent"
                aria-label="Fullscreen"
              >
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
