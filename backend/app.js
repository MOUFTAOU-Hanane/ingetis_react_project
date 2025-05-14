const express = require("express");
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authMiddleware = require('./src/middlewares/authMiddleware');

const sequelize = require('./src/db/sequelize.js');
const authRoutes = require('./src/routes/authentification.js');  
const userRoutes = require('./src/routes/user.js');  
const lieuRoutes = require('./src/routes/lieu.js'); 
const adminRoutes = require('./src/routes/admin.js'); 
const eventRoutes = require('./src/routes/event.js'); 
const programRoutes = require('./src/routes/program.js'); 
const catalogueRoutes = require('./src/routes/catalogue.js'); 
const oeuvreRoutes = require('./src/routes/oeuvre.js'); 
const participantRoutes = require('./src/routes/participant.js'); 
const mediaRoutes = require('./src/routes/media.js');
const commentRoutes = require('./src/routes/commentaire.js');  // Correction ici
const favorisRoutes = require('./src/routes/favoris.js'); 
const ParcoursRoutes = require('./src/routes/parcours.js');  



const bodyParser = require("body-parser");
const cors = require('cors');

// Lancer le serveur
const port = 3005;
const app = express();

// Configurer Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API EventCulture',
      version: '1.0.0',
      description: 'API pour gérer les événements, utilisateurs, œuvres, etc.'
    },
    components: {
      securitySchemes: {
        BearerAuth: { // Schéma de sécurité pour JWT
          type: 'http',
          scheme: 'bearer', // Spécifie que l'authentification est basée sur un bearer token
          bearerFormat: 'JWT', // Indique que c'est un JWT
          description: 'Entrez votre token JWT dans le format `Bearer <token>`'
        },
      },
    },
    security: [
      {
        BearerAuth: [], // Applique le schéma de sécurité globalement
      },
    ],
  },
  apis: ['./src/routes/*.js'],  // Recherche des annotations Swagger dans tous les fichiers de routes
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Afficher Swagger UI à l'adresse /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
sequelize.initDb();
const corsOptions = {
  origin: 'http://localhost:5173', // Autoriser uniquement cette origine
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

// Utilisation des routes publiques (authentification)
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/media', mediaRoutes);



// Middleware global → protège toutes les routes suivantes
app.use(authMiddleware);  // Appliquer le middleware d'auth après les routes publiques
// Routes sécurisées
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/lieu', lieuRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/catalogs', catalogueRoutes);
app.use('/api/oeuvres', oeuvreRoutes);
app.use('/api/participants', participantRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/favoris', favorisRoutes);
app.use('/api/parcours', ParcoursRoutes);



app.listen(port, () => console.log('API démarrée sur http://localhost:' + port));
