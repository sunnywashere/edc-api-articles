const express = require("express");
const articlesController = require("./articles.controller");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth");

router.post("/", authMiddleware, articlesController.create); // Création d'un article.
router.put("/:id", authMiddleware, articlesController.update); // Modification d'un article.
router.delete("/:id", authMiddleware, articlesController.delete); // Suppression d'un article.

module.exports = router;