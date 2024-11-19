import Anagrama from '../assets/images/anagrama.png';
import AyudaSimi from '../assets/images/ayuda_simi.png';
import SopadeLetras from '../assets/images/sopa_de_letras.png';
import EmparejarPalabras from '../assets/images/emparejar_palabra.png';
import '../../styles/global.css';


const GameMenu = () => {
  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-3xl font-bold text-cente">Bienvenidos a la sección de juegos</h1>
      <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
        <div className="card h-80 p-12 bg-white border border-gray-300 rounded shadow-md flex flex-col items-center">
          <img src={Anagrama.src} alt="" className='mb-4 rounded h-32 w-auto' />
          <h1>Anagrama - T’ikraspa pukllay</h1>
          <a
            href='/anagrama'
            className='mt-auto bg-green-500 text-white px-4 py--2 rounded hover:bg-green-600' type="">Pukllana!</a>
        </div>
        <div className="card h-80 p-12 bg-white border border-gray-300 rounded shadow-md flex flex-col items-center">
          <img src={AyudaSimi.src} alt="" className='mb-4 rounded h-32 w-auto' />
          <h1>Salva a Simi - Simiman yanapay!
          </h1>
          <a
            href='/salva'
            className='mt-auto bg-green-500 text-white px-4 py--2 rounded hover:bg-green-600' type="">Pukllana!</a>
        </div>
        <div className="card h-80 p-12 bg-white border border-gray-300 rounded shadow-md flex flex-col items-center">
          <img src={SopadeLetras.src} alt="" className='mb-4 rounded h-32 w-auto' />
          <h1>Sopa de letras   - Qillqa jilli</h1>
          <a
            href='/sopa'
            className='mt-auto bg-green-500 text-white px-4 py--2 rounded hover:bg-green-600' type="">Pukllana!</a>
        </div>
        <div className="card h-80 p-12 bg-white border border-gray-300 rounded shadow-md flex flex-col items-center">
          <img src={EmparejarPalabras.src} alt="" className='mb-4 rounded h-32 w-auto' />
          <h1>Emparejamiento  - Tinkuchispa pukllay</h1>
          <a
            href='/emparejamiento'
            className='mt-auto bg-green-500 text-white px-4 py--2 rounded hover:bg-green-600' type="">Pukllana!</a>
        </div>
      </div>
      <a
        href='/glosario'
        className='m-4 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600'
      >
        Ir al Glosario
      </a>
    </div>
  );
};

export default GameMenu;