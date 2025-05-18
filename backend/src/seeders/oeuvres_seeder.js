const { sequelize } = require('../db/sequelize'); // Assure-toi que le chemin est correct

module.exports = async () => {
  try {
    await sequelize.models.Oeuvre.bulkCreate([
      {
        titre: 'Oeuvre 1',
        type: 'Peinture',
        description: 'Une peinture abstraite aux couleurs vives représentant un paysage onirique.',
        prix: 150.00,
        image: 'http://localhost:3005/uploads/image1.jpg',
        created: new Date(),
        id_user: 1
      },
      {
        titre: 'Oeuvre 2',
        type: 'Sculpture',
        description: 'Une sculpture moderne en métal recyclé, symbolisant l’équilibre entre nature et technologie.',
        prix: 250.00,
        image:'http://localhost:3005/uploads/image1.jpg',
        created: new Date(),
        id_user: 1
      },
      {
        titre: 'Oeuvre 3',
        type: 'Photo',
        description: 'Une photo artistique en noir et blanc d’une ruelle parisienne au lever du jour.',
        prix: 100.00,
        image: 'http://localhost:3005/uploads/image1.jpg',
        created: new Date(),
        id_user: 1
      },
      {
        titre: 'Oeuvre 4',
        type: 'Peinture',
        description: "Une peinture surréaliste qui mêle les éléments naturels à des formes géométriques étranges.",
        prix: 180.00,
        image: 'http://localhost:3005/uploads/image1.jpg',
        created: new Date(),
        id_user: 1
      },
      {
        titre: 'Oeuvre 5',
        type: 'Peinture',
        description: 'Une toile minimaliste jouant sur les contrastes entre ombre et lumière.',
        prix: 200.00,
        image: 'http://localhost:3005/uploads/image1.jpg',
        created: new Date(),
        id_user: 1
      }
    ]);

    console.log('✅ Données Oeuvre insérées avec succès.');
  } catch (error) {
    console.error('❌ Erreur lors de l\'insertion des Oeuvres :', error);
  }
};
