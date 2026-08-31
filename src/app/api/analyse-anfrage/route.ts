import { Resend } from "resend";

type Slot = { date: string; time: string };

type Payload = {
  name: string;
  email: string;
  slots: Slot[];
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIME_SLOTS = new Set([
  "09:00–09:30",
  "10:00–10:30",
  "11:00–11:30",
  "14:00–14:30",
  "15:00–15:30",
  "16:00–16:30",
]);

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim().slice(0, 2000) ?? "";
  const slots = (body.slots ?? []).filter(
    (s) => /^\d{4}-\d{2}-\d{2}$/.test(s?.date ?? "") && TIME_SLOTS.has(s?.time ?? "")
  );

  if (name.length < 2 || name.length > 120) {
    return Response.json({ error: "Bitte geben Sie Ihren Namen an." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return Response.json({ error: "Bitte geben Sie eine gültige E-Mail-Adresse an." }, { status: 400 });
  }
  if (slots.length === 0) {
    return Response.json({ error: "Bitte wählen Sie mindestens einen Terminvorschlag." }, { status: 400 });
  }

  const slotLines = slots
    .map((s, i) => `Vorschlag ${i + 1}: ${formatDate(s.date)}, ${s.time} Uhr`)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Lokaler Betrieb ohne Key: Anfrage nur loggen, damit das Formular testbar bleibt.
    console.log(`[analyse-anfrage] ${name} <${email}>\n${slotLines}\n${message}`);
    return Response.json({ ok: true, delivered: false });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "METHUSALAB Website <kontakt@methusalab.de>",
    to: ["kontakt@methusalab.de"],
    replyTo: email,
    subject: `Analysegespräch: ${name}`,
    html: [
      `<h2>Neue Anfrage für ein Analysegespräch</h2>`,
      `<p><b>Name:</b> ${esc(name)}<br/><b>E-Mail:</b> ${esc(email)}</p>`,
      `<p><b>Terminvorschläge:</b><br/>${esc(slotLines).replace(/\n/g, "<br/>")}</p>`,
      message ? `<p><b>Nachricht:</b><br/>${esc(message).replace(/\n/g, "<br/>")}</p>` : "",
    ].join(""),
  });

  if (error) {
    console.error("[analyse-anfrage] Resend-Fehler:", error);
    return Response.json(
      { error: "Die Anfrage konnte nicht gesendet werden. Bitte schreiben Sie uns direkt an kontakt@methusalab.de." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true, delivered: true });
}
