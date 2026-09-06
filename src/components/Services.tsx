import { services } from '@/data/services';
import { Reveal } from '@/components/Reveal';
import { useTilt } from '@/hooks/useTilt';

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute top-0 left-1/3 h-80 w-80 rounded-full bg-accent/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal variant="up" className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Services</p>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            What <span className="text-accent-gradient">I Edit</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-ink-300">
            From corporate films to social reels — covering every category of video content.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} variant="up" delay={i * 70}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
          {/* CTA card to fill grid on lg */}
          <Reveal variant="up" delay={services.length * 70}>
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-accent/30 glass p-6 text-center">
              <p className="font-display text-lg font-bold text-white">Have a different project?</p>
              <p className="mt-2 text-sm text-ink-300">I work across all video categories. Let's talk about yours.</p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-4 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950 transition-shadow hover:shadow-lg hover:shadow-accent/30"
                data-cursor="magnet"
              >
                Get in Touch
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt<HTMLDivElement>(6);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-white/10 will-change-transform"
      style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {/* Background image */}
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/20" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 transition-colors duration-500 group-hover:from-accent/10 group-hover:to-transparent" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end p-6">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl glass-strong text-accent transition-transform duration-300 group-hover:scale-110">
          <service.icon className="h-5 w-5" />
        </div>
        <h3 className="font-display text-lg font-bold text-white">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-200">{service.description}</p>
      </div>
    </div>
  );
}
