import atuq from '../assets/images/juego/colabs/atuq.jpg';

const LogoSection = () => {
    return (
        <section className="py-8">
            <div className="grid grid-cols-2 gap-4 justify-items-center">
                {/* Logo 1 con dos logotipos juntos */}
                <div className="flex flex-col items-center">
                    <h3 className='text-xl mb-2'>“ Simiwan Pukllana” es una iniciativa de:</h3>
                    <div className="flex justify-center space-x-2">
                        <img src="/assets/images/juego/colabs/atuq.jpg" alt="simi" className="h-20" />
                        <a href="https://simiquechua.app/" target="_blank" rel="">
                            <img src="/assets/images/juego/colabs/simi.png" alt="simi" className="h-20" />
                        </a>
                    </div>
                </div>

                {/* Logo 2 con un solo logotipo */}
                <div className="flex flex-col items-center">
                    <h3 className='text-xl mb-2'>Con el apoyo financiero de:</h3>
                    <div className="flex justify-center space-x-2">
                        <a href="https://www.misereor.org/" target="_blank" rel="">
                            <img src="/assets/images/juego/colabs/misereor.jpg" alt="misereor" className="h-20" />
                        </a>
                    </div>
                </div>

                {/* Logo 3 con un solo logotipo */}
                <div className="flex flex-col items-center">
                    <h3 className='text-xl mb-2'>Gestiona:</h3>
                        <img src="/assets/images/juego/colabs/fundimagen.jpg" alt="fundimagen" className="h-20" />
                </div>

                {/* Logo 4 con tres solo logotipo */}
                <div className="flex flex-col items-center">
                    <h3 className='text-xl mb-2'>En coordinación:</h3>
                    <div className="flex justify-center space-x-2">
                        <a href="https://www.cedib.org/" target="_blank" rel="">
                            <img src="/assets/images/juego/colabs/ced.png" alt="ced" className="h-20" />
                        </a>
                        <a href="https://martadero.org" target="_blank" rel="">
                            <img src="/assets/images/juego/colabs/martadero.jpg" alt="martadero" className="h-20" />
                        </a>
                        <a href="https://martadero.org/micros-para-avanzar/" target="_blank" rel="">
                            <img src="/assets/images/juego/colabs/micros.jpg" alt="micros" className="h-20" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LogoSection;