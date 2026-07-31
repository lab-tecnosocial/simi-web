import React, { useEffect, useRef, useState } from "react";
import PlaceholderArt from "./PlaceholderArt.jsx";
import { loadPdf, renderPageToDataUrl } from "./pdfRenderer.js";

const PdfCoverThumbnail = ({ item, className = "" }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [failed, setFailed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef(null);

  // Solo empieza a descargar el PDF cuando la tarjeta está por entrar en pantalla,
  // así no se cargan todas las portadas a la vez apenas se abre /simiteca.
  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let cancelled = false;

    loadPdf(item.pdf)
      .then((pdfDoc) => renderPageToDataUrl(pdfDoc, 1, 0.6))
      .then((dataUrl) => {
        if (!cancelled) setThumbnail(dataUrl);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [isVisible, item.pdf]);

  return (
    <div ref={wrapperRef} className={className}>
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={`Portada de ${item.title}`}
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <PlaceholderArt
          type={item.type}
          color={item.color}
          title={failed ? item.title : undefined}
          caption={failed ? undefined : "Cargando portada..."}
          loading={isVisible && !failed}
          className="h-full w-full"
        />
      )}
    </div>
  );
};

export default PdfCoverThumbnail;
