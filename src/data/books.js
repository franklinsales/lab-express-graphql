// Simulated Data
let books = [
  { id: 1, title: '1984', author: 'George Orwell', year: 1949, pages: 328 },
  { id: 2, title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien', year: 1954, pages: 1216 },
  { id: 3, title: 'O Morro dos Ventos Uivantes', author: 'Emily Brontë', year: 1847, pages: 416 },
  { id: 4, title: 'Dom Quixote', author: 'Miguel de Cervantes', year: 1605, pages: 1023 },
  { id: 5, title: 'A Divina Comédia', author: 'Dante Alighieri', year: 1320, pages: 798 },
  { id: 6, title: 'Orgulho e Preconceito', author: 'Jane Austen', year: 1813, pages: 432 },
  { id: 7, title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez', year: 1967, pages: 417 },
  { id: 8, title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', year: 1943, pages: 96 },
  { id: 9, title: 'A Metamorfose', author: 'Franz Kafka', year: 1915, pages: 201 },
];

// Export the books array

let nextId = books.length + 1;

export { books, nextId };