// src/components/Equipo.jsx
import Card from "../Card";

const Equipo = () => {
  return (
    <div>
      {/* Sección: Equipos */}
      <div className="flex flex-col items-center mb-4 mt-12">
        <img
          src="/assets/images/cabezasimi.png"
          alt="Equipos"
          className="w-48 h-auto mt-[-30px] mb-10"
        />
        <h2 className="text-4xl font-nunito font-black">
          Conoce a nuestro equipo de trabajo
        </h2>
      </div>

      {/* Sección: Equipo de Informática o Sistemas */}
      <h2 className="text-3xl font-bold mt-6 mb-4 text-center">
        Informática y Desarrollo Web
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          {
            nombre: "Vladimir Marco Mujica Pinto",
            imagen: "/assets/images/equipo/Mujica.jpg",
            linkedin: "https://linkedin.com/in/persona2",
            profesion: "Desarrollador de Software",
          },
          {
            nombre: "Raquel Andrea Calderón Gallardo",
            imagen: "/assets/images/equipo/Calderon.png",
            linkedin: "https://linkedin.com/in/persona3",
            profesion: "Ingeniería Biomédica",
          },
          {
            nombre: "Ruben Pol Ventura Huchani",
            imagen: "/assets/images/equipo/VENTURA_POL.jpg",
            linkedin: "https://linkedin.com/in/persona4",
            profesion: "Estudiante de informática",
          },
        ].map((miembro, index) => (
          <Card
            key={index}
            nombre={miembro.nombre}
            imagen={miembro.imagen}
            linkedin={miembro.linkedin}
            profesion={miembro.profesion}
          />
        ))}
      </div>

      {/* Contenedor para los dos últimos miembros */}
      <div className="flex justify-center mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
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
          ].map((miembro, index) => (
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

      {/* Sección: Equipo de Diseño UX/UI */}
      <h2 className="text-3xl font-bold mt-6 mb-4 text-center">Diseño UX/UI</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          {
            nombre: "Fabricio Lobaton",
            imagen: "/assets/images/equipo/Lobaton.jpg",
            linkedin: "https://linkedin.com/in/persona1",
            profesion: "Comunicador",
          },
          {
            nombre: "Melany Ventura",
            imagen: "/assets/images/equipo/Ventura.jpg",
            linkedin: "https://linkedin.com/in/persona2",
            profesion: "UX/UI Designer & Web Developer",
          },
          {
            nombre: "Melani Carol Padilla Olivares",
            imagen: "/assets/images/equipo/Padilla.jpg",
            linkedin: "https://linkedin.com/in/persona3",
            profesion: "UX/UI Designer",
          },
        ].map((miembro, index) => (
          <Card
            key={index}
            nombre={miembro.nombre}
            imagen={miembro.imagen}
            linkedin={miembro.linkedin}
            profesion={miembro.profesion}
          />
        ))}
      </div>

      {/* Sección: Equipo de Lingüística */}
      <h2 className="text-3xl font-semibold mt-6 mb-4 text-center">
        Aprendizaje y Diseño Curricular
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          {
            nombre: "Maria Eugenia Hidalgo Cossio",
            imagen: "/assets/images/equipo/Hidalgo.png",
            linkedin: "https://linkedin.com/in/persona4",
            profesion: "Estudiante de Lingüística",
          },
          {
            nombre: "Celia Elena Rocabado Zalles",
            imagen: "/assets/images/equipo/Rocabado.jpg",
            linkedin: "https://linkedin.com/in/persona5",
            profesion: "Lingüista",
          },
          {
            nombre: "Fania Quintana Olaques",
            imagen: "/assets/images/equipo/Quintana.jpg",
            linkedin: "https://linkedin.com/in/persona6",
            profesion: "Lingüista",
          },
          {
            nombre: "Nicaela Leon Coico",
            imagen: "/assets/images/equipo/Leon.jpg",
            linkedin: "https://linkedin.com/in/persona4",
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
            linkedin: "https://linkedin.com/in/persona9",
            profesion: "Maestra en formación",
          },
        ].map((miembro, index) => (
          <Card
            key={index}
            nombre={miembro.nombre}
            imagen={miembro.imagen}
            linkedin={miembro.linkedin}
            profesion={miembro.profesion}
          />
        ))}
      </div>

      {/* Sección: Equipo Editorial */}
      <h2 className="text-3xl font-semibold mt-6 mb-4 text-center">Editorial</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 justify-center items-center">
        {[
          {
            nombre: "Ximena Alvarez Gutierrez",
            imagen: "/assets/images/equipo/Alvarez.jpg",
            linkedin: "https://linkedin.com/in/persona7",
            profesion: "Lingüista",
          },
          {
            nombre: "Tamara Ingrid Bascope Bozo",
            imagen: "/assets/images/equipo/Bascope.png",
            linkedin: "https://linkedin.com/in/persona10",
            profesion: "Estudiante de Lingüística",
          },
        ].map((miembro, index) => (
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
  );
};

export default Equipo;