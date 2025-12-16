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
    },
    {
      id: 2,
      dia: '5-6',
      mes: 'DICIEMBRE',
      titulo: 'Festival Muy Waso',
      lugar: 'Instalaciones del proyecto mARTadero, Cochabamba',
      horario: '14:30 a 18:30',
      descripcion: 'SIMI App llega al Festival Muy Waso con Simiwan Pukllana, un juego de mesa bilingüe (quechua–castellano) diseñado para aprender y practicar vocabulario de forma divertida y colectiva. Una experiencia que nos ayudará a acercar la lengua a niñas, niños, jóvenes y familias, promoviendo el orgullo cultural, la interculturalidad y el uso cotidiano del quechua en contextos creativos y comunitarios.',
      imagen: '/assets/images/MuyWaso.jpg'
    },
    {
      id: 3,
      dia: '',
      mes: '',
      titulo: 'Próximamente',
      lugar: 'Mantente atento a nuestras redes sociales para conocer más.',
      horario: 'Muy pronto anunciaremos el siguiente evento',
      descripcion: '',
      imagen: '/assets/images/simi_calendario.png'
    }
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 md:py-12 lg:py-16 bg-white font-nunito">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-black mb-8 md:mb-12 text-left">
        Próximos eventos
      </h1>

      <div className="space-y-8 md:space-y-10 lg:space-y-12">
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="flex flex-col lg:flex-row bg-white border border-gray-300 rounded-2xl shadow-lg overflow-hidden w-full"
          >

            {/* Sección de fecha */}
            <div className="lg:w-[15%] bg-white flex flex-col items-center justify-center py-6 lg:py-0 text-center min-h-[100px] lg:min-h-0">
              {evento.mes && (
                <p className="text-gray-600 text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold uppercase tracking-wider mb-1">
                  {evento.mes}
                </p>
              )}
              {evento.dia && (
                <p className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800">
                  {evento.dia}
                </p>
              )}
            </div>

            {/* Sección de imagen */}
            <div className={`lg:w-[40%] h-48 sm:h-56 md:h-64 lg:h-auto lg:min-h-[300px] xl:min-h-[350px] overflow-hidden relative flex items-center justify-center ${
              evento.imagen.includes('simi_calendario') ? 'bg-gradient-to-br from-blue-50 to-purple-50' : ''
            }`}>
              <img
                src={evento.imagen}
                alt={evento.titulo}
                className={`${
                  evento.imagen.includes('simi_calendario') 
                    ? 'object-contain w-4/5 h-4/5 sm:w-3/4 sm:h-3/4' 
                    : 'object-cover w-full h-full'
                }`}
                style={{
                  objectFit: evento.imagen.includes('simi_calendario') ? 'contain' : 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>

            {/* Sección de contenido */}
            <div className="lg:w-[45%] p-5 sm:p-6 lg:p-8 xl:p-10 flex flex-col">
              <div className="flex-1 mb-6">
                <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {evento.titulo}
                </h3>
                
                <div className="space-y-2 mb-4 sm:mb-5">
                  <p className="text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700">
                    {evento.lugar}
                  </p>
                  <p className="text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700">
                    {evento.horario}
                  </p>
                </div>

                {evento.descripcion && (
                  <p className="text-gray-600 text-base sm:text-lg lg:text-lg xl:text-xl leading-relaxed text-justify">
                    {evento.descripcion}
                  </p>
                )}
              </div>

              <div className="pt-5 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <button className="flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 font-semibold text-base sm:text-lg lg:text-lg xl:text-xl px-5 py-2.5 rounded-lg border border-gray-300 shadow-sm transition-colors duration-200 w-full sm:w-auto">
                    <img
                      src="/assets/images/GoogleCalendar.png"
                      alt="Google Calendar"
                      className="w-5 h-5 sm:w-6 sm:h-6 mr-2"
                    />
                    Agregar al calendario
                  </button>

                  <div className="flex items-center justify-center sm:justify-end text-gray-600 text-sm sm:text-base lg:text-base xl:text-lg">
                    <img
                      src="/assets/images/Users.png"
                      alt="Usuarios"
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    />
                    {evento.id === 2 ? 'Inscripciones abiertas' : evento.id === 1 ? '25' : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventosList;
