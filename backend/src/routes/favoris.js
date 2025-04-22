const express = require('express');
const router = express.Router();
const { Favoris, Evenement, Utilisateur } = require('../db/sequelize');

/**
 * @swagger
 * /api/favoris:
 *   post:
 *     summary: Ajouter un événement aux favoris d'un utilisateur
 *     tags: [Favoris]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_event:
 *                 type: integer
 *               id_user:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Événement ajouté aux favoris avec succès
 *       400:
 *         description: Mauvaise requête
 *       500:
 *         description: Erreur serveur
 */
router.post('/', async (req, res) => {
    try {
        const { id_event, id_user } = req.body;

        if (!id_event || !id_user) {
            return res.status(400).json({ error: 'id_event et id_user sont requis' });
        }

        const favori = await Favoris.create({ id_event, id_user });
        res.status(201).json({ message: 'Événement ajouté aux favoris', data: favori });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de lajout aux favoris', details: error.message });
    }
});

/**
 * @swagger
 * /api/favoris:
 *   delete:
 *     summary: Supprimer un événement des favoris d'un utilisateur
 *     tags: [Favoris]
 *     parameters:
 *       - in: query
 *         name: id_event
 *         schema:
 *           type: integer
 *         required: true
 *       - in: query
 *         name: id_user
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Événement retiré des favoris avec succès
 *       400:
 *         description: Mauvaise requête
 *       404:
 *         description: Favori non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/', async (req, res) => {
    try {
        const { id_event, id_user } = req.query;

        if (!id_event || !id_user) {
            return res.status(400).json({ error: 'id_event et id_user sont requis' });
        }

        const favori = await Favoris.destroy({ where: { id_event, id_user } });
        
        if (!favori) {
            return res.status(404).json({ error: 'Favori non trouvé' });
        }

        res.status(200).json({ message: 'Événement retiré des favoris' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du favori', details: error.message });
    }
});

/**
 * @swagger
 * /api/favoris/check:
 *   get:
 *     summary: Vérifier si un événement est en favori pour un utilisateur
 *     tags: [Favoris]
 *     parameters:
 *       - in: query
 *         name: id_event
 *         schema:
 *           type: integer
 *         required: true
 *       - in: query
 *         name: id_user
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Statut du favori récupéré avec succès
 *       400:
 *         description: Mauvaise requête
 *       500:
 *         description: Erreur serveur
 */
router.get('/check', async (req, res) => {
    try {
        const { id_event, id_user } = req.query;

        if (!id_event || !id_user) {
            return res.status(400).json({ error: 'id_event et id_user sont requis' });
        }

        const favori = await Favoris.findOne({ where: { id_event, id_user } });
        res.status(200).json({ favori: !!favori });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la vérification du favori', details: error.message });
    }
});

module.exports = router;
