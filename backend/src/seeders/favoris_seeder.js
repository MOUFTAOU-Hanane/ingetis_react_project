const { sequelize } = require('../db/sequelize'); // Ajuste le chemin si besoin

module.exports = async () => {
  try {
    // Utilisation du modèle favoris depuis sequelize.models
    await sequelize.models.Favoris.bulkCreate([
      { id_user: 1, id_event: 1, created: new Date() },
      { id_user: 1, id_event: 2, created: new Date() },
      { id_user: 2, id_event: 3, created: new Date() },
      { id_user: 2, id_event: 4, created: new Date() },
      { id_user: 3, id_event: 1, created: new Date() },
      { id_user: 3, id_event: 2, created: new Date() },
      { id_user: 4, id_event: 3, created: new Date() },
      { id_user: 4, id_event: 5, created: new Date() },
      { id_user: 5, id_event: 2, created: new Date() },
      { id_user: 5, id_event: 4, created: new Date() },
      { id_user: 6, id_event: 1, created: new Date() },
      { id_user: 6, id_event: 5, created: new Date() },
      { id_user: 7, id_event: 3, created: new Date() },
      { id_user: 8, id_event: 2, created: new Date() },
      { id_user: 9, id_event: 4, created: new Date() },
    ]);
    console.log('✅ Favoris insérés avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'insertion des favoris :', error);
  }
};
