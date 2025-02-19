const express = require('express');
const bcrypt = require('bcryptjs');  // Pour comparer les mots de passe hachés
const jwt = require('jsonwebtoken');  // Pour générer un token JWT
const { User } = require('../db/sequelize'); // Vérifie le bon chemin d'accès
const router = express.Router();


// Route POST pour l'inscription
router.post('/register', (req, res) => {
    const { nom, email, mot_de_passe, role, telephone, bibliographie } = req.body;
  
    // Vérifier si l'email existe déjà
    User.findOne({ where: { email } })
      .then(existingUser => {
        if (existingUser) {
          return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }
  
        // Hacher le mot de passe
        bcrypt.hash(mot_de_passe, 10)
          .then(hashedPassword => {
            // Créer l'utilisateur
            User.create({
              nom,
              email,
              mot_de_passe: hashedPassword,
              role: role || 'user',  // rôle par défaut = 'user'
              telephone,
              bibliographie,
            })
              .then(newUser => {
                console.log("Utilisateur créé :", newUser);
  
                res.status(201).json({
                  message: 'Utilisateur créé avec succès',
                  data: {
                    id_user: newUser.id_user,
                    nom: newUser.nom,
                    email: newUser.email,
                    role: newUser.role,
                    bibliographie: newUser.bibliographie,
                    telephone: newUser.telephone,
                  },
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
              });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Erreur lors du hachage du mot de passe.' });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Erreur lors de la recherche de l\'utilisateur.' });
      });
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

module.exports = router;  // Exporter le router
