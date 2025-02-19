const express = require("express");

const sequelize=require('./src/db/sequelize.js');
const authRoutes = require('./src/routes/authentication.js');  // Importer les routes d'authentification
const bodyParser = require("body-parser");

// Lancer le serveur
const port=3000;
const app=express();
sequelize.initDb();

app.use(bodyParser.json());

// Utiliser les routes d'authentification
app.use('/api/auth', authRoutes);

app.listen(port,() => console.log('API démmarée sur http://localhost:'+port));
