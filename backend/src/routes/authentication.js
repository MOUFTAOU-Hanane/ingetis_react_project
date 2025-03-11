const express = require('express');
const bcrypt = require('bcryptjs');  // Pour comparer les mots de passe hachés
const jwt = require('jsonwebtoken');  // Pour générer un token JWT
const { User } = require('../db/sequelize'); 
const router = express.Router();
const upload = require('../config/multer');  

/**
 * @swagger
 * tags:
 *   name: Utilisateur
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un utilisateur
 *     description: Permet à un utilisateur de s'inscrire avec un nom, email, mot de passe et une photo de profil.
 *     tags:
 *       - Utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Jean Dupont"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jean.dupont@example.com"
 *               mot_de_passe:
 *                 type: string
 *                 format: password
 *                 example: "monMotDePasse123"
 *               role:
 *                 type: string
 *                 enum: [admin, user, organisateur]
 *                 example: "user"
 *               telephone:
 *                 type: string
 *                 example: "+33612345678"
 *               bibliographie:
 *                 type: string
 *                 example: "Passionné de culture et d'événements."
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur créé avec succès"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id_user:
 *                       type: integer
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       example: "Jean Dupont"
 *                     email:
 *                       type: string
 *                       example: "jean.dupont@example.com"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     bibliographie:
 *                       type: string
 *                       example: "Passionné de culture et d'événements."
 *                     telephone:
 *                       type: string
 *                       example: "+33612345678"
 *                     photo:
 *                       type: string
 *                       example: "http://localhost:3000/uploads/photo.jpg"
 *       400:
 *         description: Email déjà utilisé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cet email est déjà utilisé."
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la création de l'utilisateur."
 */

router.post('/register', upload.single('photo'), async (req, res) => {
  const { nom, email, mot_de_passe, role, telephone, bibliographie } = req.body;
  const photoProfil = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // Vérifier que le rôle est valide
    const validRoles = ['admin', 'user', 'organisateur'];
    const userRole = validRoles.includes(role) ? role : 'user';

    // Créer l'utilisateur
    const newUser = await User.create({
      nom,
      email,
      mot_de_passe: hashedPassword,
      role: userRole,
      telephone,
      bibliographie,
      photo: photoProfil,
    });

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: {
        id_user: newUser.id_user,
        nom: newUser.nom,
        email: newUser.email,
        role: newUser.role,
        bibliographie: newUser.bibliographie,
        telephone: newUser.telephone,
        photo: photoProfil ? `http://localhost:3005${photoProfil}` : null
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
  }
});



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion de l'utilisateur
 *     tags: [Utilisateur]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               mot_de_passe:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Connexion réussie"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_user:
 *                       type: integer
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       example: "Jean Dupont"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     role:
 *                       type: string
 *                       example: "participant"
 *                     token:
 *                       type: string
 *                       example: "jwt_token"
 *       404:
 *         description: Utilisateur non trouvé
 *       401:
 *         description: Mot de passe incorrect
 *       500:
 *         description: Erreur serveur
 */
router.post('/login', async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Comparer le mot de passe avec celui stocké dans la base de données
    const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user.id_user, role: user.role }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Connexion réussie',
      data: {
        id_user: user.id_user,
        nom: user.nom,
        email: user.email,
        role: user.role,
        bibliographie: user.bibliographie,
        telephone: user.telephone,
        token
      },
    });

  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la connexion.' });
  }
});

/**
 * @swagger
 * /api/auth/update-profile/{id}:
 *   put:
 *     summary: Mettre à jour le profil de l'utilisateur
 *     tags: [Utilisateur]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Jean Dupont"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               telephone:
 *                 type: string
 *                 example: "+1234567890"
 *               bibliographie:
 *                 type: string
 *                 example: "Passionné par l'art moderne..."
 *               mot_de_passe:
 *                 type: string
 *                 example: "newpassword123"
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profil mis à jour avec succès"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       example: "Jean Dupont"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     telephone:
 *                       type: string
 *                       example: "+1234567890"
 *                     bibliographie:
 *                       type: string
 *                       example: "Passionné par l'art moderne..."
 *                     photo:
 *                       type: string
 *                       example: "/uploads/photo.jpg"
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/update-profile/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const { nom, email, telephone, bibliographie, mot_de_passe } = req.body;

  try {
    // Rechercher l'utilisateur à modifier
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Si une nouvelle photo de profil est téléchargée, on met à jour le champ de la photo
    let photo = user.photo; // Conserver l'ancienne photo si aucune nouvelle photo n'est envoyée
    if (req.file) {
      photo = `/uploads/${req.file.filename}`; // Nouveau chemin de la photo
    }

    // Si le mot de passe est modifié, on le hache avant de le sauvegarder
    let hashedPassword = mot_de_passe;
    if (mot_de_passe) {
      hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    }

    // Mettre à jour les informations de l'utilisateur
    await user.update({
      nom,
      email,
      telephone,
      bibliographie,
      mot_de_passe: hashedPassword, // Mettre à jour avec le mot de passe haché
      photo // Mettre à jour la photo de profil
    });

    res.status(200).json({
      message: "Profil mis à jour avec succès",
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
        telephone: user.telephone,
        bibliographie: user.bibliographie,
        photo: `http://localhost:3000${photo}` // Afficher l'URL complète de la photo
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la mise à jour du profil" });
  }
});




module.exports = router; // Exporter le router
