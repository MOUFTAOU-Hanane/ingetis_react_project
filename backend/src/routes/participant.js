const express = require('express');
const { Participant, User, Event } = require('../db/sequelize');  // Importer les modèles nécessaires
const router = express.Router();

/**
 * @swagger
 * /api/participants:
 *   post:
 *     summary: Crée un nouveau participant
 *     tags: [Participants]

 *     description: Cette route permet de créer un participant en fonction des informations fournies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statut:
 *                 type: string
 *                 description: Le statut du participant
 *               id_user:
 *                 type: integer
 *                 description: L'ID de l'utilisateur participant
 *               id_event:
 *                 type: integer
 *                 description: L'ID de l'événement auquel le participant est inscrit
 *     responses:
 *       201:
 *         description: Participant créé avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/', async (req, res) => {
  const { statut, id_user, id_event } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findByPk(id_user);
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si l'événement existe
    const event = await Event.findByPk(id_event);
    if (!event) {
      return res.status(400).json({ message: "Événement non trouvé" });
    }

    // Vérifier si l'utilisateur est déjà inscrit à cet événement
    const existingParticipant = await Participant.findOne({
      where: { id_user, id_event },
    });

    if (existingParticipant) {
      return res.status(400).json({ message: "Cet utilisateur est déjà inscrit à cet événement." });
    }

    // Créer un nouveau participant
    const newParticipant = await Participant.create({ statut, id_user, id_event });

    res.status(201).json({
      message: "Participant créé avec succès",
      participant: newParticipant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du participant" });
  }
});


/**
 * @swagger
 * /api/participants:
 *   get:
 *     summary: Récupère tous les participants
 *     tags: [Participants]

 *     description: Cette route permet de récupérer la liste de tous les participants.
 *     responses:
 *       200:
 *         description: Liste des participants récupérée avec succès
 *       500:
 *         description: Erreur lors de la récupération des participants
 */
router.get('/', async (req, res) => {
  try {
    const participants = await Participant.findAll();  // Récupère tous les participants
    res.status(200).json(participants);  // Retourne les participants dans la réponse
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des participants' });
  }
});

/**
 * @swagger
 * /api/participants/{id}:
 *   get:
 *     summary: Récupère un participant par son ID
 *     tags: [Participants]

 *     description: Cette route permet de récupérer les détails d'un participant spécifique en utilisant son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: L'ID du participant
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du participant récupérés avec succès
 *       404:
 *         description: Participant non trouvé
 *       500:
 *         description: Erreur lors de la récupération des détails du participant
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const participant = await Participant.findByPk(id);

    if (!participant) {
      return res.status(404).json({ message: "Participant non trouvé" });
    }

    res.status(200).json(participant);  // Retourner les détails du participant
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du participant' });
  }
});

/**
 * @swagger
 * /api/participants/{id}:
 *   put:
 *     summary: Met à jour un participant
 *     tags: [Participants]

 *     description: Cette route permet de mettre à jour les informations d'un participant spécifique.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: L'ID du participant à mettre à jour
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statut:
 *                 type: string
 *                 description: Le statut du participant
 *               id_user:
 *                 type: integer
 *                 description: L'ID de l'utilisateur participant
 *               id_event:
 *                 type: integer
 *                 description: L'ID de l'événement auquel le participant est inscrit
 *     responses:
 *       200:
 *         description: Participant mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Participant non trouvé
 *       500:
 *         description: Erreur lors de la mise à jour du participant
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { statut, id_user, id_event } = req.body;

  try {
    const participant = await Participant.findByPk(id);

    if (!participant) {
      return res.status(404).json({ message: "Participant non trouvé" });
    }

    // Mettre à jour le participant
    await participant.update({ statut, id_user, id_event });

    res.status(200).json({
      participant,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du participant' });
  }
});

/**
 * @swagger
 * /api/participants/{id}:
 *   delete:
 *     summary: Supprime un participant
 *     tags: [Participants]

 *     description: Cette route permet de supprimer un participant en utilisant son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: L'ID du participant à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Participant supprimé avec succès
 *       404:
 *         description: Participant non trouvé
 *       500:
 *         description: Erreur lors de la suppression du participant
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const participant = await Participant.findByPk(id);

    if (!participant) {
      return res.status(404).json({ message: "Participant non trouvé" });
    }

    // Supprimer le participant
    await participant.destroy();

    res.status(200).json({ message: "Participant supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du participant' });
  }
});

module.exports = router;
