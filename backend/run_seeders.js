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

// Fonction qui attend que la DB soit prête (retry)
const waitForDb = async (retries = 10, delayMs = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log('🟢 Connexion à la DB réussie.');
      return;
    } catch (error) {
      console.log(`🔴 Impossible de se connecter à la DB, tentative ${i + 1} sur ${retries}. Reconnexion dans ${delayMs / 1000}s...`);
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
  throw new Error('La base de données n’a jamais répondu.');
};

const runSeeders = async () => {
  try {
    await waitForDb(); // On attend que la DB soit prête

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
