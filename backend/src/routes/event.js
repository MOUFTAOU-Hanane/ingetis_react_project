const express = require('express');
const router = express.Router();
const { Event, Participant, Lieu, Program, Media, Catalog, Comment } = require('../db/sequelize'); // Importe les modèles

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Gestion des événements
 */

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Créer un événement
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *                 example: "Concert de Jazz"
 *               description:
 *                 type: string
 *                 example: "Un concert avec des artistes internationaux."
 *               date_debut:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-15T18:00:00.000Z"
 *               date_fin:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-15T22:00:00.000Z"
 *               id_lieu:
 *                 type: integer
 *                 example: 1
 *               id_createur:
 *                 type: integer
 *                 example: 2
 * 
 *     responses:
 *       201:
 *         description: Événement créé avec succès
 *         content:
 *           application/json:
 *             example:
 *               message: "Événement créé avec succès"
 *               event:
 *                 id_event: 1
 *                 titre: "Concert de Jazz"
 *                 description: "Un concert avec des artistes internationaux."
 *                 date_debut: "2025-06-15T18:00:00.000Z"
 *                 date_fin: "2025-06-15T22:00:00.000Z"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors de la création de l'événement"
 *               details: "Une description de l'erreur"
 */
router.post('/', async (req, res) => {
    try {
        const event = await Event.create(req.body);
        console.log (event)
        res.status(201).json({ event });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de l'événement", details: error.message });
    }
});

/**
/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Récupérer tous les événements
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Liste des événements récupérée avec succès
 *         content:
 *           application/json:
 *             example:
 *               - id_event: 1
 *                 titre: "Concert de Jazz"
 *                 description: "Un concert avec des artistes internationaux."
 *                 date_debut: "2025-06-15T18:00:00.000Z"
 *                 date_fin: "2025-06-15T22:00:00.000Z"
 *               - id_event: 2
 *                 titre: "Festival Rock"
 *                 description: "Un festival avec des groupes rock célèbres."
 *                 date_debut: "2025-07-10T15:00:00.000Z"
 *                 date_fin: "2025-07-10T23:00:00.000Z"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors de la récupération des événements"
 *               details: "Une description de l'erreur"
 */
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll({
            include: [
                { model: Lieu, as: 'lieu' },
                { model: Program, as: 'programs' },
                { model: Media, as: 'medias' },
                { model: Catalog, as: 'catalogs' },
                { model: Participant, as: 'participants' },
                { model: Comment, as: 'comments' }

            ]
        });

        res.status(200).json(events);
    } catch (error) {
        console.error("Erreur lors de la récupération des événements", error);
        res.status(500).json({ error: "Erreur lors de la récupération des événements", details: error.message });
    }
});



/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Récupérer un événement par ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'événement
 *     responses:
 *       200:
 *         description: Événement récupéré avec succès
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 id_event: 1
 *                 titre: "Concert de Jazz"
 *                 description: "Un concert avec des artistes internationaux."
 *                 date_debut: "2025-06-15T18:00:00.000Z"
 *                 date_fin: "2025-06-15T22:00:00.000Z"
 *                 program: [...]
 *                 media: [...]
 *                 catalog: [...]
 *       404:
 *         description: Événement non trouvé
 *         content:
 *           application/json:
 *             example:
 *               message: "Événement non trouvé"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors de la récupération de l'événement"
 *               details: "Une description de l'erreur"
 */
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id, {
            include: [
                { model: Lieu, as: 'lieu' },
                { model: Program, as: 'programs' },
                { model: Media, as: 'medias' },
                { model: Catalog, as: 'catalogs' },
                { model: Participant, as: 'participants' },
                { model: Comment, as: 'comments' }

            ]
        });
        if (!event) return res.status(404).json({ message: 'Événement non trouvé' });
        res.status(200).json({  event });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'événement', error: error.message });
    }
});

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Mettre à jour un événement
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'événement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *                 example: "Festival Rock"
 *               description:
 *                 type: string
 *                 example: "Mise à jour du festival avec de nouveaux artistes."
 *     responses:
 *       200:
 *         description: Événement mis à jour avec succès
 *         content:
 *           application/json:
 *             example:
 *               message: "Événement mis à jour"
 *               event:
 *                 id_event: 2
 *                 titre: "Festival Rock"
 *                 description: "Mise à jour du festival avec de nouveaux artistes."
 *       404:
 *         description: Événement non trouvé
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors de la mise à jour"
 *               details: "Une description de l'erreur"
 */
router.put('/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ error: "Événement non trouvé" });

        await event.update(req.body);

        // Récupérer l'événement mis à jour avec ses relations
        const updatedEvent = await Event.findByPk(req.params.id, {
            include: [
                { model: Lieu, as: 'lieu' },
                { model: Program, as: 'programs' },
                { model: Media, as: 'medias' },
                { model: Catalog, as: 'catalogs' },
                { model: Participant, as: 'participants' },
                { model: Comment, as: 'comments' }
            ]
        });

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour", details: error.message });
    }
});


/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Supprimer un événement
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'événement
 *     responses:
 *       200:
 *         description: Événement supprimé avec succès
 *       404:
 *         description: Événement non trouvé
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors de la suppression"
 *               details: "Une description de l'erreur"
 */
router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ error: "Événement non trouvé" });

        await event.destroy();
        res.status(200).json({ message: "Événement supprimé" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression", details: error.message });
    }
});

module.exports = router;
