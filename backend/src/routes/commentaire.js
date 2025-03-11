const express = require("express");
const router = express.Router();
const { Comment, User, Event } = require("../db/sequelize"); // Import des modèles

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - commentaire
 *         - id_user
 *         - id_event
 *       properties:
 *         commentaire:
 *           type: string
 *           description: Contenu du commentaire
 *         id_user:
 *           type: integer
 *           description: ID de l'utilisateur qui écrit le commentaire
 *         id_event:
 *           type: integer
 *           description: ID de l'événement concerné
 
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Ajouter un commentaire
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Commentaire ajouté avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post("/", async (req, res) => {
    try {
        const { commentaire, id_user, id_event } = req.body;
        const user = await User.findByPk(id_user);
        const event = await Event.findByPk(id_event);
        if (!user || !event) {
            return res.status(404).json({ message: "Utilisateur ou événement introuvable" });
        }
        const newComment = await Comment.create({ commentaire, id_user, id_event });
        res.status(201).json({newComment });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout du commentaire", error: error.message });
    }
});

// /**
//  * @swagger
//  * /api/comments/event/{id_event}:
//  * 
//  *   get:
//  *     summary: Récupérer les commentaires d'un événement
//  *     tags: [Comments]
//  *     parameters:
//  *       - in: path
//  *         name: id_event
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID de l'événement
//  *     responses:
//  *       200:
//  *         description: Liste des commentaires
//  *       500:
//  *         description: Erreur serveur
//  */
// router.get("/event/:id_event", async (req, res) => {
//     try {
//         const { id_event } = req.params;
//         const comments = await Comment.findAll({
//             where: { id_event },
//             include: [{ model: User, as: "auteur", attributes: ["id_user", "nom"] }],
//             order: [["date_commentaire", "DESC"]]
//         });
//         res.status(200).json(comments);
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la récupération des commentaires", error: error.message });
//     }
// });

// /**
//  * @swagger
//  * /api/comments/{id}:
//  *   put:
//  *     summary: Modifier un commentaire
//  *     tags: [Comments]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID du commentaire
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               commentaire:
//  *                 type: string
//  *                 description: Nouveau texte du commentaire
//  *     responses:
//  *       200:
//  *         description: Commentaire mis à jour
//  *       404:
//  *         description: Commentaire non trouvé
//  *       500:
//  *         description: Erreur serveur
//  */
// router.put("/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { commentaire } = req.body;
//         const comment = await Comment.findByPk(id);
//         if (!comment) {
//             return res.status(404).json({ message: "Commentaire introuvable" });
//         }
//         comment.commentaire = commentaire;
//         await comment.save();
//         res.status(200).json({ message: "Commentaire mis à jour avec succès", comment });
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la mise à jour du commentaire", error: error.message });
//     }
// });

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Supprimer un commentaire
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du commentaire
 *     responses:
 *       200:
 *         description: Commentaire supprimé
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({ message: "Commentaire introuvable" });
        }
        await comment.destroy();
        res.status(200).json({ message: "Commentaire supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du commentaire", error: error.message });
    }
});


module.exports = router;
