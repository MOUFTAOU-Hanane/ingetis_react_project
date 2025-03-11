const express = require('express');
const router = express.Router();
const { Lieu } = require('../db/sequelize');

/**
 * @swagger
 * tags:
 *   name: Lieux
 *   description: Gestion des lieux
 */

/**
 * @swagger
 * /api/lieu:
 *   post:
 *     summary: Créer un lieu
 *     tags: [Lieux]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Salle de concert"
 *               adresse:
 *                 type: string
 *                 example: "123 Rue de la Musique, Paris"
 *               latitude:
 *                 type: number
 *                 example: 48.8566
 *               longitude:
 *                 type: number
 *                 example: 2.3522
 *               description:
 *                 type: string
 *                 example: "Une salle de concert moderne"
 *     responses:
 *       201:
 *         description: Lieu créé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/', async (req, res) => {
  try {
    const { nom, adresse, latitude, longitude, description } = req.body;
    const nouveauLieu = await Lieu.create({ nom, adresse, latitude, longitude, description });
    res.status(201).json({ nouveauLieu });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création du lieu', error: err.message });
  }
});

/**
 * @swagger
 * /api/lieu:
 *   get:
 *     summary: Obtenir tous les lieux
 *     tags: [Lieux]
 *     responses:
 *       200:
 *         description: Liste des lieux récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/', async (req, res) => {
  try {
    const lieux = await Lieu.findAll();
    res.status(200).json(lieux);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des lieux', error: err.message });
  }
});

/**
 * @swagger
 * /api/lieu/{id}:
 *   get:
 *     summary: Obtenir un lieu par son ID
 *     tags: [Lieux]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du lieu
 *     responses:
 *       200:
 *         description: Lieu récupéré avec succès
 *       404:
 *         description: Lieu non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const lieu = await Lieu.findByPk(id);
    if (!lieu) {
      return res.status(404).json({ message: 'Lieu non trouvé' });
    }
    res.status(200).json(lieu);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du lieu', error: err.message });
  }
});

/**
 * @swagger
 * /api/lieu/{id}:
 *   put:
 *     summary: Mettre à jour un lieu
 *     tags: [Lieux]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du lieu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Salle de conférence"
 *               adresse:
 *                 type: string
 *                 example: "456 Avenue des Lumières, Lyon"
 *               latitude:
 *                 type: number
 *                 example: 45.764
 *               longitude:
 *                 type: number
 *                 example: 4.8357
 *               description:
 *                 type: string
 *                 example: "Un espace dédié aux conférences et séminaires"
 *     responses:
 *       200:
 *         description: Lieu mis à jour avec succès
 *       404:
 *         description: Lieu non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { nom, adresse, latitude, longitude, description } = req.body;
  try {
    const lieu = await Lieu.findByPk(id);
    if (!lieu) {
      return res.status(404).json({ message: 'Lieu non trouvé' });
    }
    await lieu.update({ nom, adresse, latitude, longitude, description });
    res.status(200).json({ lieu });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du lieu', error: err.message });
  }
});

/**
 * @swagger
 * /api/lieu/{id}:
 *   delete:
 *     summary: Supprimer un lieu
 *     tags: [Lieux]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du lieu
 *     responses:
 *       200:
 *         description: Lieu supprimé avec succès
 *       404:
 *         description: Lieu non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const lieu = await Lieu.findByPk(id);
    if (!lieu) {
      return res.status(404).json({ message: 'Lieu non trouvé' });
    }
    await lieu.destroy();
    res.status(200).json({ message: 'Lieu supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du lieu', error: err.message });
  }
});

module.exports = router;
