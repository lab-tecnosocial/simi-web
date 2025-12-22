// src/components/Equipo.jsx
import React from 'react';
import Card from "../Card";

const Miembros = ({ miembros }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {miembros.map((miembro, index) => (
        <Card
          key={index}
          nombre={miembro.nombre}
          imagen={miembro.imagen}
          linkedin={miembro.linkedin}
          profesion={miembro.profesion}
        />
      ))}
    </div>
  );
};

const EquipoConLayout = ({ miembros, nombreSeccion }) => {
  if (miembros.length === 0) {
    return (
      <div className="text-center py-8 mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <span className="text-3xl text-gray-400">?</span>
        </div>
        <p className="text-gray-500 text-lg italic">Formando nuevo equipo</p>
      </div>
    );
  }

  if (miembros.length === 1) {
    return (
      <div className="flex justify-center mb-16">
        <Card
          key={`${nombreSeccion}-${miembros[0].nombre}`}
          nombre={miembros[0].nombre}
          imagen={miembros[0].imagen}
          linkedin={miembros[0].linkedin}
          profesion={miembros[0].profesion}
        />
      </div>
    );
  }

  if (miembros.length === 2) {
    return (
      <div className="flex justify-center mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-40">
          {miembros.map((miembro, index) => (
            <Card
              key={`${nombreSeccion}-${index}`}
              nombre={miembro.nombre}
              imagen={miembro.imagen}
              linkedin={miembro.linkedin}
              profesion={miembro.profesion}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16">
      {miembros.map((miembro, index) => (
        <Card
          key={`${nombreSeccion}-${index}`}
          nombre={miembro.nombre}
          imagen={miembro.imagen}
          linkedin={miembro.linkedin}
          profesion={miembro.profesion}
        />
      ))}
    </div>
  );
};

const Equipo = () => {
  // ========== FUNDADORES ==========
  const fundadores = [
    {
      nombre: "Nicaela Leon Coico",
      imagen: "/assets/images/equipo/Leon.jpg",
      linkedin: "https://www.linkedin.com/in/nicaelaleon/",
      profesion: "Lingüista e Ilustradora infantil",
    },
    {
      nombre: "Alex Ojeda Copa",
      imagen: "/assets/images/equipo/Ojeda.jpg",
      linkedin: "https://linkedin.com/in/persona1",
      profesion: "Sociólogo e informático",
    },
  ];

  // ========== EQUIPO ACTUAL ==========
  // Informática y Desarrollo Web
  const equiposInformaticosActual = [
    {
      nombre: "Ruben Pol Ventura Huchani",
      imagen: "/assets/images/equipo/VENTURA_POL.jpg",
      linkedin: "https://www.linkedin.com/in/ruben-pol-ventura-huchani-846609337?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      profesion: "Estudiante de Ingeniería de Sistemas y Economía",
    },
    {
      nombre: "Tania Gisela Choque Condori",
      imagen: "/assets/images/equipo/Choque.jpg",
      linkedin: "https://linkedin.com/in/persona1",
      profesion: "Ingeniera de sistemas y médico cirujano",
    },
  ];

  // Aprendizaje y Diseño Curricular
  const equiposLinguisticaActual = [
    {
      nombre: "María Cristina Rojas López",
      imagen: "/assets/images/equipo/Rojas.png",
      linkedin: "https://www.linkedin.com/in/cristina-rojas-4a5580354?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      profesion: "Maestra de Biología-Geografía",
    },
    {
      nombre: "Maria Eugenia Hidalgo Cossio",
      imagen: "/assets/images/equipo/Hidalgo.png",
      linkedin: "https://www.linkedin.com/in/maria-eugenia-hidalgo-cossio-609481230/",
      profesion: "Estudiante de Lingüística",
    },
    {
      nombre: "Ruth Jimenez Nina",
      imagen: "/assets/images/equipo/Jimenez.png",
      linkedin: "https://linkedin.com/in/persona8",
      profesion: "Lingüista",
    },
    {
      nombre: "Jhaxson Camacho Arandia",
      imagen: "/assets/images/equipo/Jhaxson_Camacho.jpg",
      linkedin: "https://linkedin.com/in/nuevo-linguista",
      profesion: "Auditor",
    },
    {
      nombre: "Nayely Vallejos Terrazas",
      imagen: "/assets/images/equipo/nayely_vallejos.jpeg",
      linkedin: "https://linkedin.com/in/nuevo-linguista",
      profesion: "Licenciada en Biología e Geografía",
    },
  ];

  // Editorial
  const equiposEditorialActual = [
    {
      nombre: "Tamara Ingrid Bascope Bozo",
      imagen: "/assets/images/equipo/Bascope.png",
      linkedin: "https://linkedin.com/in/persona10",
      profesion: "Estudiante de Lingüística",
    },
  ];

  // Ilustración
  const equiposIlustracionActual = [
    {
      nombre: "José Froylan López García", 
      imagen: "/assets/images/equipo/LOPEZ.jpg", 
      linkedin: "https://linkedin.com/in/nuevo-ilustrador", 
      profesion: "Artista", 
    },
    {
      nombre: "Martha Danitza Paitan Inga", 
      imagen: "/assets/images/equipo/MARTHA_DANITZA.jpg", 
      linkedin: "https://www.linkedin.com/in/martha-danitza-paitan-inga-84566a330/", 
      profesion: "Contadora y Ilustradora", 
    },
  ];

  // ========== ANTIGUOS MIEMBROS ==========
  // Informática
  const antiguosEquiposInformaticos = [
    {
      nombre: "Vladimir Marco Mujica Pinto",
      imagen: "/assets/images/equipo/Mujica.jpg",
      linkedin: "http://www.linkedin.com/in/vladimir-marco-mujica-pinto-053a2562",
      profesion: "Desarrollador de Software",
    },
    {
      nombre: "Raquel Andrea Calderón Gallardo",
      imagen: "/assets/images/equipo/Calderon.png",
      linkedin: "https://www.linkedin.com/in/raquel-andrea-calderon-gallardo",
      profesion: "Ingeniería Biomédica",
    },
  ];

  // Diseño UX/UI
  const antiguosEquiposDiseno = [
    {
      nombre: "Fabricio Lobaton",
      imagen: "/assets/images/equipo/Lobaton.jpg",
      linkedin: "https://www.linkedin.com/in/fabricio-lobaton-556bb4224/",
      profesion: "Comunicador",
    },
    {
      nombre: "Melany Ventura",
      imagen: "/assets/images/equipo/Melany_Ventura.jpg",
      linkedin: "https://www.linkedin.com/in/melany-ventura/",
      profesion: "UX/UI Designer & Web Developer",
    },
    {
      nombre: "Melani Carol Padilla Olivares",
      imagen: "/assets/images/equipo/Padilla.jpg",
      linkedin: "http://www.linkedin.com/in/melanipadilla",
      profesion: "UX/UI Designer",
    },
  ];

  // Lingüística
  const antiguosEquiposLinguistica = [
    {
      nombre: "Celia Elena Rocabado Zalles",
      imagen: "/assets/images/equipo/Rocabado.jpg",
      linkedin: "https://www.linkedin.com/in/elenarocabado/",
      profesion: "Lingüista",
    },
    {
      nombre: "Fania Quintana Olaques",
      imagen: "/assets/images/equipo/Quintana.jpg",
      linkedin: "https://www.linkedin.com/in/fania-quintana-90a410343?trk=contact-info",
      profesion: "Lingüista",
    },
    
    {
      nombre: "Alexis Pelaez",
      imagen: "/assets/images/equipo/Alexis_Pelaez.jpeg",
      linkedin: "http://www.linkedin.com/in/alexis-pelaez-olivera-bb461b23a",
      profesion: "Docente de idiomas",
    },
  ];

  // Editorial
  const antiguosEquiposEditorial = [
    {
      nombre: "Ximena Alvarez Gutierrez",
      imagen: "/assets/images/equipo/Alvarez.jpg",
      linkedin: "http://www.linkedin.com/in/ximena-alvarez-gutierrez-936778337",
      profesion: "Lingüista",
    },
  ];

  // Ilustración
  const antiguosEquiposIlustracion = [
    {
      nombre: "Marcelo Javier Cala Paredes",
      imagen: "/assets/images/equipo/Marcelo_Javier_Cala_Paredes.jpeg",
      linkedin: "https://linkedin.com/in/persona10",
      profesion: "Licenciado en Diseño Gráfico",
    },

    {
      nombre: "Darek Alberto Larrazabal Sanabria",
      imagen: "/assets/images/equipo/Darek_Alberto_Larrazabal_Sanabria.jpeg",
      linkedin: "http://www.linkedin.com/in/ximena-alvarez-gutierrez-936778337",
      profesion: "Artista plástico",
    },

  ];

  return (
    <div>
      {/* Encabezado principal */}
      <div className="flex flex-col items-center mb-4 mt-12">
        <img
          src="/assets/images/simicards.png"
          alt="Equipos"
          className="w-28 h-auto mt-12 mb-12"
        />
        <h2 className="text-4xl sm:text-4xl text-center font-nunito font-black mb-16">
          Conoce a nuestro equipo de trabajo
        </h2>
      </div>

      {/* ========== SECCIÓN: FUNDADORES ========== */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center text-futuro mb-12">
          Fundadores
        </h2>
        <EquipoConLayout 
          miembros={fundadores} 
          nombreSeccion="fundadores" 
        />
      </div>

      {/* ========== SECCIÓN: EQUIPO ACTUAL ========== */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center text-futuro mb-12">
          Equipo Actual
        </h2>

        {/* Sección: Equipo de Informática o Sistemas */}
        <h3 className="text-3xl font-bold text-futuro mt-6 mb-4 text-center">
          Informática y Desarrollo Web
        </h3>
        <EquipoConLayout 
          miembros={equiposInformaticosActual} 
          nombreSeccion="actual-informatica" 
        />

        {/* Sección: Aprendizaje y Diseño Curricular */}
        <h3 className="text-3xl font-semibold text-futuro mt-20 mb-4 text-center">
          Aprendizaje y Diseño Curricular
        </h3>
        {equiposLinguisticaActual.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {equiposLinguisticaActual.slice(0, 3).map((miembro, index) => (
                <Card
                  key={`actual-ling-${miembro.nombre}`}
                  nombre={miembro.nombre}
                  imagen={miembro.imagen}
                  linkedin={miembro.linkedin}
                  profesion={miembro.profesion}
                />
              ))}
            </div>
            
            {equiposLinguisticaActual.length > 3 && (
              <div className="flex justify-center mb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-40">
                  {equiposLinguisticaActual.slice(3).map((miembro, index) => (
                    <Card
                      key={`actual-ling-extra-${miembro.nombre}`}
                      nombre={miembro.nombre}
                      imagen={miembro.imagen}
                      linkedin={miembro.linkedin}
                      profesion={miembro.profesion}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <span className="text-3xl text-gray-400">?</span>
            </div>
            <p className="text-gray-500 text-lg italic">Formando nuevo equipo</p>
          </div>
        )}

        {/* Sección: Editorial */}
        <h3 className="text-3xl font-semibold text-futuro mt-16 mb-4 text-center">Editorial</h3>
        <EquipoConLayout 
          miembros={equiposEditorialActual} 
          nombreSeccion="actual-editorial" 
        />

        {/* Sección: Ilustración */}
        <h3 className="text-3xl font-semibold text-futuro mt-16 mb-4 text-center">Ilustración</h3>
        <EquipoConLayout 
          miembros={equiposIlustracionActual} 
          nombreSeccion="actual-ilustracion" 
        />
      </div>

      {/* ========== SECCIÓN: ANTIGUOS MIEMBROS ========== */}
      <div className="mt-20 pt-12 border-t-2 border-gray-200">
        <h2 className="text-4xl font-bold text-center text-gray-600 mb-12">
          Antiguos Miembros
        </h2>

        {/* Sección: Antiguo Equipo de Informática */}
        <h3 className="text-3xl font-bold text-gray-600 mt-6 mb-4 text-center">
          Informática y Desarrollo Web
        </h3>
        <EquipoConLayout 
          miembros={antiguosEquiposInformaticos} 
          nombreSeccion="antiguo-informatica" 
        />

        {/* Sección: Antiguo Diseño UX/UI */}
        <h3 className="text-3xl font-bold text-gray-600 mt-6 mb-4 text-center">Diseño UX/UI</h3>
        <EquipoConLayout 
          miembros={antiguosEquiposDiseno} 
          nombreSeccion="antiguo-uxui" 
        />

        {/* Sección: Antigua Lingüística */}
        <h3 className="text-3xl font-semibold text-gray-600 mt-6 mb-4 text-center">
          Aprendizaje y Diseño Curricular
        </h3>
        <EquipoConLayout 
          miembros={antiguosEquiposLinguistica} 
          nombreSeccion="antiguo-linguistica" 
        />

        {/* Sección: Antigua Editorial */}
        <h3 className="text-3xl font-semibold text-gray-600 mt-6 mb-4 text-center">Editorial</h3>
        <EquipoConLayout 
          miembros={antiguosEquiposEditorial} 
          nombreSeccion="antiguo-editorial" 
        />

        {/* Sección: Antigua Ilustracion */}
        <h3 className="text-3xl font-semibold text-gray-600 mt-6 mb-4 text-center">Ilustración</h3>
        <EquipoConLayout 
          miembros={antiguosEquiposIlustracion} 
          nombreSeccion="antiguo-ilustracion" 
        />
      </div>

    </div>
  );
};

export default Equipo;