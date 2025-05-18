import atuq from '../assets/images/juego/colabs/atuq.jpg';

const LogoSection = () => {
    return (
        <section className="py-8 my-8">
            <div className="grid grid-cols-1 gap-4 justify-items-center">
                {/* Logo 1 con dos logotipos juntos */}
                <div className="flex flex-col items-center">
                    <h3 className='text-xl mb-2 text-center'>“Simiwan Pukllana” es una iniciativa de:</h3>
                    <div className="flex flex-wrap justify-center space-x-2 pt-4">
                        <img src="/assets/images/juego/atuq_logo.png" alt="simi" className="h-24 sm:h-32 md:h-48 mr-2" />
                        <a href="https://simiquechua.app/" target="_blank" rel="">
                            <img src="/assets/images/logo_simi2025.png" alt="simi" className="h-24 sm:h-32 md:h-48 ml-2" />
                        </a>
                    </div>
                </div>

                {/* Logos en coordinación con */}
                <div className="flex flex-col items-center mt-8">
                    <h3 className='text-xl mb-2 text-center'>En coordinación con:</h3>
                    <div className="flex flex-wrap justify-center space-x-2 pt-8">
                        <a href="https://www.cedib.org/" target="_blank" rel="">
                            <img src="/assets/images/juego/colabs/ced.png" alt="ced" className="h-32 sm:h-48 mr-4" />
                        </a>
                        <a href="https://martadero.org" target="_blank" rel="">
                            <img src="/assets/images/juego/colabs/martadero.jpg" alt="martadero" className="h-32 sm:h-48" />
                        </a>
                        <a href="https://martadero.org/micros-para-avanzar/" target="_blank" rel="">
                            <img src="/assets/images/juego/colabs/micros.jpg" alt="micros" className="h-24 sm:h-32 ml-4" />
                        </a>
                    </div>
                </div>

                {/* Logo gestionado por */}
                <div className="flex flex-col items-center mt-12">
                    <h3 className='text-xl mb-2 text-center'>Gestionado por:</h3>
                    <img src="/assets/images/juego/colabs/fundimagen.jpg" alt="fundimagen" className="h-24 sm:h-32 mt-4" />
                </div>

                {/* Logo con apoyo financiero */}
                <div className="flex flex-col items-center mt-12">
                    <h3 className='text-xl mb-2 text-center'>Con el apoyo financiero de:</h3>
                    <div className="flex justify-center">
                        <a href="https://www.misereor.org/" target="_blank" rel="">
                            <img src="/assets/images/juego/colabs/misereor.jpg" alt="misereor" className="h-24 sm:h-32 mt-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LogoSection;