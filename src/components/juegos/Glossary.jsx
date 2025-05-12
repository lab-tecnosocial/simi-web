// src/components/juegos/Glossary.jsx
import React, { useState } from 'react'
import gameData from '../data/gameData.json'

const Glossary = () => {
  const [selectedTema, setSelectedTema] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const temas = [...new Set(gameData.entries.map(e => e.tema))]

  // Filtra por tema y búsqueda
  const filteredEntries = gameData.entries.filter(e => {
    const matchesTema = selectedTema === null || e.tema === selectedTema
    const matchesSearch =
      e.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.definition.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTema && matchesSearch
  })

  // Función para reproducir audio usando campo audio
  const playAudio = (audioUrl) => {
    new Audio(audioUrl)
      .play()
      .catch(err => console.error('Error al reproducir audio:', err))
  }

  return (
    <div
      className="relative flex justify-center items-start min-h-screen pt-6 px-10 bg-repeat-y font-[Nunito,sans-serif] text-[21px]"
      style={{
        backgroundImage: "url('/assets/images/fondo.png')",
        backgroundRepeat: 'repeat-y',
        backgroundPosition: 'top center',
      }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-90 z-0" />
      <div className="relative z-10 w-full max-w-6xl">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/assets/images/DictionaryGreen.png"
            alt="Logo Glosario"
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* Encabezado y filtros */}
        <div className="text-center mb-10">
          <p className="text-gray-600 text-lg mb-4">
            Encuentra palabras traducidas al quechua y castellano
          </p>
          {/* Buscador funcional */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Buscar palabra..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-6 py-3 rounded-xl shadow-md border border-[#A5A5A5] bg-white focus:outline-none focus:ring-2 focus:ring-[#58CB05] transition"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Palabras por temas</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedTema(null)}
              className={`px-6 py-2 rounded-xl shadow-md font-semibold transition border-[1.5px] bg-white ${
                selectedTema === null
                  ? 'border-[#58CB05] text-[#58CB05]'
                  : 'border-[#A5A5A5] text-[#1a1a1a] hover:border-[#58CB05] hover:text-[#58CB05]'
              }`}
            >
              Todos
            </button>
            {temas.map(tema => (
              <button
                key={tema}
                onClick={() => setSelectedTema(tema)}
                className={`px-6 py-2 rounded-xl shadow-md font-semibold transition border-[1.5px] bg-white ${
                  selectedTema === tema
                    ? 'border-[#58CB05] text-[#58CB05]'
                    : 'border-[#A5A5A5] text-[#1a1a1a] hover:border-[#58CB05] hover:text-[#58CB05]'
                }`}
              >
                {tema}
              </button>
            ))}
          </div>
        </div>

        {/* Listado de palabras */}
        <div className="flex flex-col gap-10">
          {selectedTema === null
            ? temas.map(t => {
                const group = filteredEntries.filter(e => e.tema === t)
                if (group.length === 0) return null
                return (
                  <div key={t} className="text-center">
                    <h2 className="text-2xl font-bold text-[#000] mb-4">{t}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 justify-center max-w-3xl mx-auto text-left">
                      {group.map(entry => (
                        <div key={entry.id} className="text-[#4B4B4B] flex items-center">
                          <button
                            onClick={() => playAudio(entry.audio)}
                            className="
                              flex items-center justify-center
                              w-12 h-12
                              bg-white
                              rounded-lg
                              shadow
                              hover:shadow-lg
                              active:shadow-inner
                              transition-shadow
                              focus:outline-none
                              mr-3
                            "
                          >
                            <i className="fa fa-volume-up text-[#58CB05] text-xl" aria-hidden="true"></i>
                          </button>
                          <span>
                            <strong>{entry.word}</strong>: {entry.definition}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })
            : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#000] mb-4">{selectedTema}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 justify-center max-w-3xl mx-auto text-left">
                  {filteredEntries.map(entry => (
                    <div key={entry.id} className="text-[#4B4B4B] flex items-center">
                      <button
                        onClick={() => playAudio(entry.audio)}
                        className="
                          flex items-center justify-center
                          w-12 h-12
                          bg-white
                          rounded-lg
                          shadow
                          hover:shadow-lg
                          active:shadow-inner
                          transition-shadow
                          focus:outline-none
                          mr-3
                        "
                      >
                        <i className="fa fa-volume-up text-[#58CB05] text-xl" aria-hidden="true"></i>
                      </button>
                      <span>
                        <strong>{entry.word}</strong>: {entry.definition}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default Glossary
