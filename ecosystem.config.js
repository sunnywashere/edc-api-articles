module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
      },
      error_file: "./logs/err.log", // Fichier des logs erreur.
      max_memory_restart: "200M", // Mémoire max (sinon restart).

    },
  ],
};