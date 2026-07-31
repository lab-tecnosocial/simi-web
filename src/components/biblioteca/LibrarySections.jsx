import React, { useState } from "react";
import biblioteca from "../data/biblioteca.json";
import LibraryCard from "./LibraryCard.jsx";

const TABS = [
  { type: "boletin", title: "Boletines", icon: "fa-newspaper" },
  { type: "comic", title: "Cómics", icon: "fa-images" },
];

const LibrarySections = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].type);
  const items = biblioteca
    .filter((item) => item.type === activeTab)
    .sort((a, b) => b.id - a.id);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-wrap gap-4 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.type}
            type="button"
            onClick={() => setActiveTab(tab.type)}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-nunito font-bold text-xl transition-all ${
              activeTab === tab.type
                ? "bg-qumir text-white shadow-lg scale-105"
                : "bg-white text-futuro/60 border-2 border-gray-200 hover:border-qumir hover:text-qumir"
            }`}
          >
            <i className={`fas ${tab.icon} text-2xl`} aria-hidden="true"></i>
            {tab.title}
          </button>
        ))}
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <LibraryCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-futuro/70 text-center py-16">
          Muy pronto vas a encontrar {TABS.find((t) => t.type === activeTab)?.title.toLowerCase()} aquí.
        </p>
      )}
    </div>
  );
};

export default LibrarySections;
