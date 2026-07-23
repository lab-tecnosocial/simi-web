import { useEffect, useMemo, useRef, useState } from "react";

const ORGANIZATION_META = [
  {
    match: "asobec",
    label: "ASOBEC",
    logo: "/assets/images/feria-voluntariado/asobec.png",
  },
  {
    match: "banco de ropa",
    label: "Banco de Ropa",
    logo: "/assets/images/feria-voluntariado/ropa.png",
  },
  {
    match: "hacklab",
    label: "HackLab Brick-Heads",
    logo: "/assets/images/feria-voluntariado/hacklab.png",
  },
  {
    match: "ods en accion",
    label: "ODS en Accion",
    logo: "/assets/images/feria-voluntariado/ods.png",
  },
  {
    match: "partners of the americas",
    label: "Partners of the Americas",
    logo: "/assets/images/feria-voluntariado/partnersoftheamericas.png",
  },
  {
    match: "partners campus",
    label: "Partners Campus",
    logo: "/assets/images/feria-voluntariado/partners_campus.png",
  },
  {
    match: "plataforma teatral",
    label: "Plataforma Teatral Cochabamba",
    logo: "/assets/images/feria-voluntariado/plataforma_teatral.png",
  },
  {
    match: "red de voluntarios",
    label: "Red de Voluntarios por los ODS",
    logo: "/assets/images/feria-voluntariado/red_ods.png",
  },
  {
    match: "simi:",
    label: "Simi",
    logo: "/assets/images/brand/logo_simi2025.png",
  },
  {
    match: "odontologia",
    label: "SCEOC",
    logo: "/assets/images/feria-voluntariado/SCEOC.png",
  },
  {
    match: "tiltit",
    label: "TILTIT",
    logo: "/assets/images/feria-voluntariado/TILTIT.png",
  },
  {
    match: "ingenieria industrial",
    label: "SOCIEII",
    logo: "/assets/images/feria-voluntariado/socieii.png",
  },
  {
    match: "linguistica",
    label: "SOCIELIN",
    logo: "/assets/images/feria-voluntariado/socielin.png",
  },
  {
    match: "fundacion naira",
    label: "Fundacion Naira",
    logo: "/assets/images/feria-voluntariado/naira.jpg",
  },
  {
    match: "bomberos voluntarios",
    label: "Bomberos voluntarios: Yunka Atoq",
    logo: "/assets/images/feria-voluntariado/bomberos_voluntarios.jpg"
  },
  {
    match: "red tu decides",
    label: "Red tu decides",
    logo: "/assets/images/feria-voluntariado/red_tu_decides.jpg"
  }
];

const SOCIAL_LABELS = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  web: "Sitio web",
  app: "Aplicación",
  otros: "Mas info",
};

const ORGANIZATIONS_SECTION_ID = "organizaciones-participantes";
const ROUTE_ORG_KEYS = [
  "org",
  "organizacion",
  "organización",
  "institucion",
  "institución",
  "participant",
  "participante",
];

function getOtherNetworkType(label = "", href = "") {
  const source = normalizeText(`${label} ${href}`);

  if (
    source.includes("play.google.com") ||
    source.includes("apps.apple.com") ||
    /\bapp\b/.test(source) ||
    source.includes("aplicacion")
  ) {
    return "app";
  }

  if (
    source.includes("sitio web") ||
    source.includes("pagina web") ||
    source.includes("website") ||
    /\bweb\b/.test(source)
  ) {
    return "web";
  }

  return "otros";
}

function normalizeText(value = "") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function toSlug(value = "") {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getMeta(participant) {
  const name = normalizeText(participant.nombre);
  return (
    ORGANIZATION_META.find((meta) => name.includes(meta.match)) || {
      label: participant.nombre,
      logo: "https://placehold.co/100x50/0b2545/ffffff?text=Org",
    }
  );
}

function getOrderedParticipants(participants) {
  return participants
    .map((participant) => ({
      ...participant,
      meta: getMeta(participant),
    }))
    .sort((a, b) => {
      const indexA = ORGANIZATION_META.findIndex(
        (meta) => meta.match === a.meta.match,
      );
      const indexB = ORGANIZATION_META.findIndex(
        (meta) => meta.match === b.meta.match,
      );

      return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
    });
}

function getSocialLinks(redesSociales = {}) {
  return Object.entries(redesSociales).flatMap(([network, value]) => {
    if (!value) return [];

    if (network !== "otros") {
      return [
        {
          network,
          label: SOCIAL_LABELS[network] || network,
          href: value,
        },
      ];
    }

    return String(value)
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const match = item.match(/^(.*?):\s*(https?:\/\/.+)$/);
        const hrefMatch = item.match(/https?:\/\/.+$/);
        const label = match?.[1]?.trim() || SOCIAL_LABELS.otros;
        const href = match?.[2]?.trim() || hrefMatch?.[0]?.trim() || item;
        const network = getOtherNetworkType(label, href);

        return {
          network,
          label,
          href,
        };
      })
      .filter((item) => item.href.startsWith("http"));
  });
}

function getPhoneHref(contact) {
  const phone = String(contact || "").replace(/[^\d+]/g, "");
  return phone ? `tel:${phone}` : "";
}

function getWhatsappUrl(participant) {
  const rawContact = String(participant.contacto || "").replace(/\D/g, "");
  if (!rawContact) return "";

  const phone = rawContact.startsWith("591") ? rawContact : `591${rawContact}`;
  const message = encodeURIComponent(
    `Hola, vi a ${participant.nombre} en la Feria del Voluntariado y quiero conocer como participar.`,
  );

  return `https://wa.me/${phone}?text=${message}`;
}

function getOrganizationRouteValue() {
  if (typeof window === "undefined") return "";

  const searchParams = new URLSearchParams(window.location.search);
  for (const key of ROUTE_ORG_KEYS) {
    const value = searchParams.get(key);
    if (value) return value;
  }

  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return "";

  const hashParams = new URLSearchParams(hash);
  for (const key of ROUTE_ORG_KEYS) {
    const value = hashParams.get(key);
    if (value) return value;
  }

  const hashPrefix = "org-";
  if (hash.startsWith(hashPrefix)) {
    return decodeURIComponent(hash.slice(hashPrefix.length));
  }

  return "";
}

function findParticipantByRouteValue(participants, routeValue) {
  const normalizedRouteValue = normalizeText(routeValue || "");
  const routeSlug = toSlug(routeValue || "");

  if (!normalizedRouteValue && !routeSlug) return null;

  return (
    participants.find((participant) => {
      const participantName = normalizeText(participant.nombre);
      const participantLabel = normalizeText(participant.meta?.label || "");
      const participantMatch = normalizeText(participant.meta?.match || "");
      const participantNameSlug = toSlug(participant.nombre);
      const participantLabelSlug = toSlug(participant.meta?.label || "");

      return (
        participantName === normalizedRouteValue ||
        participantLabel === normalizedRouteValue ||
        participantMatch === normalizedRouteValue ||
        participantName.includes(normalizedRouteValue) ||
        participantLabel.includes(normalizedRouteValue) ||
        participantMatch.includes(normalizedRouteValue) ||
        participantNameSlug === routeSlug ||
        participantLabelSlug === routeSlug
      );
    }) || null
  );
}

function SocialIcon({ network, className = "h-5 w-5" }) {
  if (network === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="currentColor"
      >
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6h1.7V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H8v3h2.5v8h3Z" />
      </svg>
    );
  }

  if (network === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (network === "tiktok") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="currentColor"
      >
        <path d="M14.6 3h2.8c.2 1.8 1.2 3.2 3 3.8v2.9c-1.3-.1-2.6-.5-3.7-1.3V15a5 5 0 1 1-5-5c.4 0 .9 0 1.3.1v2.9a2.4 2.4 0 0 0-1.2-.3 2.3 2.3 0 1 0 2.8 2.3V3Z" />
      </svg>
    );
  }

  if (network === "web") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </svg>
    );
  }

  if (network === "app") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M10.5 5.5h3M11 18.5h2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M12 5v14m7-7H5m2.2-4.8A9 9 0 1 0 20 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path
        d="M5.7 3.5h2.9c.5 0 1 .3 1.2.8l1.2 3a1.5 1.5 0 0 1-.3 1.6l-1.3 1.6a14.5 14.5 0 0 0 4.9 4.9l1.6-1.3a1.5 1.5 0 0 1 1.6-.3l3 1.2c.5.2.8.7.8 1.2v2.9a1.5 1.5 0 0 1-1.5 1.5H19A15 15 0 0 1 4 5v-.1a1.5 1.5 0 0 1 1.7-1.4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FeriaVoluntariadoOrganizations({ participants = [] }) {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const hasHandledRouteOpen = useRef(false);
  const orderedParticipants = useMemo(
    () => getOrderedParticipants(participants),
    [participants],
  );

  useEffect(() => {
    if (hasHandledRouteOpen.current) return;
    hasHandledRouteOpen.current = true;

    const routeValue = getOrganizationRouteValue();
    if (!routeValue) return;

    const participant = findParticipantByRouteValue(
      orderedParticipants,
      routeValue,
    );
    if (!participant) return;

    setSelectedParticipant(participant);

    const section = document.getElementById(ORGANIZATIONS_SECTION_ID);
    if (!section) return;

    requestAnimationFrame(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [orderedParticipants]);

  useEffect(() => {
    if (!selectedParticipant) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedParticipant(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedParticipant]);

  const selectedMeta = selectedParticipant?.meta;
  const socialLinks = selectedParticipant
    ? getSocialLinks(selectedParticipant.redes_sociales)
    : [];
  const phoneHref = selectedParticipant
    ? getPhoneHref(selectedParticipant.contacto)
    : "";
  const whatsappUrl = selectedParticipant
    ? getWhatsappUrl(selectedParticipant)
    : "";

  return (
    <section id={ORGANIZATIONS_SECTION_ID} className="p-6 pt-4 sm:p-10 lg:p-12">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-400 lg:text-left">
        Organizaciones Participantes
      </p>

      <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:gap-8">
        {orderedParticipants.map((participant) => (
          <button
            key={participant.nombre}
            type="button"
            className="group relative flex h-40 items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 text-left shadow-md transition duration-200 hover:-translate-y-1 hover:border-[#59CB07]/60 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#59CB07]/35"
            aria-label={`Ver datos de ${participant.nombre}`}
            onClick={() => setSelectedParticipant(participant)}
          >
            <img
              src={participant.meta.logo}
              alt={participant.meta.label}
              className="max-h-32 w-auto max-w-full object-contain transition duration-200 group-hover:scale-105"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {selectedParticipant && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b2545]/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="organization-dialog-title"
          onClick={() => setSelectedParticipant(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/70 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-2xl leading-none text-slate-600 transition hover:bg-slate-200 hover:text-[#0b2545] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#59CB07]/35"
              aria-label="Cerrar"
              onClick={() => setSelectedParticipant(null)}
            >
              ×
            </button>

            <div className="grid gap-0 md:grid-cols-[0.85fr_1.15fr]">
              <div className="flex min-h-56 items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-8 md:min-h-full">
                <img
                  src={selectedMeta.logo}
                  alt={selectedMeta.label}
                  className="max-h-52 w-auto max-w-full object-contain"
                />
              </div>

              <div className="space-y-5 p-6 pt-12 sm:p-8 sm:pt-14">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FF4B4B]">
                    Feria del Voluntariado
                  </p>
                  <h2
                    id="organization-dialog-title"
                    className="mt-2 text-2xl font-black leading-tight text-[#0b2545] sm:text-3xl"
                  >
                    {selectedParticipant.nombre}
                  </h2>
                </div>

                {selectedParticipant.descripcion && (
                  <p className="text-base leading-relaxed text-slate-700">
                    {selectedParticipant.descripcion}
                  </p>
                )}

                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Hablar por WhatsApp con ${selectedParticipant.representante || "la organización"}`}
                    className="flex w-full items-center justify-center rounded-xl bg-[#59CB07] px-5 py-3 text-center text-base font-black text-white shadow-lg shadow-[#59CB07]/25 transition hover:-translate-y-0.5 hover:bg-[#4eb306] hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#59CB07]/35"
                  >
                    Hablar con{" "}
                    {selectedParticipant.representante || "la organización"}
                  </a>
                )}

                {(socialLinks.length > 0 || selectedParticipant.contacto) && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {socialLinks.map((link) => (
                      <a
                        key={`${link.label}-${link.href}`}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.label}
                        title={link.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[#0b2545] transition hover:border-[#1EAFF6]/60 hover:bg-[#1EAFF6]/10"
                      >
                        <SocialIcon network={link.network} />
                      </a>
                    ))}

                    {phoneHref && (
                      <a
                        href={phoneHref}
                        aria-label={`Llamar a ${selectedParticipant.contacto}`}
                        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-[#0b2545] transition hover:border-[#1EAFF6]/60 hover:bg-[#1EAFF6]/10"
                      >
                        <PhoneIcon className="h-4 w-4" />
                        <span>{selectedParticipant.contacto}</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
