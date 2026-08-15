import React from "react";
import Spinner from "./Spinner.jsx";

const ICONS = {
  boletin: "fa-newspaper",
  comic: "fa-images",
};

// Portada o página de relleno mientras no hay imágenes reales, o mientras se genera la vista previa del PDF.
const PlaceholderArt = ({ type, color = "#4B4B4B", title, caption, loading = false, className = "" }) => {
  const icon = ICONS[type] || "fa-book";

  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-6 ${className}`}
      style={{
        background: `linear-gradient(160deg, ${color}33 0%, ${color}11 100%)`,
        border: `2px dashed ${color}88`,
      }}
    >
      {loading ? (
        <Spinner className="mb-4" />
      ) : (
        <i className={`fas ${icon} text-5xl mb-4`} style={{ color }} aria-hidden="true"></i>
      )}
      {title && (
        <p className="font-nunito font-bold text-futuro text-lg leading-snug break-words">
          {title}
        </p>
      )}
      {caption && (
        <p className="font-nunito text-futuro/70 text-sm mt-2">{caption}</p>
      )}
    </div>
  );
};

export default PlaceholderArt;
