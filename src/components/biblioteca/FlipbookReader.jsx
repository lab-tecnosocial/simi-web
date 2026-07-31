import React, { useCallback, useEffect, useState } from "react";
import PlaceholderArt from "./PlaceholderArt.jsx";
import PdfFlipBook from "./PdfFlipBook.jsx";

const TYPE_LABELS = {
  boletin: "Boletín",
  comic: "Cómic",
};

const ReaderHeader = ({ item }) => (
  <div className="mt-4 mb-6">
    <span
      className="inline-block text-xs font-bold uppercase tracking-wide text-white rounded-full px-3 py-1 mb-2"
      style={{ backgroundColor: item.color }}
    >
      {TYPE_LABELS[item.type] || item.type}
    </span>
    <h1 className="text-3xl font-bold font-nunito text-black">{item.title}</h1>
    {item.author && <p className="text-futuro/70">{item.author}</p>}
  </div>
);

// Título cuyo contenido es un PDF completo: se hojea como un libro real, página por página.
const PdfReader = ({ item }) => (
  <div className="container mx-auto px-4 py-8 max-w-5xl">
    <a href="/simiteca" className="text-qumir font-bold hover:underline">&larr; Volver a la Simiteca</a>

    <ReaderHeader item={item} />

    <PdfFlipBook pdfUrl={item.pdf} title={item.title} />

    <p className="mt-6 text-center">
      <a href={item.pdf} target="_blank" rel="noopener noreferrer" className="text-qumir font-bold hover:underline">
        Descargar el PDF original &rarr;
      </a>
    </p>
  </div>
);

// Título cuyo contenido son páginas sueltas (imágenes de cómic/cuento/libro).
const PageFlipReader = ({ item }) => {
  const pages = item.pages || [];
  const totalPages = pages.length;
  const [pageIndex, setPageIndex] = useState(0);

  const goPrev = useCallback(() => {
    setPageIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setPageIndex((i) => Math.min(totalPages - 1, i + 1));
  }, [totalPages]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext]);

  if (totalPages === 0) {
    return <p className="text-center text-futuro/70 py-10">Este título todavía no tiene páginas cargadas.</p>;
  }

  const page = pages[pageIndex];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <a href="/simiteca" className="text-qumir font-bold hover:underline">&larr; Volver a la Simiteca</a>

      <ReaderHeader item={item} />

      <div className="aspect-[3/4] sm:aspect-[4/3] w-full rounded-lg shadow-lg overflow-hidden bg-white">
        {page.image ? (
          <img
            src={page.image}
            alt={`${item.title} - página ${pageIndex + 1}`}
            className="w-full h-full object-contain"
          />
        ) : (
          <PlaceholderArt
            type={item.type}
            color={item.color}
            title={item.title}
            caption={`Página ${pageIndex + 1} de ${totalPages}`}
            className="h-full w-full"
          />
        )}
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          type="button"
          onClick={goPrev}
          disabled={pageIndex === 0}
          className="px-5 py-2 rounded-full font-bold text-white bg-futuro disabled:opacity-30 disabled:cursor-not-allowed"
        >
          &larr; Anterior
        </button>

        <span className="text-futuro font-nunito">
          Página {pageIndex + 1} de {totalPages}
        </span>

        <button
          type="button"
          onClick={goNext}
          disabled={pageIndex === totalPages - 1}
          className="px-5 py-2 rounded-full font-bold text-white bg-qumir disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Siguiente &rarr;
        </button>
      </div>
    </div>
  );
};

const FlipbookReader = ({ item }) => {
  return item.pdf ? <PdfReader item={item} /> : <PageFlipReader item={item} />;
};

export default FlipbookReader;
