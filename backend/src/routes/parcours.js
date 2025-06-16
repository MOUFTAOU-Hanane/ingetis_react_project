// const express = require('express');
// const router = express.Router();
// const { Parcours } =  require('../db/sequelize');

// /**
//  * @swagger
//  * /api/parcours:
//  *   get:
//  *     summary: Récupérer tous les parcours
//  *     tags: [Parcours]
//  *     responses:
//  *       200:
//  *         description: Liste des parcours récupérée avec succès
//  */
// router.get('/', async (req, res) => {
//     try {
//         const parcours = await Parcours.findAll();
//         res.status(200).json(parcours);
//     } catch (error) {
//         res.status(500).json({ error: 'Erreur lors de la récupération des parcours', details: error.message });
//     }
// });

// /**
//  * @swagger
//  * /api/parcours/{id}:
//  *   get:
//  *     summary: Récupérer un parcours par ID
//  *     tags: [Parcours]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID du parcours à récupérer
//  *     responses:
//  *       200:
//  *         description: Détails du parcours récupéré avec succès
//  *       404:
//  *         description: Parcours introuvable
//  */
// router.get('/:id', async (req, res) => {
//     try {
//         const parcours = await Parcours.findByPk(req.params.id);
//         if (!parcours) {
//             return res.status(404).json({ error: 'Parcours non trouvé' });
//         }
//         res.status(200).json(parcours);
//     } catch (error) {
//         res.status(500).json({ error: 'Erreur lors de la récupération du parcours', details: error.message });
//     }
// });

// /**
//  * @swagger
//  * /api/parcours/create:
//  *   post:
//  *     summary: Ajouter plusieurs parcours pour un même lieu
//  *     tags: [Parcours]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - id_lieu
//  *               - parcours
//  *             properties:
//  *               id_lieu:
//  *                 type: integer
//  *                 description: ID du lieu où ajouter les parcours
//  *               parcours:
//  *                 type: array
//  *                 items:
//  *                   $ref: '#/components/schemas/Parcours'
//  *     responses:
//  *       201:
//  *         description: Parcours créés avec succès
//  *       500:
//  *         description: Erreur lors de la création
//  */
// router.post('/create', async (req, res) => {
//     const { id_lieu, parcours } = req.body;

//     if (!id_lieu || !Array.isArray(parcours) || parcours.length === 0) {
//         return res.status(400).json({ error: 'Données invalides' });
//     }

//     try {
//         const parcoursList = parcours.map(p => ({
//             nom: p.nom,
//             description: p.description,
//             date_debut: p.date_debut,
//             date_fin: p.date_fin,
//             id_lieu
//         }));

//         const nouveauxParcours = await Parcours.bulkCreate(parcoursList);
//         res.status(201).json({ message: 'Parcours créés avec succès', parcours: nouveauxParcours });
//     } catch (error) {
//         res.status(500).json({ error: 'Erreur lors de la création des parcours', details: error.message });
//     }
// });

// /**
//  * @swagger
//  * /api/parcours/{id}:
//  *   put:
//  *     summary: Mettre à jour un parcours
//  *     tags: [Parcours]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID du parcours à modifier
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Parcours'
//  *     responses:
//  *       200:
//  *         description: Parcours mis à jour avec succès
//  *       404:
//  *         description: Parcours introuvable
//  */
// router.put('/:id', async (req, res) => {
//     try {
//         const parcours = await Parcours.findByPk(req.params.id);
//         if (!parcours) {
//             return res.status(404).json({ error: 'Parcours non trouvé' });
//         }
//         await parcours.update(req.body);
//         res.status(200).json({ message: 'Parcours mis à jour avec succès', parcours });
//     } catch (error) {
//         res.status(500).json({ error: 'Erreur lors de la mise à jour du parcours', details: error.message });
//     }
// });

// /**
//  * @swagger
//  * /api/parcours/{id}:
//  *   delete:
//  *     summary: Supprimer un parcours
//  *     tags: [Parcours]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID du parcours à supprimer
//  *     responses:
//  *       200:
//  *         description: Parcours supprimé avec succès
//  *       404:
//  *         description: Parcours introuvable
//  */
// router.delete('/:id', async (req, res) => {
//     try {
//         const parcours = await Parcours.findByPk(req.params.id);
//         if (!parcours) {
//             return res.status(404).json({ error: 'Parcours non trouvé' });
//         }
//         await parcours.destroy();
//         res.status(200).json({ message: 'Parcours supprimé avec succès' });
//     } catch (error) {
//         res.status(500).json({ error: 'Erreur lors de la suppression du parcours', details: error.message });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const { Lieu } = require('../db/sequelize');


function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
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

    // Récupérer tous les autres lieux sauf le point de départ
    const autresLieux = await Lieu.findAll({
      where: {
        id_lieu: { [require('sequelize').Op.ne]: id_lieu }
      }
    });

    if (autresLieux.length < 3) {
      return res.status(400).json({ message: "Pas assez de lieux pour générer des parcours" });
    }

    // Fonction pour générer un parcours aléatoire
    const generateParcours = () => {
      const lieuxChoisis = [];
      const lieuxDisponibles = [...autresLieux];

      for (let i = 0; i < 3 && lieuxDisponibles.length > 0; i++) {
        const index = Math.floor(Math.random() * lieuxDisponibles.length);
        lieuxChoisis.push(lieuxDisponibles[index]);
        lieuxDisponibles.splice(index, 1);
      }

      // Calculer distance totale
      let totalDistance = 0;
      lieuxChoisis.forEach(lieu => {
        totalDistance += calculateDistance(
          lieuDepart.latitude,
          lieuDepart.longitude,
          lieu.latitude,
          lieu.longitude
        );
      });

      return {
        lieux: lieuxChoisis,
        distance_total_km: parseFloat(totalDistance.toFixed(2))
      };
    };

    const parcours = [generateParcours(), generateParcours(), generateParcours()];

    res.json({ parcours });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;