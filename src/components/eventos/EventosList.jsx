import React from 'react';

const EventosList = () => {
  const eventos = [
    {
      id: 1,
      dia: 5,
      mes: 'JULIO',
      titulo: 'Conferencia conoce y aprende Quechua con la app Simi',
      lugar: 'Auditorio Valmert, Alianza Francesa',
      horario: '10:00 a 12:00',
      descripcion: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Nec eu pulvinar ultricies; accumsan magnis parturient molestie orci eu. Neque lobortis gravida quis nibh massa lacus adipiscing.',
      imagen: '/assets/images/JULIO.png'
    }
  ];

  return (
    <div className="w-full px-6 md:px-20 py-16 bg-white font-nunito">
      <h1 className="text-5xl font-extrabold text-black mb-12 text-left pl-2">
        <span className="tracking-tight">Próximos eventos</span>
      </h1>

      <div className="space-y-20">
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="flex flex-col lg:flex-row bg-white border border-gray-300 rounded-2xl shadow-xl overflow-hidden w-full"
          >
            {/* Fecha */}
            <div className="lg:w-1/6 bg-white flex flex-col items-center justify-start py-16 text-center">
              <p className="text-gray-600 text-3xl uppercase tracking-widest">{evento.mes}</p>
              <p className="text-8xl font-extrabold text-gray-600">{evento.dia}</p>
            </div>

            {/* Imagen */}
            <div className="lg:w-3/5 h-[680px] lg:h-auto">
              <img
                src={evento.imagen}
                alt={evento.titulo}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Detalles */}
            <div className="lg:w-2/5 p-10 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{evento.titulo}</h3>
                <p className="text-lg text-gray-700">{evento.lugar}</p>
                <p className="text-lg text-gray-700">{evento.horario}</p>
                <p className="text-gray-600 mt-10 text-lg leading-relaxed text-justify">{evento.descripcion}</p>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button className="flex items-center bg-white hover:bg-gray-100 text-gray-800 font-extrabold text-lg px-5 py-2.5 rounded-lg border border-gray-300 shadow-md transition">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Agregar al calendario
                </button>

                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 7H7v6h6V7z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3-9a1 1 0 100 2 1 1 0 000-2zm6 1a1 1 0 112-0 1 1 0 01-2 0z" clipRule="evenodd" />
                  </svg>
                  25
                </div>
              </div>
            </div>
          </div>
        ))}

        
          <div className="flex flex-col lg:flex-row bg-white border border-gray-300 rounded-2xl shadow-xl overflow-hidden w-full h-[560px]">
        
          <div className="lg:w-1/6 bg-white flex flex-col items-center justify-center text-center px-4">
            <p className="text-gray-400 text-2xl uppercase tracking-widest">Próximamente</p>
            <p className="text-6xl font-extrabold text-gray-300">?</p>
          </div>

         
          <div className="lg:w-3/5 bg-gray-100 flex items-center justify-center">
            <span className="text-5xl text-gray-400 font-extrabold transition-opacity duration-1000 ease-out opacity-0 animate-fade-in">
              Próximamente
            </span>
          </div>

          <div className="lg:w-2/5 p-10 flex flex-col justify-center items-center text-center space-y-4">
            <h3 className="text-2xl font-bold text-gray-500">Muy pronto anunciaremos el siguiente evento</h3>
            <p className="text-base text-gray-400">Mantente atento a nuestras redes sociales para conocer más.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventosList;
