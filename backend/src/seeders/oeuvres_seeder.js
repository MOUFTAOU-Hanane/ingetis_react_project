const { sequelize } = require('../db/sequelize'); // Assure-toi que le chemin est correct

module.exports = async () => {
  try {
    await sequelize.models.Oeuvre.bulkCreate([
      {
        titre: 'Oeuvre 1',
        type: 'Peinture',
        description: null,
        prix: 150.00,
        image: null,
        created: new Date(),
        id_user: 1
      },
      {
        titre: 'Oeuvre 2',
        type: 'Sculpture',
        description: 'Une sculpture moderne.',
        prix: 250.00,
        image: null,
        created: new Date(),
        id_user: 1

      },
      {
        titre: 'Oeuvre 3',
        type: 'Photo',
        description: 'Une photo artistique.',
        prix: 100.00,
        image: null,
        created: new Date(),
        id_user: 1

      },
      {
        titre: 'Oeuvre 4',
        type: 'Peinture',
        description: null,
        prix: 180.00,
        image: null,
        created: new Date(),
        id_user: 1

      },
      {
        titre: 'Oeuvre 5',
        type: 'Peinture',
        description: null,
        prix: 200.00,
        image: null,
        created: new Date(),
        id_user: 1

      },
      // Tu peux en ajouter d'autres ici si besoin
    ]);

    console.log('✅ Données Oeuvre insérées avec succès.');
  } catch (error) {
    console.error('❌ Erreur lors de l\'insertion des Oeuvres :', error);
  }
};
