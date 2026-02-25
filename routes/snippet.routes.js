import express from "express";
import {
  createSnippet,
  getSnippets,
  updateSnippet,
  deleteSnippet,
} from "../controllers/snippet.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/")
  .post(protect, createSnippet)
  .get(protect, getSnippets);

router.route("/:id")
  .put(protect, updateSnippet)
  .delete(protect, deleteSnippet);

export default router;