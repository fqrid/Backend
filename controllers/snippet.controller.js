import asyncHandler from "express-async-handler";
import Snippet from "../models/Snippet.js";

// CREAR
export const createSnippet = asyncHandler(async (req, res) => {
  const { title, language, code, tags } = req.body;

  const snippet = await Snippet.create({
    user: req.user._id,
    title,
    language,
    code,
    tags,
  });

  res.status(201).json(snippet);
});

// LISTAR
export const getSnippets = asyncHandler(async (req, res) => {
  const snippets = await Snippet.find({ user: req.user._id });
  res.json(snippets);
});

// EDITAR
export const updateSnippet = asyncHandler(async (req, res) => {
  const snippet = await Snippet.findById(req.params.id);

  if (!snippet) {
    res.status(404);
    throw new Error("No encontrado");
  }

  if (snippet.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("No autorizado");
  }

  Object.assign(snippet, req.body);
  await snippet.save();

  res.json(snippet);
});

// ELIMINAR
export const deleteSnippet = asyncHandler(async (req, res) => {
  const snippet = await Snippet.findById(req.params.id);

  if (!snippet) {
    res.status(404);
    throw new Error("No encontrado");
  }

  if (snippet.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("No autorizado");
  }

  await snippet.deleteOne();

  res.json({ message: "Eliminado" });
});