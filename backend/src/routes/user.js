const express = require('express');
const router = express.Router();

const { User } = require('../db/sequelize'); 

router.get('/', async (req, res) => {
    try {
      const users = await User.findAll();  // Récupère tous les utilisateurs
      res.status(200).json(users);  // Retourne les utilisateurs dans la réponse
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
  });

  module.exports = router;  // Exporter le router
