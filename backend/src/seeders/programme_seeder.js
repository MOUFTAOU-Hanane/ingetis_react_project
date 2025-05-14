const { sequelize } = require('../db/sequelize'); // Ajuste le chemin si besoin

module.exports = async () => {
  try {
    // Utilisation du modèle Programme depuis sequelize.models
    await sequelize.models.Programme.bulkCreate([
      {
        titre: 'Cérémonie d’ouverture',
        description: 'Discours de bienvenue et présentation du programme',
        date_heure: new Date('2025-06-01T09:00:00'),
        id_event: 1,
        created: new Date()
      },
      {
        titre: 'Atelier d’écriture créative',
        description: 'Apprenez à écrire des récits captivants',
        date_heure: new Date('2025-06-01T11:00:00'),
        id_event: 1,
        created: new Date()
      },
      {
        titre: 'Projection de court-métrages',
        description: 'Sélection de films indépendants',
        date_heure: new Date('2025-06-01T14:00:00'),
        id_event: 2,
        created: new Date()
      },
      {
        titre: 'Conférence sur l’art urbain',
        description: 'L’évolution du street art en Europe',
        date_heure: new Date('2025-06-02T10:00:00'),
        id_event: 2,
        created: new Date()
      },
      {
        titre: 'Performance de danse contemporaine',
        description: 'Spectacle par la troupe Élan',
        date_heure: new Date('2025-06-02T19:00:00'),
        id_event: 3,
        created: new Date()
      },
      {
        titre: 'Rencontre avec les artistes',
        description: 'Échange autour de leurs inspirations',
        date_heure: new Date('2025-06-03T15:00:00'),
        id_event: 3,
        created: new Date()
      },
      {
        titre: 'Atelier de peinture participatif',
        description: 'Créer une fresque collective',
        date_heure: new Date('2025-06-03T17:30:00'),
        id_event: 4,
        created: new Date()
      },
      {
        titre: 'Concert électro en plein air',
        description: 'DJ set sur la grande scène',
        date_heure: new Date('2025-06-03T21:00:00'),
        id_event: 4,
        created: new Date()
      },
      {
        titre: 'Visite guidée de l’exposition “Mémoire et Matière”',
        description: 'Plongée dans le travail de 5 artistes plasticiens',
        date_heure: new Date('2025-06-04T10:00:00'),
        id_event: 5,
        created: new Date()
      },
      {
        titre: 'Débat : culture numérique et société',
        description: 'Experts et citoyens discutent de l’impact du numérique',
        date_heure: new Date('2025-06-04T13:30:00'),
        id_event: 5,
        created: new Date()
      },
      {
        titre: 'Atelier de sculpture sur bois',
        description: 'Animé par un artisan local',
        date_heure: new Date('2025-06-05T09:00:00'),
        id_event: 1,
        created: new Date()
      },
      {
        titre: 'Lecture publique de poèmes',
        description: 'Poètes contemporains et slameurs',
        date_heure: new Date('2025-06-05T11:00:00'),
        id_event: 2,
        created: new Date()
      },
      {
        titre: 'Jeu de piste artistique',
        description: 'Parcours ludique à travers les installations',
        date_heure: new Date('2025-06-05T14:00:00'),
        id_event: 3,
        created: new Date()
      },
      {
        titre: 'Atelier cuisine et patrimoine',
        description: 'Recettes locales et histoire des produits',
        date_heure: new Date('2025-06-05T16:00:00'),
        id_event: 4,
        created: new Date()
      },
      {
        titre: 'Soirée de clôture',
        description: 'Spectacle, remerciements et cocktail',
        date_heure: new Date('2025-06-05T20:00:00'),
        id_event: 5,
        created: new Date()
      }
    ], {});
    console.log('✅ Programmes seedés avec succès.');
  } catch (error) {
    console.error('❌ Erreur lors du seed des Programmes :', error);
  }
};
