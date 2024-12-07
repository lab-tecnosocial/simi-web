const Recursos = () => {
    const recursos = [
        { 
            imagen: '/src/components/assets/images/juego/recursos/tablero.png',
            descripcion: 'Tablero'
        },
        { 
            imagen: '/src/components/assets/images/juego/recursos/peones.png',
            descripcion: 'Peones'
        },
        { 
            imagen: '/src/components/assets/images/juego/recursos/tarjetas.png',
            descripcion: 'Tarjetas'
        },
        { 
            imagen: '/src/components/assets/images/juego/recursos/tarjetas_blanco.jpg',
            descripcion: 'Tarjetas en blanco'
        },
        { 
            imagen: '/src/components/assets/images/juego/recursos/manual.png',
            descripcion: 'Manual'
        },
        { 
            imagen: '/src/components/assets/images/juego/recursos/anexo.png',
            descripcion: 'Descarga el anexo extras(material para maestrxs)'
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
                        <a href={recurso.imagen} download>
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