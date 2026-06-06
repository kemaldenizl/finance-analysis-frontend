import { capabilityCards } from "@/src/features/home/components/home-content";

export function CapabilitiesSection() {
  return (
    <section id="yetenekler" className="mt-10 scroll-mt-24 space-y-4 md:mt-14">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        Finans operasyonların için AI yetenek seti
      </h2>
      <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300 md:text-base">
        Harcama davranışını tek ekranda gör, riskleri erken yakala ve aksiyona
        dönük tavsiyeler al.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {capabilityCards.map((card) => (
          <article
            key={card.title}
            className="group rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
              {card.metric}
            </p>
            <h3 className="mt-2 text-lg font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {card.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
