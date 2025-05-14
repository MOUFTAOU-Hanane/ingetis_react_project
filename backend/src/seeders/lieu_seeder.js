const { sequelize } = require('../db/sequelize'); // Assure-toi que sequelize est bien importé

module.exports = async () => {
  try {
    await sequelize.models.Lieu.bulkCreate([
      {
        nom: 'Salle des fêtes Paris',
        adresse: '123 Rue de Paris, 75000 Paris',
        latitude: 48.8566,
        longitude: 2.3522,
        description: 'Grande salle pour événements privés et publics.',
        created: new Date(),
      },
      {
        nom: 'Le Théâtre Lyon',
        adresse: '56 Rue de la République, 69001 Lyon',
        latitude: 45.7640,
        longitude: 4.8357,
        description: 'Un théâtre historique, parfait pour les spectacles.',
        created: new Date(),
      },
      {
        nom: 'Centre culturel Marseille',
        adresse: '98 Boulevard de la Canebière, 13001 Marseille',
        latitude: 43.2965,
        longitude: 5.3698,
        description: 'Lieu polyvalent pour conférences et expositions.',
        created: new Date(),
      },
      {
        nom: 'Palais des Congrès Bordeaux',
        adresse: '45 Avenue du Parc Bordelais, 33000 Bordeaux',
        latitude: 44.8410,
        longitude: -0.5802,
        description: 'Espaces pour congrès et événements professionnels.',
        created: new Date(),
      },
      {
        nom: 'Salle de Concert Nice',
        adresse: '12 Rue Jean Médecin, 06000 Nice',
        latitude: 43.7102,
        longitude: 7.2620,
        description: 'Lieu idéal pour des concerts en tout genre.',
        created: new Date(),
      },
      {
        nom: 'Espace Expo Toulouse',
        adresse: '34 Avenue de l\'Europe, 31000 Toulouse',
        latitude: 43.6047,
        longitude: 1.4442,
        description: 'Grand espace pour expositions artistiques et commerciales.',
        created: new Date(),
      },
      {
        nom: 'Café-Théâtre Nantes',
        adresse: '21 Quai de la Fosse, 44000 Nantes',
        latitude: 47.2186,
        longitude: -1.5536,
        description: 'Lieu intime pour des pièces de théâtre et spectacles d\'improvisation.',
        created: new Date(),
      },
      {
        nom: 'Le Forum Lille',
        adresse: '7 Place du Général de Gaulle, 59000 Lille',
        latitude: 50.6292,
        longitude: 3.0573,
        description: 'Forum pour conférences et salons professionnels.',
        created: new Date(),
      },
      {
        nom: 'Chapiteau de Cirque Strasbourg',
        adresse: '56 Rue de l\'Aubette, 67000 Strasbourg',
        latitude: 48.5734,
        longitude: 7.7521,
        description: 'Chapiteau pour des représentations de cirque et événements familiaux.',
        created: new Date(),
      },
      {
        nom: 'Salle de Concert Lille',
        adresse: '13 Rue de la Monnaie, 59000 Lille',
        latitude: 50.6342,
        longitude: 3.0603,
        description: 'Concerts et événements musicaux.',
        created: new Date(),
      },
      {
        nom: 'Musée d\'Art Moderne Paris',
        adresse: '11 Avenue du Président Wilson, 75116 Paris',
        latitude: 48.8610,
        longitude: 2.3066,
        description: 'Musée d\'art moderne avec de nombreuses expositions.',
        created: new Date(),
      },
      {
        nom: 'Complexe Sportif Montpellier',
        adresse: '9 Rue des Arceaux, 34000 Montpellier',
        latitude: 43.6114,
        longitude: 3.8767,
        description: 'Complexe sportif pour événements et compétitions.',
        created: new Date(),
      },
      {
        nom: 'Parc des Expositions Lyon',
        adresse: '112 Rue Marius Berliet, 69008 Lyon',
        latitude: 45.7480,
        longitude: 4.8736,
        description: 'Grand parc pour salons et événements professionnels.',
        created: new Date(),
      },
      {
        nom: 'Espace Vert Nantes',
        adresse: '2 Quai de la Fosse, 44000 Nantes',
        latitude: 47.2186,
        longitude: -1.5536,
        description: 'Espace extérieur pour festivals et événements en plein air.',
        created: new Date(),
      },
      {
        nom: 'Salle Polyvalente Grenoble',
        adresse: '45 Avenue Jean Perrot, 38000 Grenoble',
        latitude: 45.1896,
        longitude: 5.7247,
        description: 'Salle polyvalente pour événements variés.',
        created: new Date(),
      }
    ]);
    console.log('✅ Données de lieux insérées avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'insertion des lieux :', error);
  }
};
