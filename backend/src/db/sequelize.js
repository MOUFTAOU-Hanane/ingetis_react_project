const { Sequelize, DataTypes } = require('sequelize');

// Importation des modèles
const CatalogueModel = require('../models/catalog');
const UserModel = require('../models/user');
const EventModel = require('../models/event');
const CommentModel = require('../models/commentaire');
const LieuModel = require('../models/lieu');
const MediaModel = require('../models/media');
const OeuvreModel = require('../models/oeuvre');
const ParticipantModel = require('../models/participant');
const ProgramModel = require('../models/program');

// Connexion à la base de données
const sequelize = new Sequelize('events', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2',
    },
    logging: false
});

// Création des modèles avec Sequelize
const User = UserModel(sequelize, DataTypes);
const Lieu = LieuModel(sequelize, DataTypes);
const Event = EventModel(sequelize, DataTypes);
const Catalog = CatalogueModel(sequelize, DataTypes);
const Comment = CommentModel(sequelize, DataTypes);
const Media = MediaModel(sequelize, DataTypes);
const Oeuvre = OeuvreModel(sequelize, DataTypes);
const Participant = ParticipantModel(sequelize, DataTypes);
const Program = ProgramModel(sequelize, DataTypes);

// Regrouper tous les modèles
const models = { User, Lieu, Event, Catalog, Comment, Media, Oeuvre, Participant, Program };

// Initialiser les associations pour chaque modèle
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Fonction pour initialiser la base de données
const initDb = () => {
    sequelize.sync({ force: false })  // `force: false` pour ne pas supprimer les données existantes
        .then(() => {
            console.log("✅ Les tables ont été créées avec succès !");
        })
        .catch(err => {
            console.error("❌ Erreur lors de la création des tables :", err);
        });
};

// Exporter la connexion et les modèles
module.exports = { sequelize, initDb, ...models };
