const express = require("express");
const path = require('path');

const sequelize=require('./src/db/sequelize.js');
const authRoutes = require('./src/routes/authentication.js');  // Importer les routes d'authentification
const userRoutes = require('./src/routes/user.js');  // Importer les routes d'authentification

const bodyParser = require("body-parser");
const cors = require('cors');


// Lancer le serveur
const port=3000;
const app=express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

sequelize.initDb();
const corsOptions = {
    origin: 'http://localhost:5173', // Autoriser uniquement cette origine
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

// Utiliser les routes d'authentification
app.use('/api/auth', authRoutes);
app.use('/api/admin', userRoutes);


app.listen(port,() => console.log('API démmarée sur http://localhost:'+port));



