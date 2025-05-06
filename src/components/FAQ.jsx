import React, { useState, useRef, useEffect } from "react";

export default function FAQ({ questions }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container max-w-7xl mx-auto p-8 sm:p-8 lg:p-10">

      <div className="flex flex-col items-center mb-4">
        <img
          src="/assets/images/simicards.png"
          alt="Equipos"
          className="w-28 h-auto mt-12 mb-12"
        />
        <h2 className="text-4xl sm:text-4xl text-center font-nunito font-black mb-12">
          Preguntas frecuentes
        </h2>
      </div>

      {questions.map((item, index) => (
        <div key={index} className="border border-texto2 rounded-xl bg-white">
          <button
            className={`w-full text-left p-4 mt-4 mb-4 flex justify-between items-center 
              ${activeIndex === index ? 'bg-white' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <h4 className="text-xl font-normal">{item.question}</h4>
            <span>{activeIndex === index ? <i className="fa fa-chevron-down ml-1 mr-2 text-xl"></i> : <i className="fa fa-chevron-right ml-1 mr-2 text-xl text-gray-600"></i>}</span>
          </button>
          
          {activeIndex === index && (
            <div className="p-4 mt-8 mb-8 bg-white border-spacing-0 text-futuro text-lg">
              <p dangerouslySetInnerHTML={{ __html: item.answer }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}