const { sequelize } = require('../db/sequelize'); // Ajuste le chemin si besoin

module.exports = async () => {
  try {
    // Utilisation du modèle commentaire depuis sequelize.models
    await sequelize.models.Commentaire.bulkCreate([
      {
        commentaire: 'Super événement, très enrichissant !',
        date_commentaire: new Date('2025-05-01'),
        id_user: 1,
        id_event: 1
      },
      {
        commentaire: 'J’ai adoré les intervenants.',
        id_user: 2,
        id_event: 1
      },
      {
        commentaire: 'Organisation au top.',
        id_user: 3,
        id_event: 2
      },
      {
        commentaire: 'Lieu très bien choisi.',
        id_user: 4,
        id_event: 3
      },
      {
        commentaire: 'J’aurais aimé plus d’activités.',
        id_user: 5,
        id_event: 3
      },
      {
        commentaire: 'Bonne ambiance générale.',
        id_user: 1,
        id_event: 2
      },
      {
        commentaire: 'Je recommande cet événement !',
        id_user: 2,
        id_event: 4
      },
      {
        commentaire: 'Une belle découverte culturelle.',
        id_user: 6,
        id_event: 1
      },
      {
        commentaire: 'Excellent accueil.',
        id_user: 7,
        id_event: 2
      },
      {
        commentaire: 'Animation un peu longue.',
        id_user: 8,
        id_event: 4
      },
      {
        commentaire: 'Pas assez d’informations avant l’événement.',
        id_user: 9,
        id_event: 3
      },
      {
        commentaire: 'Tout était parfait !',
        id_user: 10,
        id_event: 5
      },
      {
        commentaire: 'Ravi de cette expérience.',
        id_user: 11,
        id_event: 5
      },
      {
        commentaire: 'Bravo aux organisateurs.',
        id_user: 12,
        id_event: 1
      },
      {
        commentaire: 'Je reviendrai l’année prochaine.',
        id_user: 13,
        id_event: 2
      }
    ]);
    console.log('Commentaires insérés avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion des commentaires:', error);
  }
};
