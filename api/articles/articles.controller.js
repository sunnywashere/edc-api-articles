const articlesService = require("./articles.service");
const UnauthorizedError = require("../../errors/unauthorized");

class ArticlesController {
    async create(req, res, next) { // Création d'un article.
        try {
            req.body.user = req.user._id; // Ajout de l'_id du user qui créé l'article.
            const article = await articlesService.create(req.body);
            req.io.emit("article:create", article); // Ajout du temps réel.
            res.status(201).json(article);
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) { // Modification d'un article.
        try {
            if (!req.user || req.user.role !== "admin") { // Si l'utilisateur n'est pas admin.
                throw new UnauthorizedError("Vous n'avez pas les droits pour réaliser cette action !");
            }
            const id = req.params.id;
            const data = req.body;
            const articleModified = await articlesService.update(id, data);
            req.io.emit("article:update", articleModified); // Ajout du temps réel.
            res.json(articleModified);
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) { // Suppression d'un article.
        try {
            if (!req.user || req.user.role !== "admin") { // Si l'utilisateur n'est pas admin.
                throw new UnauthorizedError("Vous n'avez pas les droits pour réaliser cette action !");
            }
            const id = req.params.id;
            await articlesService.delete(id);
            req.io.emit("article:delete", { id }); // Ajout du temps réel.
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ArticlesController();