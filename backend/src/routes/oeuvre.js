const express = require('express');
const router = express.Router();
const { Oeuvre, User } = require('../db/sequelize'); // Import des modèles
const upload = require('../config/multer');  
const fs = require('fs'); // Pour supprimer les anciens fichiers

/**
 * @swagger
 * tags:
 *   name: Œuvres
 *   description: Gestion des œuvres d'art
 */

/**
 * @swagger
 * /api/oeuvres:
 *   post:
 *     summary: Créer une œuvre avec une image
 *     tags: [Œuvres]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *                 example: "Le Rêve"
 *               type:
 *                 type: string
 *                 example: "Peinture"
 *               description:
 *                 type: string
 *                 example: "Une œuvre abstraite sur le rêve"
 *               prix:
 *                 type: number
 *                 example: 1500
 *               id_user:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Œuvre créée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { titre, type, description, prix, id_user } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const oeuvre = await Oeuvre.create({ titre, type, description, prix, image, id_user });

        res.status(201).json({ message: "Œuvre créée avec succès", oeuvre });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de l'œuvre", details: error.message });
    }
});

/**
 * @swagger
 * /api/oeuvres:
 *   get:
 *     summary: Récupérer toutes les œuvres
 *     tags: [Œuvres]
 *     responses:
 *       200:
 *         description: Liste des œuvres récupérées avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/', async (req, res) => {
    try {
        const oeuvres = await Oeuvre.findAll({ include: [User] });
        res.status(200).json(oeuvres);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des œuvres", details: error.message });
    }
});

/**
 * @swagger
 * /api/oeuvres/{id}:
 *   get:
 *     summary: Récupérer une œuvre par ID
 *     tags: [Œuvres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'œuvre
 *     responses:
 *       200:
 *         description: Œuvre récupérée avec succès
 *       404:
 *         description: Œuvre non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', async (req, res) => {
    try {
        const oeuvre = await Oeuvre.findByPk(req.params.id, { include: [User] });
        if (!oeuvre) return res.status(404).json({ error: "Œuvre non trouvée" });
        res.status(200).json(oeuvre);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de l'œuvre", details: error.message });
    }
});

/**
 * @swagger
 * /api/oeuvres/{id}:
 *   put:
 *     summary: Mettre à jour une œuvre avec ou sans image
 *     tags: [Œuvres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'œuvre à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *                 example: "Le Nouveau Rêve"
 *               type:
 *                 type: string
 *                 example: "Peinture"
 *               description:
 *                 type: string
 *                 example: "Une œuvre mise à jour"
 *               prix:
 *                 type: number
 *                 example: 1800
 *               id_user:
 *                 type: integer
 *                 example: 2
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Œuvre mise à jour avec succès
 *       404:
 *         description: Œuvre non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const oeuvre = await Oeuvre.findByPk(req.params.id);
        if (!oeuvre) return res.status(404).json({ error: "Œuvre non trouvée" });

        const { titre, type, description, prix, id_user } = req.body;
        let image = oeuvre.image;

        // 📌 Suppression de l'ancienne image si une nouvelle est uploadée
        if (req.file) {
            if (oeuvre.image) {
                fs.unlinkSync(`.${oeuvre.image}`);
            }
            image = `/uploads/${req.file.filename}`;
        }

        await oeuvre.update({ titre, type, description, prix, image, id_user });
        res.status(200).json({ message: "Œuvre mise à jour", oeuvre });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour", details: error.message });
    }
});

/**
 * @swagger
 * /api/oeuvres/{id}:
 *   delete:
 *     summary: Supprimer une œuvre et son image
 *     tags: [Œuvres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'œuvre à supprimer
 *     responses:
 *       200:
 *         description: Œuvre supprimée avec succès
 *       404:
 *         description: Œuvre non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', async (req, res) => {
    try {
        const oeuvre = await Oeuvre.findByPk(req.params.id);
        if (!oeuvre) return res.status(404).json({ error: "Œuvre non trouvée" });

        // 📌 Suppression de l'image associée
        if (oeuvre.image) {
            fs.unlinkSync(`.${oeuvre.image}`);
        }

        await oeuvre.destroy();
        res.status(200).json({ message: "Œuvre supprimée" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression", details: error.message });
    }
});

module.exports = router;
