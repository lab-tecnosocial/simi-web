import atuq from '../assets/images/juego/colabs/atuq.jpg';

const LogoSection = () => {
    return (
        <section className="py-8">
            <h2 className="text-3xl text-center font-bold mb-4">Hola Logos</h2>
            <div className="grid grid-cols-2 gap-4 justify-items-center">
                {/* Logo 1 con dos logotipos juntos */}
                <div className="flex flex-col items-center">
                    <h3 className='text-xl mb-2'>“ Simiwan Pukllana” es una iniciativa de:</h3>
                    <div className="flex justify-center space-x-2">
                        <img src="src/components/assets/images/juego/colabs/atuq.jpg" alt="atuq" className="h-20" />
                        <img src="src/components/assets/images/juego/colabs/simi.png" alt="simi" className="h-20" />
                    </div>
                </div>

                {/* Logo 2 con un solo logotipo */}
                <div className="flex flex-col items-center">
                    <h3 className='text-xl mb-2'>Con el apoyo financiero de:</h3>
                    <div className="flex justify-center space-x-2">
                        <img src="src/components/assets/images/juego/colabs/misereor.jpg" alt="misereor" className="h-20" />
                    </div>
                </div>

                {/* Logo 3 con un solo logotipo */}
                <div className="flex flex-col items-center">
                    <h3 className='text-xl mb-2'>Gestiona:</h3>
                    <img src="src/components/assets/images/juego/colabs/fundimagen.jpg" alt="fundimagen" className="h-20" />
                </div>

                {/* Logo 4 con tres solo logotipo */}
                <div className="flex flex-col items-center">
                    <h3 className='text-xl mb-2'>En coordinación:</h3>
                    <div className="flex justify-center space-x-2">
                        <img src="src/components/assets/images/juego/colabs/ced.png" alt="ced" className="h-20" />
                        <img src="src/components/assets/images/juego/colabs/martadero.jpg" alt="martadero" className="h-20" />
                        <img src="src/components/assets/images/juego/colabs/micros.jpg" alt="micros" className="h-20" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LogoSection;