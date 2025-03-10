const express = require('express');
const app = express();
const swagger = require('./swagger'); // Import du fichier Swagger

swagger(app); // Active la documentation Swagger

app.listen(3000, () => {
  console.log('🚀 Serveur démarré sur http://localhost:3000');
  console.log('📄 Documentation Swagger dispo sur http://localhost:3000/api-docs');
});
