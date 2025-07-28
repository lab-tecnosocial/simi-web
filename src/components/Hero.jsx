const Hero = () => {
  return (
    <section className="relative flex justify-center items-start xl:items-center h-auto xl:min-h-screen p-10 overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 z-0"
      ></div>

      <div className="relative z-10 flex flex-col xl:flex-row items-center gap-6 transform origin-center scale-100 xl:scale-[1.2] 2xl:scale-[1.4]">
        <img
          src="/assets/images/QHICHWAPI PARLANA.png"
          alt="Personaje aprendiendo"
          className="w-64 md:w-96 -translate-x-4 md:-translate-x-8 transition-transform"
        />

        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4E4E4E] mb-6 leading-tight">
            Aprende <span className="text-[#58CB05] font-bold">Quechua</span>
            <br />
            de forma fácil y divertida
          </h1>

          <div className="flex flex-col gap-3 mt-4">
            <a
              href="https://play.google.com/store/apps/details?id=org.labtecnosocial.simi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-[#58CB05] text-white font-normal py-2 px-6 rounded-2xl shadow-[0_6px_12px_rgba(0,0,0,0.2)] hover:bg-green-700 transition-all w-48 transform hover:scale-105">
                DESCARGAR APP
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
