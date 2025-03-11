const express = require('express');
const { Media } = require('../db/sequelize');
const upload = require('../config/multer');  
const router = express.Router();
const fs = require('fs'); 
const baseUrl = "http://localhost:3005"; 
/**
 * @swagger
 * tags:
 *   name: Médias
 *   description: Gestion des médias (images, vidéos, etc.)
 */

/**
 * @swagger
 * /api/media:
 *   post:
 *     summary: Créer plusieurs médias (upload de fichiers)
 *     tags: [Médias]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               type_media:
 *                 type: string
 *                 example: "image"
 *               description:
 *                 type: string
 *                 example: "Une belle image"
 *               id_event:
 *                 type: integer
 *                 example: 1
 
 *     responses:
 *       201:
 *         description: Médias créés avec succès
 *       400:
 *         description: Aucun fichier téléchargé
 *       500:
 *         description: Erreur serveur
 */

// Route pour ajouter plusieurs médias
router.post('/', upload.array('media'), async (req, res) => {
  try {
    // Vérification si des fichiers ont été téléchargés
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Aucun fichier téléchargé' });
    }

    const mediaArray = [];

    // Parcourir chaque fichier et créer un enregistrement pour chaque média dans la base de données
    for (const file of req.files) {
      const fileUrl = `${baseUrl}/uploads/${file.filename}`;
      // Créer un média dans la base de données
      const media = await Media.create({
        type_media: req.body.type_media,
        url_media: fileUrl,
        description: req.body.description,
        id_event: req.body.id_event,
      
      });

      mediaArray.push(media);  // Ajouter le média à l'array
    }

    // Répondre avec succès et renvoyer la liste des médias créés
    res.status(201).json({ mediaArray });

  } catch (error) {
    console.error("Erreur lors de la création des médias", error);
    res.status(500).json({ message: 'Erreur serveur lors de la création des médias', error: error.message });
  }
});



/**
 * @swagger
 * /api/media:
 *   get:
 *     summary: Récupérer tous les médias
 *     tags: [Médias]
 *     responses:
 *       200:
 *         description: Liste des médias récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/', async (req, res) => {
  try {
    const media = await Media.findAll();
    res.status(200).json({ media });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des médias', error: error.message });
  }
});

/**
 * @swagger
 * /api/media/{id}:
 *   get:
 *     summary: Récupérer un média par ID
 *     tags: [Médias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du média
 *     responses:
 *       200:
 *         description: Média récupéré avec succès
 *       404:
 *         description: Média non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Média non trouvé' });
    }
    res.status(200).json({ media });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du média', error: error.message });
  }
});

/**
 * @swagger
 * /api/media/{id}:
 *   put:
 *     summary: Mettre à jour un média
 *     tags: [Médias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du média
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: string
 *                 format: binary
 *               type_media:
 *                 type: string
 *                 example: "video"
 *               description:
 *                 type: string
 *                 example: "Une vidéo mise à jour"
 *     responses:
 *       200:
 *         description: Média mis à jour avec succès
 *       404:
 *         description: Média non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', upload.single('media'), async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Média non trouvé' });
    }

    const fileUrl = req.file ? `/uploads/${req.file.filename}` : media.url_media;

    media.type_media = req.body.type_media || media.type_media;
    media.url_media = fileUrl;
    media.description = req.body.description || media.description;

    await media.save();
    res.status(200).json({ media });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du média', error: error.message });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Media:
 *       type: object
 *       properties:
 *         id_media:
 *           type: integer
 *           description: ID du média
 *         type_media:
 *           type: string
 *           description: Type du média (image, vidéo, etc.)
 *         url_media:
 *           type: string
 *           description: URL du fichier média
 *         description:
 *           type: string
 *           description: Description du média
 *         id_event:
 *           type: integer
 *           description: ID de l'événement associé
 *       required:
 *         - type_media
 *         - url_media
 *         - id_event
 *         
 */
router.delete('/:id', async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Média non trouvé' });
    }

    if (media.url_media) {
      const filePath = `.${media.url_media}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await media.destroy();
    res.status(200).json({ message: 'Média supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du média', error: error.message });
  }
});

module.exports = router;
