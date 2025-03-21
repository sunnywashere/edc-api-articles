const Article = require("./articles.schema");

class ArticleService {
  create(data) { // Créer un article.
    const article = new Article(data);
    return article.save();
  }
  update(id, data) { // Mettre à jour un article.
    return Article.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id) { // Supprimer un article.
    return Article.deleteOne({ _id: id });
  }
  getArticlesByUser(userId) { // Récupérer les articles d'un utilisateur.
    return Article.find({ user: userId }).populate("user", "-password");
  }
}

module.exports = new ArticleService();