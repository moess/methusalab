"use client";

import { useEffect, useRef, useCallback } from "react";

const LEISTUNGEN = [
  {
    num: "01",
    title: "KI-Automatisierung & Corporate LLMs",
    subtitle: "Sichere Unternehmens-KI",
    intro: "Verlieren Sie keine Zeit mehr mit monotonen, manuellen Aufgaben. Wir identifizieren Ihre Zeitfresser und bauen automatisierte AI Workflows für Ihr Unternehmen.",
    points: [
      {
        label: "Prozess-Automatisierung",
        text: "Ob die automatische Datenerfassung aus E-Mails und PDFs, die Erstellung von Angeboten oder ein vollautomatisiertes Mitarbeiter-Onboarding — wir digitalisieren Ihre Kernprozesse.",
      },
      {
        label: "Corporate LLMs (Ihre sichere KI)",
        text: "Da öffentliche KI-Modelle oft nicht den Datenschutzanforderungen genügen, richten wir Ihnen DSGVO-konforme interne Wissenssysteme ein. Ihre Mitarbeiter können sicher mit internen Unternehmensdaten chatten, Dokumente analysieren und sich im Arbeitsalltag massiv entlasten lassen.",
      },
    ],
  },
  {
    num: "02",
    title: "AI Voice Agents",
    subtitle: "KI-Telefonassistenten für Vertrieb & Service",
    intro: "Lassen Sie keinen wertvollen Kontakt mehr ins Leere laufen. Wir entwickeln KI-gestützte Telefonagenten, die kaum noch von menschlichen Anrufern zu unterscheiden sind und rund um die Uhr für Sie arbeiten.",
    points: [
      {
        label: "Umsatzsteigerung durch Follow-ups",
        text: "Konsequente Nachfassaktionen können den Jahresumsatz um bis zu 30 % steigern — unsere Agents übernehmen das vollautomatisch für Sie.",
      },
      {
        label: "Effizienter Kundenservice & Lead-Reaktivierung",
        text: "Unsere KI ruft ungenutzte Leads systematisch an, qualifiziert Kundenanfragen vor und agiert als Rezeptionist, sodass Sie nie wieder einen Anruf verpassen.",
      },
      {
        label: "Kosten senken",
        text: "Sparen Sie zwischen 40 % und 70 % Ihrer Personalkosten im telefonischen Kundenservice ein.",
      },
    ],
  },
  {
    num: "03",
    title: "Branchenspezifische KI-Apps",
    subtitle: "Service-as-a-Software",
    intro: "Sie benötigen eine hochspezialisierte Lösung für Ihre Branche, möchten aber keine sechsstelligen Summen in riesige Entwicklerteams investieren?",
    points: [
      {
        label: "Maßgeschneiderte Software",
        text: "Wir bauen spezialisierte KI-Apps exakt für Ihren Anwendungsfall — z. B. für Immobilienmakler zur automatischen Exposé-Erstellung und Besichtigungskoordination.",
      },
      {
        label: "Attraktive Abo-Modelle",
        text: "Anstatt teurer Einmal-Entwicklungskosten lizenzieren wir Ihnen unsere schlüsselfertigen Ergebnisse und Dashboards als flexibles monatliches Abo. Wir verkaufen Ihnen das konkrete Endresultat, nicht unsere Arbeitszeit.",
      },
    ],
  },
  {
    num: "04",
    title: "KI-Beratung & Change Management",
    subtitle: "Strategie & Kultur",
    intro: "Die Einführung von KI ist nicht nur eine technische, sondern vor allem eine kulturelle Herausforderung. Wir lassen Sie bei der Transformation nicht allein.",
    points: [
      {
        label: "Strategische Ausrichtung",
        text: "Wir beraten Sie auf Führungsebene, identifizieren die wertvollsten KI-Use-Cases für Ihr Geschäftsmodell und entwickeln einen klaren Fahrplan.",
      },
      {
        label: "Change Management & Schulungen",
        text: "Wir schulen Ihre IT-Teams und Mitarbeiter, um interne Widerstände abzubauen und eine nachhaltige, interne KI-Kultur aufzubauen.",
      },
    ],
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={15} height={15}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  const toggleMenu = useCallback(() => {
    document.body.classList.toggle("menu-open");
  }, []);

  const closeMenu = useCallback(() => {
    document.body.classList.remove("menu-open");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  // Seamless video loop — dual-video crossfade
  useEffect(() => {
    const vA = videoARef.current;
    const vB = videoBRef.current;
    if (!vA || !vB) return;

    const FADE = 1.5;
    let active: HTMLVideoElement = vA;
    let standby: HTMLVideoElement = vB;

    const swap = () => {
      const tmp = active;
      active = standby;
      standby = tmp;
    };

    const onTimeUpdate = () => {
      if (!active.duration) return;
      const remaining = active.duration - active.currentTime;
      if (remaining <= FADE && standby.paused) {
        standby.currentTime = 0;
        standby.play().catch(() => {});
        standby.style.opacity = "0";
      }
      if (remaining <= FADE) {
        const progress = 1 - remaining / FADE;
        standby.style.opacity = String(progress);
        active.style.opacity = String(1 - progress);
      }
    };

    const onEnded = () => {
      active.style.opacity = "0";
      active.pause();
      standby.style.opacity = "1";
      swap();
      active.addEventListener("timeupdate", onTimeUpdate);
      active.addEventListener("ended", onEnded, { once: true });
    };

    vA.style.opacity = "1";
    vB.style.opacity = "0";
    vA.addEventListener("timeupdate", onTimeUpdate);
    vA.addEventListener("ended", onEnded, { once: true });

    return () => {
      vA.removeEventListener("timeupdate", onTimeUpdate);
      vB.removeEventListener("timeupdate", onTimeUpdate);
      vA.removeEventListener("ended", onEnded);
      vB.removeEventListener("ended", onEnded);
    };
  }, []);

  // Staggered hero reveal
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const t = setTimeout(() => hero.classList.add("hero-revealed"), 300);
    return () => clearTimeout(t);
  }, []);

  // Hero parallax on scroll
  useEffect(() => {
    const hero = heroRef.current;
    const vA = videoARef.current;
    const vB = videoBRef.current;
    const frame = hero?.querySelector(".hc-frame") as HTMLElement | null;
    if (!hero || !vA || !vB || !frame) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const heroH = rect.height;
        if (rect.bottom < 0) { ticking = false; return; }
        const scrolled = -rect.top;
        const ratio = Math.max(0, Math.min(1, scrolled / heroH));
        const videoY = scrolled * 0.3;
        vA.style.transform = `translateY(${videoY}px) scale(1.05)`;
        vB.style.transform = `translateY(${videoY}px) scale(1.05)`;
        const textY = scrolled * -0.15;
        frame.style.transform = `translateY(${textY}px)`;
        frame.style.opacity = String(1 - ratio * 1.4);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* RAIL */}
      <aside className="rail">
        <a href="#top" className="bolt" aria-label="Methusalab home">
          <svg className="bolt-icon" viewBox="0 0 141.7 141.7">
            <rect fill="#fff" width="31.8" height="141.7"/>
            <rect fill="#fff" x="109.9" width="31.8" height="141.7"/>
            <rect fill="#fff" x="55" y="42.1" width="31.8" height="99.7"/>
          </svg>
          <span className="bolt-label">METHUSALAB</span>
        </a>
        <button className="burger" onClick={toggleMenu} aria-label="Menu">
          <span /><span /><span />
        </button>
        <a href="mailto:kontakt@methusalab.de" className="vmail">kontakt@methusalab.de</a>
      </aside>

      {/* OVERLAY MENU */}
      <nav className="overlay" id="overlay">
        <a href="#leistungen" className="serif" onClick={closeMenu}>Leistungen</a>
        <a href="#contact" className="serif" onClick={closeMenu}>Kontakt</a>
        <div className="ov-foot">
          <span>METHUSALAB</span>
          <a href="mailto:kontakt@methusalab.de">kontakt@methusalab.de</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero" id="top" ref={heroRef}>
        <video
          ref={videoARef}
          className="hero-video"
          autoPlay
          muted
          playsInline
          preload="auto"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        <video
          ref={videoBRef}
          className="hero-video"
          muted
          playsInline
          preload="auto"
          style={{ opacity: 0 }}
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />

        <div className="hc-frame">
          <div className="hc-center">
            <svg className="hc-logo" viewBox="0 0 141.7 141.7" aria-hidden="true">
              <rect fill="#fff" width="31.8" height="141.7"/>
              <rect fill="#fff" x="109.9" width="31.8" height="141.7"/>
              <rect fill="#fff" x="55" y="42.1" width="31.8" height="99.7"/>
            </svg>
            <div className="hc-wordmark">methusalab</div>
            <div className="hc-divider" />
            <h1 className="hc-name">Ihre Prozesse werden klarer, schneller und leichter nutzbar</h1>
            <p className="hc-claim">METHUSALAB entwickelt digitale Produkt- und Workflow-Systeme, die Teams im Alltag entlasten, wiederkehrende Arbeit reduzieren und aus komplexen Abläufen nutzbare Lösungen machen.</p>
            <p className="hc-tags">Konzeption · UX · Workflows · Automatisierung · Plattformlogik</p>
            <div className="hc-cta">
              <a href="#contact" className="btn hero-btn-primary">
                <ArrowIcon /> Kostenloses Analysegespräch
              </a>
              <a href="#leistungen" className="btn hero-btn-ghost">Leistungen ansehen</a>
            </div>
          </div>
        </div>

        <div className="hc-grain" />
      </header>

      {/* INTRO */}
      <section id="intro">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">Willkommen</span></div>
          <div className="about-grid">
            <p className="big serif" data-reveal="">
              Verwandeln Sie Ihr Unternehmen mit <span className="em">maßgeschneiderter Künstlicher Intelligenz</span>
            </p>
            <div className="body" data-reveal="" style={{ "--d": 1 } as React.CSSProperties}>
              <p>Klassische Dienstleistungen und manuelle Prozesse gehören der Vergangenheit an. Wir sind Ihre Experten für KI-Automatisierung, intelligente Sprachassistenten und sichere KI-Softwarelösungen.</p>
              <p>Anstatt Ihnen Stunden in Rechnung zu stellen, liefern wir Ihnen messbare Ergebnisse und schlüsselfertige Systeme. Sparen Sie hunderte Stunden Zeit, senken Sie Personalkosten und skalieren Sie Ihren Umsatz.</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="sec-divider" />

      {/* LEISTUNGEN */}
      <section id="leistungen">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Leistungen</span>
            <h2 className="serif">Vier Hebel für <span className="hl-pill">Ihr Wachstum</span></h2>
          </div>
          <div className="services-grid">
            {LEISTUNGEN.map((l, i) => {
              const grads = [
                "linear-gradient(90deg, var(--royal), var(--vivid))",
                "linear-gradient(90deg, var(--vivid), var(--orchid))",
                "linear-gradient(90deg, var(--orchid), var(--lavender))",
                "linear-gradient(90deg, var(--electric), var(--royal))",
              ];
              return (
                <div className="scard" key={i} data-reveal="" style={{ "--d": i, "--lcard-grad": grads[i] } as React.CSSProperties}>
                  <div className="scard-head">
                    <span className="lnum">{l.num}</span>
                    <span className="scard-badge">{l.subtitle}</span>
                  </div>
                  <h3>{l.title}</h3>
                  <p className="scard-intro">{l.intro}</p>
                  <ul className="scard-points">
                    {l.points.map((p, j) => (
                      <li key={j}>
                        <strong>{p.label}:</strong> {p.text}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA + FOOTER */}
      <footer className="finale" id="contact">
        <div className="finale-orb" aria-hidden="true" />

        <div className="finale-content">
          <div className="wrap">
            <h2 className="serif" data-reveal="">Sind Sie bereit, Ihr Unternehmen zukunftssicher aufzustellen?</h2>
            <p className="finale-sub" data-reveal="" style={{ "--d": 1 } as React.CSSProperties}>
              Jeder Monat, den Sie warten, ist ein Monat, in dem sich Ihre Konkurrenz Marktanteile durch schnellere, KI-gestützte Prozesse sichert. Vereinbaren Sie jetzt ein kostenloses Analysegespräch mit unserem Team.
            </p>
            <div className="finale-cta" data-reveal="" style={{ "--d": 2 } as React.CSSProperties}>
              <a href="mailto:kontakt@methusalab.de" className="btn orange">
                Kostenloses Analysegespräch <ArrowIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="finale-bar">
          <div className="wrap">
            <div className="foot-row">
              <div className="l">
                <b>METHUSALAB</b>
                <span>KI-Automatisierung · Voice Agents · Software</span>
              </div>
              <div className="r">
                <span>&copy; 2026</span>
                <a href="mailto:kontakt@methusalab.de">kontakt@methusalab.de</a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
