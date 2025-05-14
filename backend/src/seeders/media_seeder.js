const { sequelize } = require('../db/sequelize');

module.exports = async () => {
  try {
    await sequelize.models.Media.bulkCreate([
      {
        type_media: 'image',
        url_media: 'http://localhost:3005/uploads/image1.png',
        id_event: 1,
        created: new Date(),
      },
      {
        type_media: 'image',
        url_media: 'http://localhost:3005/uploads/image1.png',
        id_event: 2,
        created: new Date(),
      },
      {
        type_media: 'video',
        url_media: 'http://localhost:3005/uploads/image1.png',
        id_event: 3,
        created: new Date(),
      },
      {
        type_media: 'audio',
        url_media: 'http://localhost:3005/uploads/image1.png',
        id_event: 4,
        created: new Date(),
      },
      {
        type_media: 'image',
        url_media: 'http://localhost:3005/uploads/image2.png',
        id_event: 5,
        created: new Date(),
      },
      {
        type_media: 'image',
        url_media: 'http://localhost:3005/uploads/image2.png',
        id_event: 1,
        created: new Date(),
      },
      {
        type_media: 'video',
        url_media: 'http://localhost:3005/uploads/image3.png',
        id_event: 2,
        created: new Date(),
      },
      {
        type_media: 'audio',
        url_media: 'http://localhost:3005/uploads/image3.png',
        id_event: 3,
        created: new Date(),
      },
      {
        type_media: 'image',
        url_media: 'http://localhost:3005/uploads/image3.png',
        id_event: 5,
        created: new Date(),
      },
      {
        type_media: 'video',
        url_media: 'http://localhost:3005/uploads/image4.png',
        id_event: 1,
        created: new Date(),
      },
      {
        type_media: 'audio',
        url_media: 'http://localhost:3005/uploads/image1.png',
        id_event: 2,
        created: new Date(),
      },
      {
        type_media: 'image',
        url_media: 'http://localhost:3005/uploads/image1.png',
        id_event: 3,
        created: new Date(),
      },
      {
        type_media: 'video',
        url_media: 'http://localhost:3005/uploads/image1.png',
        id_event: 4,
        created: new Date(),
      },
      {
        type_media: 'audio',
        url_media: 'http://localhost:3005/uploads/image1.png',
        id_event: 5,
        created: new Date(),
      }
    ]);

    console.log('✅ Données media insérées avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'insertion des médias :', error);
  }
};
