import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";
import g6 from "@/assets/g6.jpg";

type Photo = { src: string; caption: string; tall?: boolean };

const photos: Photo[] = [
  { src: g1, caption: "the day you bloomed into my world", tall: true },
  { src: g3, caption: "candlelight & quiet conversations" },
  { src: g2, caption: "soft hands, softer heart", tall: true },
  { src: g5, caption: "sixteen wishes, one is already true — you" },
  { src: g4, caption: "every sunset feels like a love letter", tall: true },
  { src: g6, caption: "wild bloom, wild love" },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? 0 : (i + 1) % photos.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? 0 : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="mt-20 w-full">
      <div className="mb-10 text-center">
        <p className="font-display text-sm tracking-[0.4em] uppercase text-[color:var(--gold-deep)]">
          our little moments
        </p>
        <h2 className="mt-3 text-gradient-gold text-5xl font-semibold sm:text-6xl">
          A Gallery of Us
        </h2>
        <p className="mx-auto mt-3 max-w-md font-display italic text-foreground/70">
          tap any memory to live in it a little longer
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {photos.map((p, i) => (
          <motion.button
            key={i}
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: (i % 6) * 0.08 }}
            whileHover={{ y: -4 }}
            className={`group relative overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 bg-card shadow-[var(--shadow-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rose)] ${
              p.tall ? "row-span-2 aspect-[4/5]" : "aspect-square"
            }`}
            aria-label={`Open photo: ${p.caption}`}
          >
            <img
              src={p.src}
              alt={p.caption}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--rose-deep)]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-3 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-script text-lg text-white drop-shadow-md">{p.caption}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl"
            style={{ background: "oklch(0.2 0.08 15 / 0.85)" }}
            onClick={() => setOpen(null)}
          >
            {/* Floating petals in lightbox */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: "110vh", opacity: [0, 1, 0], x: [0, 30, -20, 0] }}
                  transition={{ duration: 8 + (i % 4), delay: i * 0.4, repeat: Infinity, ease: "linear" }}
                  style={{ left: `${(i * 11) % 100}%` }}
                  className="absolute top-0 h-2 w-2 rounded-full"
                >
                  <span
                    className="block h-full w-full rounded-full"
                    style={{ background: "oklch(0.78 0.16 15)", boxShadow: "0 0 10px oklch(0.8 0.18 15 / 0.8)" }}
                  />
                </motion.span>
              ))}
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); setOpen(null); }}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              ✕
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + photos.length) % photos.length); }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20 sm:left-8"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % photos.length); }}
              aria-label="Next"
              className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20 sm:right-8"
            >
              ›
            </button>

            <motion.figure
              key={open}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[88vh] w-full max-w-3xl flex-col items-center"
            >
              <div
                className="relative overflow-hidden rounded-3xl border border-[color:var(--gold)]/50"
                style={{ boxShadow: "var(--shadow-glow), 0 30px 80px -20px oklch(0 0 0 / 0.6)" }}
              >
                <img
                  src={photos[open].src}
                  alt={photos[open].caption}
                  className="max-h-[72vh] w-auto object-contain"
                />
              </div>
              <figcaption className="mt-5 max-w-xl text-center">
                <p className="font-script text-3xl text-white drop-shadow-md">
                  {photos[open].caption}
                </p>
                <p className="mt-2 text-xs tracking-[0.3em] uppercase text-white/60">
                  {open + 1} / {photos.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
