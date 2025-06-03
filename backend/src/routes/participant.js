const express = require('express');
const { Participant, Utilisateur, Evenement ,Lieu} = require('../db/sequelize');  // Importer les modèles nécessaires
const router = express.Router();
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const PDFDocument = require('pdfkit');
const fs = require('fs');

/**
 * @swagger
 * /api/participants:
 *   post:
 *     summary: Crée un nouveau participant et envoie un billet avec QR code par email
 *     tags: [Participants]
 *     description: Inscrit un utilisateur à un événement, génère un billet avec QR code et l'envoie par email.
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
 *                 description: L'ID de l'utilisateur
 *               id_event:
 *                 type: integer
 *                 description: L'ID de l'événement
 *     responses:
 *       201:
 *         description: Participant créé et billet envoyé par e-mail
 *       400:
 *         description: Données invalides ou inscription déjà faite
 *       500:
 *         description: Erreur serveur
 */
router.post('/', async (req, res) => {
  const { statut, id_user, id_event } = req.body;

  try {
    const user = await Utilisateur.findByPk(id_user);
const event = await Evenement.findByPk(id_event, {
  include: [{ model: Lieu, as: 'lieu' }]
});

    if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });
    if (!event) return res.status(400).json({ message: "Événement non trouvé" });
    if (event.places_disponibles <= 0) return res.status(400).json({ message: "Nombre de places atteint" });

    const existing = await Participant.findOne({ where: { id_user, id_event } });
    if (existing) return res.status(400).json({ message: "Déjà inscrit" });

    const numero_billet = uuidv4();

    const newParticipant = await Participant.create({
      statut,
      id_user,
      id_event,
      numero_billet
    });

    await event.update({ places_disponibles: event.places_disponibles - 1 });

    const qrPayload = {
      id: newParticipant.id_participant,
      eventName: event.titre,
      eventDate: event.date_debut,
      eventLocation: event.lieu.adresse,
      participantName: user.nom,
      participantEmail: user.email,
      registrationDate: newParticipant.date_inscription,
      ticketNumber: numero_billet
    };

    const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrPayload));

    // S'assurer que le dossier ./tickets existe
    if (!fs.existsSync('./tickets')) {
      fs.mkdirSync('./tickets');
    }

    // Générer le PDF
    const doc = new PDFDocument();
    const filePath = `./tickets/billet_${newParticipant.id_participant}.pdf`;
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(20).text(` Billet pour ${event.titre}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Nom du participant : ${user.nom}`);
    doc.text(`Email : ${user.email}`);
    doc.text(`Date : ${new Date(event.date_debut).toLocaleString()}`);
    doc.text(`Lieu : ${event.lieu.adresse}`);
    doc.text(`Numéro de billet : ${numero_billet}`);
    doc.moveDown();

    // Extraire l'image QR code en base64 et l'insérer dans le PDF
    const qrImg = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '');
    doc.image(Buffer.from(qrImg, 'base64'), {
      fit: [150, 150],
      align: 'center',
      valign: 'center'
    });

    doc.end();

    writeStream.on('finish', async () => {
      // Envoi de mail
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: user.email,
        subject: `Votre billet pour ${event.titre}`,
        text: `Bonjour ${user.nom}, voici votre billet pour ${event.titre}.`,
        html: `<p>Bonjour <strong>${user.nom}</strong>,</p><p>Voici votre billet pour <strong>${event.titre}</strong>. Merci de le présenter à l'entrée de l'événement.</p>`,
        attachments: [
          {
            filename: `billet_${newParticipant.id_participant}.pdf`,
            path: filePath
          }
        ]
      });

      res.status(201).json({
        message: "Participant créé et billet envoyé par email",
        participant: newParticipant
      });

      // Supprimer le fichier PDF après envoi
      fs.unlink(filePath, (err) => {
        if (err) console.error("Erreur lors de la suppression du fichier PDF :", err);
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
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
    const participants = await Participant.findAll({
      include: [
        { model: Utilisateur, as: 'participants' }
      ]
    });
    res.status(200).json(participants);
  } catch (error) {
    console.error(error);
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

    res.status(200).json(participant);
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

    await participant.update({ statut, id_user, id_event });

    res.status(200).json({ participant });
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
 *     description: Cette route permet de supprimer un participant spécifique.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: L'ID du participant à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
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

    await participant.destroy();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du participant' });
  }
});

module.exports = router;
