const HeroTop = () => {
    return (
      <div id="novedadesjuego" class="w-full overflow-hidden relative">
        <div class="w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] relative">
          <img 
            src="/assets/images/juego/banner.jpg" 
            alt="hero" 
            class="mx-auto w-full h-full object-cover absolute top-0 sm:top-[-50px] md:top-[-100px] lg:top-[-150px] xl:top-[-200px] brightness-75"
          />
  
          {/*<!-- Text Container (Positioned Left) -->*/}
          <div class="absolute top-[60%] left-10 transform -translate-y-[60%] text-white max-w-lg ml-24">
            <h1 class="text-4xl font-bold">Descubre ideas, inspiración y consejos en nuestro blog.<br />¡Explora y sorpréndete!</h1>
          </div>
        </div>  
      </div>
    );
  };
  
  export default HeroTop;