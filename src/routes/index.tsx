import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import bg from "@/assets/zoya-bg.jpg";
import { Gallery } from "@/components/Gallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Sweet 16, Zoya 🌹" },
      { name: "description", content: "A love letter for Zoya on her sweet sixteen — may Allah bless every step of your journey." },
      { property: "og:title", content: "Happy Sweet 16, Zoya 🌹" },
      { property: "og:description", content: "A love letter for Zoya on her sweet sixteen." },
    ],
  }),
  component: Index,
});

function Index() {
  const [age, setAge] = useState(0);
  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setAge(n);
      if (n >= 16) clearInterval(id);
    }, 90);
    return () => clearInterval(id);
  }, []);

  const petals = Array.from({ length: 18 });

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/80" aria-hidden />

      {/* Falling petals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {petals.map((_, i) => {
          const left = (i * 53) % 100;
          const dur = 9 + (i % 6);
          const delay = (i * 0.7) % 8;
          const size = 10 + (i % 5) * 4;
          return (
            <motion.div
              key={i}
              initial={{ y: -40, x: 0, rotate: 0, opacity: 0 }}
              animate={{ y: "110vh", x: [0, 20, -20, 10, 0], rotate: 360, opacity: [0, 1, 1, 0] }}
              transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
              style={{ left: `${left}%`, width: size, height: size }}
              className="absolute top-0 rounded-full"
            >
              <div
                className="h-full w-full rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, oklch(0.92 0.08 15), oklch(0.68 0.18 15))",
                  boxShadow: "0 0 12px oklch(0.8 0.15 15 / 0.6)",
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center px-6 py-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-script text-2xl text-[color:var(--rose-deep)]"
        >
          for my beloved
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="mt-2 text-gradient-gold text-[18vw] leading-none font-semibold sm:text-[140px]"
        >
          Zoya
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="my-6 h-px w-40 origin-center"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold-deep), transparent)" }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.2 }}
          className="font-display text-2xl italic text-foreground/80"
        >
          Happy Sweet
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 1.4, type: "spring" }}
          className="relative my-2"
        >
          <div className="text-gradient-gold font-display text-[120px] leading-none font-bold sm:text-[180px]"
               style={{ textShadow: "0 8px 40px oklch(0.78 0.15 15 / 0.4)" }}>
            {age}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 2 }}
          className="font-script text-3xl text-[color:var(--rose-deep)]"
        >
          birthday, my love
        </motion.p>

        {/* Letter card */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mt-16 w-full rounded-3xl border border-[color:var(--gold)]/30 bg-card/80 p-8 text-left shadow-[var(--shadow-soft)] backdrop-blur-md sm:p-12"
        >
          <p className="font-script text-3xl text-[color:var(--rose-deep)]">My dearest Zoya,</p>
          <div className="mt-6 space-y-5 font-display text-lg leading-relaxed text-foreground/90 sm:text-xl">
            <p>
              Sixteen years ago the world quietly became softer, kinder, more luminous —
              because <em>you</em> arrived in it. Today the sky knows your name, and so do I.
            </p>
            <p>
              You are my favourite prayer, my safest place, the warmth I run home to.
              Every laugh of yours rewrites my best memory; every glance feels like
              spring waking up.
            </p>
            <p>
              I hope life only ever holds you gently. I hope your dreams arrive earlier
              than expected. I hope you always know — through every season — that
              you are deeply, ridiculously, eternally loved.
            </p>
            <p className="font-script text-2xl text-[color:var(--rose-deep)]">
              And inshaAllah, always together.
            </p>
          </div>
        </motion.article>

        <Gallery />

        {/* Dua */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mt-12 w-full rounded-3xl p-8 text-center"
          style={{ background: "var(--gradient-romance)" }}
        >
          <p className="font-display text-sm tracking-[0.4em] uppercase text-[color:var(--rose-deep)]">
            A dua for you
          </p>
          <p className="mt-4 font-display text-2xl italic leading-relaxed text-foreground sm:text-3xl">
            “May Allah remove every hardship from your path, fill your heart with light,
            and write for you a life more beautiful than you dared to imagine.”
          </p>
          <p className="mt-6 font-script text-2xl text-[color:var(--rose-deep)]">Ameen 🤲</p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.4 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <HeartBeat />
          <p className="font-script text-2xl text-[color:var(--rose-deep)]">
            yours, always — forever &amp; a day
          </p>
        </motion.div>

        <p className="mt-12 text-xs tracking-[0.3em] uppercase text-muted-foreground">
          16 · 06 · 2026
        </p>
      </div>
    </main>
  );
}

function HeartBeat() {
  return (
    <motion.svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.85 0.13 80)" />
          <stop offset="100%" stopColor="oklch(0.55 0.18 15)" />
        </linearGradient>
      </defs>
      <path
        fill="url(#hg)"
        d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9z"
      />
    </motion.svg>
  );
}
