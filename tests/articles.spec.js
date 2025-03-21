const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mockingoose = require("mockingoose");
const User = require("../api/users/users.model");
const Article = require("../api/articles/articles.schema");

describe("tester API articles", () => {
  let token;
  const ARTICLE_ID = "test";
  const USER_ID = "fake";
  const MOCK_ARTICLE = {
    _id: ARTICLE_ID,
    title: "Un article",
    content: "Le contenu de l'article",
    status: "draft",
    user: USER_ID
  };
  const MOCK_ARTICLE_CREATED =
  {
    title: "Un nouvel article",
    content: "Le contenu du nouvel article",
    status: "published",
    user: USER_ID
  };
  const MOCK_ARTICLE_UPDATED =
  {
    _id: ARTICLE_ID,
    title: "Un article mis à jour",
    content: "Le contenu mis à jour",
    status: "published",
    user: USER_ID,
  };


  beforeEach(() => {
    token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
    mockingoose(User).toReturn({ _id: USER_ID, role: "admin" }, "findOne");
    mockingoose(Article).toReturn(MOCK_ARTICLE, "find");
    mockingoose(Article).toReturn(MOCK_ARTICLE_CREATED, "save");
    mockingoose(Article).toReturn(MOCK_ARTICLE_UPDATED, "findOneAndUpdate");
    mockingoose(Article).toReturn({}, "deleteOne");
  });

  // Création d'un article.
  test("[Articles] Create Article", async () => {
    const res = await request(app)
      .post("/api/articles")
      .send(MOCK_ARTICLE_CREATED)
      .set("x-access-token", token);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(MOCK_ARTICLE_CREATED.title);
  });

  // Mise à jour d'un article.
  test("[Articles] Update Article", async () => {
    const res = await request(app)
      .put(`/api/articles/${ARTICLE_ID}`) // Ajout de l'id de l'article.
      .send(MOCK_ARTICLE_UPDATED)
      .set("x-access-token", token);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(MOCK_ARTICLE_UPDATED.title);
  });

  // Suppression d'un article.
  test("[Articles] Delete Article", async () => {
    const res = await request(app)
      .delete(`/api/articles/${ARTICLE_ID}`)
      .set("x-access-token", token);
    expect(res.status).toBe(204);
  });


  afterEach(() => {
    jest.restoreAllMocks();
  });
});