import express from "express";
import {
  createBook,
  getBooks,
  getBooksByAuthor,
  getAuthorsByBook,
  getBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

// Routes pour la collection entière
router
  .route("/")
  .post(createBook) // ➕ Créer un livre
  .get(getBooks); // 📄 Lister tous les livres

// Books -> authors: get authors for a specific book
// Place this route before the generic "/:id" route so it does not get shadowed.
router.get("/:id/authors", getAuthorsByBook);

// Routes pour une ressource spécifique
router
  .route("/:id")
  .get(getBook) // 🔍 Obtenir un livre par ID
  .put(updateBook) // ✏️ Mettre à jour un livre
  .delete(deleteBook); // ❌ Supprimer un livre

export default router;
