import React, { useState } from "react";
import biblioteca from "../data/biblioteca.json";
import LibraryCard from "./LibraryCard.jsx";

const TABS = [
  { code: "quechua", label: "Quechua", icon: "fa-language" },
  { code: "aymara", label: "Aymara", icon: "fa-language" },
  { code: "kichwa", label: "Kichwa", icon: "fa-language" },
  { code: "tseltal", label: "Tseltal", icon: "fa-language" },
];

const TYPE_LABELS = {
  boletin: "Boletines",
  comic: "Cómics",
};

const LibrarySections = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].code);
  const [typeFilter, setTypeFilter] = useState(
    () => new URLSearchParams(window.location.search).get("type")
  );

  const clearTypeFilter = () => {
    setTypeFilter(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("type");
    window.history.replaceState({}, "", url);
  };

  const items = biblioteca
    .filter((item) => item.language === activeTab)
    .filter((item) => !typeFilter || item.type === typeFilter)
    .sort((a, b) => b.id - a.id);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-wrap gap-4 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.code}
            type="button"
            onClick={() => setActiveTab(tab.code)}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-nunito font-bold text-xl transition-all ${
              activeTab === tab.code
                ? "bg-qumir text-white shadow-lg scale-105"
                : "bg-white text-futuro/60 border-2 border-gray-200 hover:border-qumir hover:text-qumir"
            }`}
          >
            <i className={`fas ${tab.icon} text-2xl`} aria-hidden="true"></i>
            {tab.label}
          </button>
        ))}
      </div>

      {typeFilter && (
        <button
          type="button"
          onClick={clearTypeFilter}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-gray-100 text-futuro/70 font-nunito text-sm font-bold hover:bg-gray-200"
        >
          Mostrando: {TYPE_LABELS[typeFilter] || typeFilter}
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
      )}

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <LibraryCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-futuro/70 text-center py-16">
          Muy pronto vas a encontrar contenido en {TABS.find((t) => t.code === activeTab)?.label} aquí.
        </p>
      )}
    </div>
  );
};

export default LibrarySections;
