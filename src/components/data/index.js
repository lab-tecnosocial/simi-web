import data from './vocabulary.json';

// Remove diacritics: Números → Numeros, Anatomía → Anatomia
const stripAccents = (str) => str.normalize('NFD').replace(/[̀-ͯ]/g, '');

// Glossary: todos los entries
export const entries = data.entries;

// MatchingGame: agrupado por tema sin tilde, solo entries con imagen
export const matchingData = {
  temas: Object.fromEntries(
    [...new Set(data.entries.filter(e => e.image).map(e => e.tema))].map(tema => [
      stripAccents(tema),
      data.entries
        .filter(e => e.tema === tema && e.image)
        .map((e, i) => ({ id: i + 1, word: e.word, image: e.image, definition: e.definition }))
    ])
  )
};

// Hangman / Anagram / WordPuzzleGame: { animales: ['allqu', ...], verbos: [...] }
export const wordList = Object.fromEntries(
  [...new Set(data.entries.map(e => e.tema))].map(tema => [
    tema.toLowerCase(),
    data.entries.filter(e => e.tema === tema).map(e => e.word.toLowerCase())
  ])
);
