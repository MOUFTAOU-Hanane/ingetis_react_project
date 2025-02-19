const express = require('express');
const router = express.Router();
const { Lieu } = require('../db/sequelize');


// 1. Créer un Lieu
router.post('/lieux', async (req, res) => {
  try {
    const { nom, adresse, latitude, longitude, description } = req.body;
    const nouveauLieu = await Lieu.create({ nom, adresse, latitude, longitude, description });
    res.status(201).json({ message: 'Lieu créé avec succès', lieu: nouveauLieu });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création du lieu', error: err.message });
  }
});

// 2. Obtenir tous les Lieux
router.get('/lieux', async (req, res) => {
  try {
    const lieux = await Lieu.findAll();
    res.status(200).json(lieux);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des lieux', error: err.message });
  }
});

// 3. Obtenir un Lieu par son ID
router.get('/lieux/:id', async (req, res) => {
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

// 4. Mettre à jour un Lieu
router.put('/lieux/:id', async (req, res) => {
  const id = req.params.id;
  const { nom, adresse, latitude, longitude, description } = req.body;
  try {
    const lieu = await Lieu.findByPk(id);
    if (!lieu) {
      return res.status(404).json({ message: 'Lieu non trouvé' });
    }
    await lieu.update({ nom, adresse, latitude, longitude, description });
    res.status(200).json({ message: 'Lieu mis à jour avec succès', lieu });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du lieu', error: err.message });
  }
});

// 5. Supprimer un Lieu
router.delete('/lieux/:id', async (req, res) => {
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

