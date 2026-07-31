import React from "react";

const Spinner = ({ size = 40, className = "" }) => (
  <div
    className={`rounded-full border-4 border-qumir/20 border-t-qumir animate-spin ${className}`}
    style={{ width: size, height: size }}
    role="status"
    aria-label="Cargando"
  />
);

export default Spinner;
