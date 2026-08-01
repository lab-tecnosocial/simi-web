import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

const Page = React.forwardRef(({ src, alt }, ref) => (
  <div className="bg-white" ref={ref}>
    <img src={src} alt={alt} className="w-full h-full object-contain" draggable={false} loading="lazy" />
  </div>
));

// Visor de hojeado real (react-pageflip) compartido por boletines (páginas ya renderizadas
// desde PDF) y cómics (páginas guardadas directo como imágenes WebP).
const FlipBookViewer = ({ pages, title, totalPages, loadingMore = false }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef(null);
  const pageCount = totalPages ?? pages.length;

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
          Página {currentPage + 1} de {pageCount}
          {loadingMore && (
            <span className="w-4 h-4 rounded-full border-2 border-qumir/20 border-t-qumir animate-spin" />
          )}
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

export default FlipBookViewer;
