const { Sequelize, DataTypes } = require('sequelize')
const catalogueModel = require('../models/catalog')
const UserModel = require('../models/user')
const EventModel = require('../models/event')
const CommentModel = require('../models/commentaire')
const LieuModel = require('../models/lieu')
const MediaModel = require('../models/media')
const OeuvreModel = require('../models/oeuvre')
const ParticipantModel = require('../models/participant')
const ProgramModel = require('../models/program')


sequelize = new Sequelize('events', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })

//  ====================================
//  création des tables
//  ====================================
const User = UserModel(sequelize, DataTypes)
const Lieu = LieuModel(sequelize, DataTypes)
const Event = EventModel(sequelize, DataTypes)
const Catalog = catalogueModel(sequelize, DataTypes)
const Comment = CommentModel(sequelize, DataTypes)
const Media = MediaModel(sequelize, DataTypes)
const Oeuvre = OeuvreModel(sequelize, DataTypes)
const Participant = ParticipantModel(sequelize, DataTypes)
const Program = ProgramModel(sequelize, DataTypes)











// const etudiants = require('./mock-etudiants')
// const etudiant = require('../models/etudiants')
//  ===========================================
//  créer une instance sequelize
//  ===========================================


  

  const initDb = () => {
    sequelize.sync({ force: false })  // `force: false` pour ne pas supprimer les tables existantes
      .then(() => {
        console.log("Les tables ont été créées avec succès !");
      })
      .catch((err) => {
        console.error("Erreur lors de la création des tables :", err);
      });
  };
  
  module.exports = { initDb,User };

  
//  ====================================
//  création table Etudiants
//  ====================================
// const Etudiant = EtudiantModel(sequelize, DataTypes)





