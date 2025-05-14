const { sequelize } = require('../db/sequelize'); // Assurez-vous que le chemin est correct

module.exports = async () => {
  try {
    // Insertion des catalogues dans la base de données
    await sequelize.models.Catalogue.bulkCreate([
      {
        nom_catalogue: 'Catalogue de la Conférence sur l\'Innovation',
        description: 'Ce catalogue contient tous les documents et supports de la conférence sur l\'innovation.',
        id_event: 1, // Assurez-vous que cet ID existe dans la table Evenement
      },
      {
        nom_catalogue: 'Catalogue du Festival de Musique',
        description: 'Catalogue des performances, des artistes et des horaires du festival de musique.',
        id_event: 2,
      },
      {
        nom_catalogue: 'Catalogue du Salon du Livre',
        description: 'Catalogue des livres présentés au Salon du Livre.',
        id_event: 3,
      },
      {
        nom_catalogue: 'Catalogue de l\'Exposition Art Contemporain',
        description: 'Liste des œuvres exposées et des artistes présents.',
        id_event: 4,
      },
      {
        nom_catalogue: 'Catalogue du Séminaire Blockchain',
        description: 'Catalogue des sujets abordés lors du séminaire sur la blockchain.',
        id_event: 5,
      },
      {
        nom_catalogue: 'Catalogue de l\'Atelier de Développement Web',
        description: 'Un catalogue avec les ressources et les exercices pour l\'atelier.',
        id_event: 6,
      },
      {
        nom_catalogue: 'Catalogue du Festival de Cinéma',
        description: 'Catalogue des films projetés et des horaires du festival.',
        id_event: 7,
      },
      {
        nom_catalogue: 'Catalogue de la Compétition de Startups',
        description: 'Présentation des startups participantes et des investisseurs.',
        id_event: 8,
      },
      {
        nom_catalogue: 'Catalogue du Marché des Créateurs',
        description: 'Catalogue des produits artisanaux disponibles au marché.',
        id_event: 9,
      },
      {
        nom_catalogue: 'Catalogue de la Conférence sur la Transformation Digitale',
        description: 'Documents et présentations de la conférence sur la transformation digitale.',
        id_event: 10,
      },
      {
        nom_catalogue: 'Catalogue du Forum de l\'Emploi',
        description: 'Catalogue des recruteurs présents et des offres d\'emploi disponibles.',
        id_event: 11,
      },
      {
        nom_catalogue: 'Catalogue du Forum de l\'Entrepreneuriat',
        description: 'Catalogue des entrepreneurs et des ressources disponibles.',
        id_event: 12,
      },
      {
        nom_catalogue: 'Catalogue du Hackathon de Développeurs',
        description: 'Catalogue des projets développés pendant le hackathon.',
        id_event: 13,
      },
      {
        nom_catalogue: 'Catalogue du Concert de Jazz',
        description: 'Liste des musiciens et des morceaux joués lors du concert.',
        id_event: 14,
      },
      {
        nom_catalogue: 'Catalogue du Salon du Design',
        description: 'Catalogue des exposants et des créations design présentées.',
        id_event: 15,
      }
    ]);
    console.log('Catalogues insérés avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion des catalogues :', error);
  }
};
