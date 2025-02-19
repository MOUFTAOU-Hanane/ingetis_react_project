const express = require('express');
const bcrypt = require('bcryptjs');  // Pour comparer les mots de passe hachés
const jwt = require('jsonwebtoken');  // Pour générer un token JWT
const { User } = require('../db/sequelize'); // Vérifie le bon chemin d'accès
const router = express.Router();
const upload = require('../config/multer');  // Importer la configuration multer


// Route POST pour l'inscription
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

    // Créer l'utilisateur
    const newUser = await User.create({
      nom,
      email,
      mot_de_passe: hashedPassword,
      role: role || 'user',  // rôle par défaut = 'user'
      telephone,
      bibliographie,
      photo: photoProfil,  // Sauvegarder le nom du fichier image
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
        photo: photoProfil ? `http://localhost:3000${photoProfil}` : null
      },
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
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


//upade 
router.put('/update', (req, res) => {
  const { id_user, nom, email, telephone, bibliographie, ancien_mot_de_passe, nouveau_mot_de_passe } = req.body;

  if (!id_user) {
      return res.status(400).json({ message: "L'ID de l'utilisateur est requis." });
  }

  User.findByPk(id_user)
      .then(user => {
          if (!user) {
              return res.status(404).json({ message: "Utilisateur non trouvé." });
          }

          // Vérifier si l'email est déjà utilisé (s'il veut le changer)
          const checkEmail = email && email !== user.email
              ? User.findOne({ where: { email } })
              : Promise.resolve(null);

          return checkEmail.then(existingUser => {
              if (existingUser) {
                  return res.status(400).json({ message: "Cet email est déjà utilisé." });
              }

              // Gestion du mot de passe : vérifier l'ancien avant de changer
              if (nouveau_mot_de_passe) {
                  if (!ancien_mot_de_passe) {
                      return res.status(400).json({ message: "L'ancien mot de passe est requis." });
                  }

                  return bcrypt.compare(ancien_mot_de_passe, user.mot_de_passe)
                      .then(match => {
                          if (!match) {
                              return res.status(400).json({ message: "Ancien mot de passe incorrect." });
                          }
                          return bcrypt.hash(nouveau_mot_de_passe, 10);
                      });
              }
              return null;
          });
      })
      .then(hashedPassword => {
          // Construire l'objet de mise à jour
          let updateData = { nom, email, telephone, bibliographie };
          if (hashedPassword) updateData.mot_de_passe = hashedPassword;

          return User.update(updateData, { where: { id_user } });
      })
      .then(() => {
          return User.findByPk(id_user, {
              attributes: ['id_user', 'nom', 'email', 'telephone', 'bibliographie']
          });
      })
      .then(updatedUser => {
          res.status(200).json({ message: "Profil mis à jour avec succès", user: updatedUser });
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ message: "Erreur lors de la mise à jour du profil" });
      });
});

module.exports = router;  // Exporter le router
