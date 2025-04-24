const express = require('express');
const router = express.Router();
const { Parcours } =  require('../db/sequelize');

/**
 * @swagger
 * /api/parcours:
 *   get:
 *     summary: Récupérer tous les parcours
 *     tags: [Parcours]
 *     responses:
 *       200:
 *         description: Liste des parcours récupérée avec succès
 */
router.get('/', async (req, res) => {
    try {
        const parcours = await Parcours.findAll();
        res.status(200).json(parcours);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des parcours', details: error.message });
    }
});

/**
 * @swagger
 * /api/parcours/{id}:
 *   get:
 *     summary: Récupérer un parcours par ID
 *     tags: [Parcours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du parcours à récupérer
 *     responses:
 *       200:
 *         description: Détails du parcours récupéré avec succès
 *       404:
 *         description: Parcours introuvable
 */
router.get('/:id', async (req, res) => {
    try {
        const parcours = await Parcours.findByPk(req.params.id);
        if (!parcours) {
            return res.status(404).json({ error: 'Parcours non trouvé' });
        }
        res.status(200).json(parcours);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du parcours', details: error.message });
    }
});

/**
 * @swagger
 * /api/parcours/create:
 *   post:
 *     summary: Ajouter plusieurs parcours pour un même lieu
 *     tags: [Parcours]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_lieu
 *               - parcours
 *             properties:
 *               id_lieu:
 *                 type: integer
 *                 description: ID du lieu où ajouter les parcours
 *               parcours:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Parcours'
 *     responses:
 *       201:
 *         description: Parcours créés avec succès
 *       500:
 *         description: Erreur lors de la création
 */
router.post('/create', async (req, res) => {
    const { id_lieu, parcours } = req.body;

    if (!id_lieu || !Array.isArray(parcours) || parcours.length === 0) {
        return res.status(400).json({ error: 'Données invalides' });
    }

    try {
        const parcoursList = parcours.map(p => ({
            nom: p.nom,
            description: p.description,
            date_debut: p.date_debut,
            date_fin: p.date_fin,
            id_lieu
        }));

        const nouveauxParcours = await Parcours.bulkCreate(parcoursList);
        res.status(201).json({ message: 'Parcours créés avec succès', parcours: nouveauxParcours });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création des parcours', details: error.message });
    }
});

/**
 * @swagger
 * /api/parcours/{id}:
 *   put:
 *     summary: Mettre à jour un parcours
 *     tags: [Parcours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du parcours à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Parcours'
 *     responses:
 *       200:
 *         description: Parcours mis à jour avec succès
 *       404:
 *         description: Parcours introuvable
 */
router.put('/:id', async (req, res) => {
    try {
        const parcours = await Parcours.findByPk(req.params.id);
        if (!parcours) {
            return res.status(404).json({ error: 'Parcours non trouvé' });
        }
        await parcours.update(req.body);
        res.status(200).json({ message: 'Parcours mis à jour avec succès', parcours });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du parcours', details: error.message });
    }
});

/**
 * @swagger
 * /api/parcours/{id}:
 *   delete:
 *     summary: Supprimer un parcours
 *     tags: [Parcours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du parcours à supprimer
 *     responses:
 *       200:
 *         description: Parcours supprimé avec succès
 *       404:
 *         description: Parcours introuvable
 */
router.delete('/:id', async (req, res) => {
    try {
        const parcours = await Parcours.findByPk(req.params.id);
        if (!parcours) {
            return res.status(404).json({ error: 'Parcours non trouvé' });
        }
        await parcours.destroy();
        res.status(200).json({ message: 'Parcours supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du parcours', details: error.message });
    }
});

module.exports = router;
