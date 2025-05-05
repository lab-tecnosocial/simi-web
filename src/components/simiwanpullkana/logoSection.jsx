import atuq from '../assets/images/juego/colabs/atuq.jpg';

const LogoSection = () => {
    return (
        <section className="py-8 my-8">
            <div className="grid grid-cols-1 gap-4 justify-items-center">
                {/* Logo 1 con dos logotipos juntos */}
                <div className="flex flex-col items-center">
                    <h3 className='text-xl mb-2'>“ Simiwan Pukllana” es una iniciativa de:</h3>
                    <div className="flex justify-center space-x-2 pt-4">
                        <img src="/assets/images/juego/colabs/atuq.jpg" alt="simi" className="h-48 mr-4" />
                        <a href="https://simiquechua.app/" target="_blank" rel="">
                            <img src="/assets/images/juego/colabs/simi.png" alt="simi" className="h-48 ml-4" />
                        </a>
                    </div>
                </div>

                {/* Logo 4 con tres solo logotipo */}
                <div className="flex flex-col items-center mt-8">
                    <h3 className='text-xl mb-2'>En coordinación con:</h3>
                    <div className="flex justify-center space-x-2 pt-8">
                        <a href="https://www.cedib.org/" target="_blank" rel="" className="place-content-center">
                            <img src="/assets/images/juego/colabs/ced.png" alt="ced" className="h-56 mr-8" />
                        </a>
                        <a href="https://martadero.org" target="_blank" rel="" className="place-content-center">
                            <img src="/assets/images/juego/colabs/martadero.jpg" alt="martadero" className="h-44" />
                        </a>
                        <a href="https://martadero.org/micros-para-avanzar/" target="_blank" rel="" className="place-content-center">
                            <img src="/assets/images/juego/colabs/micros.jpg" alt="micros" className="h-32 ml-8" />
                        </a>
                    </div>
                </div>

                {/* Logo 3 con un solo logotipo */}
                <div className="flex flex-col items-center mt-12">
                    <h3 className='text-xl mb-2'>Gestionado por:</h3>
                        <img src="/assets/images/juego/colabs/fundimagen.jpg" alt="fundimagen" className="h-36 mt-4" />
                </div>

                {/* Logo 2 con un solo logotipo */}
                <div className="flex flex-col items-center mt-12">
                    <h3 className='text-xl mb-2'>Con el apoyo financiero de:</h3>
                    <div className="flex justify-center space-x-2">
                        <a href="https://www.misereor.org/" target="_blank" rel="">
                            <img src="/assets/images/juego/colabs/misereor.jpg" alt="misereor" className="h-36 mt-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LogoSection;