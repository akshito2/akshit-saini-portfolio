import { tools } from '@/data/tools';
import { Reveal } from '@/components/Reveal';
import { useTilt } from '@/hooks/useTilt';

export function Tools() {
  return (
    <section id="tools" className="relative overflow-hidden py-24 lg:py-32">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 h-50 w-50 rounded-full bg-accent/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Heading */}
        <Reveal variant="up" className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            My Toolkit
          </p>

          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Tools <span className="text-accent-gradient">I Use</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm text-ink-300">
            The software I use to bring ideas to life and create engaging,
            high-quality content.
          </p>
        </Reveal>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {tools.map((tool, i) => (
            <Reveal key={tool.id} variant="scale" delay={i * 80}>
              <ToolCard tool={tool} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: (typeof tools)[number] }) {
  const { ref, handleMouseMove, handleMouseLeave } =
    useTilt<HTMLDivElement>(8);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 glass p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/30 will-change-transform"
      style={{
        transition:
          'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s',
      }}
    >
      {/* Glow */}
      <div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ backgroundColor: tool.color }}
      />

      {/* Tool Logo */}
      <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-ink-800/80 transition-transform duration-300 group-hover:scale-110">
        <img
          src={tool.logo}
          alt={`${tool.name} logo`}
          className="h-10 w-10 object-contain"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Tool Name */}
      <h3 className="font-display text-lg font-bold text-white">
        {tool.name}
      </h3>

      {/* Bottom Accent Bar */}
      <div
        className="mt-5 h-0.5 w-full rounded-full opacity-20 transition-opacity duration-300 group-hover:opacity-60"
        style={{ backgroundColor: tool.color }}
      />
    </div>
  );
}