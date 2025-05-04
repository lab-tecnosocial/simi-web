// src/components/Miembros.jsx
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

export default Miembros;