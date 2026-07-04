import React, { useState } from 'react'
import { entries } from '../data'

const PAGE_SIZE = 20

const Glossary = () => {
  const [selectedTema, setSelectedTema] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  const temas = [...new Set(entries.map(e => e.tema))]

  const filteredEntries = entries.filter(e => {
    const matchesTema = selectedTema === null || e.tema === selectedTema
    const matchesSearch =
      e.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.definition.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTema && matchesSearch
  })

  const isFiltered = selectedTema !== null || searchTerm !== ''
  const totalPages = Math.ceil(filteredEntries.length / PAGE_SIZE)
  const pagedEntries = isFiltered
    ? filteredEntries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : filteredEntries

  const handleTemaChange = (tema) => {
    setSelectedTema(tema)
    setPage(1)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setPage(1)
  }

  const playAudio = (audioUrl) => {
    new Audio(audioUrl)
      .play()
      .catch(err => console.error('Error al reproducir audio:', err))
  }

  const EntryList = ({ entries }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 justify-center max-w-3xl mx-auto text-left">
      {entries.map(entry => (
        <div key={entry.id} className="text-futuro flex items-center">
          <button
            onClick={() => playAudio(entry.audio)}
            className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow hover:shadow-lg active:shadow-inner transition-shadow focus:outline-none mr-3"
          >
            <i className="fa fa-volume-up text-qumir text-xl" aria-hidden="true"></i>
          </button>
          <span>
            <strong><span lang="qu">{entry.word}</span></strong>: {entry.definition}
          </span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="relative flex justify-center items-start min-h-screen pt-6 px-10 pb-16 bg-repeat-y font-[Nunito,sans-serif] text-[21px]">
      <div className="absolute inset-0 bg-transparent" />
      <div className="relative z-10 w-full max-w-6xl">
        <div className="flex justify-center mb-4">
          <img
            src="/assets/images/DictionaryGreen.png"
            alt="Logo Glosario"
            className="w-20 h-20 object-contain"
          />
        </div>

        <div className="text-center mb-10">
          <p className="text-gray-600 text-lg mb-4">
            Encuentra palabras traducidas al quechua y castellano
          </p>
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Buscar palabra..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full max-w-md px-6 py-3 rounded-xl shadow-md border border-[#A5A5A5] bg-white focus:outline-none focus:ring-2 focus:ring-qumir transition"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Palabras por temas</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleTemaChange(null)}
              className={`px-6 py-2 rounded-xl shadow-md font-semibold transition border-[1.5px] bg-white ${
                selectedTema === null
                  ? 'border-qumir text-qumir'
                  : 'border-[#A5A5A5] text-[#1a1a1a] hover:border-qumir hover:text-qumir'
              }`}
            >
              Todos
            </button>
            {temas.map(tema => (
              <button
                key={tema}
                onClick={() => handleTemaChange(tema)}
                className={`px-6 py-2 rounded-xl shadow-md font-semibold transition border-[1.5px] bg-white ${
                  selectedTema === tema
                    ? 'border-qumir text-qumir'
                    : 'border-[#A5A5A5] text-[#1a1a1a] hover:border-qumir hover:text-qumir'
                }`}
              >
                {tema}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {!isFiltered
            ? temas.map(t => {
                const group = entries.filter(e => e.tema === t)
                if (group.length === 0) return null
                return (
                  <div key={t} className="text-center">
                    <h2 className="text-2xl font-bold text-[#000] mb-4">{t}</h2>
                    <EntryList entries={group} />
                  </div>
                )
              })
            : (
              <div className="text-center">
                {selectedTema && (
                  <h2 className="text-2xl font-bold text-[#000] mb-4">{selectedTema}</h2>
                )}
                <EntryList entries={pagedEntries} />
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-xl border border-qumir text-qumir font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-qumir hover:text-white transition"
                    >
                      ← Anterior
                    </button>
                    <span className="px-4 py-2 text-futuro font-semibold">
                      {page} / {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-xl border border-qumir text-qumir font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-qumir hover:text-white transition"
                    >
                      Siguiente →
                    </button>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default Glossary
