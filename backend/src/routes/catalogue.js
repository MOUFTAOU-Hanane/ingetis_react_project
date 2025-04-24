const express = require('express');
const router = express.Router();
const { Catalogue, Evenement } = require('../db/sequelize');

/**
 * @swagger
 * tags:
 *   name: Catalogs
 *   description: Gestion des catalogues
 */

/**
 * @swagger
 * /api/catalogs:
 *   post:
 *     summary: Créer un catalogue
 *     tags: [Catalogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom_catalogue:
 *                 type: string
 *                 example: "Catalogue d'art"
 *               description:
 *                 type: string
 *                 example: "Catalogue détaillant les œuvres exposées"
 *               id_event:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Catalogue créé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/', async (req, res) => {
  try {
    const { nom_catalogue, description, id_event } = req.body;
    const nouveauCatalog = await Catalogue.create({ nom_catalogue, description, id_event });
    res.status(201).json({ nouveauCatalog });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création du catalogue', error: err.message });
  }
});

/**
 * @swagger
 * /api/catalogs:
 *   get:
 *     summary: Obtenir tous les catalogues
 *     tags: [Catalogs]
 *     responses:
 *       200:
 *         description: Liste des catalogues récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/', async (req, res) => {
  try {
    const catalogs = await Catalogue.findAll({
      include: [
          { model: Evenement, as: 'event' }
      ]
    });
    res.status(200).json(catalogs);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des catalogues', error: err.message });
  }
});

/**
 * @swagger
 * /api/catalogs/{id}:
 *   get:
 *     summary: Obtenir un catalogue par son ID
 *     tags: [Catalogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du catalogue
 *     responses:
 *       200:
 *         description: Catalogue récupéré avec succès
 *       404:
 *         description: Catalogue non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const catalog = await Catalogue.findByPk(id, {
      include: [
          { model: Evenement, as: 'event' }
      ]
    });
    if (!catalog) {
      return res.status(404).json({ message: 'Catalogue non trouvé' });
    }
    res.status(200).json(catalog);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du catalogue', error: err.message });
  }
});

/**
 * @swagger
 * /api/catalogs/{id}:
 *   put:
 *     summary: Mettre à jour un catalogue
 *     tags: [Catalogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du catalogue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom_catalogue:
 *                 type: string
 *                 example: "Catalogue révisé"
 *               description:
 *                 type: string
 *                 example: "Catalogue révisé avec de nouvelles œuvres"
 *               id_event:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Catalogue mis à jour avec succès
 *       404:
 *         description: Catalogue non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { nom_catalogue, description, id_event } = req.body;
  try {
    const catalog = await Catalogue.findByPk(id);
    if (!catalog) {
      return res.status(404).json({ message: 'Catalogue non trouvé' });
    }
    await catalog.update({ nom_catalogue, description, id_event });
    res.status(200).json({ catalog });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du catalogue', error: err.message });
  }
});

/**
 * @swagger
 * /api/catalogs/{id}:
 *   delete:
 *     summary: Supprimer un catalogue
 *     tags: [Catalogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du catalogue
 *     responses:
 *       200:
 *         description: Catalogue supprimé avec succès
 *       404:
 *         description: Catalogue non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const catalog = await Catalogue.findByPk(id);
    if (!catalog) {
      return res.status(404).json({ message: 'Catalogue non trouvé' });
    }
    await catalog.destroy();
    res.status(200).json({ message: 'Catalogue supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du catalogue', error: err.message });
  }
});

module.exports = router;
 