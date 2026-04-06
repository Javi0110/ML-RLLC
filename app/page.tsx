"use client";

import { FormEvent, useId, useMemo, useState } from "react";

type Lang = "es" | "en";

function JusticeScalesIcon({
  className,
  gradId
}: {
  className?: string;
  gradId: string;
}) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g
        stroke={`url(#${gradId})`}
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20V5" />
        <path d="M9 20h6" />
        <path d="M5 5h14" />
        <path d="M8 5v3l-3 7h6L11 8V5" />
        <path d="M16 5v3l-3 7h6L19 8V5" />
      </g>
      <defs>
        <linearGradient
          id={gradId}
          x1="3"
          y1="3"
          x2="21"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7f9cff" />
          <stop offset="1" stopColor="#57e5c1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const content = {
  es: {
    badge: "BUFETE DE ABOGADOS",
    title: "MELENDEZ LOPEZ & ROBLES LLC",
    subtitle:
      "Abogados-Notarios en Puerto Rico. Litigio en casos de herencia, cobros de dinero, incumplimientos de contrato, controversias de colindancias y otros.",
    areaTitle: "Servicios Legales",
    areas: ["Bienes Raíces", "Herencias", "Práctica Civil", "Notaría"],
    contactTitle: "Información de Contacto",
    address:
      "Urb. Santa Rosa 16-30 Ave. Aguas Buenas, Bayamón, PR 00959 | P.O Box 55056 Bayamón PR 00960-4056",
    appointmentTitle: "Solicitar Cita",
    appointmentText:
      "Complete este formulario y nos comunicaremos con usted para confirmar su cita.",
    labels: {
      name: "Nombre completo",
      phone: "Teléfono",
      email: "Correo electrónico",
      service: "Tipo de servicio",
      date: "Fecha preferida",
      message: "Mensaje",
      submit: "Enviar solicitud"
    },
    quickActions: {
      call: "Llamar ahora",
      mail: "Enviar email"
    },
    success: "Solicitud enviada. Le contactaremos pronto.",
    failure:
      "No se pudo enviar la solicitud. Intente nuevamente o llame al 787-946-1810.",
    footer: "Oficina legal en Bayamón, Puerto Rico."
  },
  en: {
    badge: "LAW OFFICE",
    title: "MELENDEZ LOPEZ & ROBLES LLC",
    subtitle:
      "Attorney-Notary in Puerto Rico. Clear guidance, human service, and simple processes for every age.",
    areaTitle: "Legal Services",
    areas: ["Real Estate", "Inheritance", "Civil Practice", "Notary"],
    contactTitle: "Contact Information",
    address:
      "Urb. Santa Rosa 16-30 Ave. Aguas Buenas, Bayamón, PR 00959 | P.O Box 55056 Bayamón PR 00960-4056",
    appointmentTitle: "Request an Appointment",
    appointmentText:
      "Complete this form and we will contact you to confirm your appointment.",
    labels: {
      name: "Full name",
      phone: "Phone number",
      email: "Email",
      service: "Service type",
      date: "Preferred date",
      message: "Message",
      submit: "Send request"
    },
    quickActions: {
      call: "Call now",
      mail: "Send email"
    },
    success: "Request sent. We will contact you soon.",
    failure: "Could not send request. Please try again or call 787-946-1810.",
    footer: "Law office in Bayamón, Puerto Rico."
  }
};

export default function HomePage() {
  const langIconGradId = useId().replace(/:/g, "");
  const [lang, setLang] = useState<Lang>("es");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [loading, setLoading] = useState(false);
  const t = useMemo(() => content[lang], [lang]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("idle");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <div className="wrap langToggle">
        <button
          type="button"
          className="btn btnGhost langBtn"
          onClick={() => setLang((prev) => (prev === "es" ? "en" : "es"))}
          aria-label="Change language"
        >
          <JusticeScalesIcon className="langBtnIcon" gradId={langIconGradId} />
          {lang === "es" ? "English" : "Español"}
        </button>
      </div>

      <section className="hero wrap">
        <span className="pill">{t.badge}</span>
        <h1>{t.title}</h1>
        <p className="subtitle">{t.subtitle}</p>
        <div className="ctaRow">
          <a className="btn btnPrimary" href="tel:7879461810">
            {t.quickActions.call}
          </a>
          <a className="btn btnGhost" href="mailto:fmllegal@aol.com">
            {t.quickActions.mail}
          </a>
        </div>
      </section>

      <section className="section wrap row">
        <article className="card">
          <h2>{t.areaTitle}</h2>
          <ul>
            {t.areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>{t.contactTitle}</h2>
          <p>
            <strong>{lang === "es" ? "Teléfono:" : "Phone:"}</strong>{" "}
            <a href="tel:7879461810">787-946-1810</a>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:fmllegal@aol.com">fmllegal@aol.com</a>
          </p>
          <p className="small">{t.address}</p>
        </article>
      </section>

      <section className="section wrap">
        <article className="card">
          <h2>{t.appointmentTitle}</h2>
          <p className="small">{t.appointmentText}</p>

          <form onSubmit={onSubmit}>
            <label>
              {t.labels.name}
              <input name="name" required autoComplete="name" />
            </label>

            <label>
              {t.labels.phone}
              <input name="phone" required autoComplete="tel" />
            </label>

            <label>
              {t.labels.email}
              <input name="email" type="email" required autoComplete="email" />
            </label>

            <label>
              {t.labels.service}
              <select name="service" required defaultValue="">
                <option value="" disabled>
                  -
                </option>
                {t.areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </label>

            <label>
              {t.labels.date}
              <input name="preferredDate" type="date" />
            </label>

            <label>
              {t.labels.message}
              <textarea
                name="message"
                placeholder={
                  lang === "es"
                    ? "Describa brevemente su caso..."
                    : "Briefly describe your case..."
                }
                required
              />
            </label>

            <button className="btn btnPrimary" type="submit" disabled={loading}>
              {loading ? "..." : t.labels.submit}
            </button>
          </form>

          {status === "ok" && <p className="ok">{t.success}</p>}
          {status === "error" && <p className="error">{t.failure}</p>}
        </article>
      </section>

      <footer>
        <div className="wrap">
          <p>{t.footer}</p>
        </div>
      </footer>
    </main>
  );
}
