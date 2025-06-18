// module.exports = router;
const express = require('express');
const router = express.Router();
const { Lieu } = require('../db/sequelize');
const axios = require('axios');



// Fonction pour appeler Google Places API et récupérer monuments proches
async function getNearbyMonuments(lat, lng, radius = 2000) {
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const params = {
    location: `${lat},${lng}`,
    radius,
    type: 'tourist_attraction',
    key: process.env.GOOGLE_MAPS_API_KEY,
  };

  try {
    const response = await axios.get(url, { params });
    if (response.data.status !== 'OK') {
      console.error('Google Places API Error:', response.data.status, response.data.error_message);
      return [];
    }

    // La liste brute des résultats
    const results = response.data.results;

    // Extraire les champs importants
    const monuments = results.map(place => ({
      nom: place.name,
      adresse: place.vicinity || "",
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      rating: place.rating || null,
    }));

    return monuments;

  } catch (error) {
    console.error('Axios error:', error.message);
    return [];
  }
}

// Générer un QR Code à partir d'un lien
async function generateQRCodeURL(lieuId) {
  const url = `http://localhost:3005/lieux/${lieuId}`; // ⚠️ En production, remplace localhost par ton domaine
  try {
    return await QRCode.toDataURL(url);
  } catch (err) {
    console.error('Erreur QR Code:', err);
    return null;
  }
}
/**
 * @swagger 

 * /api/parcours/generate/{id_lieu}:
 *   get:
 *     summary: Génère automatiquement 3 parcours à partir d’un lieu principal
 *     tags:
 *       - Parcours
 *     parameters:
 *       - in: path
 *         name: id_lieu
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du lieu principal lié à un événement
 *     responses:
 *       200:
 *         description: Liste de 3 parcours générés automatiquement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lieu_principal:
 *                   type: object
 *                   description: Le lieu de départ
 *                 parcours:
 *                   type: array
 *                   items:
 *                     type: array
 *                     description: Un parcours contenant une liste de lieux
 *                     items:
 *                       type: object
 *                       properties:
 *                         id_lieu:
 *                           type: integer
 *                         nom:
 *                           type: string
 *                         adresse:
 *                           type: string
 *                         latitude:
 *                           type: number
 *                         longitude:
 *                           type: number
 *                         description:
 *                           type: string
 *       400:
 *         description: Pas assez de lieux pour générer les parcours
 *       404:
 *         description: Lieu principal non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/generate/:id_lieu', async (req, res) => {
  const { id_lieu } = req.params;

  try {
    const lieuDepart = await Lieu.findByPk(id_lieu);
    if (!lieuDepart) {
      return res.status(404).json({ message: "Lieu de départ introuvable" });
    }

    const monuments = await getNearbyMonuments(lieuDepart.latitude, lieuDepart.longitude);

    if (monuments.length === 0) {
      return res.status(404).json({ message: "Aucun monument trouvé proche du lieu." });
    }

    const parcours = [];
    const nbParcours = Math.floor(monuments.length / 3);

    for (let i = 0; i < nbParcours; i++) {
      const lieux = monuments.slice(i * 3, i * 3 + 3);
      parcours.push({
        nom: `Parcours ${i + 1}`,
        lieux
      });
    }

    // Si on a moins de 3 monuments, ou qu'on n'a généré aucun parcours, on propose un seul parcours partiel
    if (parcours.length === 0 && monuments.length > 0) {
      parcours.push({
        nom: 'Parcours 1',
        lieux: monuments
      });
    }

    res.json({
      lieu_principal: {
        id: lieuDepart.id_lieu,
        nom: lieuDepart.nom,
        adresse: lieuDepart.adresse,
        latitude: lieuDepart.latitude,
        longitude: lieuDepart.longitude,
      },
      parcours
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});




module.exports = router;