const express = require('express');
const router = express.Router();
const { User } = require('../db/sequelize');  // Importer le modèle User

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     tags: [Utilisateur]

 *     description: Cette route permet de récupérer les détails d'un utilisateur spécifique en utilisant son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: L'ID de l'utilisateur à récupérer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: L'ID de l'utilisateur
 *                 nom:
 *                   type: string
 *                   description: Le nom de l'utilisateur
 *                 email:
 *                   type: string
 *                   description: L'email de l'utilisateur
 *                 telephone:
 *                   type: string
 *                   description: Le téléphone de l'utilisateur
 *                 bibliographie:
 *                   type: string
 *                   description: La bibliographie de l'utilisateur
 *                 photo:
 *                   type: string
 *                   description: L'URL de la photo de l'utilisateur (null si non disponible)
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur non trouvé"
 *       500:
 *         description: Erreur lors de la récupération des détails de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la récupération des détails de l'utilisateur"
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Rechercher l'utilisateur par son ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({
      id: user.id,
      nom: user.nom,
      email: user.email,
      telephone: user.telephone,
      bibliographie: user.bibliographie,
      photo: user.photo ? `http://localhost:3000${user.photo}` : null, // Si l'utilisateur a une photo, on renvoie le lien, sinon null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération des détails de l'utilisateur" });
  }
});



module.exports = router;  // Exporter le router pour l'utiliser dans l'application principale
