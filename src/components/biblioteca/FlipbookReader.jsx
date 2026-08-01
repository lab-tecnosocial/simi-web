import React from "react";
import FlipBookViewer from "./FlipBookViewer.jsx";

const TYPE_LABELS = {
  boletin: "Boletín",
  comic: "Cómic",
};

const LANGUAGE_LABELS = {
  quechua: "Quechua",
  aymara: "Aymara",
  kichwa: "Kichwa",
  tseltal: "Tseltal",
};

const ReaderHeader = ({ item }) => (
  <div className="mt-4 mb-6">
    <div className="flex flex-wrap gap-2 mb-2">
      <span
        className="inline-block text-xs font-bold uppercase tracking-wide text-white rounded-full px-3 py-1"
        style={{ backgroundColor: item.color }}
      >
        {TYPE_LABELS[item.type] || item.type}
      </span>
      {item.language && (
        <span className="inline-block text-xs font-bold uppercase tracking-wide text-futuro/70 bg-gray-100 rounded-full px-3 py-1">
          {LANGUAGE_LABELS[item.language] || item.language}
        </span>
      )}
    </div>
    <h1 className="text-3xl font-bold font-nunito text-black">{item.title}</h1>
    {item.author && <p className="text-futuro/70">{item.author}</p>}
  </div>
);

// Todas las páginas están guardadas como imágenes WebP: se hojean directo,
// sin descargar ni procesar ningún PDF en el navegador.
const FlipbookReader = ({ item }) => {
  const pages = (item.pages || []).map((p) => p.image).filter(Boolean);

  if (pages.length === 0) {
    return <p className="text-center text-futuro/70 py-10">Este título todavía no tiene páginas cargadas.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <a href="/simiteca" className="text-qumir font-bold hover:underline">&larr; Volver a la Simiteca</a>

      <ReaderHeader item={item} />

      <FlipBookViewer pages={pages} title={item.title} />

      {item.downloadUrl && (
        <p className="mt-6 text-center">
          <a
            href={item.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-qumir font-bold hover:underline"
          >
            Descargar el PDF original &rarr;
          </a>
        </p>
      )}
    </div>
  );
};

export default FlipbookReader;
