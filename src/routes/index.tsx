import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import heroCurve from "@/assets/hero-curve.jpg";
import portrait from "@/assets/about-portrait.jpg";
import book from "@/assets/book.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

/* ---------- helpers ---------- */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function handleFluidMove(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

/* ---------- sections ---------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container-editorial">
        <nav
          className={`glass flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
            scrolled ? "shadow-[0_18px_48px_rgba(30,43,56,0.14)]" : ""
          }`}
        >
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg">
              cr
            </span>
            <span className="hidden sm:block text-sm font-medium tracking-wide text-ink">
              Carolina Resende
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-ink-soft">
            <a href="#abordagem" className="link-underline">Abordagem</a>
            <a href="#servicos" className="link-underline">Serviços</a>
            <a href="#sobre" className="link-underline">Sobre</a>
            <a href="#livro" className="link-underline">Livro</a>
          </div>
          <a href="#contato" className="btn-primary !h-10 !px-5 text-[11px]">
            Fale com Carolina
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-32">
      {/* ambient orbs */}
      <div
        className="orb-a pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(215,107,82,0.35), transparent 60%)",
          transform: `translate(${mouse.x}px, ${mouse.y}px)`,
        }}
      />
      <div
        className="orb-b pointer-events-none absolute top-20 -right-32 h-[560px] w-[560px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(99,31,39,0.28), transparent 60%)",
          transform: `translate(${-mouse.x}px, ${-mouse.y}px)`,
        }}
      />

      <div className="container-editorial relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="eyebrow inline-flex items-center gap-2">
              <span className="h-px w-8 bg-primary" />
              Liderança inteligente
            </span>
            <h1 className="font-display mt-6 text-[clamp(3rem,7.5vw,6.75rem)] leading-[0.95] tracking-[-0.04em] text-primary">
              Transformação real
              <br />
              pela{" "}
              <em className="italic text-accent font-normal">escuta</em> que
              lidera.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
              Programas premium de liderança, mentoria executiva e consultoria
              organizacional que unem ciência, estratégia e sensibilidade
              humana — para líderes que decidem crescer com propósito.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contato" className="btn-primary">
                Transforme sua liderança
                <span aria-hidden>→</span>
              </a>
              <a href="#abordagem" className="btn-ghost">
                Conheça a abordagem
              </a>
            </div>
            <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4 text-sm text-ink-soft">
              <Stat value="15+" label="anos formando líderes" />
              <Stat value="PNUD / ONU" label="consultora individual" />
              <Stat value="Dra. em Psicologia" label="PUC Minas · Paris V" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className="fluid-card group relative aspect-[4/5] overflow-hidden"
              onMouseMove={handleFluidMove}
            >
              <img
                src={heroCurve}
                alt="Curva editorial da marca Carolina Resende"
                width={1600}
                height={1200}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              <div className="glass-warm absolute bottom-6 left-6 right-6 rounded-2xl p-5">
                <p className="eyebrow">A curva infinita</p>
                <p className="mt-2 font-display text-xl text-primary">
                  Evolução contínua, sem perder o eixo humano.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-primary">{value}</div>
      <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Marquee() {
  const items = [
    "PNUD · ONU",
    "ENAP · LideraGOV",
    "PUC Minas",
    "Université Paris Descartes",
    "NR-01",
    "Soft Skills",
    "Alta Performance",
  ];
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-surface-deep/60 py-6">
      <div className="marquee-track flex w-max gap-14 whitespace-nowrap">
        {[...items, ...items, ...items].map((it, i) => (
          <span
            key={i}
            className="font-display text-lg text-primary/70 flex items-center gap-14"
          >
            {it}
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Approach() {
  const ref = useReveal<HTMLDivElement>();
  const pillars = [
    {
      k: "01",
      title: "Saúde mental",
      desc: "Bem-estar psicológico como base estratégica da liderança de alta performance.",
    },
    {
      k: "02",
      title: "Gestão ágil",
      desc: "Metodologias lean adaptadas à realidade humana e às necessidades da sua organização.",
    },
    {
      k: "03",
      title: "Impacto sustentável",
      desc: "Resultados duradouros que transformam pessoas, culturas e indicadores.",
    },
  ];
  return (
    <section id="abordagem" className="reveal py-32" ref={ref}>
      <div className="container-editorial">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <span className="eyebrow">Nossa abordagem</span>
            <h2 className="font-display mt-5 text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.02] text-primary tracking-[-0.03em]">
              Rigor científico com sensibilidade humana.
            </h2>
          </div>
          <p className="lg:col-span-6 lg:col-start-7 text-lg leading-relaxed text-ink-soft">
            Integramos saúde mental, qualidade de vida no trabalho e gestão ágil
            sem perder o foco estratégico nas pessoas. Diagnósticos, pesquisas e
            implementação completa da NR-01 — personalizados, com apoio de
            inteligência artificial.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <article
              key={p.k}
              className="fluid-card p-8"
              onMouseMove={handleFluidMove}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl text-accent">
                  {p.k}
                </span>
                <span className="h-px w-16 bg-border transition-all duration-500 group-hover:w-24" />
              </div>
              <h3 className="font-display mt-8 text-2xl text-primary">
                {p.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                {p.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const ref = useReveal<HTMLDivElement>();
  const services = [
    {
      tag: "Individual",
      title: "Mentoria Executiva",
      desc: "Jornada personalizada 1:1 para líderes que buscam transformar decisões, presença e legado.",
      points: ["Sessões individuais", "Metodologia autoral", "Acompanhamento contínuo"],
    },
    {
      tag: "Times",
      title: "Formação de Líderes",
      desc: "Programas estruturados que instalam competências de liderança em equipes inteiras — com certificação.",
      points: ["Turmas fechadas", "Metodologia prática", "Certificação"],
    },
    {
      tag: "Organização",
      title: "Consultoria Organizacional",
      desc: "Transformação cultural e estrutural — do diagnóstico à implementação da nova arquitetura de gestão.",
      points: ["Diagnóstico cultural", "Roadmap estratégico", "Implementação assistida"],
    },
    {
      tag: "Compliance",
      title: "NR-01 · Riscos Psicossociais",
      desc: "Diagnóstico, planejamento e programas contínuos alinhados ao novo marco legal — feito sob medida.",
      points: ["Diagnóstico psicossocial", "Plano estratégico", "Programas contínuos"],
    },
  ];
  return (
    <section id="servicos" className="reveal py-32" ref={ref}>
      <div className="container-editorial">
        <div className="max-w-3xl">
          <span className="eyebrow">Serviços</span>
          <h2 className="font-display mt-5 text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.02] text-primary tracking-[-0.03em]">
            Soluções sob medida, do executivo à cultura organizacional.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.title}
              className="fluid-card group p-10"
              onMouseMove={handleFluidMove}
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-primary/30 bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  {s.tag}
                </span>
              </div>
              <h3 className="font-display mt-6 text-[clamp(1.75rem,2.4vw,2.25rem)] text-primary leading-tight">
                {s.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                {s.desc}
              </p>
              <ul className="mt-8 space-y-2 border-t border-border/70 pt-6 text-sm text-ink">
                {s.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3">
                    <span className="h-1 w-4 bg-accent" />
                    {pt}
                  </li>
                ))}
              </ul>
              <a
                href="#contato"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-primary"
              >
                <span className="link-underline">Solicitar proposta</span>
                <span
                  aria-hidden
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForWho() {
  const ref = useReveal<HTMLDivElement>();
  const groups = [
    {
      t: "Líderes",
      d: "Executivos, gestores e C-level que buscam desenvolver sua liderança de forma profunda.",
      list: ["Desenvolvimento pessoal", "Competências de liderança", "Gestão de equipes"],
    },
    {
      t: "Profissionais",
      d: "Profissionais que se preparam para posições de liderança e para o próximo salto de carreira.",
      list: ["Preparação para liderança", "Desenvolvimento de carreira", "Competências interpessoais"],
    },
    {
      t: "Organizações",
      d: "Empresas que buscam transformar cultura, desenvolver líderes e implementar a NR-01.",
      list: ["Transformação cultural", "Desenvolvimento de líderes", "Gestão da mudança"],
    },
  ];
  return (
    <section className="reveal relative py-32" ref={ref}>
      <div className="container-editorial">
        <div className="relative overflow-hidden rounded-[32px] bg-secondary p-[clamp(32px,5vw,72px)] text-primary-foreground">
          <div
            className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(215,107,82,0.6), transparent 60%)",
            }}
          />
          <div className="relative">
            <span className="eyebrow !text-accent">Para quem</span>
            <h2 className="font-display mt-5 max-w-3xl text-[clamp(2rem,4vw,3.75rem)] leading-[1.02] tracking-[-0.03em]">
              Para quem lidera pessoas — e pessoas que decidiram liderar.
            </h2>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {groups.map((g) => (
                <div
                  key={g.t}
                  onMouseMove={handleFluidMove}
                  className="glass-dark group relative overflow-hidden rounded-2xl p-8 transition-transform duration-500 hover:-translate-y-1"
                  style={{ ["--mx" as string]: "50%" }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(360px circle at var(--mx) var(--my), rgba(215,107,82,0.25), transparent 55%)",
                    }}
                  />
                  <h3 className="font-display text-2xl">{g.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
                    {g.d}
                  </p>
                  <ul className="mt-6 space-y-2 border-t border-primary-foreground/15 pt-5 text-sm text-primary-foreground/85">
                    {g.list.map((x) => (
                      <li key={x} className="flex items-center gap-3">
                        <span className="h-1 w-3 bg-accent" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="sobre" className="reveal py-32" ref={ref}>
      <div className="container-editorial">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div
              className="fluid-card aspect-[3/4] overflow-hidden"
              onMouseMove={handleFluidMove}
            >
              <img
                src={portrait}
                alt="Carolina Resende — Psicóloga e Consultora"
                width={900}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <span className="eyebrow">Sobre Carolina</span>
            <h2 className="font-display mt-5 text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.02] text-primary tracking-[-0.03em]">
              A escuta que forma líderes de verdade.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Doutora em Psicologia, professora universitária e pesquisadora em
              competências socioemocionais, saúde mental corporativa e gestão de
              riscos psicossociais. Consultora individual do{" "}
              <strong className="text-primary">PNUD/ONU</strong> desde 2020 na
              temática Soft Skills e competências de liderança.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Professora convidada na <strong className="text-primary">ENAP</strong>{" "}
              no programa LideraGOV e Prof. Adjunto IV da{" "}
              <strong className="text-primary">PUC Minas</strong>, onde coordena
              programas de extensão e pesquisa. Doutorado sanduíche na{" "}
              <em>Université Paris Descartes</em> (Paris V), financiado pela
              CAPES.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {["PNUD/ONU", "ENAP", "PUC Minas", "Paris V"].map((c) => (
                <div
                  key={c}
                  className="glass rounded-2xl px-4 py-5 text-center font-display text-primary"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Book() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="livro" className="reveal py-32" ref={ref}>
      <div className="container-editorial">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="eyebrow">Liderança para alta performance</span>
            <h2 className="font-display mt-5 text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.02] text-primary tracking-[-0.03em]">
              O mundo do trabalho na era organizacional.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Uma discussão crítica da relação trabalhador × organização, apoiada
              em comportamento organizacional, psicologia do trabalho e gestão
              de pessoas. Insights práticos e estratégias baseadas em evidência
              para consolidar cultura de alta performance.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.14em] text-ink-soft">
              <span className="rounded-full border border-border bg-card px-3 py-1.5">
                Baseado em pesquisa científica
              </span>
              <span className="rounded-full border border-border bg-card px-3 py-1.5">
                Formato físico
              </span>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://www.paypal.com/ncp/payment/FFW6V8PNMLC56"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Comprar agora
                <span aria-hidden>→</span>
              </a>
              <span className="self-center text-xs text-muted-foreground">
                Pagamento seguro via PayPal
              </span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div
              className="fluid-card aspect-[3/4] overflow-hidden"
              onMouseMove={handleFluidMove}
            >
              <img
                src={book}
                alt="Livro: O mundo do trabalho na era organizacional"
                width={900}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="contato" className="reveal py-32" ref={ref}>
      <div className="container-editorial">
        <div className="relative overflow-hidden rounded-[32px] bg-primary p-[clamp(32px,5vw,80px)] text-primary-foreground">
          <div
            className="orb-a pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(215,107,82,0.7), transparent 60%)",
            }}
          />
          <div className="relative grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="eyebrow !text-accent-soft">Entre em contato</span>
              <h2 className="font-display mt-5 text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[1] tracking-[-0.035em]">
                Pronto para o próximo salto da sua liderança?
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-primary-foreground/80">
                Vamos conversar sobre como podemos apoiar você, seu time e sua
                organização — com estratégia, humanidade e resultado.
              </p>
              <div className="mt-10 space-y-5">
                <ContactLine
                  label="Email"
                  value="carolinaresende@crlideranca.com.br"
                  href="mailto:carolinaresende@crlideranca.com.br"
                />
                <ContactLine
                  label="WhatsApp"
                  value="(31) 99941-4771"
                  href="https://wa.me/5531999414771"
                />
                <ContactLine
                  label="LinkedIn"
                  value="Carolina Resende"
                  href="https://www.linkedin.com/in/carolina-resende-psi/"
                />
              </div>
            </div>
            <form
              className="lg:col-span-6 glass-dark rounded-3xl p-8"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const nome = fd.get("nome");
                const msg = fd.get("mensagem");
                window.location.href = `mailto:carolinaresende@crlideranca.com.br?subject=Contato de ${nome}&body=${encodeURIComponent(String(msg ?? ""))}`;
              }}
            >
              <div className="grid gap-4">
                <Field name="nome" label="Nome" />
                <Field name="email" label="Email" type="email" />
                <Field name="empresa" label="Empresa" />
                <Field name="mensagem" label="Mensagem" textarea />
                <button type="submit" className="btn-primary mt-2 !bg-accent !text-secondary">
                  Enviar mensagem
                  <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLine({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-baseline justify-between gap-6 border-b border-primary-foreground/15 pb-4"
    >
      <span className="eyebrow !text-primary-foreground/60">{label}</span>
      <span className="font-display text-xl text-primary-foreground transition-colors group-hover:text-accent">
        {value}
      </span>
    </a>
  );
}

function Field({
  name,
  label,
  type = "text",
  textarea,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "w-full rounded-2xl border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 outline-none transition focus:border-accent focus:bg-primary-foreground/10";
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} rows={4} className={cls} />
      ) : (
        <input name={name} type={type} className={cls} />
      )}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="container-editorial flex flex-wrap items-center justify-between gap-6 text-sm text-ink-soft">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-display">
            cr
          </span>
          <span>© {new Date().getFullYear()} Carolina Resende</span>
        </div>
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Liderança inteligente · Escuta qualificada
        </span>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />
      <Approach />
      <Services />
      <ForWho />
      <About />
      <Book />
      <Contact />
      <Footer />
    </main>
  );
}
