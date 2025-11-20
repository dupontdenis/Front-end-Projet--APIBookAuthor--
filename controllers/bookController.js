import { Book } from "../models/books.js";
import { Author } from "../models/author.js";

export async function createBook(req, res) {
  try {
    const book = new Book({
      title: req.body.title,
      authors: req.body.authors,
      summary: req.body.summary,
    });
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getBooks(req, res) {
  // Support filtering by author via query param: /books?author=<authorId>
  // Fallback: return all books
  const authorFilter = req.query?.author;
  if (authorFilter) {
    const books = await Book.find({ authors: authorFilter });
    return res.json(books);
  }

  const books = await Book.find().populate("authors");

  res.json(books);
}

export async function getBooksByAuthor(req, res) {
  // Dedicated route: GET /books/author/:authorId or GET /authors/:id/books
  // support both param names so this controller can be reused by both routers
  const authorId = req.params.authorId || req.params.id;
  if (!authorId)
    return res.status(400).json({ error: "author id is required" });
  const books = await Book.find({ authors: authorId });
  res.json(books);
}

export async function getAuthorsByBook(req, res) {
  // GET /books/:id/authors -> return full author documents for a book
  const bookId = req.params.id;
  if (!bookId) return res.status(400).json({ error: "book id is required" });

  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ error: "book not found" });

  const authorIds = Array.isArray(book.authors) ? book.authors : [];
  const authors = await Author.find({ _id: { $in: authorIds } });
  res.json(authors);
}

export async function getBook(req, res) {
  const book = await Book.findById(req.params.id).populate("authors");

  res.json(book);
}

export async function updateBook(req, res) {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate("authors");

  res.json(updated);
}

export async function deleteBook(req, res) {
  await Book.findByIdAndDelete(req.params.id);
  res.status(204).end();
}
