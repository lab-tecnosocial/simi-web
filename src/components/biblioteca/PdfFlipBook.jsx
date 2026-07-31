import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { loadPdf, renderPageToDataUrl } from "./pdfRenderer.js";
import Spinner from "./Spinner.jsx";

const Page = React.forwardRef(({ src, alt }, ref) => (
  <div className="bg-white" ref={ref}>
    <img src={src} alt={alt} className="w-full h-full object-contain" draggable={false} />
  </div>
));

const PdfFlipBook = ({ pdfUrl, title }) => {
  const [pages, setPages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setPages([]);
    setTotalPages(0);

    (async () => {
      try {
        // Prioriza la primera página para mostrar el libro cuanto antes;
        // el resto se sigue renderizando en segundo plano.
        const pdfDoc = await loadPdf(pdfUrl);
        if (cancelled) return;
        setTotalPages(pdfDoc.numPages);

        const firstPage = await renderPageToDataUrl(pdfDoc, 1, 1.4);
        if (cancelled) return;
        setPages([firstPage]);

        for (let i = 2; i <= pdfDoc.numPages; i++) {
          if (cancelled) return;
          const rendered = await renderPageToDataUrl(pdfDoc, i, 1.4);
          if (cancelled) return;
          setPages((prev) => [...prev, rendered]);
        }
      } catch (err) {
        if (!cancelled) setError(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-futuro/70 mb-4">No se pudo cargar el PDF.</p>
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-qumir font-bold hover:underline">
          Abrir el archivo directamente &rarr;
        </a>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="flex flex-col items-center py-16">
        <Spinner size={48} className="mb-4" />
        <p className="text-futuro/70">Abriendo boletín...</p>
      </div>
    );
  }

  const stillLoadingMore = totalPages > 0 && pages.length < totalPages;

  return (
    <div className="flex flex-col items-center" style={{ overscrollBehaviorY: "contain" }}>
      <HTMLFlipBook
        ref={bookRef}
        width={500}
        height={700}
        size="stretch"
        minWidth={280}
        maxWidth={800}
        minHeight={400}
        maxHeight={1100}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={(e) => setCurrentPage(e.data)}
        className="shadow-2xl"
      >
        {pages.map((src, i) => (
          <Page key={i} src={src} alt={`${title} - página ${i + 1}`} />
        ))}
      </HTMLFlipBook>

      <div className="flex items-center justify-between w-full max-w-md mt-6">
        <button
          type="button"
          onClick={() => bookRef.current?.pageFlip().flipPrev()}
          disabled={currentPage === 0}
          className="px-5 py-2 rounded-full font-bold text-white bg-futuro disabled:opacity-30 disabled:cursor-not-allowed"
        >
          &larr; Anterior
        </button>

        <span className="text-futuro font-nunito flex items-center gap-2">
          Página {currentPage + 1} de {stillLoadingMore ? totalPages : pages.length}
          {stillLoadingMore && <Spinner size={16} />}
        </span>

        <button
          type="button"
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          disabled={currentPage === pages.length - 1}
          className="px-5 py-2 rounded-full font-bold text-white bg-qumir disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Siguiente &rarr;
        </button>
      </div>
    </div>
  );
};

export default PdfFlipBook;
