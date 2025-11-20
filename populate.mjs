import mongoose from "mongoose";
import { Author } from "./models/author.js";
import { Book } from "./models/books.js";

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/apiAuhors";

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB:", MONGO_URL);

  // Remove all existing books and authors
  await Book.deleteMany({});
  await Author.deleteMany({});
  console.log("Cleared books and authors collections.");

  // Create some real authors with birth/death dates
  const authorsData = [
    {
      name: "Jane Austen",
      dateOfBirth: "1775-12-16",
      dateOfDeath: "1817-07-18",
    },
    {
      name: "George Orwell",
      dateOfBirth: "1903-06-25",
      dateOfDeath: "1950-01-21",
    },
    {
      name: "J.K. Rowling",
      dateOfBirth: "1965-07-31",
      dateOfDeath: null,
    },
    {
      name: "superman",
      dateOfBirth: "1965-07-3",
      dateOfDeath: null,
    },
    // Multi-author textbook authors (for seeded multi-author book)
    {
      name: "Thomas H. Cormen",
      dateOfBirth: "1956-01-01",
      dateOfDeath: null,
    },
    {
      name: "Charles E. Leiserson",
      dateOfBirth: "1953-01-01",
      dateOfDeath: null,
    },
    {
      name: "Ronald L. Rivest",
      dateOfBirth: "1947-05-06",
      dateOfDeath: null,
    },
    {
      name: "Clifford Stein",
      dateOfBirth: "1965-01-01",
      dateOfDeath: null,
    },
  ];

  const authors = await Author.insertMany(authorsData);
  console.log("Inserted authors:", authors.map((a) => a.name).join(", "));

  // Create books that reference the authors above
  const booksData = [
    // Two books by Jane Austen (same authors array)
    {
      title: "Pride and Prejudice",
      authors: [authors[0]._id],
      summary:
        "A classic novel about manners, marriage and misunderstandings in early 19th-century England.",
    },
    {
      title: "Sense and Sensibility",
      authors: [authors[0]._id],
      summary:
        "The story of the Dashwood sisters as they navigate love, heartbreak and social expectations.",
    },

    // Two books by George Orwell (already two separate titles sharing same author)
    {
      title: "1984",
      authors: [authors[1]._id],
      summary:
        "A dystopian novel about surveillance, totalitarianism and the dangers of absolute power.",
    },
    {
      title: "Animal Farm",
      authors: [authors[1]._id],
      summary:
        "A political allegory told through a farm of rebelling animals that examines corruption and power.",
    },

    // Two books by J.K. Rowling (same authors array)
    {
      title: "Harry Potter and the Philosopher's Stone",
      authors: [authors[2]._id],
      summary:
        "The first book in the Harry Potter series — a young wizard's introduction to Hogwarts and magic.",
    },
    {
      title: "Harry Potter and the Chamber of Secrets",
      authors: [authors[2]._id],
      summary:
        "Harry returns to Hogwarts to face a mysterious threat hidden within the school's walls.",
    },

    // Two books sharing the same multi-author set (Cormen/Leiserson/Rivest/Stein)
    {
      title: "Introduction to Algorithms",
      authors: [authors[3]._id, authors[4]._id, authors[5]._id, authors[6]._id],
      summary:
        "Comprehensive textbook covering a broad range of algorithms in depth, commonly used in CS curricula.",
    },
    {
      title: "Introduction to Algorithms - Companion",
      authors: [authors[3]._id, authors[4]._id, authors[5]._id, authors[6]._id],
      summary:
        "Supplementary material and exercises for the main algorithms textbook.",
    },
  ];

  const books = await Book.insertMany(booksData);
  console.log("Inserted books:", books.map((b) => b.title).join(", "));

  await mongoose.disconnect();
  console.log("Disconnected. Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
