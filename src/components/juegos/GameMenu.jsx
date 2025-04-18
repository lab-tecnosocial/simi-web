import Anagrama from '../assets/images/anagrama.png';
import AyudaSimi from '../assets/images/ayuda_simi.png';
import SopadeLetras from '../assets/images/sopa_de_letras.png';
import EmparejarPalabras from '../assets/images/emparejar_palabra.png';
import '../../styles/global.css';

const GameMenu = () => {
  return (
    <div className="relative flex flex-col items-center min-h-screen p-10 font-[Nunito,sans-serif] overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 z-0"
        style={{ backgroundImage: "url('/assets/images/fondo.png')" }}
      ></div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <img
          src="../assets/images/simicards.png"
          alt="cabeza logo"
          className="w-32 h-auto mx-auto mb-4"
        />

        <h1 className="text-4xl font-bold text-center text-[#58CB05] mt-4">
          ¡Bienvenidos a la sección de juegos!
        </h1>

        <p className="text-2xl text-center text-[#4B4B4B] mt-2">
          Aprende quechua mientras te diviertes
        </p>

        <a
          href="/glosario"
          className="mt-4 mb-2 bg-[#58CB05] hover:bg-green-700 text-white font-semibold text-2xl px-12 py-4 rounded-2xl flex items-center gap-3 min-w-[250px] justify-center"
        >
          <img src="../assets/images/Dictionary.png" alt="Diccionario" className="w-9 h-9" />
          <span>Ver glosario</span>
        </a>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[56px] mt-8 mb-8 px-4 w-full max-w-6xl font-[Nunito,sans-serif]">

          {/* Tarjeta Anagrama */}
          <div className="w-full h-[450px] p-0 bg-white border border-[#58CB05] rounded-2xl shadow-[0_4px_16px_rgba(88,203,5,0.3)] flex flex-col overflow-hidden transition-transform hover:scale-105">
            <div className="text-center p-4 w-full h-[120px] flex flex-col justify-end">
              <h2 className="text-[#58CB05] font-bold text-xl">T'ikraspa pukllay</h2>
              <p className="text-gray-700 text-base mt-2">Anagrama</p>
            </div>
            <div className="h-[200px] flex items-center justify-center">
              <img src={Anagrama.src} alt="Anagrama" className="max-h-full w-auto" />
            </div>
            <div className="mt-auto">
              <a
                href="/anagrama"
                className="w-full bg-[#58CB05] hover:bg-green-700 text-white font-semibold px-4 py-4 rounded-b-2xl text-center flex flex-col items-start justify-center text-lg relative"
              >
                <div className="flex flex-col items-start w-full pl-8">
                  <span className="text-xl font-bold">Pukllana</span>
                  <span className="text-lg mt-1">Jugar</span>
                </div>
                <img
                  src="../assets/images/Play.png"
                  alt="Play"
                  className="w-14 h-14 absolute right-8 bottom-5"
                />
              </a>
            </div>
          </div>

          {/* Tarjeta Salva a Simi */}
          <div className="w-full h-[450px] p-0 bg-white border border-[#58CB05] rounded-2xl shadow-[0_4px_16px_rgba(88,203,5,0.3)] flex flex-col overflow-hidden transition-transform hover:scale-105">
            <div className="text-center p-4 w-full h-[120px] flex flex-col justify-end">
              <h2 className="text-[#58CB05] font-bold text-xl">Simiman yanapay!</h2>
              <p className="text-gray-700 text-base mt-2">Salva a Simi</p>
            </div>
            <div className="h-[200px] flex items-center justify-center">
              <img src={AyudaSimi.src} alt="Salva a Simi" className="max-h-full w-auto" />
            </div>
            <div className="mt-auto">
              <a
                href="/salva"
                className="w-full bg-[#58CB05] hover:bg-green-700 text-white font-semibold px-4 py-4 rounded-b-2xl text-center flex flex-col items-start justify-center text-lg relative"
              >
                <div className="flex flex-col items-start w-full pl-8">
                  <span className="text-xl font-bold">Pukllana</span>
                  <span className="text-lg mt-1">Jugar</span>
                </div>
                <img
                  src="../assets/images/Play.png"
                  alt="Play"
                  className="w-14 h-14 absolute right-8 bottom-5"
                />
              </a>
            </div>
          </div>

          {/* Tarjeta Sopa de Letras */}
          <div className="w-full h-[450px] p-0 bg-white border border-[#58CB05] rounded-2xl shadow-[0_4px_16px_rgba(88,203,5,0.3)] flex flex-col overflow-hidden transition-transform hover:scale-105">
            <div className="text-center p-4 w-full h-[120px] flex flex-col justify-end">
              <h2 className="text-[#58CB05] font-bold text-xl">Qillqa jilli</h2>
              <p className="text-gray-700 text-base mt-2">Sopa de letras</p>
            </div>
            <div className="h-[200px] flex items-center justify-center">
              <img src={SopadeLetras.src} alt="Sopa de letras" className="max-h-full w-auto" />
            </div>
            <div className="mt-auto">
              <a
                href="/sopa"
                className="w-full bg-[#58CB05] hover:bg-green-700 text-white font-semibold px-4 py-4 rounded-b-2xl text-center flex flex-col items-start justify-center text-lg relative"
              >
                <div className="flex flex-col items-start w-full pl-8">
                  <span className="text-xl font-bold">Pukllana</span>
                  <span className="text-lg mt-1">Jugar</span>
                </div>
                <img
                  src="../assets/images/Play.png"
                  alt="Play"
                  className="w-14 h-14 absolute right-8 bottom-5"
                />
              </a>
            </div>
          </div>

          {/* Tarjeta Emparejar */}
          <div className="w-full h-[450px] p-0 bg-white border border-[#58CB05] rounded-2xl shadow-[0_4px_16px_rgba(88,203,5,0.3)] flex flex-col overflow-hidden transition-transform hover:scale-105">
            <div className="text-center p-4 w-full h-[120px] flex flex-col justify-end">
              <h2 className="text-[#58CB05] font-bold text-xl">Tinkuchispa pukllay</h2>
              <p className="text-gray-700 text-base mt-2">Emparejamiento</p>
            </div>
            <div className="h-[200px] flex items-center justify-center">
              <img src={EmparejarPalabras.src} alt="Emparejamiento" className="max-h-full w-auto" />
            </div>
            <div className="mt-auto">
              <a
                href="/emparejamiento"
                className="w-full bg-[#58CB05] hover:bg-green-700 text-white font-semibold px-4 py-4 rounded-b-2xl text-center flex flex-col items-start justify-center text-lg relative"
              >
                <div className="flex flex-col items-start w-full pl-8">
                  <span className="text-xl font-bold">Pukllana</span>
                  <span className="text-lg mt-1">Jugar</span>
                </div>
                <img
                  src="../assets/images/Play.png"
                  alt="Play"
                  className="w-14 h-14 absolute right-8 bottom-5"
                />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GameMenu;
