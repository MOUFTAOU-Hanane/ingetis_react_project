const path = require('path');
const { sequelize } = require('./src/db/sequelize');

const orderedSeeders = [
  'utilisateur_seeder.js',
  'lieu_seeder.js',
  'evenement_seeder.js',
  'programme_seeder.js',
  'catalogue_seeder.js',
  'oeuvres_seeder.js',
  'commentaire_seeder.js',
  'favoris_seeder.js',
  'parcours_seeder.js',
  'media_seeder.js',
  'participants_seeder.js',


];

const runSeeders = async () => {
  try {
    await sequelize.sync({ force: true }); // Vide les tables
    console.log('🗃️ Tables synchronisées.');

    for (const seederFile of orderedSeeders) {
      const seederPath = path.resolve(__dirname, 'src', 'seeders', seederFile);
      const seedFunction = require(seederPath);
      console.log(`🌱 Exécution de ${seederFile}...`);
      await seedFunction();
    }

    console.log('✅ Tous les seeders ont été exécutés avec succès.');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur lors de l’exécution des seeders :', error);
    process.exit(1);
  }
};

runSeeders();
