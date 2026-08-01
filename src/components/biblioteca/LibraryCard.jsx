import React from "react";
import PlaceholderArt from "./PlaceholderArt.jsx";

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

const LibraryCard = ({ item }) => {
  const pageCount = item.pages?.length || 0;

  return (
    <a
      href={`/simiteca/${item.id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow"
      onClick={() => window.trackEvent?.("library_item_open", { id: item.id, type: item.type, title: item.title })}
    >
      <div className="aspect-[3/4] w-full overflow-hidden">
        {item.cover ? (
          <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <PlaceholderArt type={item.type} color={item.color} title={item.title} className="h-full w-full" />
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-2">
          <span
            className="self-start text-xs font-bold uppercase tracking-wide text-white rounded-full px-3 py-1"
            style={{ backgroundColor: item.color }}
          >
            {TYPE_LABELS[item.type] || item.type}
          </span>
          {item.language && (
            <span className="self-start text-xs font-bold uppercase tracking-wide text-futuro/70 bg-gray-100 rounded-full px-3 py-1">
              {LANGUAGE_LABELS[item.language] || item.language}
            </span>
          )}
        </div>
        <h3 className="font-nunito font-bold text-futuro text-xl mb-1 group-hover:text-qumir transition-colors">
          {item.title}
        </h3>
        {item.author && <p className="text-futuro/70 text-sm mb-2">{item.author}</p>}
        {item.description && (
          <p className="text-futuro/80 text-sm mb-3 line-clamp-2">{item.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-futuro/60 text-xs">{pageCount} páginas</span>
          <span className="text-qumir font-bold text-sm">Leer &rarr;</span>
        </div>
      </div>
    </a>
  );
};

export default LibraryCard;
