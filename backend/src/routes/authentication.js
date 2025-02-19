const express = require('express');
const bcrypt = require('bcryptjs');  // Pour comparer les mots de passe hachés
const jwt = require('jsonwebtoken');  // Pour générer un token JWT
const { User } = require('../db/sequelize'); 
const router = express.Router();
const upload = require('../config/multer');  


// Route POST pour l'inscription
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

    // Mettre à jour les informations de l'utilisateur
    await user.update({
      nom,
      email,
      telephone,
      bibliographie,
      mot_de_passe, // Ne pas oublier de hasher le mot de passe si tu le modifies
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



// Route POST pour la connexion (login)
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


//update 
router.put('/update-profile/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const { nom, email, telephone, bibliographie, mot_de_passe } = req.body;

  try {
    // Rechercher l'utilisateur à modifier
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Si une nouvelle image de profil est téléchargée, on met à jour le champ de l'image
    let photo_profil = user.photo; // Conserver l'ancienne image si aucune nouvelle image n'est envoyée
    if (req.file) {
      photo_profil = `/uploads/${req.file.filename}`; // Nouveau chemin de l'image
    }

    // Mettre à jour les informations de l'utilisateur
    await user.update({
      nom,
      email,
      telephone,
      bibliographie,
      mot_de_passe, // Ne pas oublier de hasher le mot de passe si tu le modifies
      photo_profil // Mettre à jour l'image de profil
    });

    res.status(200).json({
      message: "Profil mis à jour avec succès",
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
        telephone: user.telephone,
        bibliographie: user.bibliographie,
        photo: user.photo // Nouveau chemin de l'image de profil
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la mise à jour du profil" });
  }
});


router.get('/user-details/:id', async (req, res) => {
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

module.exports = router;  // Exporter le router
