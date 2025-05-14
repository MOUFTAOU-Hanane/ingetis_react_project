const { sequelize } = require('../db/sequelize'); // Ajuste le chemin si besoin

module.exports = async () => {
  try {
    await sequelize.models.Parcours.bulkCreate([
      {
        nom: 'Parcours des Arts Numériques',
        description: 'Découverte des installations numériques',
        date_debut: new Date('2025-07-01'),
        date_fin: new Date('2025-07-05'),
        id_lieu: 1,
        created: new Date()
      },
      {
        nom: 'Balade Urbaine Créative',
        description: 'Exploration artistique des rues',
        date_debut: new Date('2025-07-10'),
        date_fin: new Date('2025-07-12'),
        id_lieu: 2,
        created: new Date()
      },
      {
        nom: 'Chemin des Sons',
        description: 'Un parcours sonore immersif',
        date_debut: new Date('2025-06-15'),
        date_fin: new Date('2025-06-20'),
        id_lieu: 3,
        created: new Date()
      },
      {
        nom: 'Tracé de Lumières',
        description: 'Jeux de lumières en soirée',
        date_debut: new Date('2025-08-01'),
        date_fin: new Date('2025-08-03'),
        id_lieu: 4,
        created: new Date()
      },
      {
        nom: 'Parcours Patrimoine',
        description: 'Visite guidée d’œuvres historiques',
        date_debut: new Date('2025-09-10'),
        date_fin: new Date('2025-09-15'),
        id_lieu: 5,
        created: new Date()
      },
      {
        nom: 'Circuit Jeunesse',
        description: 'Ateliers interactifs pour enfants',
        date_debut: new Date('2025-07-20'),
        date_fin: new Date('2025-07-22'),
        id_lieu: 1,
        created: new Date()
      },
      {
        nom: 'Parcours Contemporain',
        description: 'Installations modernes et performances',
        date_debut: new Date('2025-08-15'),
        date_fin: new Date('2025-08-17'),
        id_lieu: 2,
        created: new Date()
      },
      {
        nom: 'Rallye Culturel',
        description: 'Défis artistiques à travers la ville',
        date_debut: new Date('2025-09-01'),
        date_fin: new Date('2025-09-02'),
        id_lieu: 3,
        created: new Date()
      },
      {
        nom: 'Circuit Photo',
        description: 'Photographie urbaine et nature',
        date_debut: new Date('2025-07-05'),
        date_fin: new Date('2025-07-06'),
        id_lieu: 4,
        created: new Date()
      },
      {
        nom: 'Parcours Éco-Art',
        description: 'Œuvres réalisées à partir de matériaux recyclés',
        date_debut: new Date('2025-07-25'),
        date_fin: new Date('2025-07-28'),
        id_lieu: 5,
        created: new Date()
      },
      {
        nom: 'Marche des Artistes',
        description: 'Rencontre avec les créateurs en direct',
        date_debut: new Date('2025-06-10'),
        date_fin: new Date('2025-06-11'),
        id_lieu: 1,
        created: new Date()
      },
      {
        nom: 'Exploration Immersive',
        description: 'Expériences AR et VR',
        date_debut: new Date('2025-08-20'),
        date_fin: new Date('2025-08-25'),
        id_lieu: 2,
        created: new Date()
      },
      {
        nom: 'Art et Nature',
        description: 'Installations dans des parcs et jardins',
        date_debut: new Date('2025-07-15'),
        date_fin: new Date('2025-07-16'),
        id_lieu: 3,
        created: new Date()
      },
      {
        nom: 'Parcours des Émotions',
        description: 'Œuvres interactives basées sur les sentiments',
        date_debut: new Date('2025-09-05'),
        date_fin: new Date('2025-09-07'),
        id_lieu: 4,
        created: new Date()
      },
      {
        nom: 'Art dans la Ville',
        description: 'Une exposition mobile à travers plusieurs quartiers',
        date_debut: new Date('2025-06-20'),
        date_fin: new Date('2025-06-25'),
        id_lieu: 5,
        created: new Date()
      }
    ]);

    console.log('✅ Données Parcours insérées avec succès.');
  } catch (error) {
    console.error('❌ Erreur lors de l\'insertion des Parcours :', error);
  }
};
