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

const Equipo = () => {
  const equiposInformaticos = [
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
    {
      nombre: "Ruben Pol Ventura Huchani",
      imagen: "/assets/images/equipo/VENTURA_POL.jpg",
      linkedin: "https://www.linkedin.com/in/ruben-pol-ventura-huchani-846609337?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      profesion: "Estudiante de Ingeniería de Sistemas y Economía",
    },
    {
      nombre: "Alex Ojeda Copa",
      imagen: "/assets/images/equipo/Ojeda.jpg",
      linkedin: "https://linkedin.com/in/persona1",
      profesion: "Sociólogo e informático",
    },
    {
      nombre: "Tania Gisela Choque Condori",
      imagen: "/assets/images/equipo/Choque.jpg",
      linkedin: "https://linkedin.com/in/persona1",
      profesion: "Ingeniera de sistemas y médico cirujano",
    },
  ];

  const equiposDiseno = [
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

  const equiposLinguistica = [
    {
      nombre: "Maria Eugenia Hidalgo Cossio",
      imagen: "/assets/images/equipo/Hidalgo.png",
      linkedin: "https://www.linkedin.com/in/maria-eugenia-hidalgo-cossio-609481230/",
      profesion: "Estudiante de Lingüística",
    },
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
      nombre: "Nicaela Leon Coico",
      imagen: "/assets/images/equipo/Leon.jpg",
      linkedin: "https://www.linkedin.com/in/nicaelaleon/",
      profesion: "Lingüista e Ilustradora infantil",
    },
    {
      nombre: "Ruth Jimenez Nina",
      imagen: "/assets/images/equipo/Jimenez.png",
      linkedin: "https://linkedin.com/in/persona8",
      profesion: "Lingüista",
    },
    {
      nombre: "María Cristina Rojas López",
      imagen: "/assets/images/equipo/Rojas.png",
      linkedin: "https://www.linkedin.com/in/cristina-rojas-4a5580354?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      profesion: "Maestra en formación",
    },
    {
      nombre: "Alexis Pelaez",
      imagen: "/assets/images/equipo/Alexis_Pelaez.jpeg",
      linkedin: "http://www.linkedin.com/in/alexis-pelaez-olivera-bb461b23a",
      profesion: "Docente de idiomas",
    },
  ];

  const equiposEditorial = [
    {
      nombre: "Ximena Alvarez Gutierrez",
      imagen: "/assets/images/equipo/Alvarez.jpg",
      linkedin: "http://www.linkedin.com/in/ximena-alvarez-gutierrez-936778337",
      profesion: "Lingüista",
    },
    {
      nombre: "Tamara Ingrid Bascope Bozo",
      imagen: "/assets/images/equipo/Bascope.png",
      linkedin: "https://linkedin.com/in/persona10",
      profesion: "Estudiante de Lingüística",
    },
  ];

  const equiposIlustracion = [
    {
      nombre: "Darek Alberto Larrazabal Sanabria",
      imagen: "/assets/images/equipo/Darek_Alberto_Larrazabal_Sanabria.jpeg",
      linkedin: "http://www.linkedin.com/in/ximena-alvarez-gutierrez-936778337",
      profesion: "Artista plástico",
    },
    {
      nombre: "Marcelo Javier Cala Paredes",
      imagen: "/assets/images/equipo/Marcelo_Javier_Cala_Paredes.jpeg",
      linkedin: "https://linkedin.com/in/persona10",
      profesion: "Licenciado en Diseño Gráfico",
    },
  ];

  return (
    <div>
      {/* Sección: Equipos */}
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

      {/* Sección: Equipo de Informática o Sistemas */}
      <h2 className="text-3xl font-bold text-futuro mt-6 mb-4 text-center">
        Informática y Desarrollo Web
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {equiposInformaticos.slice(0, 3).map((miembro, index) => (
          <Card
            key={miembro.nombre}
            nombre={miembro.nombre}
            imagen={miembro.imagen}
            linkedin={miembro.linkedin}
            profesion={miembro.profesion}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4 items-center mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
          {equiposInformaticos.slice(3).map((miembro, index) => (
            <Card
              key={miembro.nombre + index + 3}
              nombre={miembro.nombre}
              imagen={miembro.imagen}
              linkedin={miembro.linkedin}
              profesion={miembro.profesion}
            />
          ))}
        </div>
      </div>

      {/* Sección: Diseño UX/UI */}
      <h2 className="text-3xl font-bold text-futuro mt-6 mb-20 text-center">Diseño UX/UI</h2>
      <Miembros miembros={equiposDiseno} />

      {/* Sección: Lingüística */}
      <h2 className="text-3xl font-semibold text-futuro mt-20 mb-4 text-center">
        Aprendizaje y Diseño Curricular
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {equiposLinguistica.slice(0, 6).map((miembro, index) => (
          <Card
            key={miembro.nombre}
            nombre={miembro.nombre}
            imagen={miembro.imagen}
            linkedin={miembro.linkedin}
            profesion={miembro.profesion}
          />
        ))}
      </div>
      {/* Miembro adicional que se centra */}
      <div className="flex justify-center mt-4">
        <Card
          key={equiposLinguistica[6].nombre}
          nombre={equiposLinguistica[6].nombre}
          imagen={equiposLinguistica[6].imagen}
          linkedin={equiposLinguistica[6].linkedin}
          profesion={equiposLinguistica[6].profesion}
        />
      </div>

      {/* Sección: Editorial */}
      <h2 className="text-3xl font-semibold text-futuro mt-16 mb-4 text-center">Editorial</h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
          {equiposEditorial.map((miembro, index) => (
            <Card
              key={index}
              nombre={miembro.nombre}
              imagen={miembro.imagen}
              linkedin={miembro.linkedin}
              profesion={miembro.profesion}
            />
          ))}
        </div>
      </div>

      {/* Sección: Ilustracion */}
      <h2 className="text-3xl font-semibold text-futuro mt-16 mb-4 text-center">Ilustración</h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-40 mb-28">
          {equiposIlustracion.map((miembro, index) => (
            <Card
              key={index}
              nombre={miembro.nombre}
              imagen={miembro.imagen}
              linkedin={miembro.linkedin}
              profesion={miembro.profesion}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Equipo;