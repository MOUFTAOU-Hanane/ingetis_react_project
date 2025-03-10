const express = require('express');
const { Program } = require('../db/sequelize');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Programs
 *   description: Gestion des programmes d'événements
 */

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
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Atelier de peinture"
 *               description:
 *                 type: string
 *                 example: "Un atelier pour apprendre les bases de la peinture"
 *     responses:
 *       201:
 *         description: Programme créé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/', async (req, res) => {
    try {
        const program = await Program.create(req.body);
        res.status(201).json({ message: 'Programme créé avec succès', data: program });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du programme', error: error.message });
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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Atelier de peinture"
 *       500:
 *         description: Erreur serveur
 */
router.get('/', async (req, res) => {
    try {
        const programs = await Program.findAll();
        res.status(200).json({ data: programs });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des programmes', error: error.message });
    }
});

/**
 * @swagger
 * /api/programs/{id}:
 *   get:
 *     summary: Récupérer un programme par ID
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du programme
 *     responses:
 *       200:
 *         description: Programme récupéré avec succès
 *       404:
 *         description: Programme non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', async (req, res) => {
    try {
        const program = await Program.findByPk(req.params.id);
        if (!program) return res.status(404).json({ message: 'Programme non trouvé' });
        res.status(200).json({ data: program });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du programme', error: error.message });
    }
});

/**
 * @swagger
 * /programs/{id}:
 *   put:
 *     summary: Mettre à jour un programme
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du programme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Atelier de danse"
 *               description:
 *                 type: string
 *                 example: "Un atelier pour apprendre les bases de la danse"
 *     responses:
 *       200:
 *         description: Programme mis à jour avec succès
 *       404:
 *         description: Programme non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', async (req, res) => {
    try {
        const program = await Program.findByPk(req.params.id);
        if (!program) return res.status(404).json({ message: 'Programme non trouvé' });

        await program.update(req.body);
        res.status(200).json({ message: 'Programme mis à jour avec succès', data: program });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du programme', error: error.message });
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
 *         schema:
 *           type: integer
 *         description: ID du programme
 *     responses:
 *       200:
 *         description: Programme supprimé avec succès
 *       404:
 *         description: Programme non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', async (req, res) => {
    try {
        const program = await Program.findByPk(req.params.id);
        if (!program) return res.status(404).json({ message: 'Programme non trouvé' });

        await program.destroy();
        res.status(200).json({ message: 'Programme supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du programme', error: error.message });
    }
});

module.exports = router;
