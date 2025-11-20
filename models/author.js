import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Author birth date (optional)
  dateOfBirth: { type: Date },
  // Author death date (optional). Keep null/undefined for living authors.
  dateOfDeath: { type: Date, default: null },
});

export const Author = mongoose.model("Author", authorSchema);
