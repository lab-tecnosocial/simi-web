const Recursos = () => {
    const recursos = [
        { 
            imagen: '/src/components/assets/images/juego/recursos/tablero.png',
            descripcion: 'Tablero',
            link: 'https://drive.google.com/file/d/1-ayFfEpwsJYl2xervm0pd-ri8iX5unHf/view?usp=sharing'
        },
        { 
            imagen: '/src/components/assets/images/juego/recursos/peones.png',
            descripcion: 'Peones',
            link: 'https://drive.google.com/file/d/1_jzwCkGzAW1NmVeYmPLNUd48CoesEyDL/view?usp=sharing'
        },
        { 
            imagen: '/src/components/assets/images/juego/recursos/tarjetas.png',
            descripcion: 'Tarjetas',
            link: 'https://drive.google.com/file/d/1pzCiYg80WxUkMOw82TFQVsdXchQjppBN/view?usp=sharing'
        },
        { 
            imagen: '/src/components/assets/images/juego/recursos/tarjetas_blanco.jpg',
            descripcion: 'Tarjetas en blanco',
            link: 'https://drive.google.com/file/d/1JqZUeqfUh08Z1l9_Y0C3leRqp4kFMOnO/view?usp=sharing'
        },
        { 
            imagen: '/src/components/assets/images/juego/recursos/manual.png',
            descripcion: 'Manual',
            link: 'https://drive.google.com/file/d/1_cmQAAGslN28Ld6m9EuyLpJfAlB0-eA0/view?usp=sharing'
        },
        { 
            imagen: '/src/components/assets/images/juego/recursos/anexo.png',
            descripcion: 'Descarga el anexo extras(material para maestrxs)',
            link:'https://drive.google.com/file/d/11q2UQui3h6La-0eBtRfvu98HkCCZ9gtD/view?usp=sharing'
        }
    ];

    return (
        <section className="py-2 container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {recursos.map((recurso, index) => (
                    <div 
                        key={index} 
                        className="flex flex-col justify-center items-center p-2"
                    >
                        <a href={recurso.link} target="_blank" rel="noopener noreferrer" download>
                            <img 
                                src={recurso.imagen} 
                                alt={recurso.descripcion}
                                className="max-h-48 max-w-full object-contain mb-1"
                            />
                        </a>
                        <p className="text-center text-sm text-gray-600">
                            {recurso.descripcion}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Recursos;