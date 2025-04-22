const express = require('express');
const router = express.Router();
const { Media } = require('../db/sequelize');
const upload = require('../config/multer');  
const fs = require('fs');
const baseUrl = "http://localhost:3005";

/**
 * @swagger
 * tags:
 *   name: Médias
 *   description: Gestion des fichiers média
 */

/**
 * @swagger
 * /api/media:
 *   post:
 *     summary: Upload de plusieurs médias liés à un événement
 *     tags: [Médias]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_event:
 *                 type: integer
 *                 example: 1
 *               medias:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Médias créés avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/', upload.array('medias', 10), async (req, res) => {
    try {
        const { id_event } = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: "Aucun fichier envoyé." });
        }

        const medias = await Promise.all(files.map(file => {
            return Media.create({
                id_event,
                type_media: file.mimetype,
                url_media: `${baseUrl}/uploads/${file.filename}`
            });
        }));

        res.status(201).json({ medias });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'upload", error: error.message });
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
 *         description: Liste des médias
 *       500:
 *         description: Erreur serveur
 */
router.get('/', async (req, res) => {
    try {
        const medias = await Media.findAll();
        res.status(200).json(medias);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des médias", details: error.message });
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
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du média
 *     responses:
 *       200:
 *         description: Média récupéré
 *       404:
 *         description: Média non trouvé
 */
router.get('/:id', async (req, res) => {
    try {
        const media = await Media.findByPk(req.params.id);
        if (!media) return res.status(404).json({ error: "Média non trouvé" });
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

/**
 * @swagger
 * /api/media/{id}:
 *   delete:
 *     summary: Supprimer un média
 *     tags: [Médias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du média à supprimer
 *     responses:
 *       200:
 *         description: Média supprimé avec succès
 *       404:
 *         description: Média non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', async (req, res) => {
    try {
        const media = await Media.findByPk(req.params.id);
        if (!media) return res.status(404).json({ error: "Média non trouvé" });

        if (media.url_media) {
            const filePath = `.${media.url_media.replace(baseUrl, '')}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await media.destroy();
        res.status(200).json({ message: "Média supprimé" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression", details: error.message });
    }
});

module.exports = router;
