//import React from 'react';

const cardsData = [
    {
        title: "Ilustración",
        description: "Te ofrecemos servicios de ilustración para tu proyecto teniendo en cuenta la pertinencia cultural",
        image: "/assets/images/juego/zorrito.png",
    },
    {
        title: "Talleres",
        description: "Realizamos talleres de iniciación en la ilustración y escritura de cuentos y comics en diferentes lenguas indígenas",
        image: "/assets/images/juego/zorrito.png",
    },
    {
        title: "Traducción",
        description: "Te ayudamos en la traducción y edición de textos BILINGÛES (Quechua-Castellano)",
        image: "/assets/images/juego/zorrito.png",
    },
];

const cardsSection = () => {
  return (
    <section className="py-8 my-8 bg-texto2 bg-opacity-25 p-8 rounded-lg text-center">
      <div className="py-8 px-10">
        <div className="container mx-auto">
          <h2 className="text-3xl text-black mb-4">Nuestros Servicios</h2>

          <p className="text-xl text-black mb-6">
            Si bien realizamos <b>material gratuito didáctico y literario en quechua</b>, también ofrecemos nuestros 
            servicios de manera que Atuq Yachachiq sea una iniciativa autosustentable y podamos seguir liberando material. 
            Atuq Yachachiq desafía las estructuras tradicionales de distribución del conocimiento que perpetúan sistemas de 
            exclusión, las cuales refuerzan un modelo de inequidad, donde el acceso a libros y materiales culturales queda 
            restringido a sectores privilegiados.  
            <b>Cuando adquieres nuestros servicios también apoyas nuestro proyecto editorial que promueve el acceso equitativo 
            de material literario en quechua y otras lenguas indígenas de Bolivia.</b>
          </p>
        </div>

        <div className="container mx-auto mt-16">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {cardsData.map((card, index) => (
                    <div key={index} className="bg-[#FFC803]/20 rounded-3xl min-h-[300px] sm:aspect-[5/4] mx-auto">
                        <div className="flex items-center justify-center w-full text-center mt-10">
                          <img src={card.image} alt={card.title} className="h-12" />
                        </div>
                        <div className="w-full text-center">
                          <h2 className="text-2xl text-center text-[#B78E4C] font-nunito font-bold p-4">{card.title}</h2>
                        </div>
                        <p className="text-gray-600 text-xl text-center font-light p-4">{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default cardsSection;
