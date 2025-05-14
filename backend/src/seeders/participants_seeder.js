const { sequelize } = require('../db/sequelize'); // Ajuste le chemin si besoin

module.exports = async () => {
  try {
    // Utilisation du modèle Participant depuis sequelize.models
    await sequelize.models.Participant.bulkCreate([
      {
        statut: 'inscrit',
        date_inscription: new Date(),
        id_user: 1,
        id_event: 1,
        created: new Date()
      },
      {
        statut: 'inscrit',
        date_inscription: new Date(),
        id_user: 2,
        id_event: 1,
        created: new Date()
      },
      {
        statut: 'inscrit',
        date_inscription: new Date(),
        id_user: 3,
        id_event: 2,
        created: new Date()
      },
      {
        statut: 'inscrit',
        date_inscription: new Date(),
        id_user: 4,
        id_event: 2,
        created: new Date()
      },
      {
        statut: 'inscrit',
        date_inscription: new Date(),
        id_user: 5,
        id_event: 3,
        created: new Date()
      },
      {
        statut: 'inscrit',
        date_inscription: new Date(),
        id_user: 6,
        id_event: 3,
        created: new Date()
      },
      {
        statut: 'inscrit',
        date_inscription: new Date(),
        id_user: 7,
        id_event: 4,
        created: new Date()
      },
      {
        statut: 'inscrit',
        date_inscription: new Date(),
        id_user: 8,
        id_event: 4,
        created: new Date()
      },
      {
        statut: 'inscrit',
        date_inscription: new Date(),
        id_user: 9,
        id_event: 5,
        created: new Date()
      },
      {
        statut: 'inscrit',
        date_inscription: new Date(),
        id_user: 10,
        id_event: 5,
        created: new Date()
      },
      {
        statut: 'inscrit',
        date_inscription: new Date(),
        id_user: 11,
        id_event: 6,
        created: new Date()
      },
      {
        statut: 'inscrit',
        date_inscription: new Date(),
        id_user: 12,
        id_event: 6,
        created: new Date()
      },
      {
        statut: 'inscrit',
        date_inscription: new Date(),
        id_user: 13,
        id_event: 7,
        created: new Date()
      },
      {
        statut: 'inscrit',
        date_inscription: new Date(),
        id_user: 14,
        id_event: 7,
        created: new Date()
      },
      {
        statut: 'inscrit',
        date_inscription: new Date(),
        id_user: 15,
        id_event: 8,
        created: new Date()
      }
    ], {});
    
    console.log('✅ Participants seedé avec succès.');
  } catch (error) {
    console.error('❌ Erreur lors du seed des Participants :', error);
  }
};
