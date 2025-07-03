const { Sequelize, DataTypes } = require('sequelize');

// Importation des modèles
const CatalogueModel = require('../models/catalogue');
const UtilisateurModel = require('../models/utilisateur');
const EvenementModel = require('../models/evenement');
const CommentaireModel = require('../models/commentaire');
const LieuModel = require('../models/lieu');
const MediaModel = require('../models/media');
const OeuvreModel = require('../models/oeuvre');
const ParticipantModel = require('../models/participant');
const ProgrammeModel = require('../models/programme');
const FavorisModel = require('../models/favoris');
// const ParcoursModel = require('../models/parcours');



// Connexion à la base de données
const sequelize = new Sequelize('events', 'root', '', { // eventculture, pwd: root si docker
    host: 'localhost', // db si docker
    dialect: 'mariadb',
    dialectOptions: {
        timezone: '+02:00'  // format recommandé pour MariaDB/MySQL
    },
    logging: false,
    define: {
        // optionnel, pour gérer les timestamps en UTC
        timestamps: true,
        underscored: true
    }
});


// Création des modèles avec Sequelize
const Utilisateur = UtilisateurModel(sequelize, DataTypes);
const Lieu = LieuModel(sequelize, DataTypes);
const Evenement = EvenementModel(sequelize, DataTypes);
const Catalogue = CatalogueModel(sequelize, DataTypes);
const Commentaire = CommentaireModel(sequelize, DataTypes);
const Media = MediaModel(sequelize, DataTypes);
const Oeuvre = OeuvreModel(sequelize, DataTypes);
const Participant = ParticipantModel(sequelize, DataTypes);
const Programme = ProgrammeModel(sequelize, DataTypes);
const Favoris = FavorisModel(sequelize, DataTypes);


// Regrouper tous les modèles
const models = { Utilisateur, Lieu, Evenement, Catalogue, Commentaire, Media, Oeuvre, Participant, Programme, Favoris};

// Initialiser les associations pour chaque modèle
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Fonction pour initialiser la base de données
const initDb = () => {
    sequelize.sync({ force: false})  // `force: false` pour ne pas supprimer les données existantes
        .then(() => {
            console.log("✅ Les tables ont été créées avec succès !");
        })
        .catch(err => {
            console.error("❌ Erreur lors de la création des tables :", err);
        });
};

// Exporter la connexion et les modèles
module.exports = { sequelize, initDb, ...models };
