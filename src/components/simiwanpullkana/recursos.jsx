const Recursos = () => {
    const recursos = [
        { 
            imagen: '/assets/images/juego/recursos/tablero.png',
            descripcion: 'Tablero',
            link: 'https://drive.google.com/file/d/1-ayFfEpwsJYl2xervm0pd-ri8iX5unHf/view?usp=sharing'
        },
        { 
            imagen: '/assets/images/juego/recursos/peones.png',
            descripcion: 'Peones',
            link: 'https://drive.google.com/file/d/1_jzwCkGzAW1NmVeYmPLNUd48CoesEyDL/view?usp=sharing'
        },
        { 
            imagen: '/assets/images/juego/recursos/tarjetas.png',
            descripcion: 'Tarjetas',
            link: 'https://drive.google.com/file/d/1pzCiYg80WxUkMOw82TFQVsdXchQjppBN/view?usp=sharing'
        },
        { 
            imagen: '/assets/images/juego/recursos/tarjetas_blanco.jpg',
            descripcion: 'Tarjetas en blanco',
            link: 'https://drive.google.com/file/d/1JqZUeqfUh08Z1l9_Y0C3leRqp4kFMOnO/view?usp=sharing'
        },
        { 
            imagen: '/assets/images/juego/recursos/manual.png',
            descripcion: 'Manual',
            link: 'https://drive.google.com/file/d/1_cmQAAGslN28Ld6m9EuyLpJfAlB0-eA0/view?usp=sharing'
        },
        { 
            imagen: '/assets/images/juego/recursos/anexo.png',
            descripcion: 'Descarga el anexo extras (material para maestrxs)',
            link:'https://drive.google.com/file/d/11q2UQui3h6La-0eBtRfvu98HkCCZ9gtD/view?usp=sharing'
        }
    ];

    return (
        <section className="py-0 px-0 container">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 ml-[10%] sm:ml-[5%]">
        {recursos.map((recurso, index) => (
            <div 
                key={index} 
                className="flex flex-col justify-start items-center p-4"
            >
                <a href={recurso.link} target="_blank" rel="noopener noreferrer" download>
                    <img 
                        src={recurso.imagen} 
                        alt={recurso.descripcion}
                        className="h-[230px] max-w-[230px] object-contain mb-[15px] mt-[20px] ml-[5px] mr-[5px]"
                    />
                </a>
                <p className="text-center text-[18px] text-gray-600 font-[Text Me One] max-w-[250px] break-words">
                    {recurso.descripcion}
                </p>
            </div>
        ))}
    </div>
</section>






    );
};

export default Recursos;