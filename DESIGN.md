# METHUSALAB Design System

Single source of truth für Website, Social Media und alle Markenauftritte.
Bei Wert-Abweichungen gilt `src/app/globals.css`.

## Colors

Neutrale — warmes Papier statt Weiß, warme Tinte statt Schwarz:

- **Paper** (#F5F0EB): Seitenhintergrund. Nie reines Weiß verwenden.
- **Paper-2** (#EDE7E0): Abgesetzte Flächen und Sektionsverläufe.
- **Paper-3** (#FAF7F4): Karten auf Papier-Hintergrund.
- **Ink** (#1A1716): Text, Rail, dunkle UI. Nie reines Schwarz verwenden.
- **Ink-Soft** (#4A4543): Fließtext, Sekundärtext.
- **Muted** (#8A8480): Metatext, Bildunterschriften, Footer-Details.

Orb-Palette — die Markenfarben, benannt nach dem zentralen Orb-Motiv:

- **Deep-Indigo** (#1A0E4B): Dunkle Sektionen (Finale), Panels, Social-Hintergründe.
- **Royal** (#4327AE): Verläufe, tiefe Akzente.
- **Vivid** (#7A44D4): Primärer Akzent — Links, Eyebrows, Rollen-Labels, Kennzahlen.
- **Orchid** (#A86CF4): Buttons, Hover-Zustände, helle Akzente.
- **Lavender** (#DBB4FD): Text und zarte Akzente auf dunklen Flächen.
- **Electric** (#4379E8): Kontrast-Akzent, sparsam einsetzen.

Regeln:

- Verläufe bleiben innerhalb der Orb-Palette (z. B. Deep-Indigo → Royal → Vivid), nie Fremdfarben.
- Auf Deep-Indigo: Headlines in Paper, Sekundäres in Lavender-Abstufungen (rgba(219,180,253,…)).
- Das Orb-Motiv (radialer Verlauf wie eine von unten angeschnittene aufgehende Sonne) ist das zentrale Markenbild — Website-Finale, og-Image, Statement-Grafiken.

## Typography

- **Manrope** (Sans, 400–800): UI, Fließtext, Labels, Buttons. Gewicht 500 für Wordmarks und Grafiken.
- **Instrument Serif** (400): Headlines, große Kennzahlen, Zitate.
- **Kaushan Script**: nur Sonderfälle, sehr sparsam.

Regeln:

- Headlines: Serif, letter-spacing −0.01em bis −0.02em, Zeilenhöhe 1.0–1.15.
- Body: Manrope 400, 15–17 px, Zeilenhöhe 1.55–1.6, Farbe Ink-Soft.
- Eyebrows/Labels: Manrope 600, Versalien, letter-spacing 0.14–0.18em, 11–12 px.
- Wordmark „METHUSALAB": Manrope 500, Versalien, stark gesperrt (Tracking ≈ 0.35–0.5 em der Schriftgröße).
- Große Kennzahlen in Grafiken: Instrument Serif in Vivid.

## Spacing

- Basiseinheit: 4 px; übliche Schritte 8 / 12 / 16 / 24 / 34 / 56 px.
- Sektionen: 96 px vertikal (Desktop), 72 px (Tablet ≤1024), 56 px (Mobile ≤760), 44 px (≤400).
- Content-Breite: max. 1200 px (`.wrap`), Seitenränder 56 px → 36 px → 24 px → 16 px je Breakpoint.
- Rail links: 86 px (Desktop), 72 px (Tablet), wird auf Mobile zur 60-px-Topbar.

## Components

- **Buttons**: Pill-Form (radius 999), Manrope 600, Höhe 40 px. CTA: Orchid mit weißem Text; auf dunklen Flächen glasig (backdrop-blur, halbtransparente Border). Standard-CTA-Text: „Kostenloses Analysegespräch".
- **Karten** (lcard/tcard/proj-card): Radius 14–20 px, Border rgba(26,23,22,0.05–0.10), Hover-Lift −3 bis −5 px mit violettem Soft-Shadow (rgba(168,108,244,0.14–0.18)).
- **Use-Case-Karten** (ucard): Editorial-Layout — Gradient-Markenfläche links (0.75fr) + Textkörper rechts (1.25fr); Kennzahlen-Leiste mit Hairline-Trennern unten; zweite Karte gleiches Layout wie die erste.
- **Team-Kacheln** (tcard): quadratisches Foto (Radius 12 px) → Name → Rolle in Vivid → ein Satz.
- **Modal** (Terminanfrage): Deep-Indigo-Panel, Radius 20 px, glasige Inputs (rgba(245,240,235,0.07), Border Lavender 20 %), Fokus-Border Orchid.
- **Finale/Footer**: Deep-Indigo mit animiertem Orb, zentrierter CTA, Impressum-Block klein in Lavender 38 %.
- Breakpoints: 1024 px (Tablet), 860–1000 px (Karten stapeln), 760 px (Mobile, Rail → Topbar), 400 px (klein).

## Elevation

- Grundsatz: flach; Tiefe entsteht durch Farbe (Papier-Abstufungen, Indigo-Flächen), nicht durch Schatten.
- Hover-Schatten Karten: `0 6–8px 24–32px -6px rgba(168,108,244,0.14–0.18)`.
- Modal: `0 24px 80px -12px rgba(10,5,35,0.7)` über Overlay rgba(16,9,48,0.6) mit blur(6px).
- Keine harten Schlagschatten, keine Neon-Glows außerhalb des Orb-Motivs.

## Guidelines

Logo:

- Balkenmarke: drei vertikale Balken (ViewBox 141.7 × 141.7; Rects x=0 und x=109.9 volle Höhe, x=55 ab y=42.1).
- Nur Weiß (auf Dunkel) oder Ink (auf Hell). Mit Wordmark: Marke zentriert über gesperrtem „METHUSALAB", Abstand ≈ ⅓ der Markenhöhe.

Team-Porträts (`public/assets/team/`, WebP 720×720):

- Quadratischer Beschnitt: Kopfoberkante bei 10 % der Kachel, Kopfhöhe 44–50 %, Gesicht horizontal zentriert.
- Kontrast normalisieren, Sättigung ≈ 90 %.
- Indigo-Verlauf von unten: transparent bis 40 % Höhe, dann auf Deep-Indigo bis ≈ 60 % Deckkraft am unteren Rand.
- Fehlender Randraum wird aus dem Bildhintergrund verlängert, nie mit Blur-Flächen über Köpfen.

Social-Media-Grafiken (LinkedIn, 1200×1200; Link-Preview-Bilder in 2× rendern):

- **Statement-Karte** (dunkel): Fast-Schwarz #0B0714 mit Orb-Glow von unten, Logo + Wordmark oben, These in Instrument Serif zentriert, Subline in Lavender-Versalien.
- **Diagramm** (hell): Paper-Hintergrund, Serif-Headline links oben, Eyebrow in Vivid, weiße Boxen mit violettem Akzentbalken links (Hervorgehobenes als Deep-Indigo-Box), Kennzahlen in Serif + Vivid, Logo-Zeile unten links.
- Keine Emojis, keine Icon-Reihen, keine Hashtag-Wände.

Sprache & Ton:

- **Niemals gendern** — generisches Maskulinum (kein „:innen", „*innen", keine Ersatzformen). Gilt projektübergreifend.
- Sachlich und konkret, keine Superlative, Nutzen vor Feature.
- „Sie" auf der Website; LinkedIn-Posts dürfen „ihr" in der Schlussfrage nutzen.
- Schreibweise: „METHUSALAB" in Headlines/Wordmark, „methusalab" im Fließtext und als Handle.
