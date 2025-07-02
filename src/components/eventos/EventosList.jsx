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

            <div className="lg:w-1/6 bg-white flex flex-col items-center justify-start py-16 text-center">
              <p className="text-gray-600 text-3xl uppercase tracking-widest">{evento.mes}</p>
              <p className="text-8xl font-extrabold text-gray-600">{evento.dia}</p>
            </div>


            <div className="lg:w-3/5 h-[680px] lg:h-auto">
              <img
                src={evento.imagen}
                alt={evento.titulo}
                className="w-full h-full object-cover"
              />
            </div>


            <div className="lg:w-2/5 p-10 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{evento.titulo}</h3>
                <p className="text-lg text-gray-700">{evento.lugar}</p>
                <p className="text-lg text-gray-700">{evento.horario}</p>
                <p className="text-gray-600 mt-10 text-lg leading-relaxed text-justify">{evento.descripcion}</p>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button className="flex items-center bg-white hover:bg-gray-100 text-gray-800 font-extrabold text-lg px-5 py-2.5 rounded-lg border border-gray-300 shadow-md transition">
                  <img
                    src="/assets/images/GoogleCalendar.png"
                    alt="Google Calendar"
                    className="w-6 h-6 mr-2"
                  />
                  Agregar al calendario
                </button>


                <div className="flex items-center text-gray-600 text-sm">
                  <img
                    src="/assets/images/Users.png"
                    alt="Usuarios"
                    className="w-5 h-5 mr-1"
                  />
                  25
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
