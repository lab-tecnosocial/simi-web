const SobreNosotrosContent = () => {
  return (
    <section className="font-roboto flex flex-col items-center py-10 bg-white">
      <div className="flex flex-col items-center mb-20">
        <img
          src="/assets/images/simicards.png"
          alt="Simi Logo"
          className="w-32 h-32 mt-[-50px] mb-10"
        />
        <h2 className="text-5xl font-semibold text-black">Acerca de Simi</h2>
      </div>

      <div
        className="
          flex flex-col md:flex-row 
          flex-wrap md:flex-nowrap 
          items-stretch justify-center
          gap-6 w-full max-w-full mx-auto
          px-4    /* 1) Agregamos espacio horizontal en el contenedor */
        "
      >
        <div
          className="
            flex flex-col 
            bg-[#DEF5CD] p-6 
            rounded-3xl shadow-md 
            transition-transform duration-300 
            hover:scale-105 hover:bg-[#c8e6a3] 
            text-center w-full md:w-[29%]
          "
        >
          <img
            src="/assets/images/simicards.png"
            alt="Misión"
            className="w-16 h-16 mx-auto mt-3 mb-2 /* 2) Reducimos margen superior e inferior del ícono */
          "
          />
          <h3 className="text-[#59CB07] font-semibold text-3xl">Misión</h3>
          <p className="text-[#4B4B4B] mt-4 md:mt-8 text-base md:text-2xl leading-relaxed">
            Simi se trata de una aplicación para celulares que promueve el aprendizaje 
            del quechua nivel básico de una forma amigable y accesible a través de unidades 
            de aprendizaje que contienen audios e ilustraciones.
          </p>
        </div>

        <div
          className="
            flex flex-col 
            bg-[#DEF5CD] p-6 
            rounded-3xl shadow-md 
            transition-transform duration-300 
            hover:scale-105 hover:bg-[#c8e6a3] 
            text-center w-full md:w-[29%]
          "
        >
          <img
            src="/assets/images/simicards.png"
            alt="Quiénes somos"
            className="w-16 h-16 mx-auto mt-3 mb-2"
          />
          <h3 className="text-[#59CB07] font-semibold text-3xl">Quiénes somos</h3>
          <p className="text-[#4B4B4B] mt-4 md:mt-8 text-base md:text-2xl leading-relaxed">
            Simi es un equipo multidisciplinario compuesto por profesionales voluntarios/as
            del área de programación, lingüística y comunicación social que apuntan por el
            fortalecimiento del quechua en contextos digitales.
          </p>
        </div>

        <div
          className="
            flex flex-col 
            bg-[#DEF5CD] p-6 
            rounded-3xl shadow-md 
            transition-transform duration-300 
            hover:scale-105 hover:bg-[#c8e6a3] 
            text-center w-full md:w-[29%]
          "
        >
          <img
            src="/assets/images/simicards.png"
            alt="Visión"
            className="w-16 h-16 mx-auto mt-3 mb-2"
          />
          <h3 className="text-[#59CB07] font-semibold text-3xl">Visión</h3>
          <p className="text-[#4B4B4B] mt-4 md:mt-8 text-base md:text-2xl leading-relaxed">
            Simi pretende ser la primera aplicación digital líder y competitiva en la
            enseñanza del quechua en el contexto digital, apostando por el uso de
            tecnologías para la promoción y fortalecimiento del quechua en la población
            joven y adulta de Bolivia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SobreNosotrosContent;
