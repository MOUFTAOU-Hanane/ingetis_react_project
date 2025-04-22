const express = require('express');
const router = express.Router();
const { Programme, Evenement } = require('../db/sequelize'); // Assure-toi que les modèles sont correctement importés

/**
 * @swagger
 * /api/programs:
 *   post:
 *     summary: Créer un programme
 *     tags: [Programs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - date_heure
 *               - id_event
 *             properties:
 *               titre:
 *                 type: string
 *               description:
 *                 type: string
 *               date_heure:
 *                 type: string
 *                 format: date-time
 *               id_event:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Programme créé avec succès
 *         
 *       400:
 *         description: Données invalides
 */
router.post('/', async (req, res) => {
    try {
        const { titre, description, date_heure, id_event } = req.body;
        const program = await Programme.create({
            titre,
            description,
            date_heure,
            id_event
        });
        res.status(201).json(program);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Erreur lors de la création du programme", details: error.message });
    }
});

/**
 * @swagger
 * /api/programs:
 *   get:
 *     summary: Récupérer tous les programmes
 *     tags: [Programs]
 *     responses:
 *       200:
 *         description: Liste des programmes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Program'
 *       500:
 *         description: Erreur serveur
 */
router.get('/', async (req, res) => {
    try {
        const programs = await Programme.findAll({
            include: {
                model: Evenement,
                attributes: ['id_event', 'titre']
            }
        });
        res.status(200).json(programs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des programmes", details: error.message });
    }
});

/**
 * @swagger
 * /api/programs/{id}:
 *   get:
 *     summary: Récupérer un programme par son ID
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du programme
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Programme récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       404:
 *         description: Programme non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', async (req, res) => {
    try {
        const program = await Programme.findByPk(req.params.id, {
            include: {
                model: Evenement,
                attributes: ['id_event', 'titre']
            }
        });

        if (!program) {
            return res.status(404).json({ error: "Programme non trouvé" });
        }

        res.status(200).json(program);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération du programme", details: error.message });
    }
});

/**
 * @swagger
 * /api/programs/{id}:
 *   put:
 *     summary: Mettre à jour un programme
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du programme
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               description:
 *                 type: string
 *               date_heure:
 *                 type: string
 *                 format: date-time
 *               id_event:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Programme mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       404:
 *         description: Programme non trouvé
 *       400:
 *         description: Données invalides
 */
router.put('/:id', async (req, res) => {
    try {
        const { titre, description, date_heure, id_event } = req.body;
        const program = await Programme.findByPk(req.params.id);

        if (!program) {
            return res.status(404).json({ error: "Programme non trouvé" });
        }

        program.titre = titre || program.titre;
        program.description = description || program.description;
        program.date_heure = date_heure || program.date_heure;
        program.id_event = id_event || program.id_event;

        await program.save();
        res.status(200).json(program);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Erreur lors de la mise à jour du programme", details: error.message });
    }
});

/**
 * @swagger
 * /api/programs/{id}:
 *   delete:
 *     summary: Supprimer un programme
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du programme
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Programme supprimé avec succès
 *       404:
 *         description: Programme non trouvé
 */
router.delete('/:id', async (req, res) => {
    try {
        const program = await Programme.findByPk(req.params.id);

        if (!program) {
            return res.status(404).json({ error: "Programme non trouvé" });
        }

        await program.destroy();
        res.status(200).json({ message: "Programme supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression du programme", details: error.message });
    }
});

module.exports = router;
