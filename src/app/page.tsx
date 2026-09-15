"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const TIME_OPTIONS = ["09:00–09:30", "10:00–10:30", "11:00–11:30", "14:00–14:30", "15:00–15:30", "16:00–16:30"];

const NUTZEN_ITEMS = [
  {
    icon: "◇",
    title: "Weniger Tool-Chaos",
    desc: "Aus einzelnen Tools, Ideen und Experimenten entsteht ein klares System, das Ihre Teams verstehen und wirklich nutzen können. Sie vermeiden Insellösungen und schaffen eine Grundlage, die zu Ihren Prozessen, Daten und Zielen passt.",
    tags: "Klarheit · Struktur",
  },
  {
    icon: "↻",
    title: "Schnellere Abläufe",
    desc: "Wiederkehrende Aufgaben — Recherche, Strukturierung, Content-Erstellung, Übersetzung, Freigaben — werden gezielt unterstützt und teilweise automatisiert. Dadurch bleibt mehr Zeit für Entscheidungen, Qualität und Weiterentwicklung.",
    tags: "Automatisierung · Workflows",
  },
  {
    icon: "◎",
    title: "Bessere Nutzerführung",
    desc: "Komplexe Funktionen werden so gestaltet, dass Nutzer wissen, was sie tun können, warum es hilft und wie sie zu guten Ergebnissen kommen. Das reduziert Unsicherheit und erhöht die tatsächliche Nutzung im Team.",
    tags: "UX · Produktlogik",
  },
  {
    icon: "▦",
    title: "Klarere Entscheidungen",
    desc: "METHUSALAB ordnet Anforderungen, Arbeitsabläufe, technische Optionen, Risiken und Abhängigkeiten. So entstehen klare Prioritäten statt endloser Möglichkeiten.",
    tags: "Strategie · Priorisierung",
  },
  {
    icon: "⬡",
    title: "Umsetzbare Konzepte",
    desc: "Am Ende steht nicht nur eine Idee, sondern eine belastbare Grundlage: mit Produktlogik, UX, Workflow-Modellen, Systemarchitektur und konkreten nächsten Schritten.",
    tags: "Konzeption · Architektur",
  },
  {
    icon: "⚙",
    title: "Direkte Umsetzung möglich",
    desc: "Wenn gewünscht, bleibt es nicht bei der Konzeption. Mit einem Team von rund 30 Spezialist:innen kann METHUSALAB die weitere Entwicklung, Integration und Einführung übernehmen.",
    tags: "Umsetzung · Team",
  },
];

const LEISTUNGEN = [
  {
    num: "01",
    title: "Möglichkeiten sinnvoll priorisieren",
    desc: "Use Cases identifizieren und nach Nutzen, Aufwand, Risiko und Umsetzbarkeit bewerten.",
    results: ["Use-Case-Analyse", "Priorisierung", "MVP-Schnitt", "Roadmap", "Entscheidungsgrundlage"],
  },
  {
    num: "02",
    title: "Produkte nutzbar machen",
    desc: "Produktlogik, Nutzerflüsse, Informationsarchitektur und Interface-Konzepte für komplexe Anwendungen.",
    results: ["UX-Konzeption", "Nutzerflüsse", "Interface-Logik", "Figma-Prototypen", "Spezifikationen"],
  },
  {
    num: "03",
    title: "Workflows mit KI entlasten",
    desc: "Bestehende Prozesse analysieren und mit KI-Unterstützung beschleunigen — von Recherche und Content-Erstellung bis zu Freigaben und Übergaben.",
    results: ["Workflow-Analyse", "KI-Automatisierung", "Multi-Agenten-Systeme", "Content-Logik", "Qualitätssicherung"],
  },
  {
    num: "04",
    title: "Systeme planbar machen",
    desc: "Datenflüsse, Rollen, Schnittstellen, Toolchains und Betriebslogik klar konzipieren — inklusive DSGVO-konformer KI-Einbindung.",
    results: ["Systemarchitektur", "Datenmodelle", "Schnittstellen", "DSGVO & Governance", "Toolchain-Logik"],
  },
  {
    num: "05",
    title: "Umsetzung ermöglichen oder übernehmen",
    desc: "Konzepte übergabefähig aufbereiten — oder mit rund 30 Spezialist:innen direkt umsetzen.",
    results: ["Entwicklung", "UX/UI-Design", "Automatisierungen", "API-Integrationen", "Weiterentwicklung"],
  },
  {
    num: "06",
    title: "Teams befähigen",
    desc: "Workshops, Guidelines, Dokumentation und klare Entscheidungslogiken für den Alltag.",
    results: ["Workshops", "Guidelines", "Schulungen", "Dokumentation", "Entscheidungslogiken"],
  },
];

const PROJEKTE = [
  {
    title: "Content- und Publishing-Workflows",
    desc: "Systeme für Recherche, Strukturierung, Redaktion, Übersetzung, SEO, Bildauswahl, Freigaben und Distribution — damit Content-Teams schneller arbeiten, ohne Qualität zu verlieren.",
  },
  {
    title: "Interne Assistenzsysteme",
    desc: "Systeme, die Wissen auffindbar machen, Entscheidungen vorbereiten oder Teams bei wiederkehrenden Aufgaben unterstützen — im konkreten Arbeitskontext.",
  },
  {
    title: "Plattform- und Produktlogik",
    desc: "Konzepte für digitale Plattformen, bei denen Inhalte, Nutzer, Daten, Workflows und intelligente Funktionen sinnvoll zusammenspielen.",
  },
  {
    title: "Automatisierte Prozesse",
    desc: "Manuelle Zwischenschritte identifizieren und Automatisierungen entwickeln, die Teams entlasten — mit Kontrolle, Qualität und nachvollziehbaren Übergaben.",
  },
  {
    title: "Roadmaps für digitale Weiterentwicklung",
    desc: "Initiativen ordnen, priorisieren und in konkrete Umsetzungsphasen übersetzen. Aus vielen Möglichkeiten wird ein handlungsfähiger Plan.",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Verstehen", desc: "Wir analysieren Ziele, Nutzerbedürfnisse, Prozesse, Inhalte, Datenquellen, Tools und technische Rahmenbedingungen. Dadurch wird sichtbar, wo neue Systeme echten Nutzen stiften und wo zuerst Struktur geschaffen werden muss." },
  { num: "02", title: "Ordnen", desc: "Wir definieren sinnvolle Anwendungen, priorisieren nach Wirkung und Umsetzbarkeit und reduzieren Komplexität. So entstehen klare Entscheidungen statt endloser Optionen." },
  { num: "03", title: "Konzipieren", desc: "Wir übersetzen Anforderungen in Produktlogik, Nutzerflüsse, Workflows, Datenmodelle und Systemarchitektur. So entsteht ein System, das verständlich, nützlich und realistisch umsetzbar ist." },
  { num: "04", title: "Sichtbar machen", desc: "Mit Prototypen — vom Figma-Klickdummy bis zum funktionierenden Code — User-Tests, Prozessmodellen, Journey Maps oder Systemdiagrammen machen wir Ideen überprüfbar. So können Teams, Stakeholder und echte Nutzer früh erkennen, was trägt." },
  { num: "05", title: "Planen", desc: "Wir übersetzen das Konzept in Prioritäten, MVP-Schnitt, technische Abhängigkeiten, Rollen, Umsetzungsphasen und offene Entscheidungen. So wird aus Strategie ein handlungsfähiger Plan." },
  { num: "06", title: "Übergeben oder umsetzen", desc: "Wir dokumentieren Konzepte so, dass interne Teams, externe Entwickler oder Technologiepartner direkt weiterarbeiten können. Wenn gewünscht, übernimmt METHUSALAB auch die weitere Entwicklung und Einführung." },
];

const AUDIENCE_CHECKS = [
  "Viele Ideen vorhanden, aber keine klare Priorisierung",
  "Prozesse langsam, manuell oder unübersichtlich",
  "Content-, Publishing- oder Marketing-Workflows sollen skaliert werden",
  "Bestehende Tools spielen nicht sinnvoll zusammen",
  "Interne Teams brauchen Orientierung und Struktur",
  "Ein Konzept soll an Entwickler übergeben werden",
  "Ein Partner wird gesucht, der Konzeption und Umsetzung verbindet",
];

const AUDIENCE_CHIPS = ["Unternehmen", "Agenturen", "Verlage", "Content-Teams", "Plattformbetreiber"];

// Rollen und Beschreibungen sind vorläufig — bitte prüfen und anpassen
const TEAM = [
  {
    photo: "/assets/team/norbert_fogarasi.webp",
    name: "Norbert Fogarasi",
    role: "Entwicklung & Architektur",
    desc: "Verantwortet Systemarchitektur, Schnittstellen und saubere Umsetzung.",
  },
  {
    photo: "/assets/team/dieter_moess.webp",
    name: "Dieter Möss",
    role: "Produktentwickler, KI-Architekt & Senior User Experience Architect",
    desc: "Verbindet Produktstrategie, KI-Systemarchitektur und Nutzererlebnis — von der Idee bis zum funktionierenden System.",
  },
  {
    photo: "/assets/team/laszlo_kocsis.webp",
    name: "Laszlo Kocsis",
    role: "UX & Interface Design",
    desc: "Gestaltet Nutzerführung und Oberflächen, die Komplexität reduzieren.",
  },
  {
    photo: "/assets/team/kalman_takacs.webp",
    name: "Kalman Takacs",
    role: "KI-Engineering",
    desc: "Baut Agenten-Pipelines, LLM-Integrationen und Automatisierungen.",
  },
  {
    photo: "/assets/team/zsolt_dongolo.webp",
    name: "Zsolt Dongolo",
    role: "Entwicklung",
    desc: "Setzt Produkte und Automatisierungen zuverlässig um — vom Prototyp bis zum Betrieb.",
  },
  {
    photo: "/assets/team/oszkar_kovacs.webp",
    name: "Oszkar Kovacs",
    role: "Projektleitung",
    desc: "Hält Ziele, Zeitpläne und Kommunikation zusammen — vom Kickoff bis zur Einführung.",
  },
];

const ZUSAMMENARBEIT = [
  "Strategischer Sparringspartner",
  "Konzeptions- und UX-Team",
  "Systemarchitektur-Partner",
  "Umsetzungsteam",
  "Ergänzung zu internen Teams",
  "Partner für externe Entwicklungsteams",
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={15} height={15}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
      <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AppointmentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const minDate = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const slots = [
      { date: String(fd.get("date1") ?? ""), time: String(fd.get("time1") ?? "") },
      { date: String(fd.get("date2") ?? ""), time: String(fd.get("time2") ?? "") },
    ].filter((s) => s.date);
    if (slots.length === 0) {
      setError("Bitte wählen Sie mindestens einen Terminvorschlag.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/analyse-anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          slots,
          message: fd.get("message"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unbekannter Fehler");
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  };

  return (
    <div className="am-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Kostenloses Analysegespräch vereinbaren">
      <div className="am-panel" onClick={(e) => e.stopPropagation()}>
        <button className="am-close" onClick={onClose} aria-label="Schließen">✕</button>
        {status === "done" ? (
          <div className="am-done">
            <span className="am-eyebrow">Anfrage gesendet</span>
            <h3>Vielen Dank!</h3>
            <p>Wir melden uns innerhalb eines Werktags per E-Mail und bestätigen einen Ihrer Terminvorschläge.</p>
            <button className="btn orange" onClick={onClose}>Schließen</button>
          </div>
        ) : (
          <>
            <span className="am-eyebrow">Kostenloses Analysegespräch</span>
            <h3>Wann passt es Ihnen?</h3>
            <p className="am-sub">30 Minuten, unverbindlich. Schlagen Sie bis zu zwei Termine vor — wir bestätigen per E-Mail.</p>
            <form onSubmit={submit}>
              <div className="am-row">
                <label>
                  Name
                  <input name="name" type="text" required minLength={2} maxLength={120} autoComplete="name" />
                </label>
                <label>
                  E-Mail
                  <input name="email" type="email" required maxLength={200} autoComplete="email" />
                </label>
              </div>
              <div className="am-row">
                <label>
                  Terminvorschlag 1
                  <input name="date1" type="date" required min={minDate} />
                </label>
                <label>
                  Uhrzeit
                  <select name="time1" defaultValue={TIME_OPTIONS[1]}>
                    {TIME_OPTIONS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
              </div>
              <div className="am-row">
                <label>
                  Terminvorschlag 2 <span className="am-opt">(optional)</span>
                  <input name="date2" type="date" min={minDate} />
                </label>
                <label>
                  Uhrzeit
                  <select name="time2" defaultValue={TIME_OPTIONS[3]}>
                    {TIME_OPTIONS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
              </div>
              <label>
                Worum geht es? <span className="am-opt">(optional)</span>
                <textarea name="message" rows={3} maxLength={2000} placeholder="Kurz: Ausgangslage oder Ziel" />
              </label>
              {error && <p className="am-error" role="alert">{error}</p>}
              <button type="submit" className="btn orange am-submit" disabled={status === "sending"}>
                {status === "sending" ? "Wird gesendet …" : "Terminvorschläge senden"} <ArrowIcon />
              </button>
              <p className="am-note">Kein Newsletter, keine Weitergabe. Nur die Terminabstimmung.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
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

  // Magnetic cursor on nutzen cards
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = track.querySelectorAll<HTMLElement>(".wcard");
    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    cards.forEach((card) => {
      const move = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (y - 0.5) * -3;
        const rotateY = (x - 0.5) * 3;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
      };
      const leave = () => {
        card.style.transform = "";
        card.style.removeProperty("--mx");
        card.style.removeProperty("--my");
      };
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      handlers.push({ el: card, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
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

  // Nutzen carousel
  useEffect(() => {
    const track = trackRef.current;
    const prev = prevRef.current;
    const next = nextRef.current;
    if (!track || !prev || !next) return;

    const step = () => {
      const c = track.querySelector(".wcard") as HTMLElement;
      const gap = parseFloat(getComputedStyle(track).gap) || 26;
      return c.getBoundingClientRect().width + gap;
    };
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max - 2;
    };

    const onPrev = () => track.scrollBy({ left: -step(), behavior: "smooth" });
    const onNext = () => track.scrollBy({ left: step(), behavior: "smooth" });

    track.scrollLeft = 0;

    prev.addEventListener("click", onPrev);
    next.addEventListener("click", onNext);
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      prev.removeEventListener("click", onPrev);
      next.removeEventListener("click", onNext);
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
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
        <a href="#nutzen" className="serif" onClick={closeMenu}>Nutzen</a>
        <a href="#leistungen" className="serif" onClick={closeMenu}>Leistungen</a>
        <a href="#usecase" className="serif" onClick={closeMenu}>Use Case</a>
        <a href="#arbeitsweise" className="serif" onClick={closeMenu}>Arbeitsweise</a>
        <a href="#team" className="serif" onClick={closeMenu}>Team</a>
        <a href="#contact" className="serif" onClick={closeMenu}>Kontakt</a>
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
            <p className="hc-tags">Konzeption · UX · Workflows · KI-Automatisierung · Plattformlogik</p>
            <div className="hc-cta">
              <button className="btn hero-btn-primary" onClick={() => setModalOpen(true)}>
                <ArrowIcon /> Kostenloses Analysegespräch
              </button>
              <a href="#arbeitsweise" className="btn hero-btn-ghost">Arbeitsweise ansehen</a>
            </div>
          </div>
        </div>

        <div className="hc-grain" />
      </header>

      {/* INTRO */}
      <section id="about">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">Intro</span></div>
          <div className="about-grid">
            <p className="big serif" data-reveal="">
              Aus digitalen Möglichkeiten wird <span className="em">produktive Entlastung</span>
            </p>
            <div className="body" data-reveal="" style={{ "--d": 1 } as React.CSSProperties}>
              <p>Viele Unternehmen haben neue Tools, Ideen und technische Möglichkeiten. Der eigentliche Nutzen entsteht aber erst, wenn daraus klare Abläufe, verständliche Oberflächen und belastbare Systeme werden.</p>
              <p>METHUSALAB schafft dafür die Struktur: sinnvolle Use Cases, gute Nutzerführung, durchdachte Workflows und eine Systemlogik, die im Alltag funktioniert.</p>
              <p>Je nach Projekt entwickeln wir die Grundlage für interne Teams, externe Entwicklungspartner oder übernehmen mit unserem eigenen Team die weitere Umsetzung.</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="sec-divider" />

      {/* NUTZEN */}
      <section id="nutzen">
        <div className="wrap">
          <div className="work-head">
            <div className="sec-head" style={{ margin: 0 }}>
              <span className="eyebrow">Nutzen</span>
              <h2 className="serif">Was sich für Sie <span className="hl-pill">verändert</span></h2>
            </div>
          </div>
          <div className="work-track" ref={trackRef}>
            {NUTZEN_ITEMS.map((w, i) => (
              <article className="wcard" key={i}>
                <div className="wtop">
                  <div className="client">
                    <span className="mono">{w.icon}</span> {w.title}
                  </div>
                </div>
                <p className="q">{w.desc}</p>
                <div className="wfoot">
                  <div className="pj">
                    <span>{w.tags}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="work-nav">
            <button className="rbtn prev" ref={prevRef} aria-label="Previous"><ChevronLeft /></button>
            <button className="rbtn next" ref={nextRef} aria-label="Next"><ChevronRight /></button>
          </div>
        </div>
      </section>

      {/* POSITIONIERUNG */}
      <section id="positionierung">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">Positionierung</span></div>
          <div className="about-grid">
            <p className="big serif" data-reveal="">
              Digitale Systeme werden wertvoll, wenn sie im <span className="em">Alltag funktionieren</span>
            </p>
            <div className="body" data-reveal="" style={{ "--d": 1 } as React.CSSProperties}>
              <p>Unser Fokus liegt auf Produkten, Plattformen, Content-Systemen und Workflows, bei denen viele Informationen, Rollen, Tools und Entscheidungen zusammenkommen. Genau dort entsteht oft Reibung. Und genau dort lassen sich mit guter Konzeption, Automatisierung und intelligenter Systemlogik spürbare Verbesserungen erreichen.</p>
              <p>Wir verbinden Konzeption, UX, KI-Automatisierung, Systemarchitektur und Entwicklung. Dadurch entstehen Lösungen, die nicht nur strategisch sinnvoll, sondern auch praktisch anschlussfähig sind — und bei denen KI dort eingesetzt wird, wo sie nachweisbar entlastet.</p>
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
            <h2 className="serif">Sechs Felder, <span className="hl-pill">ein System</span></h2>
          </div>
          <div className="leist-grid">
            {LEISTUNGEN.map((l, i) => {
              const grads = [
                "linear-gradient(90deg, var(--royal), var(--vivid))",
                "linear-gradient(90deg, var(--vivid), var(--orchid))",
                "linear-gradient(90deg, var(--orchid), var(--lavender))",
                "linear-gradient(90deg, var(--electric), var(--vivid))",
                "linear-gradient(90deg, var(--deep-indigo), var(--royal))",
                "linear-gradient(90deg, var(--royal), var(--electric))",
              ];
              return (
                <div className="lcard" key={i} data-reveal="" style={{ "--d": i, "--lcard-grad": grads[i] } as React.CSSProperties}>
                  <span className="lnum">{l.num}</span>
                  <h3>{l.title}</h3>
                  <p>{l.desc}</p>
                  <div className="lcard-results">
                    {l.results.map((r) => (
                      <span key={r} className="lcard-tag">{r}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FÜR WEN */}
      <section id="fuer-wen">
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 42 }}>
            <span className="eyebrow">Für wen</span>
          </div>
          <div className="aud-wrap">
            <div>
              <p className="big serif" data-reveal="">
                Für Unternehmen, die digitale Möglichkeiten <span style={{ color: "var(--orange)" }}>produktiv nutzen</span> wollen
              </p>
              <div data-reveal="" style={{ "--d": 1 } as React.CSSProperties}>
                <div className="aud-chips" style={{ marginTop: 28 }}>
                  {AUDIENCE_CHIPS.map((c, i) => {
                    const colors = ["var(--deep-indigo)", "var(--royal)", "var(--vivid)", "var(--orchid)", "var(--electric)"];
                    return (
                      <span className="aud-chip" key={c} style={{ "--chip-color": colors[i % colors.length] } as React.CSSProperties}>{c}</span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="body" data-reveal="" style={{ "--d": 2 } as React.CSSProperties}>
              <p style={{ fontWeight: 600, marginBottom: 16, color: "var(--ink)" }}>Wir sind passend, wenn:</p>
              <ul className="check-list">
                {AUDIENCE_CHECKS.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr className="sec-divider" />

      {/* TYPISCHE PROJEKTE */}
      <section id="projekte">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Typische Projekte</span>
            <h2 className="serif">Wo wir <span className="hl-pill">ansetzen</span></h2>
          </div>
          <div className="proj-grid">
            {PROJEKTE.map((p, i) => (
              <div className="proj-card" key={i} data-reveal="" style={{ "--d": i } as React.CSSProperties}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASE */}
      <section id="usecase">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Use Case</span>
            <h2 className="serif">KI-Redaktionssystem <span className="hl-pill">im Einsatz</span></h2>
          </div>
          <div className="case-panel" data-reveal="">
            <div className="case-main">
              <span className="case-badge">Publishing · KI-Automatisierung</span>
              <h3>Automatisierte Content-Produktion für einen deutschen Verlag</h3>
              <p>Für einen Verlagskunden hat METHUSALAB ein KI-gestütztes Redaktionssystem entwickelt: Aus einem Briefing entsteht über eine Pipeline spezialisierter KI-Agenten ein recherchierter, im Haus-Stil geschriebener Artikelentwurf — inklusive Qualitätsprüfung gegen die redaktionellen Kriterien des Verlags.</p>
              <p>Die Redaktion behält dabei die Kontrolle: Jeder Text durchläuft ein Review-Dashboard, wird redaktionell geprüft und erst nach Freigabe ins CMS übergeben. Das System ersetzt keine Redakteur:innen — es nimmt ihnen die zeitraubende Vorarbeit ab.</p>
              <p className="case-result">Der Kernkreislauf läuft produktiv: von Briefing über Pipeline und Review bis zum publizierten Artikel — end-to-end.</p>
            </div>
            <div className="case-side">
              <span className="case-side-label">So funktioniert es</span>
              <ol className="case-steps">
                <li><b>Briefing</b>Thema, Ziel und Rahmen kommen aus der Redaktion</li>
                <li><b>Agenten-Pipeline</b>Spezialisierte KI-Rollen recherchieren, strukturieren, schreiben und prüfen</li>
                <li><b>Human Review</b>Die Redaktion prüft, korrigiert und gibt frei</li>
                <li><b>Publikation</b>Übergabe ans CMS als fertiger Entwurf</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <hr className="sec-divider" />

      {/* ARBEITSWEISE */}
      <section id="arbeitsweise">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Arbeitsweise</span>
            <h2 className="serif">Zuerst verstehen, <span className="hl-pill">dann umsetzen</span></h2>
          </div>
          <div className="process">
            {PROCESS_STEPS.map((s, i) => {
              const colors = ["var(--deep-indigo)", "var(--royal)", "var(--vivid)", "var(--orchid)", "var(--lavender)", "var(--electric)"];
              return (
                <div className="pstep" key={s.num} data-reveal="" style={{ "--pstep-color": colors[i] } as React.CSSProperties}>
                  <div className="pn">{s.num}</div>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ZUSAMMENARBEIT */}
      <section id="zusammenarbeit">
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 42 }}>
            <span className="eyebrow">Zusammenarbeit</span>
          </div>
          <div className="about-grid">
            <p className="big serif" data-reveal="">
              Strategisch, konzeptionell oder <span className="em">umsetzungsnah</span>
            </p>
            <div data-reveal="" style={{ "--d": 1 } as React.CSSProperties}>
              <p className="body" style={{ marginBottom: 24 }}>METHUSALAB kann an unterschiedlichen Punkten einsteigen. Wir arbeiten flexibel:</p>
              <div className="aud-chips">
                {ZUSAMMENARBEIT.map((z, i) => {
                  const colors = ["var(--deep-indigo)", "var(--royal)", "var(--vivid)", "var(--orchid)", "var(--electric)", "var(--lavender)"];
                  return (
                    <span className="aud-chip" key={z} style={{ "--chip-color": colors[i] } as React.CSSProperties}>{z}</span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="sec-divider" />

      {/* TEAM */}
      <section id="team">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Team</span>
            <h2 className="serif">Die Menschen <span className="hl-pill">dahinter</span></h2>
          </div>
          <div className="team-grid">
            {TEAM.map((t, i) => (
              <div className="tcard" key={i} data-reveal="" style={{ "--d": i } as React.CSSProperties}>
                <img className="tcard-photo" src={t.photo} alt={t.name} loading="lazy" width={720} height={720} />
                <h3>{t.name}</h3>
                <span className="tcard-role">{t.role}</span>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + FOOTER */}
      <footer className="finale" id="contact">
        {/* Gradient orb — rising sun */}
        <div className="finale-orb" aria-hidden="true" />

        <div className="finale-content">
          <div className="wrap">
            <h2 className="serif" data-reveal="">Ihre digitalen Systeme sollen Arbeit erleichtern?</h2>
            <p className="finale-sub" data-reveal="" style={{ "--d": 1 } as React.CSSProperties}>
              Vereinbaren Sie ein kostenloses Analysegespräch: Wir schauen gemeinsam auf Ihre Prozesse und zeigen Ihnen, wo Struktur, KI und Automatisierung den größten Hebel haben — unverbindlich und konkret.
            </p>
            <div className="finale-cta" data-reveal="" style={{ "--d": 2 } as React.CSSProperties}>
              <button className="btn orange" onClick={() => setModalOpen(true)}>
                Kostenloses Analysegespräch <ArrowIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="finale-bar">
          <div className="wrap">
            <div className="foot-row">
              <div className="l">
                <b>METHUSALAB</b>
                <span>Digitale Produkt- und Workflow-Systeme</span>
              </div>
              <div className="r">
                <span>&copy; 2026</span>
                <a href="mailto:kontakt@methusalab.de">kontakt@methusalab.de</a>
              </div>
            </div>
            <address className="foot-address">
              methusalab by Kadeno Solutions SRL<br />
              Str. Lalelelor 32<br />
              540437 Târgu Mureș, Jud. Mureș<br />
              Rumänien
            </address>
          </div>
        </div>
      </footer>

      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
