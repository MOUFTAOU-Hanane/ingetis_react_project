const express = require('express');
const router = express.Router();
const { User } = require('../db/sequelize');  // Importer le modèle User

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     description: Cette route permet de récupérer la liste de tous les utilisateurs enregistrés dans la base de données.
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_user:
 *                     type: integer
 *                     description: L'ID de l'utilisateur
 *                   nom:
 *                     type: string
 *                     description: Le nom de l'utilisateur
 *                   email:
 *                     type: string
 *                     description: L'email de l'utilisateur
 *                   telephone:
 *                     type: string
 *                     description: Le téléphone de l'utilisateur
 *                   bibliographie:
 *                     type: string
 *                     description: La bibliographie de l'utilisateur
 *                   photo:
 *                     type: string
 *                     description: L'URL de la photo de l'utilisateur
 *       500:
 *         description: Erreur lors de la récupération des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erreur lors de la récupération des utilisateurs
 *                 error:
 *                   type: string
 *                   example: "Erreur interne du serveur"
 */
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();  // Récupère tous les utilisateurs
    res.status(200).json(users);  // Retourne les utilisateurs dans la réponse
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
});

module.exports = router;  // Exporter le router pour l'utiliser dans l'application principale
